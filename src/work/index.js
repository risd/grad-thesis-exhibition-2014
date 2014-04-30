var Bottom = require('./bottom');
var Behance = require('./data');

module.exports = function work () {
    var self = {},
        container_sel,
        infinite_scroll_bool = false,
        data = [],
        work_sel;

    var bottom = Bottom();
    var behance = Behance();

    behance.dispatch.on('data', function (behance_data) {
        data.concat(behance_data);
        render();
    });

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.infiniteScroll = function (_) {
        if (!arguments.length) return infinite_scroll_bool;
        infinite_scroll_bool = _;

        if (infinite_scroll_bool === true) {
            bottom
                .container(container_sel)
                .attachWindowEvents();

            bottom.dispatch
                .on('bottom', function () {
                    behance.fetch_data();
                });
        }

        return self;
    };

    self.initialize = function (_) {
        if (!container_sel) throw "Work requires a container";
        behance.fetch_data();
        return self;
    };

    function render ()  {
        console.log('render');
    }

    return self;
};