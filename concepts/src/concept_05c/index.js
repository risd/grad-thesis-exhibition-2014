var Departments = require('../departments'),
    Logo = require('./logo'),
    Work = require('./work'),
    Translate = require('./translate');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);
    var translate = Translate();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05a', true)
            .classed('concept_05c', true)
            .classed('full-width-work', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid-wrapper');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05c/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid'))
            .render();

        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        var work_background_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work-background');

        var work_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work');
        work.container(work_sel)
            .render();

            
        work.lightbox
            .container(lightbox_container);


        translate
            .translated(work_sel)
            .over(d3.select('.grid'))
            .background(work_background_sel)
            .setup();
    });

    return self;
};