module.exports = function fixed () {
    var self = {},
        selection,
        reposition_sel,
        reposition_class,
        position_to_fix_relative_to_top = 100;

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;
        return self;
    };
    self.reposition = function (_) {
        if (!arguments.length) return reposition_sel;
        reposition_sel = _;
        return self;
    };
    self.repositionClass = function (_) {
        if (!arguments.length) return reposition_class;
        reposition_class = _;
        return self;
    };

    self.toTop = function (_) {
        if (!arguments.length) return position_to_fix_relative_to_top;
        position_to_fix_relative_to_top = _;
        return self;
    };

    self.setup = function () {
        console.log('reposition_class');
        d3.select(window)
            .on('scroll.fixed', function () {
                var is_fixed = false;
                if (selection.node().getBoundingClientRect().top <
                    position_to_fix_relative_to_top) {
                    is_fixed = true;
                }

                selection.classed('fixed', is_fixed);
                reposition_sel.classed(reposition_class, is_fixed);
            });
    };

    return self;
};