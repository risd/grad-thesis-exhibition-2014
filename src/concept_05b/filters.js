var Departments = require('./departments');

module.exports = function filters () {
    var self = {},
        opacity_scale = d3.scale.linear()
            .domain([400, 200])
            .range([0, 1])
            .clamp(true),
        wrapper_sel,
        filter_sel,
        activator_sel;

    var departments = Departments();

    self.wrapper = function (_) {
        if (!arguments.length) return wrapper_sel;
        wrapper_sel = _;

        departments.wrapper(wrapper_sel);

        return self;
    };

    self.selection = function (_) {
        if (!arguments.length) return filter_sel;
        filter_sel = _;
        return self;
    };

    self.activator = function (_) {
        if (!arguments.length) return activator_sel;
        activator_sel = _;
        return self;
    };

    self.render = function () {
        if (!arguments.length) {
            throw "filters render takes no arguments";
        }
        if (!wrapper_sel) throw "requires selection";

        // selection =
    };

    return self;
};