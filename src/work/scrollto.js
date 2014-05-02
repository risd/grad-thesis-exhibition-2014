module.exports = function scrollto (args) {
    var options = args || {};
    options.duration = args.duration || 2000;

    function scroll_tween (offset) {
        return function () {
            var i = d3.interpolateNumber(
                        window.pageYOffset ||
                            document.documentElement.scrollTop,
                        offset);
            return function (t) {
                scrollTo(0, i(t));
            };
        };
    }

    return function (sel) {
        var height = sel.node().getBoundingClientRect().height;

        d3.transition()
            .duration(options.duration)
            .tween('scroll', scroll_tween(height));
    };
};