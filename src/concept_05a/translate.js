module.exports = function translate () {
    var self = {},
        // the selection that is being translated
        translated_sel,
        // the selection that is being translated over
        // this will determine the height that must be
        // scroll passed, before the translated_sel
        // is translated over
        over_sel,
        over_sel_height = 0;

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

    self.setup = function () {
        d3.select(window)
            .on('scroll.translate', function () {
                if (pageYOffset > over_sel_height) {
                    console.log(true);
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
            })
            .on('resize.translate', function () {
                over_sel_height = get_over_sel_height();
                console.log(over_sel_height);
            });

        console.log('over_sel_height');
        console.log(over_sel_height);
    };

    function get_over_sel_height () {
        if (!over_sel) return 0;
        return over_sel.node()
                .getBoundingClientRect()
                .height;
    }


    

    return self;
};