module.exports = function bottom () {
    var self = {},
        dirty = false,
        // container_sel,
        // container_node,
        // container_margin_bottom,
        // window_height,
        body_sel = d3.select('body'),
        body_height;

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

                body_height = parseInt(body_sel.style('height'));
                if (body_height <=
                    (window.innerHeight + window.scrollY)) {

                    dirty = true;
                    self.dispatch.bottom();
                    console.log('dispatch bottom');
                }
            });
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        container_node = container_sel.node();
        return self;
    };

    return self;
};