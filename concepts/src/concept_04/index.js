module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel,
        logo_container_sel,
        logo_sel,
        logo_components = [{
            text: 'RISD',
            cls: 'logo-component--risd'
        }, {
            text: 'Grad',
            cls: 'logo-component--grad'
        }, {
            text: 'Show',
            cls: 'logo-component--show'
        }, {
            text: '2014',
            cls: 'logo-component--2014'
        }],
        logo_svg,
        logo_line,
        line = d3.svg.line();

    window_sel.on('resize', function () {
        logo_svg
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);

        update_logo_line();
    });

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04', true)
            .html('');


        logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .text(function (d) {
                return d.text;
            });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        logo_line = logo_svg.selectAll('path')
            .data([logo_verticies()])
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', line);

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
        });

        return self;
    };

    function update_logo_line () {
        var verticies = [logo_verticies()];
        logo_line.data(verticies);
        logo_line.attr('d', line);
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        logo_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            if (i === 0) {
                logo_line_verticies.push(
                    [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))]);
            } else {
                logo_line_verticies.push(
                    [bounds.left - 10,
                     (bounds.top + (bounds.height*(2/3)))]);
            }

            logo_line_verticies.push(
                [bounds.right + 10,
                 (bounds.top + (bounds.height*(2/3)))]);

        });
        return logo_line_verticies;
    }

    return self;
};