var html = require('./html');

module.exports = function concept_01 () {
    var self = {},
        svg,
        paths = {},
        window_sel = d3.select(window);

    var tween_dashs = {
        'hidden':  tween_dash_hide,
        'showing': tween_dash_show
    };
    var tween_dash_opposite = {
        'hidden':  tween_dash_show_reverse,
        'showing': tween_dash_hide_reverse
    };

    window_sel.on('scroll', function () {
        
    });
    
    self.dispatch = d3.dispatch('animateFirst', 'animateSecond');

    self.dispatch.on('animateFirst', function (transition_to_state) {
        
        paths.line.first
            .transition()
            .duration(2000)
            .ease('cubic-inout')
            .attrTween('stroke-dasharray',
                       tween_dashs[transition_to_state]);

        paths.hide_show.first.all
            .transition()
            .duration(800)
            .delay(1700)
            .style('opacity', 1);

        paths.logo.first.all
            .transition()
            .duration(2000)
            .ease('cubic-inout')
            .delay(function (d,i) {
                return i * 400;
            })
            .style('opacity', 1);

        d3.select('body').on('click', function () {
            self.dispatch.animateSecond('showing');
        });
    });

    self.dispatch.on('animateSecond', function (transition_to_state) {
        console.log('dispatched animateSecond');

        d3.select('body').on('click', null);

        paths.line.first
            .transition()
            .duration(1000)
            .attrTween('d',
                       pathTween(paths.line.second.attr('d')), 4);


        delete paths.logo.first['all'];
        for (var item in paths.logo.first) {
            paths.logo.first[item]
                .transition()
                .duration(1000)
                .attrTween('transform', function () {
                    return d3.interpolateString(
                        paths.logo.first[item].attr('transform'),
                        paths.logo.second[item].attr('transform'));
                });
        }
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_02/concept-2.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            paths.logo = {
                first: {
                    risd: svg.select('#home #logo '+
                                     'text:nth-child(1)'),
                    grad: svg.select('#home #logo '+
                                     'text:nth-child(2)'),
                    show: svg.select('#home #logo '+
                                     'text:nth-child(3)'),
                    year: svg.select('#home #logo '+
                                     'text:nth-child(4)'),
                    all: svg.selectAll('#home #logo '+
                                     'text:nth-child(1),'+
                                     '#home #logo '+
                                     'text:nth-child(2),'+
                                     '#home #logo '+
                                     'text:nth-child(3),'+
                                     '#home #logo '+
                                    'text:nth-child(4)')
                },
                second: {
                    risd: svg.select('#map #logo_1_ '+
                                     'text:nth-child(1)'),
                    grad: svg.select('#map #logo_1_ '+
                                     'text:nth-child(2)'),
                    show: svg.select('#map #logo_1_ '+
                                     'text:nth-child(3)'),
                    year: svg.select('#map #logo_1_ '+
                                     'text:nth-child(4)')
                }
            };

            for (var section in paths.logo) {
                for (var item in paths.logo[section]) {
                    paths.logo[section][item]
                        .style('opacity', 0);
                }
            }



            paths.line = {
                first: svg.select('#line_1_ path'),
                second: svg.select('#line path')
            };

            for (var cur in paths.line) {
                paths.line[cur].attr('stroke-dasharray',
                    '0,'+
                    paths.line[cur].node()
                        .getTotalLength());

                paths.line[cur].state = 'hidden';
            }

            

            paths.hide_show = {
                first: {
                    subhead: svg.select('#home #text_1_ '+
                                         'g:nth-child(1) text'),
                    date: svg.select('#home #text_1_ '+
                                     '> *:nth-child(6)'),
                    all: svg.selectAll('#home #text_1_ '+
                                     '> *:nth-child(6),' +
                                     '#home #text_1_ '+
                                      'g:nth-child(1) text')
                },
                second: {
                    loc_date: svg.select('#text > *:nth-child(6)'),
                    all: svg.select('#text > *:nth-child(6)')
                }
            };

            paths.hide_show.first.all.style('opacity', 0);
            paths.hide_show.second.all.style('opacity', 0);



            paths.map = {
                drop_pin: svg.select('#drop_pin'),
                text: svg.selectAll('#text > *:nth-child(2),' +
                                 '#text > *:nth-child(4)')
            };

            paths.map.drop_pin.attr('transform', 'scale(0)');
            paths.map.text.style('opacity', 0);


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

    function tween_dash_hide_reverse() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0,0," + l + "," + l,
                                     "0," + l + "0," + l);
        return function(t) { return i(t); };
    }

    function tween_dash_show_reverse() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l + "0," + l,
                                     "0,0," + l + "," + l);
        return function(t) { return i(t); };
    }

    function pathTween(d1, precision) {
      return function() {
        var path0 = this,
            path1 = path0.cloneNode(),
            n0 = path0.getTotalLength(),
            n1 = (path1.setAttribute("d", d1), path1).getTotalLength();
     
        // Uniform sampling of distance based on specified precision.
        var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
        while ((i += dt) < 1) distances.push(i);
        distances.push(1);
     
        // Compute point-interpolators at each distance.
        var points = distances.map(function(t) {
          var p0 = path0.getPointAtLength(t * n0),
              p1 = path1.getPointAtLength(t * n1);
          return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
        });
     
        return function(t) {
          return t < 1 ? "M" + points.map(function(p) { return p(t); }).join("L") : d1;
        };
      };
    }

    return self;
};