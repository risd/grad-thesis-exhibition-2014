var connectLogo = require('./connect_logo');

module.exports = function logo () {
    var self = {},
        window_sel = d3.select(window),
        logo_container_sel,
        logo_svg,
        logo_text_sel,
        logo_line_text_sel,
        logo_line_connecting_sel,
        straight_line = d3.svg.line(),
        connect_logo = connectLogo;

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.attachResize = function () {
        window_sel
            .on('resize.logo', function () {
                var window_width = window.innerWidth,
                    window_height = window.innerHeight;

                logo_svg
                    .attr('width', window_width)
                    .attr('height', window_height);

                if (logo_line_connecting_sel) {
                    update_logo_line();
                }

            });
        return self;
    };

    self.render = function () {
        // set up svg
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        // selection of the text that will define the line
        logo_text_sel = d3.select('header')
                          .selectAll('.logo-text-component');

        // verticies for 
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies);

        logo_line_text_sel = logo_svg.selectAll('.logo-line-text')
            .data(text_verticies)
            .enter()
            .append('path')
                .attr('class', 'logo-line-text')
                .attr('d', straight_line);

        logo_line_connecting_sel =
            logo_svg
                .selectAll('.logo-line-connecting')
                .data(connecting_segments)
                .enter()
                .append('path')
                    .attr('class', 'logo-line-connecting')
                    .attr('d', function (d) { return d; });
    };

    function update_logo_line () {
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies);

        logo_line_text_sel
            .data(text_verticies)
            .attr('d', straight_line);

        logo_line_connecting_sel
            .data(connecting_segments)
            .attr('d', function (d) { return d; });
    }

    function logo_line_text_verticies (sel) {
        var text_verticies = [];

        sel.each(function (d, i) {
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

            text_verticies.push([first, second]);

        });

        console.log(text_verticies);

        return text_verticies;
    }

    function logo_line_connecting_segments(start_end_points) {
        var connecting_segments = [];
        for (var i = 0; i < start_end_points.length; i++) {
            if ((i+1) < start_end_points.length) {
                var start = start_end_points[i][1],
                    end = start_end_points[i+1][0];

                connecting_segments
                    .push(
                        connect_logo[i]
                            .segment(start, end));
            }
        }
        return connecting_segments;
    }

    return self;
};