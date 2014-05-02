module.exports = function () {
    var self = {},
        container_sel,
        cls = 'department';

    self.dispatch = d3.dispatch('click');

    var departments = [
        'All',
        'Architecture',
        'Ceramics',
        'Digital + Media',
        'Furniture Design',
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
        'Textiles'
    ];

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };
    self.departments = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.render = function () {
        if (!container_sel) throw "requires a wrapper";

        var data = departments.map(function (d) {
            return {
                name: d,
                escaped: escape_department(d)
            };
        });

        container_sel
            .append('ul')
            .selectAll(cls)
            .data(data)
            .enter()
            .append('li')
            .append('p')
            .text(function (d) {
                return d.name;
            })
            .on('click', function (d) {
                self.dispatch.click(d.escaped);
            });
    };

    function escape_department(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};