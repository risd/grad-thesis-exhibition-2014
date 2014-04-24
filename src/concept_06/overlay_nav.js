module.exports = function nav () {
    var self = {},
        target_activate_pairs = [];

    self.targetActivatePairs = function (_) {
        if (!arguments.length) return target_activate_pairs;
        target_activate_pairs = _;
        return self;
    };

    self.setup = function () {
        if (!target_activate_pairs) throw "requires elements to pair";
        target_activate_pairs
            .on('click.nav', function (d, di) {
                console.log('clicked nav');
                var to_activate = d3.select(d.activate);
                
                to_activate.classed('overlaid', true);
            });
        target_activate_pairs.each(function (d, i) {
            var to_activate = d3.select(d.activate);

            to_activate.on('click.nav', function () {
                d3.select(this).classed('overlaid', false);
            });
        });
    };

    return self;
};