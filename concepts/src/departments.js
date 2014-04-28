module.exports = function () {
    var self = {},
        wrapper,
        cls = 'department';

    var departments = [
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

    self.wrapper = function (x) {
        if (!arguments.length) return wrapper;
        wrapper = x;
        return self;
    };
    self.departments = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.render = function () {
        if (!wrapper) throw "requires a wrapper";

        wrapper
            .append('ul')
            .selectAll(cls)
            .data(departments)
            .enter()
            .append('li')
            .append('p')
            .text(function (d) {
                return d;
            });
    };


    return self;
};