var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        iso,
        risd_programs = ['All'];

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    d3.select(window)
        .on('resize.work', function () {
            
        });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true);
            // .classed('col-10-10', true);

        render_data();

        return self;
    };

    self.filter = function (_) {
        if (arguments.length != 1) throw "filter takes one argument";

        var program = _;
        if (program === 'All') program = '';

        if (iso) {
            iso.arrange({
                filter: function (itemElem) {
                    return d3.select(itemElem)
                        .classed(format_program(program));
                }
            });
        }
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        var wide_count = 0,
            wide_frequency = 5;
        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    var extra_class = '';
                    if (d.cover.width > d.cover.height) {
                        wide_count += 1;
                        if ((wide_count/wide_frequency) === 0) {
                            extra_class = ' wide-piece';
                        }
                    }
                    return 'piece ' +
                        format_program(d.risd_program) +
                        extra_class;
                });

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                });

        var work_sel_enter_meta =
            work_sel_enter
                .append('div')
                .attr('class', 'piece-meta-wrapper');

        work_sel_enter_meta
            .append('p')
            .attr('class', 'student_name piece-meta')
            .text(function (d) {
                return d.student_name;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'risd_program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        iso = new Isotope(container.node(), {
            itemSelector: '.piece',
            masonry: {
                columnWidth: '.piece',
                gutter: 30
            }
        });

        window.iso = iso;
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);
        // var widths = d3.scale.identity()
        //     .domain(width_extent);

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module =
                modules_to_include[Math.floor(Math.random() *
                                   modules_to_include.length)];

            var random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover,
                description: d.details.description,
                avatar: d.owners[0].images['138'],
                url: d.owners[0].url
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};