module.exports = function Map () {
    var self = {},
        map,
        paths_selection,
        state = 'hidden';

    self.paths = function (x) {
        if (!arguments.length) return paths_selection;
        paths_selection = x;
        return self;
    };

    self.state = function (x) {
        if (!arguments.length) return state;
        state = x;
        apply_state();
        return self;
    };

    function apply_state () {
        var tween_dashs = {
            'hidden':  tween_dash_hide,
            'showing': tween_dash_show
        };
        
        paths_selection
            .transition()
            .duration(500)
            .attrTween("stroke-dasharray", tween_dashs[state]);
    }

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

    console.log('------');
    console.log('Toggle map state:');
    console.log('exhibition.map.state("hidden")');
    console.log('exhibition.map.state("showing")');
    console.log('------');

    return self;
};