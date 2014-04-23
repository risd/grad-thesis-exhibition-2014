module.exports = function department () {
    var self = {},
        wrapper,
        cls = 'department',
        departments,
        activator,
        activator_text,
        blanket_sel,
        grid_sel,
        active_state = false,
        body_sel = d3.select('body');

    var data = [
        'Architecture',
        'Ceramics',
        'Digital + Media',
        'Furniture',
        'Glass',
        'Graphic Design',
        'Industrial Design',
        'Interior Architecture',
        'Jewelry + Metalsmithing',
        'Landscape Architecture',
        'Painting',
        'Photography',
        'Printmaking',
        'Sculpture',
        'Textiles',
        'All'
    ];

    self.dispatch = d3.dispatch('filter');

    self.wrapper = function (_) {
        if (!arguments.length) return wrapper;
        wrapper = _;
        return self;
    };
    self.departments = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.grid = function (_) {
        if (!arguments.length) return grid_sel;
        grid_sel = _;
        return self;
    };

    self.render = function () {
        if (!wrapper) throw "requires a wrapper";

        activator = wrapper.append('div')
            .attr('class', 'button department-activator col-10-10')
            .on('click' , function () {
                toggle_state();
            });

        activator_text = activator.append('p')
            .attr('class', 'department-activator-text')
            .text('filter by department');

        blanket_sel = wrapper.append('div')
            .attr('class', 'department-blanket');


        departments = wrapper.append('div')
            .attr('class', 'department-list');
        
        departments
            .append('ul')
            .selectAll(cls)
            .data(data)
            .enter()
            .append('li')
            .append('p')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                console.log('filter', d);
                var program = d;
                if (program === 'All') program = 'Departments';
                activator_text.text(program);
                self.dispatch.filter(d);
                toggle_state();
            });

        blanket_sel.on('click', function () {
            toggle_state();
        });
    };

    function toggle_state () {
        console.log('toggle');
        active_state = active_state ? false : true;
        wrapper.classed('departments--active', active_state);
        body_sel.classed('no-scroll', active_state);
        grid_sel.classed('z-index-30', active_state);
    }


    return self;
};