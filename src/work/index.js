var Bottom = require('./bottom');
var Behance = require('./data');
var Departments = require('../departments');
var Transform = require('./transform');
var Lightbox = require('./lightbox');
var Scrollto = require('./scrollto');
var Fixed = require('./fixed');

module.exports = function work () {
    var self = {},
        container_sel,
        infinite_scroll_bool = false,
        data = [],
        work_container_sel,
        work_sel,
        iso,
        layout = 'image',
        render_layout = {
            image: render_image,
            fixed: render_fixed
        };

    var bottom = Bottom();
    var behance = Behance();
    var departments = Departments();
    var transform = Transform();
    var lightbox = Lightbox();
    var scrollto = Scrollto({
        duration: 1000
    });
    var fixed = Fixed()
        .padding(100);

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

    self.layout = function (_) {
        if (!arguments.length) return layout;
        layout = _;
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

            scrollto(d3.select('.intro-quote'));

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

        // fixed.initialize();

        return self;
    };

    function render () {
        render_layout[layout]();
    }

    function render_fixed () {
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

    function render_image ()  {
        var masonry = masonry_settings();
        var meta_space = 35;
        var counter = 0;

        work_sel = work_container_sel.selectAll('.piece')
            .data(data);

        var work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    return 'piece ' + d.risd_program_class;
                })
                .style('width', function (d, i) {
                    // figure out height and width

                    // landscape images deserve to be landscapy
                    if ((d.cover.original_width/
                         d.cover.original_height) >
                        1.8) {

                        d.masonry_width = masonry.columnWidth * 2 +
                                          masonry.gutter;
                        d.masonry_height =
                            ((d.masonry_width *
                              d.cover.original_height)/
                             d.cover.original_width) + meta_space;

                    } else {
                        counter += 1;

                        // make every 5th one big.
                        if (counter % 5 === 0) {
                            d.masonry_width = masonry.columnWidth * 2 +
                                              masonry.gutter;
                        } else {
                            d.masonry_width = masonry.columnWidth;
                        }
                        d.masonry_height =
                            ((d.masonry_width *
                              d.cover.original_height)/
                             d.cover.original_width) +
                            meta_space;
                    }
                    



                    return d.masonry_width + 'px';
                })
                .style('height', function (d, i) {
                    return d.masonry_height + 'px';
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
            .attr('class', 'col-percent-8-10 work-container omega '+
                           'work-layout-' + layout);

        departments
            .container(dept_container_sel)
            .render();

        fixed
            .container(dept_container_sel)
            .offsetClass('offset-percent-2-10')
            .neighbor(work_container_sel);
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
        var total_work_width = work_container_sel
                                    .node()
                                    .getBoundingClientRect()
                                    .width;
        var number_of_columns = 4;
        var gutter = 0;
        var column_width = (total_work_width / number_of_columns) -
                           (gutter * (number_of_columns - 1));

        return {
            gutter: gutter,
            columnWidth: column_width
        };
    }

    return self;
};