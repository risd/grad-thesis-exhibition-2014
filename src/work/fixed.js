module.exports = function fixed () {
    // when container hits the top, switch that element to fixed
    // plus the additional padding

    var self = {},
        no_translate_sel,
        translate_sel,
        no_translate_distance = 0;

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    var transform_attr = vendor + 'transform';

    self.noTranslate = function (_) {
        if (!arguments.length) return no_translate_sel;
        no_translate_sel = _;
        return self;
    };

    self.translate = function (_) {
        if (!arguments.length) return translate_sel;
        translate_sel = _;
        return self;
    };

    self.top = function () {
        return no_translate_distance;
    };

    self.initialize = function () {
        calc_contraints();

        d3.select(window)
            .on('scroll.fixed', function () {
                if (window.innerWidth < 768) return;

                var translate_y = 0;

                if ((no_translate_distance - pageYOffset) < 0) {
                    translate_y = pageYOffset - no_translate_distance;
                }

                translate_sel
                    .style(
                        transform_attr,
                        'translate(0,' + translate_y + 'px)');
            })
            .on('resize.fixed', function () {
                if (window.innerWidth < 768) {
                    translate_sel
                        .style(
                            transform_attr,
                            'translate(0,0)');
                }
                calc_contraints();
            });
    };

    function calc_contraints () {
        var no_translate_margin =
                +no_translate_sel
                    .style('margin-top')
                    .split('p')[0];
        var no_translate_height =
                no_translate_sel
                    .node()
                    .getBoundingClientRect()
                    .height;
        no_translate_distance = no_translate_height +
                                no_translate_margin;
    }

    return self;
};