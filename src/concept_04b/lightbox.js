module.exports = function lightbox () {
    var self = {},
        container;

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";

        var cbox = sel.node().getBoundingClientRect(),
            data = sel.datum();

        console.log(cbox);
        console.log(data);
        

    };

    return self;
};