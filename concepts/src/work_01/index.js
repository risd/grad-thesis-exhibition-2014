var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_01', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.module.width + 'px';
                })
                .style('height', function (d) {
                    return d.module.height + 'px';
                })
            .append('img')
                .attr('src', function (d) {
                    
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    gutter: 20
                }
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
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