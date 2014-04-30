var Bottom = require('./bottom');
module.exports = function work () {
    var self = {},
        container_sel;

    var bottom = Bottom();

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;

        bottom.container(container_sel);
        return self;
    };

    self.initialize = function (_) {
        if (!container_sel) throw "Work requires a container";
        return self;
    };

    return self;
};