module.exports = function bottom () {
    var self = {},
        dirty = false,
        container_sel,
        window_height;

    self.dispatch = d3.dispatch('bottom');

    self.attachWindowEvents = function () {
        d3.select(window)
            .on('resize.bottom', function () {
                // console.log()
                window_height = window.innerHeight;
            })
            .on('scroll.bottom', function () {
                if (!container_sel) throw "Bottom requires container.";
                if (dirty) return;

                var cbox = container_sel
                                .node()
                                .getBoundingClientRect();

                if (cbox.bottom <= window_height) {
                    dirty = true;
                    self.dispatch.bottom();
                }
            });
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    return self;
};