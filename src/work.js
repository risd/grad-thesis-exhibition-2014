module.exports = function Work (context) {
    var self = {},
        wrapper,
        data;

    self.wrapper = function (x) {
        if (!arguments.length) return wrapper;
        wrapper = x;
        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    self.render = function () {
        console.log('rendering');
        console.log(wrapper);
        if (wrapper &&
            wrapper.node()) {

            wrapper.selectAll('.piece')
                .data(data)
                .enter()
                .append('div')
                .attr('class', 'piece')
                .call(function (sel) {
                    var data = d3.select(this).datum();
                    console.log('data');
                    console.log(data);
                });
        }
    };

    return self;
};