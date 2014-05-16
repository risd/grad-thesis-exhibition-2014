module.exports = function bottom () {
    var self = {},
        dirty = false,
        body_sel = d3.select('body'),
        body_height,
        did_scroll = false;

    self.dispatch = d3.dispatch('bottom');

    self.dirty = function (_) {
        if (!arguments.length) return dirty;
        dirty = _;
        return self;
    };

    self.attachWindowEvents = function () {
        d3.select(window)
            .on('scroll.bottom', did_scroll_true)
            .on('touchmove.bottom', did_scroll_true);

        setInterval(function () {
            if (did_scroll) {
                did_scroll = false;
                check_dispatch();
            }
        }, 100);
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        container_node = container_sel.node();
        return self;
    };

    function did_scroll_true () {
        did_scroll = true;
    }

    function check_dispatch () {
        if (!container_node) throw "Requires container.";
        if (dirty) return;

        body_height = parseInt(body_sel.style('height'));
        if (body_height <=
            (window.innerHeight + window.scrollY)) {

            dirty = true;
            self.dispatch.bottom();
        }
    }

    return self;
};