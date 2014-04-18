module.exports = function lightbox () {
    var self = {},
        container,
        original_container,
        lightbox_sel,
        lightbox_img_sel,
        selected_sel,
        to_transition = {
            div: {
                start: {
                    position: 'fixed'
                },
                end: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    '-webkit-transform': 'matrix(1,0,0,1,0,0)',
                    width: window.innerWidth + 'px',
                    height: window.innerHeight + 'px'
                }
            },
            img: {
                start: {
                    top: '0px',
                    left: '0px'
                },
                end: {}
            },
            container: {
                start: {
                    'background-color': 'rgba(239, 65, 54, 0)'
                },
                end: {
                    'background-color': 'rgba(239, 65, 54, 0.8)'
                }
            }
        },
        calc_to_transition_img = function (d) {
            to_transition.img.start.width = d.width + 'px';
            to_transition.img.start.height = d.height + 'px';

            to_transition.img.end.width = d.original_width + 'px';
            to_transition.img.end.height = d.original_height + 'px';


            if (d.original_height > window.innerHeight) {
                to_transition.img.end.top = '0px';
            } else {
                to_transition.img.end.top =
                    ((window.innerHeight -
                      d.original_height) / 2) + 'px';
            }

            if (d.original_width > window.innerWidth) {
                to_transition.img.end.left = '0px';
            } else {
                to_transition.img.end.left =
                    ((window.innerWidth -
                      d.original_width) / 2) + 'px';
            }
        };

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.originalContainer = function (_) {
        if (!arguments.length) return original_container;
        original_container = _;
        return self;
    };
    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var original_container_box =
            original_container
                .node()
                .getBoundingClientRect();

        var copy = sel.node().cloneNode(true);
        var copy_sel = d3.select(copy);

        copy_sel.select('p').remove();

        var lightbox_copy = container.node().appendChild(copy);
        lightbox_sel = container.select('.piece');
        lightbox_img_sel = lightbox_sel.select('img');


        to_transition.div.start.width = sel.style('width');

        to_transition.div.start.height = sel.style('height');
        to_transition.div.start.top =
            (+sel
                .style('top')
                .split('p')[0] +
            original_container_box.top) + 'px';
        to_transition.div.start.left =
            (+sel
                .style('left')
                .split('p')[0] +
            original_container_box.left) + 'px';
        to_transition.div.start['-webkit-transform'] =
            sel.style('-webkit-transform');


        var data = sel.datum();

        calc_to_transition_img(data.cover);


        container.classed('active', true);

        lightbox_img_sel
            .style(to_transition.img.start);
        lightbox_sel
            .style(to_transition.div.start);
        container
            .style(to_transition.container.start);

        console.log(to_transition.div);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each('start', function () {
                selected_sel.style('display', 'none');
            })
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.end);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.end);

                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.start);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.start);

                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
            });
    }

    return self;
};