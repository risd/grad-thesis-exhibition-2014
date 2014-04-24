var Nav = require('./overlay_nav');

module.exports = function site () {
    var self = {},
        colors = ['purple', 'pink'];

    var nav = Nav();

    self.dispatch = d3.dispatch('htmlLoaded');

    self.render = function () {
        var body = d3.select('body');
        body.html('');

        var color = colors[Math.floor(Math.random() * colors.length)];

        body.classed('concept_06', true);
        body.classed(color, true);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_06/body.html', function (html) {

            body.node().appendChild(html.cloneNode(true))          ;
            self.dispatch.htmlLoaded();

            var pairs = d3.selectAll('.overlay-nav-item')
                .datum(function () { return this.dataset; });

            nav.targetActivatePairs(pairs)
                .setup();
        });
        return self;
    };

    return self;
};