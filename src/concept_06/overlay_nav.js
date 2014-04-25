module.exports = function nav () {
    var self = {},
        target_activate_pairs = [],
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

    self.targetActivatePairs = function (_) {
        if (!arguments.length) return target_activate_pairs;
        target_activate_pairs = _;
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

        return self;
    };

    self.setup = function () {
        if (!target_activate_pairs) throw "requires elements to pair";
        target_activate_pairs
            .on('click.openNav', function (d, di) {
                overlaid = true;
                var to_activate = d3.select(d.activate);
                
                to_activate.classed('overlaid', overlaid);
                body_sel.classed('no-scroll', overlaid);
                if (rotate_background_sel) rotate();
            });
        target_activate_pairs.each(function (d, i) {
            var to_activate = d3.select(d.activate);

            to_activate
                .on('click.closeNav', function () {
                    console.log('close');
                    overlaid = false;
                    d3.select(this).classed('overlaid', overlaid);
                    body_sel.classed('no-scroll', overlaid);
            });
        });
    };

    function rotate () {
        rotate_methods[rotate_method]();
    }

    function rotate_block () {
        var speed = 150,
            pause = 6000;

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