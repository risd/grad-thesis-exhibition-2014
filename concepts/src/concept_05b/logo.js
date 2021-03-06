var logoComponents = require('./logo_components'),
    logoConnecting = require('./logo_connecting');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
        logo_connecting_paths = logoConnecting,
        logo_svg,
        logo_line,
        logo_connecting,
        straight_line = d3.svg.line();

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true),
        prev_scroll_progress = 0;

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            // update logo components per window
            if (logo_sel) {
                logo_sel.each(function (d) {
                    var updated = d.rules(window_width,
                                          window_height);

                    d.start = updated.start;
                    d.end = updated.end;
                    d.interpolator =
                        add_interpolator(updated)
                            .interpolator;
                });
            }
            update_logo_components(prev_scroll_progress);
            update_logo_line();
        })
        .on('scroll.logo', function () {
            var scroll_progress = scroll_scale(window.scrollY);
            if (scroll_progress != prev_scroll_progress) {
                update_logo_components(scroll_progress);
                update_logo_line();
            }
            prev_scroll_progress = scroll_progress;

            logo_container_sel
                .classed('logo-svg--end',
                         (scroll_progress === 1) ? true : false);
        });

    self.scrollOverSel = function (_) {
        if (!arguments.length) return scroll_over_sel;
        scroll_over_sel = _;
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.render = function () {
        // update logo components per window
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_components.forEach(function (d, i) {
            var updated = d.rules(window_width,
                                  window_height);

            d.start = updated.start;
            d.end = updated.end;
            d.interpolator =
                add_interpolator(updated)
                    .interpolator;
        });

        distance_to_scroll = calc_distance_to_scroll();
        scroll_scale.domain([0, distance_to_scroll]);

        update_logo_components(
            scroll_scale(
                window.scrollY));


        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .style('top', function (d) {
                return d.start.top;
            })
            .style('bottom', function (d) {
                return d.start.bottom;
            })
            .style('left', function (d) {
                return d.start.left;
            })
            .style('right', function (d) {
                return d.start.right;
            })
            .style('font-size', function (d) {
                return d.start['font-size'];
            })
            .style('line-height', function (d) {
                return d.start['line-height'];
            })
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
        });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        var verticies = logo_verticies();

        logo_line = logo_svg.selectAll('path')
            .data(verticies.straight)
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', straight_line);

        logo_connecting =
            logo_svg
                .selectAll('.logo-connecting')
                .data(verticies.connecting)
                .enter()
                .append('path')
                    .attr('class', 'logo-connecting')
                    .attr('d', function (d) {
                        return d;
                    });
    };

    function update_logo_components (percent_progress) {
        if (!logo_sel) return;
        logo_sel
            .style('top', function (d) {
                return d.interpolator.top(percent_progress);
            })
            .style('bottom', function (d) {
                return d.interpolator.bottom(percent_progress);
            })
            .style('left', function (d) {
                return d.interpolator.left(percent_progress);
            })
            .style('right', function (d) {
                return d.interpolator.right(percent_progress);
            })
            .style('font-size', function (d) {
                return d.interpolator
                        ['font-size'](percent_progress);
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = logo_verticies();

        logo_line
            .data(verticies.straight)
            .attr('d', straight_line);

        logo_connecting
            .data(verticies.connecting)
            .attr('d', function (d) {
                    return d;
                });
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        var logo_connecting_segments = [];

        logo_line_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))];
            } else {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(2/3)))];
            }

            second = [bounds.right + 6,
                 (bounds.top + (bounds.height*(2/3)))];

            logo_line_verticies.push([first, second]);

        });

        for (var i = 0; i < logo_line_verticies.length; i++) {
            if ((i+1) < logo_line_verticies.length) {
                var start = logo_line_verticies[i][1],
                    end = logo_line_verticies[i+1][0];

                logo_connecting_segments
                    .push(
                        logo_connecting_paths[i]
                            .segment(start, end));
            }
        }
        return {
            straight: logo_line_verticies,
            connecting: logo_connecting_segments
        };
    }

    function calc_distance_to_scroll () {
        var scrolling_distance = window.innerHeight;
        scroll_over_sel.style('margin-top', scrolling_distance +
                                            'px');
        return scrolling_distance;
    }

    function add_interpolator (states) {
        // sizes
        // { min1400: {},  min1024: {}, min768: {}, min300: {}}
        states.interpolator = {};
        for (var key in states.start) {
            states.interpolator[key] =
                d3.interpolateString(
                    states.start[key],
                    states.end[key]);
        }
        return states;
    }

    return self;
};