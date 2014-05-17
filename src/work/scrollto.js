module.exports = function scrollto (args) {
    var options = args || {};
    options.duration = args.duration || 2000;
    var self = {};

    self.dispatch = d3.dispatch('scrollEnd');

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

    self.to = function (offset) {
        d3.transition()
            .duration(options.duration)
            .tween('scroll', scroll_tween(offset))
            .each('end', function () {
                self.dispatch.scrollEnd();
            });
    };

    return self;
};