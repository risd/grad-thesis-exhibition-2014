var svg_cross = require('./svgCross');

module.exports = function lightbox () {
    var self = {},
        container_sel,
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('closed');

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.show = function (data) {
        if (!container_sel) throw "Lightbox. Requires container.";

        console.log(data);
        
        var blanket = container_sel
            .append('div')
            .attr('class', 'fixed-fullscreen blanket');

        var lightbox_grid_sel = container_sel
            .append('div')
            .attr('class', 'grid');

        var lightbox_controls_grid_sel = container_sel
            .append('div')
            .attr('class', 'lightbox-controls-container '+
                           'fixed-full-width')
            .append('div')
            .attr('class', 'grid');

        var lightbox_controls =
            lightbox_controls_grid_sel
                .append('div')
                .attr('class', 'lightbox-controls')
                .call(svg_cross);

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class',
                      'lightbox-work '+
                      'offset-percent-2-10 '+
                      'col-percent-8-10');

        if (window.innerWidth < 768) {
            lightbox_meta_sel
                .style('width', '100%');
        } else {
            lightbox_meta_sel
                .style('width',
                       (parseInt(lightbox_work_sel
                                .style('margin-left')) - 20) + 'px');
        }

        d3.select(window)
            .on('resize.lightbox', function () {
                if (window.innerWidth < 768) {
                    lightbox_meta_sel
                        .style('width', '100%');
                } else {
                    lightbox_meta_sel
                        .style('width',
                               (parseInt(lightbox_work_sel
                                        .style('margin-left')) - 20) +
                                        'px');
                }
            });

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        if (data.project_name != data.description) {
            lightbox_work_sel
                .append('p')
                .attr('class', 'lightbox-description')
                .text(data.description);
        }

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .each(add_modules);

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        if (data.personal_link.length > 0) {
            lightbox_meta_info_sel
                .append('p')
                .attr('class', 'lightbox-meta-info--personal-link')
                .append('a')
                .attr('href', data.personal_link)
                .attr('target', '_blank')
                .text('Personal Website');
        }

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--personal-link')
            .append('a')
            .attr('href', data.url)
            .attr('target', '_blank')
            .text('Behance Portfolio');

        container_sel.classed('active', true);
        body_sel.classed('no-scroll', true);
        body_sel.classed('in-lightbox', true);

        lightbox_controls.select('.cross-svg')
            .on('click', function () {
                close();
            });

        blanket
            .on('click', function () {
                console.log('blanket');
                close();
            });
    };

    function close () {
        container_sel
            .classed('active', false)
            .html('');

        body_sel.classed('no-scroll', false);
        body_sel.classed('in-lightbox', false);

        container_sel.on('click', null);
        
        d3.select(window)
            .on('resize.lightbox', null);

        self.dispatch.closed();
    }

    function add_modules (d, i) {
        var sel = d3.select(this);

        if (d.type === 'image') {
            sel.append('img')
                .attr('src',
                    d.sizes.max_1240 ? d.sizes.max_1240 : d.src);
        }
        if (d.type === 'text') {
            sel.append('p')
                .attr('class', 'piece-module-text')
                .text(d.text_plain);
        }
        if ((d.type === 'embed') | (d.type === 'video')) {
            sel.append('div')
                .attr('class', 'piece-module-embed')
                .html(d.embed);
        }
    }

    return self;
};