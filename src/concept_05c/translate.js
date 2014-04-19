module.exports = function translate () {
    var self = {},
        // the selection that is being translated
        translated_sel,
        // the selection that is being translated over
        // this will determine the height that must be
        // scroll passed, before the translated_sel
        // is translated over
        over_sel,
        over_sel_height = 0,
        // the selection for the full screen element
        // whose z-index and opacity get adjusted
        // instead of just sliding in, the images
        // slide in over the new background.
        background_sel,
        opacity_scale = d3.scale.linear()
            .domain([0, 200])  // distance to scroll
            .range([0,1])      // opacity values
            .clamp(true);

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    self.translated = function (_) {
        if (!arguments.length) return translated_sel;
        translated_sel = _;
        return self;
    };

    self.over = function (_) {
        if (!arguments.length) return over_sel;
        over_sel = _;

        over_sel_height = get_over_sel_height();

        return self;
    };

    self.background = function(_) {
        if (!arguments.length) return background_sel;
        background_sel = _;
        return self;
    };

    self.setup = function () {
        d3.select(window)
            .on('scroll.translate', function () {
                if (pageYOffset > over_sel_height) {
                    over_sel
                        .style(vendor+'transform',
                               'translate(0px,' +
                                (-(over_sel_height - pageYOffset)) +
                                'px)');
                    translated_sel
                        .style(vendor+'transform',
                               'translate(0px,' +
                               (over_sel_height - pageYOffset) +
                               'px)');
                }
                var opacity_val = opacity_scale(pageYOffset-
                                                over_sel_height);
                console.log('opacity_val');
                console.log(opacity_val);
                background_sel
                    .style('opacity', opacity_val)
                    .classed("active", (opacity_val > 0) ? 1: 0);
            })
            .on('resize.translate', function () {
                over_sel_height = get_over_sel_height();
            });
    };

    function get_over_sel_height () {
        if (!over_sel) return 0;
        return over_sel.node()
                .getBoundingClientRect()
                .height;
    }


    

    return self;
};