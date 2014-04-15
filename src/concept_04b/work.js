var Bottom = require('./bottom'),
    Lightbox = require('./lightbox');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = -20;

    self.dispatch = d3.dispatch('dataLoaded');

    
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    // deal with window bottom loading more
    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window


    var masonic = d3.masonic()
        .width(function (d) {
            return d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return d.cover.height + masonic_gutter;
        })
        .columnWidth(202 + masonic_gutter);

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
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program) + " " +
                        d.cover.clss;
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
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

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
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
        var cover_options = ['202', '404'];
        var cover_dimensions = {
            'cover115': {
                width: 115,
                height: 90
            },
            'cover202': {
                width: 202,
                height: 158
            },
            'cover230': {
                width: 230,
                height: 180
            },
            'cover404': {
                width: (404 + masonic_gutter),
                height: (316 + masonic_gutter)
            }
        };

        var formatted_work = [];

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            var random_cover_option =
                cover_options[Math.floor(Math.random() *
                                   cover_options.length)];

            var random_cover = {
                width: cover_dimensions[
                            'cover'+random_cover_option].width,
                height: cover_dimensions[
                            'cover'+random_cover_option].height,
                src: d.covers[random_cover_option],
                clss: 'cover'+random_cover_option
            };

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
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