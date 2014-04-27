var fullscreenImg = require('./fullscreen_img'),
    Button = require('./overlay_button');

module.exports = function nav () {
    var self = {},
        target_sel,
        rotate_background_sel,
        rotate_background_length = 0,
        rotate_direction_ascending = true,
        overlaid = false,
        body_sel = d3.select('body'),
        rotate_methods = {
            fade: rotate_fade,
            block: rotate_block
        },
        rotate_method = 'fade';

    var full_screen = fullscreenImg().setup();
    var button = Button();

    self.selection = function (_) {
        if (!arguments.length) return target_sel;
        target_sel = _;

        button
            .selection(target_sel)
            .start();

        return self;
    };

    self.rotateMethod = function (_) {
        if (!arguments.length) return rotate_method;
        rotate_method = _;
        return self;
    };

    self.rotateBackground = function (_) {
        if (!arguments.length) return rotate_background_sel;
        rotate_background_sel = _;

        // set intial values;
        rotate_background_sel
            .datum(function (d, i) {
                d = {};

                d.opacity = (i === 0) ? 1 : 0;
                rotate_background_length += 1;

                return d;
            });

        full_screen.selection(rotate_background_sel)
            .resize();

        return self;
    };

    self.setup = function () {
        if (!target_sel) throw "requires elements to pair";
        target_sel
            .on('click.nav', function (d, di) {
                target_sel
                    .select('#flower')
                    .style('webkitAnimationDuration', '2s');
                overlaid = overlaid ? false : true;
                if (overlaid) rotate();
                activate_deactivate(d);
            });
    };

    function activate_deactivate (d) {
        var overlay = d3.select(d.activate);
        overlay.classed('overlaid', overlaid);
        body_sel.classed('no-scroll', overlaid);
        body_sel.classed(d.body, overlaid);
    }

    function rotate () {
        rotate_methods[rotate_method]();
    }

    function rotate_block () {
        var speed = 800,
            pause = 8000;

        rotate_background_sel
            .transition()
            .duration(500 * rotate_background_length)
            .delay(function (d, i) {
                return i * speed;
            })
            .each('start', function () {
                rotate_background_sel.style('display', 'none');
            })
            .style('display', 'block')
            .each('end', function () {
                setTimeout(function () {
                    rotate_background_sel.style('display', 'none');
                    if (overlaid) rotate();
                }, pause);
            });

    }

    function rotate_fade () {
        rotate_background_sel.transition()
            .duration(5000)
            .each("start", function () {
                rotate_background_sel.each(function (d, i) {
                    d3.select(this).style('z-index', d.z);
                });
            })
            .style('opacity', function (d) {
                return d.opacity;
            })
            .each("end", function () {
                // find current 
                var current_index = 0,
                    next_current_index;

                // get the current index
                rotate_background_sel.each(function (d, i) {
                    if (d.current) {
                        current_index = i;
                    }
                });

                // set the next index based on ascending or not
                // also changing ascending bool if necessary
                if (rotate_direction_ascending) {
                    next_current_index = current_index + 1;
                    if (next_current_index >
                         (rotate_background_length - 1)) {
                        current_index =
                            rotate_background_length - 2;
                        rotate_direction_ascending = false;
                    }
                } else {
                    next_current_index = current_index - 1;
                    if (next_current_index < 0) {
                        next_current_index = 0;
                        rotate_direction_ascending = true;
                    }
                }

                // set opacity values based on next current index
                rotate_background_sel.each(function (d, i) {
                    d.opacity = ((i === next_current_index) ||
                                 (i === current_index)) ?
                                1 : 0;
                    d.current = (i === next_current_index) ?
                                true : false;

                    if (i === next_current_index) {
                        d.z = 3;
                    } else if (i === current_index) {
                        d.z = 2;
                    } else {
                        d.z = 1;
                    }

                });

                if (overlaid) rotate();
            });
    }

    return self;
};