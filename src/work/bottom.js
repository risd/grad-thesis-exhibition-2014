module.exports = function bottom () {
    var self = {},
        dirty = false,
        container_sel,
        container_node,
        container_margin_bottom,
        window_height;

    self.dispatch = d3.dispatch('bottom');

    self.dirty = function (_) {
        if (!arguments.length) return dirty;
        dirty = _;
        return self;
    };

    self.attachWindowEvents = function () {
        d3.select(window)
            .on('resize.bottom', function () {
                calculate_variables();
            })
            .on('scroll.bottom', function () {
                if (!container_node) throw "Requires container.";
                if (dirty) return;

                var cbox = container_node
                                .getBoundingClientRect();

                if ((cbox.bottom + container_margin_bottom) <=
                     window_height) {

                    dirty = true;
                    self.dispatch.bottom();
                }
            });
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        container_node = container_sel.node();
        return self;
    };

    self.initialize = function () {
        calculate_variables();
        return self;
    };

    function calculate_variables () {
        window_height = window.innerHeight;
        container_margin_bottom = +container_sel
            .style('margin-bottom')
            .split('p')[0];
    }

    return self;
};