module.exports = function translate () {
    var self = {},
        // the selection that is being translated
        translate_sel,
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
        opacity_background_scale = d3.scale.linear()
            .domain([0, 200])  // distance to scroll
            .range([0,1])      // opacity values
            .clamp(true),
        opacity_fixed_scale = d3.scale.linear()
            .domain([400, 200])
            .range([0, 1])
            .clamp(true),
        // selection that will fade in
        // typically navigation
        fixed_sel,
        logo_container_offset,
        top_nav_sel;

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    self.translate = function (_) {
        if (!arguments.length) return translate_sel;
        translate_sel = _;
        return self;
    };

    self.nav = function (_) {
        if (!arguments.length) return top_nav_sel;
        top_nav_sel = _;
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

    self.fixed = function (_) {
        if (!arguments.length) return fixed_sel;
        fixed_sel = _;
        return self;
    };

    self.setup = function () {
        update_scroll_target_values();
        d3.select(window)
            .on('scroll.translate', function () {
                if (pageYOffset > over_sel_height) {
                    over_sel
                        .style(vendor+'transform',
                               'translate(0px,' +
                                (-(over_sel_height - pageYOffset)) +
                                'px)');
                    translate_sel
                        .style(vendor+'transform',
                               'translate(0px,' +
                               (over_sel_height - pageYOffset) +
                               'px)');

                    fixed_sel
                        .style('opacity', opacity_fixed_scale(
                            translate_sel
                                .node()
                                .getBoundingClientRect()
                                .top));
                }
                var opacity_val =
                    opacity_background_scale(pageYOffset-
                                             over_sel_height);
                background_sel
                    .style('opacity', opacity_val)
                    .classed("active", (opacity_val > 0) ? 1: 0);


                if (pageYOffset > logo_container_offset) {
                    top_nav_sel.classed('nav-section--active',
                                        true);
                } else {
                    top_nav_sel.classed('nav-section--active',
                                        false);
                }
            })
            .on('resize.translate', function () {
                update_scroll_target_values();
            });
    };

    function update_scroll_target_values () {
        over_sel_height = get_over_sel_height();
        logo_container_offset = get_logo_container_offset();
    }

    function get_over_sel_height () {
        if (!over_sel) return 0;
        return over_sel.node()
                .getBoundingClientRect()
                .height;
    }

    function get_logo_container_offset () {
        return window.innerHeight;
    }


    

    return self;
};