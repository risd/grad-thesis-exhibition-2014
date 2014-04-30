module.exports = function button () {
    var self = {},
        selection,
        dimensions;

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        dimensions = get_dimensions(selection);

        return self;
    };

    self.start = function () {
        return self;
    };

    function get_dimensions (selection) {
        return selection.node().getBoundingClientRect();
    }

    return self;
};