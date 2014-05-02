var Bottom = require('./bottom');
var Behance = require('./data');
var Departments = require('../departments');
var Transform = require('./transform');
var Lightbox = require('./lightbox');

module.exports = function work () {
    var self = {},
        container_sel,
        infinite_scroll_bool = false,
        data = [],
        work_container_sel,
        work_sel,
        iso;

    var bottom = Bottom();
    var behance = Behance();
    var departments = Departments();
    var transform = Transform();
    var lightbox = Lightbox();

    behance.dispatch
        .on('data', function (requested) {
            bottom.dirty(false);

            if (!requested) throw 'Work. Got no data.';
            
            console.log('received data');
            data = data.concat(transform(requested));
            render();
        })
        .on('endOfData', function () {
            bottom.dispatch.on('bottom.work', null);
        });

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.lightboxContainer = function (_) {
        if (!arguments.length) return lightbox.container();
        lightbox.container(_);
        return self;
    };

    self.infiniteScroll = function (_) {
        if (!arguments.length) return infinite_scroll_bool;
        infinite_scroll_bool = _;

        if (infinite_scroll_bool === true) {
            bottom
                .container(container_sel)
                .attachWindowEvents();

            bottom.dispatch
                .on('bottom.work', function () {
                    console.log('reached bottom');
                    bottom.dirty(true);
                    behance.fetch_data();
                });
        }

        return self;
    };

    self.initialize = function (_) {
        if (!container_sel) throw "Work requires a container";
        container_sel.call(add_structure);

        if (infinite_scroll_bool) bottom.initialize();

        // will be the thing to call render
        behance.fetch_data();

        // filtering
        departments.dispatch
            .on('click', function (department) {

            if (department === 'all') department = '';

            if (iso) {
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                            .classed(department);
                    }
                });
            }
        });

        return self;
    };

    function render ()  {
        var masonry = masonry_settings();

        work_sel = work_container_sel.selectAll('.piece')
            .data(data);

        var work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    return 'piece ' + d.risd_program_class;
                })
                .style('width', function (d, i) {
                    return masonry.columnWidth + 'px';
                })
                .style('height', function (d, i) {
                    return ((masonry.columnWidth *
                             d.cover.original_height)/
                             d.cover.original_width)+ 'px';
                });

        work_sel_enter
            .append('div')
                .attr('class', 'piece-wrapper')
                .call(add_image);
        
        work_sel_enter
            .append('div')
                .attr('class', 'piece-meta-wrapper')
                .call(add_meta);

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
        } else {
            work_sel_enter.each(function () {
                iso.appended(this);
            });
            iso.layout();
        }
    }

    function add_structure (sel)  {
        var dept_container_sel = sel.append('div')
            .attr('class', 'col-percent-2-10 departments');

        work_container_sel = sel.append('div')
            .attr('class', 'col-percent-8-10 work-container omega');

        departments
            .container(dept_container_sel)
            .render();
    }

    function add_meta (sel) {
        sel.append('p')
            .attr('class', 'student-name piece-meta')
            .text(function (d) {
                return d.student_name;
            });

        sel.append('p')
            .attr('class', 'risd-program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });
    }

    function add_image (sel) {
        sel.append('img')
            .attr('src', function (d) {
                return d.cover.src;
            });
    }

    function masonry_settings () {
        var gutter = 10;
        var column_width = (work_container_sel
                                    .node()
                                    .getBoundingClientRect()
                                    .width / 4) -
                                (gutter * 3);
        return {
            gutter: gutter,
            columnWidth: column_width
        };
    }

    return self;
};