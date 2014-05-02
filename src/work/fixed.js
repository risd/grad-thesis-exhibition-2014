module.exports = function fixed () {
    // when container hits the top, switch that element to fixed
    // plus the additional padding

    var self = {},
        container_sel,
        neighbor_sel,
        padding = 0,
        fixed_class = 'fixed',
        offset_class = 'fixed-neighbor';

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.neighbor = function (_) {
        if (!arguments.length) return neighbor_sel;
        neighbor_sel = _;
        return self;
    };

    self.offsetClass = function (_) {
        if (!arguments.length) return offset_class;
        offset_class = _;
        return self;
    };

    self.padding = function (_) {
        if (!arguments.length) return padding;
        padding = _;
        return self;
    };

    self.fixedClass = function (_) {
        if (!arguments.length) return fixed_class;
        fixed_class = _;
        return self;
    };

    self.initialize = function () {
        d3.select(window)
            .on('scroll.fixed', function () {
                var top = container_sel
                            .node()
                            .getBoundingClientRect().top;

                var fixed = ((top - padding) < 0) ? true : false;

                container_sel
                    .classed(fixed_class, fixed);
                neighbor_sel
                    .classed(offset_class, fixed);
            });
    };

    return self;
};