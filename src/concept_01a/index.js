var html = require('./html');

module.exports = function concept_01a () {
    var self = {},
        svg,
        paths,
        named_paths = {},
        named_text = {},
        window_sel = d3.select(window);

    var tween_dashs = {
        'hidden':  tween_dash_hide,
        'showing': tween_dash_show
    };
    
    self.dispatch = d3.dispatch('animateFirst', 'animateSecond');

    self.dispatch.on('animateFirst', function (transition_to_state) {
        console.log('dispatched animateFirst');
        
        named_paths['first-section']
            .transition()
            .duration(3000)
            .ease('cubic-inout')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);

        named_text['first-section']
            .transition()
            .duration(800)
            .delay(2700)
            .style('opacity', 1);

        named_paths['first-section'].state = transition_to_state;
    });

    window_sel.on('scroll', function () {
        var svg_bbox = svg.node().getBoundingClientRect(),
            path_bbox = named_paths['second-section'].node()
                            .getBoundingClientRect(),
            current_length = 0;

        if (svg_bbox.top  < 0) {
            current_length =
                named_paths['second-section']
                    .scale(window.innerHeight - path_bbox.top);
        }

        named_paths['second-section'].transition()
            .attr('stroke-dasharray',
                  current_length + ',' +
                  named_paths['second-section'].total_length);

        named_text['second-section']
            .transition()
            .style('opacity', (current_length/
                                named_paths['second-section']
                                    .total_length));
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                '/src/concept_01/concept-1.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            named_paths['first-section'] =
                svg.select('#line_1_ path');
            named_paths['second-section'] =
                svg.select('#line path');

            for (var path in named_paths) {
                var l = named_paths[path].node()
                                .getTotalLength(),
                    h = named_paths[path].node()
                                .getBoundingClientRect().height;

                named_paths[path].state = 'hidden';

                named_paths[path].attr('stroke-dasharray',
                                        '0,' + l );
                named_paths[path].total_length = l;
                named_paths[path].scale = d3.scale.linear()
                    .domain([0, h])
                    .range([0, l])
                    .clamp(true);
            }

            named_text['first-section'] =
                svg.selectAll('#home #text_2_');
            named_text['second-section'] =
                svg.selectAll('#map #text_1_, ' +
                              '#map #drop_pin');

            svg.selectAll('#map #land, ' +
                          '#map #street')
                .style('opacity', 1);

            for (var text in named_text) {
                named_text[text].style('opacity', 0);
            }

            self.dispatch.animateFirst('showing');
        });

        return self;
    };

    function tween_dash_hide() {
        var l = this.getTotalLength(),
            i = d3.interpolateString(l + "," + l, "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    return self;
};