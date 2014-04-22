module.exports = function section_nav () {
    var self = {},
        wrapper_sel,
        data = [{
            text: 'About',
        }, {
            text: 'Visit'
        }, {
            text: 'Work'
        }];

    self.wrapper = function (_) {
        if (!arguments.length) return wrapper_sel;
        wrapper_sel = _;
        return self;
    };

    self.render = function () {
        var container = wrapper_sel.append('div')
            .attr('class', 'grid grid-nav')
            .append('div')
            .attr('class', 'col-10-10')
            .append('div')
            .attr('class', 'nav-section-items');

        container.selectAll('.nav-section-item')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'nav-section-item')
            .append('a')
            .attr('href', function (d) {
                return '#' + d.text;
            })
            .append('p')
            .text(function (d) {
                return d.text;
            });

        return self;
    };


    return self;
};