(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <section id="about" class="about">' +
'        <hgroup class="title">' +
'            <h1 class="heading school">RISD</h1>' +
'            <h1 class="heading event">Grad Show</h1>' +
'        </hgroup>' +
'        <hgroup class="subtitle">' +
'            <h3 class="heading school">Rhode Island School of Design</h3>' +
'            <h3 class="heading event">Graduate Thesis Exhibition</h3>' +
'        </hgroup>' +
'        <p>Da. z show.</p>' +
'    </section>' +
'    <section id="where" class="where">' +
'        <div class="map">' +
'            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="500px"' +
'                 height="407.023px" viewBox="0 0 500 407.023" enable-background="new 0 0 500 407.023" xml:space="preserve">' +
'            <defs>' +
'                <marker id="marker-poi" class="marker-poi"  viewBox="0 0 50 50" markerWidth="50" markerHeight="50" markerUnits="userSpaceonUse" refX="25" refY="25">' +
'                    <polygon points="31.338,16.828 45.657,11.38 50,24.455 35.446,29.176 45.423,41.283 34.39,50 25,37.045 15.611,50 4.578,41.283 ' +
'                        14.554,29.176 0,24.455 4.343,11.38 18.662,16.828 18.31,0 31.691,0 "/>' +
'                </marker>' +
'            </defs>' +
'            <g class="streets">' +
'                <path d="M0,81.404c0,0,51.334,2.84,68.372,8.046s62.947,15.146,62.947,15.146' +
'                    s51.115,8.52,79.512-0.947c28.397-9.465,129.68-54.902,129.68-54.902s39.756-8.52,68.626,7.572l53.008,51.115' +
'                    c0,0,16.566,28.87,21.299,42.596c4.732,13.725,11.832,24.389,12.778,41.064s0,51.699,0,51.699S500,274.502,500,282.074' +
'                    s-4.725,36.443-5.198,47.328c-0.474,10.887-1.42,48.275-1.42,48.275s3.313,23.668,3.313,29.346"/>' +
'                <path d="M107.182,0L41.869,239.48c0,0-20.352,66.734-5.68,114.535' +
'                    c14.672,47.803,21.771,53.008,21.771,53.008"/>' +
'                <path d="M31.072,304.764l59.261-25.336l50.667-28l70.667-84.001c0,0,4.667-10.667,27.333-22' +
'                    s63.333-28,63.333-28l65.333-31.333l34.356-33.182"/>' +
'                <path d="M221.667,0c0,0-3.333,41.426-5.119,58.093s3.786,35.333,3.786,35.333s1.333,12.667,18.667,40' +
'                    c17.333,27.334,3.333,37.334,3.333,37.334l-22,22.584L199,223.426c0,0-26.667,39.334-29.333,42.668s-15.333,14-29.333,6.666' +
'                    s-22,0-22,0s-7.333,4-22.667,10.666c-15.333,6.668-39.781,10.729-39.781,10.729"/>' +
'                <path d="M67.702,144.758l16.147,6.724c0,0,14.797,4.337,30.87,2.093l76.026-1.582l25.802,1.582' +
'                    l24.712-1.328c0,0,4.454-0.033,8.74-2.758c1.603-1.018,3.761,0.207,7.843,1.738l13.011,2.992l31.381,8.232' +
'                    c0,0,13.266,1.276,20.92,10.971s31.381,32.145,31.381,32.145l38.522,40.564l33.166,33.678l25.257,22.705l25.768,22.961' +
'                    l17.147,15.564"/>' +
'            </g>' +
'            <g class="poi">' +
'                <path d="M194.96,167.895"/>' +
'            </g>' +
'            </svg>' +
'        </div>' +
'        <div class="location-written">' +
'            <div class="building">' +
'                <p>RI Convention Center</p>' +
'                <p>Exhibit Hall A</p>' +
'                <p>One Sabin Street, Providence</p>' +
'            </div>' +
'        </div>' +
'    </section>' +
'</div>';
},{}],2:[function(require,module,exports){
var html = require('./html'),
    SVGMap = require('./map')();

module.exports = function concept_01 () {
    var self = {
        map: undefined
    };

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        // load the map
        self.map = SVGMap.paths(d3.selectAll('.streets path'));
        return self;
    };

    return self;
};
},{"./html":1,"./map":3}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'</div>';
},{}],5:[function(require,module,exports){
var html = require('./html');

module.exports = function concept_01 () {
    var self = {},
        svg,
        paths,
        pois = {},
        named_paths = {},
        named_text = {},
        window_sel = d3.select(window);

    var tween_dashs = {
        'hidden':  tween_dash_hide,
        'showing': tween_dash_show
    };

    window_sel.on('scroll', function () {
        var poi_bbox = pois['convention-center-marker']
                            .node()
                            .getBoundingClientRect();

        var poi_relationship_to_window =
            poi_bbox.top - window.innerHeight;

        if ((named_paths['second-section'].state === 'hidden') &
            (poi_relationship_to_window < 0)) {

            self.dispatch.animateSecond('showing');
        } else if ((named_paths['second-section']
                                    .state === 'showing') &
                   (poi_relationship_to_window > 0)) {

            self.dispatch.animateSecond('hidden');
        }
    });
    
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

    self.dispatch.on('animateSecond',
                     function (transition_to_state) {
        named_paths['second-section']
            .transition()
            .duration(3000)
            .ease('cubic-inout')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);

        named_paths['second-section'].state = transition_to_state;

        named_text['second-section']
            .transition()
            .duration(800)
            .delay(2700)
            .style('opacity',
                (transition_to_state === 'hidden') ? 0 : 1);
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_01/concept-1.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            named_paths['first-section'] =
                svg.select('#line_1_ path');
            named_paths['second-section'] =
                svg.select('#line path');

            named_paths['first-section'].state = 'hidden';
            named_paths['second-section'].state = 'hidden';

            named_paths['first-section'].attr('stroke-dasharray',
                '0,' +
                named_paths['first-section'].node()
                                            .getTotalLength());
            named_paths['second-section'].attr('stroke-dasharray',
                '0,' +
                named_paths['second-section'].node()
                                            .getTotalLength());


            pois['convention-center-marker'] =
                svg.select('#drop_pin path');


            named_text['first-section'] =
                svg.selectAll('#home #text_2_');
            named_text['first-section'].style('opacity', 0);

            named_text['second-section'] =
                svg.selectAll('#map #text_1_, ' +
                              '#map #land, ' +
                              '#map #street, ' +
                              '#map #drop_pin');
            named_text['second-section'].style('opacity', 0);


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
},{"./html":4}],6:[function(require,module,exports){
module.exports=require(4)
},{}],7:[function(require,module,exports){
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
                'src/concept_01/concept-1.svg',
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
},{"./html":6}],8:[function(require,module,exports){
module.exports=require(4)
},{}],9:[function(require,module,exports){
var html = require('./html');

module.exports = function concept_01 () {
    var self = {},
        svg,
        paths,
        named_paths = {},
        named_text = {},
        logos = {},
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
        console.log('dispatched animateFirst');
        
        named_paths['first-section']
            .transition()
            .duration(2000)
            .ease('cubic-inout')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);

        named_text['first-section']
            .transition()
            .duration(800)
            .delay(1700)
            .style('opacity', 1);

        logos['first-section']
            .transition()
            .duration(2000)
            .delay(function (d, i) {
                return i * 400;
            })
            .style('opacity', 1);


        named_paths['first-section'].state = transition_to_state;

        setTimeout(function () {
            self.dispatch.animateSecond('showing');
        }, 3000);
    });

    self.dispatch.on('animateSecond', function (transition_to_state) {
        console.log('dispatched animateSecond');

        named_paths['first-section']
            .transition()
            .duration(2000)
            .ease('cubic-in')
            .attrTween('stroke-dasharray',
                  tween_dash_opposite[transition_to_state]);

        logos['first-section']
            .transition()
            .duration(2000)
            .ease('cubic-out')
            .delay(function (d, i) {
                return i * 400;
            })
            .style('opacity', 0);

        logos['second-section']
            .transition()
            .duration(2000)
            .ease('cubic-in')
            .delay(function (d, i) {
                return i * 400;
            })
            .style('opacity', 1);

        named_paths['second-section']
            .transition()
            .duration(2000)
            .ease('cubic-in')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);


        named_text['first-section']
            .transition()
            .duration(1800)
            .delay(function (d, i) {
                return i * 400;
            })
            .ease('cubic-out')
            .style('opacity', 0);

        named_text['second-section']
            .transition()
            .duration(1800)
            .delay(function (d, i) {
                return i * 400;
            })
            .ease('cubic-in')
            .style('opacity', 1);




        named_paths['second-section'].state = transition_to_state;
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

            named_paths['first-section'] =
                            svg.select('#line_1_ path');
            named_paths['second-section'] =
                svg.select('#line path');

            named_paths['first-section'].state = 'hidden';
            named_paths['second-section'].state = 'hidden';

            named_paths['first-section'].attr('stroke-dasharray',
                '0,' +
                named_paths['first-section'].node()
                                            .getTotalLength());
            named_paths['second-section'].attr('stroke-dasharray',
                '0,' +
                named_paths['second-section'].node()
                                            .getTotalLength());

            named_text['first-section'] =
                svg.selectAll('#home #text_1_');
            named_text['first-section'].style('opacity', 0);

            named_text['second-section'] =
                svg.selectAll('#map #text, ' +
                              '#map #land, ' +
                              '#map #street, ' +
                              '#map #drop_pin');
            named_text['second-section'].style('opacity', 0);

            logos['first-section'] =
                svg.selectAll('#logo text');
            logos['second-section'] =
                svg.selectAll('#logo_1_ text');

            logos['first-section'].style('opacity', 0);
            logos['second-section'].style('opacity', 0);

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

    return self;
};
},{"./html":8}],10:[function(require,module,exports){
module.exports=require(4)
},{}],11:[function(require,module,exports){
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
},{"./html":10}],12:[function(require,module,exports){
module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel,
        logo_container_sel,
        logo_sel,
        logo_components = [{
            text: 'RISD',
            cls: 'logo-component--risd'
        }, {
            text: 'Grad',
            cls: 'logo-component--grad'
        }, {
            text: 'Show',
            cls: 'logo-component--show'
        }, {
            text: '2014',
            cls: 'logo-component--2014'
        }],
        logo_svg,
        logo_line,
        line = d3.svg.line();

    window_sel.on('resize', function () {
        logo_svg
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);

        update_logo_line();
    });

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04', true)
            .html('');


        logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .text(function (d) {
                return d.text;
            });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        logo_line = logo_svg.selectAll('path')
            .data([logo_verticies()])
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', line);

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
        });

        return self;
    };

    function update_logo_line () {
        var verticies = [logo_verticies()];
        logo_line.data(verticies);
        logo_line.attr('d', line);
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        logo_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            if (i === 0) {
                logo_line_verticies.push(
                    [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))]);
            } else {
                logo_line_verticies.push(
                    [bounds.left - 10,
                     (bounds.top + (bounds.height*(2/3)))]);
            }

            logo_line_verticies.push(
                [bounds.right + 10,
                 (bounds.top + (bounds.height*(2/3)))]);

        });
        return logo_line_verticies;
    }

    return self;
};
},{}],13:[function(require,module,exports){
// requires d3

// pass it a container, whose relationship to the bottom
// of the window you'd like to know. and if its container
// has a margin bottom, pass that in as
// additional_margin_bottom_sel.

// will self.dispatch will dispatch the message 'bottom'
// when the container is at the bottom of the window
// it sets the `dirty` flag to true.

// else where, grab more data, and then reset
// the `dirty` flag to false.

module.exports = function bottom () {
    var self = {},
        dirty = false,
        additional_margin_bottom = 0,
        additional_margin_bottom_sel,
        container_sel;

    self.dispatch = d3.dispatch('bottom');

    d3.select(window)
        .on('resize.bottom', function () {
            if (!additional_margin_bottom_sel) return;

            additional_margin_bottom =
                +additional_margin_bottom_sel
                    .style('margin-bottom')
                    .split('p')[0];
        })
        .on('scroll.bottom', function () {
            if (!container_sel) return;
            if (dirty) return;

            var cbox = container_sel.node().getBoundingClientRect();

            if ((cbox.bottom + additional_margin_bottom) <=
                (window.innerHeight)) {

                dirty = true;
                self.dispatch.bottom();
            }
        });

    self.additionalMarginBottomSel = function (_) {
        if (!arguments.length) return additional_margin_bottom_sel;
        additional_margin_bottom_sel = _;

        // side effect of updating
        additional_margin_bottom =
            +additional_margin_bottom_sel
                .style('margin-bottom')
                .split('p')[0];

        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.dirty = function (_) {
        if (!arguments.length) return dirty;
        dirty = _;
        return self;
    };

    return self;
};
},{}],14:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04a', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":78,"./logo":15,"./work":16}],15:[function(require,module,exports){
module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        logo_container_sel,
        logo_sel,
        logo_components = [{
            text: 'RISD',
            cls: 'logo-component--risd'
        }, {
            text: 'Grad',
            cls: 'logo-component--grad'
        }, {
            text: 'Show',
            cls: 'logo-component--show'
        }, {
            text: '2014',
            cls: 'logo-component--2014'
        }],
        logo_svg,
        logo_line,
        line = d3.svg.line();

    window_sel.on('resize.logo', function () {
        logo_svg
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);

        update_logo_line();
    });

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.render = function () {
        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .text(function (d) {
                return d.text;
            });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        logo_line = logo_svg.selectAll('path')
            .data([logo_verticies()])
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', line);
    };

    function update_logo_line () {
        var verticies = [logo_verticies()];
        logo_line.data(verticies);
        logo_line.attr('d', line);
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        logo_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            if (i === 0) {
                logo_line_verticies.push(
                    [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))]);
            } else {
                logo_line_verticies.push(
                    [bounds.left - 10,
                     (bounds.top + (bounds.height*(2/3)))]);
            }

            logo_line_verticies.push(
                [bounds.right + 10,
                 (bounds.top + (bounds.height*(2/3)))]);

        });
        return logo_line_verticies;
    }

    return self;
};
},{}],16:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('../concept_04b/lightbox_zoom_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 10;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return d.cover.height + masonic_gutter;
        })
        .columnWidth(202 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program) + " " +
                        d.cover.clss;
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {
        var cover_options = ['202', '404'];
        var cover_dimensions = {
            'cover115': {
                width: 115,
                height: 90
            },
            'cover202': {
                width: 202,
                height: 158
            },
            'cover230': {
                width: 230,
                height: 180
            },
            'cover404': {
                width: (404 + masonic_gutter),
                height: (316 + masonic_gutter)
            }
        };

        var formatted_work = [];

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            var random_cover_option =
                cover_options[Math.floor(Math.random() *
                                   cover_options.length)];

            var random_cover = {
                width: cover_dimensions[
                            'cover'+random_cover_option].width,
                height: cover_dimensions[
                            'cover'+random_cover_option].height,
                src: d.covers[random_cover_option],
                clss: 'cover'+random_cover_option
            };

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"../concept_04b/lightbox_zoom_up":19,"./bottom":13}],17:[function(require,module,exports){
module.exports=require(13)
},{}],18:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04b', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04b/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":78,"./logo":20,"./work":21}],19:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        original_container,
        lightbox_sel,
        lightbox_img_sel,
        selected_sel,
        to_transition = {
            div: {
                start: {
                    position: 'fixed'
                },
                end: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    '-webkit-transform': 'matrix(1,0,0,1,0,0)',
                    width: window.innerWidth + 'px',
                    height: window.innerHeight + 'px'
                }
            },
            img: {
                start: {
                    top: '0px',
                    left: '0px'
                },
                end: {
                    width: 600 + 'px'
                }
            }
        };

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            console.log('clicked lightbox');
            close();
        });
    });

    self.originalContainer = function (_) {
        if (!arguments.length) return original_container;
        original_container = _;
        return self;
    };
    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var original_container_box =
            original_container
                .node()
                .getBoundingClientRect();

        var copy = sel.node().cloneNode(true);
        var copy_sel = d3.select(copy);

        var lightbox_copy = container.node().appendChild(copy);
        lightbox_sel = container.select('.piece');
        lightbox_img_sel = lightbox_sel.select('img');


        to_transition.div.start.width = sel.style('width');

        to_transition.div.start.height = sel.style('height');
        to_transition.div.start.top =
            (+sel
                .style('top')
                .split('p')[0] +
            original_container_box.top) + 'px';
        to_transition.div.start.left =
            (+sel
                .style('left')
                .split('p')[0] +
            original_container_box.left) + 'px';
        to_transition.div.start['-webkit-transform'] =
            sel.style('-webkit-transform');


        to_transition.img.start.width =
            lightbox_img_sel
                 .style('width');
        to_transition.img.start.height =
            lightbox_img_sel
                 .style('height');


        var data = sel.datum();


        container.classed('active', true);

        lightbox_sel
            .style(to_transition.div.start);

        d3.transition()
            .duration(280)
            .each('start', function () {
                selected_sel.style('display', 'none');
            })
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.end);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.start);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
            });
    }

    return self;
};
},{}],20:[function(require,module,exports){
module.exports=require(15)
},{}],21:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_zoom_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = -20;

    self.dispatch = d3.dispatch('dataLoaded');

    
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    // deal with window bottom loading more
    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window


    var masonic = d3.masonic()
        .width(function (d) {
            return d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return d.cover.height + masonic_gutter;
        })
        .columnWidth(202 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program) + " " +
                        d.cover.clss;
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {
        var cover_options = ['202', '404'];
        var cover_dimensions = {
            'cover115': {
                width: 115,
                height: 90
            },
            'cover202': {
                width: 202,
                height: 158
            },
            'cover230': {
                width: 230,
                height: 180
            },
            'cover404': {
                width: (404 + masonic_gutter),
                height: (316 + masonic_gutter)
            }
        };

        var formatted_work = [];

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            var random_cover_option =
                cover_options[Math.floor(Math.random() *
                                   cover_options.length)];

            var random_cover = {
                width: cover_dimensions[
                            'cover'+random_cover_option].width,
                height: cover_dimensions[
                            'cover'+random_cover_option].height,
                src: d.covers[random_cover_option],
                clss: 'cover'+random_cover_option
            };

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":17,"./lightbox_zoom_up":19}],22:[function(require,module,exports){
module.exports=require(13)
},{}],23:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04a concept_04c', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":78,"./logo":25,"./work":26}],24:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        original_container,
        lightbox_sel,
        lightbox_img_sel,
        selected_sel,
        to_transition = {
            div: {
                start: {
                    position: 'fixed'
                },
                end: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    '-webkit-transform': 'matrix(1,0,0,1,0,0)',
                    width: window.innerWidth + 'px',
                    height: window.innerHeight + 'px'
                }
            },
            img: {
                start: {
                    top: '0px',
                    left: '0px'
                },
                end: {}
            }
        },
        calc_to_transition_img = function (d) {
            to_transition.img.start.width = d.width + 'px';
            to_transition.img.start.height = d.height + 'px';

            to_transition.img.end.width = d.original_width + 'px';
            to_transition.img.end.height = d.original_height + 'px';


            if (d.original_height > window.innerHeight) {
                to_transition.img.end.top = '0px';
            } else {
                to_transition.img.end.top =
                    ((window.innerHeight -
                      d.original_height) / 2) + 'px';
            }

            if (d.original_width > window.innerWidth) {
                to_transition.img.end.left = '0px';
            } else {
                to_transition.img.end.left =
                    ((window.innerWidth -
                      d.original_width) / 2) + 'px';
            }
        };

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.originalContainer = function (_) {
        if (!arguments.length) return original_container;
        original_container = _;
        return self;
    };
    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var original_container_box =
            original_container
                .node()
                .getBoundingClientRect();

        var copy = sel.node().cloneNode(true);
        var copy_sel = d3.select(copy);

        var lightbox_copy = container.node().appendChild(copy);
        lightbox_sel = container.select('.piece');
        lightbox_img_sel = lightbox_sel.select('img');


        to_transition.div.start.width = sel.style('width');

        to_transition.div.start.height = sel.style('height');
        to_transition.div.start.top =
            (+sel
                .style('top')
                .split('p')[0] +
            original_container_box.top) + 'px';
        to_transition.div.start.left =
            (+sel
                .style('left')
                .split('p')[0] +
            original_container_box.left) + 'px';
        to_transition.div.start['-webkit-transform'] =
            sel.style('-webkit-transform');


        var data = sel.datum();

        calc_to_transition_img(data.cover);


        container.classed('active', true);

        lightbox_img_sel
            .style(to_transition.img.start);
        lightbox_sel
            .style(to_transition.div.start);

        console.log(to_transition.div);

        d3.transition()
            .duration(280)
            .each('start', function () {
                selected_sel.style('display', 'none');
            })
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.end);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.start);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
            });
    }

    return self;
};
},{}],25:[function(require,module,exports){
module.exports=require(15)
},{}],26:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_zoom_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 20;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return +d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return +d.cover.height + masonic_gutter;
        })
        .columnWidth(200 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);

        window.widths = widths;

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module =
                modules_to_include[Math.floor(Math.random() *
                                   modules_to_include.length)];

            var random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":22,"./lightbox_zoom_up":24}],27:[function(require,module,exports){
module.exports=require(13)
},{}],28:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04d', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":78,"./logo":30,"./work":31}],29:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        original_container,
        lightbox_sel,
        lightbox_img_sel,
        selected_sel,
        to_transition = {
            div: {
                start: {
                    position: 'fixed'
                },
                end: {
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    '-webkit-transform': 'matrix(1,0,0,1,0,0)',
                    width: window.innerWidth + 'px',
                    height: window.innerHeight + 'px'
                }
            },
            img: {
                start: {
                    top: '0px',
                    left: '0px'
                },
                end: {}
            },
            container: {
                start: {
                    'background-color': 'rgba(38, 34, 98, 0)'
                },
                end: {
                    'background-color': 'rgba(38, 34, 98, 0.8)'
                }
            }
        },
        calc_to_transition_img = function (d) {
            to_transition.img.start.width = d.width + 'px';
            to_transition.img.start.height = d.height + 'px';

            to_transition.img.end.width = d.original_width + 'px';
            to_transition.img.end.height = d.original_height + 'px';


            if (d.original_height > window.innerHeight) {
                to_transition.img.end.top = '0px';
            } else {
                to_transition.img.end.top =
                    ((window.innerHeight -
                      d.original_height) / 2) + 'px';
            }

            if (d.original_width > window.innerWidth) {
                to_transition.img.end.left = '0px';
            } else {
                to_transition.img.end.left =
                    ((window.innerWidth -
                      d.original_width) / 2) + 'px';
            }
        };

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.originalContainer = function (_) {
        if (!arguments.length) return original_container;
        original_container = _;
        return self;
    };
    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var original_container_box =
            original_container
                .node()
                .getBoundingClientRect();

        var copy = sel.node().cloneNode(true);
        var copy_sel = d3.select(copy);

        var lightbox_copy = container.node().appendChild(copy);
        lightbox_sel = container.select('.piece');
        lightbox_img_sel = lightbox_sel.select('img');


        to_transition.div.start.width = sel.style('width');

        to_transition.div.start.height = sel.style('height');
        to_transition.div.start.top =
            (+sel
                .style('top')
                .split('p')[0] +
            original_container_box.top) + 'px';
        to_transition.div.start.left =
            (+sel
                .style('left')
                .split('p')[0] +
            original_container_box.left) + 'px';
        to_transition.div.start['-webkit-transform'] =
            sel.style('-webkit-transform');


        var data = sel.datum();

        calc_to_transition_img(data.cover);


        container.classed('active', true);

        lightbox_img_sel
            .style(to_transition.img.start);
        lightbox_sel
            .style(to_transition.div.start);
        container
            .style(to_transition.container.start);

        console.log(to_transition.div);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each('start', function () {
                selected_sel.style('display', 'none');
            })
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.end);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.end);

                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                lightbox_sel
                    .transition()
                    .style(to_transition.div.start);

                lightbox_img_sel
                    .transition()
                    .style(to_transition.img.start);

                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
            });
    }

    return self;
};
},{}],30:[function(require,module,exports){
module.exports=require(15)
},{}],31:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 20;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return +d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return +d.cover.height + masonic_gutter;
        })
        .columnWidth(200 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true)
            .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);

        window.widths = widths;

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module =
                modules_to_include[Math.floor(Math.random() *
                                   modules_to_include.length)];

            var random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":27,"./lightbox_fade_up":29}],32:[function(require,module,exports){
module.exports=require(13)
},{}],33:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04d', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04e/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":78,"./logo":35,"./work":36}],34:[function(require,module,exports){
module.exports=require(29)
},{}],35:[function(require,module,exports){
module.exports=require(15)
},{}],36:[function(require,module,exports){
module.exports=require(31)
},{"./bottom":32,"./lightbox_fade_up":34}],37:[function(require,module,exports){
module.exports=require(13)
},{}],38:[function(require,module,exports){
var Departments = require('../departments'),
    Work = require('./work'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04g', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel)
            .render();

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_04g/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
       // departments
           // .wrapper(d3.select('.departments'))
           // .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');
        work.lightbox
            .container(lightbox_container)
            .originalContainer(d3.select('.work'));

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        work.container(d3.select('.work'))
            .render();
    });

    return self;
};
},{"../departments":78,"./logo":39,"./work":40}],39:[function(require,module,exports){
module.exports=require(15)
},{}],40:[function(require,module,exports){
module.exports=require(16)
},{"../concept_04b/lightbox_zoom_up":19,"./bottom":37}],41:[function(require,module,exports){
var Departments = require('../departments'),
    Logo = require('./logo');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid'))
            .render();
    });

    return self;
};
},{"../departments":78,"./logo":42}],42:[function(require,module,exports){
var logoComponents = require('./logo_components');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
        logo_svg,
        logo_line,
        line = d3.svg.line(),
        transitionable = true;

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true);

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            update_logo_line();


            // update logo components per window
            if (logo_sel) {
                logo_sel.data.each(function (d) {
                    var updated = d.rules(window_width,
                                          window_height);

                    d.start = updated.start;
                    d.end = updated.end;
                    d.interpolator =
                        add_interpolator(updated)
                            .interpolator;

                    console.log(d);
                });
            }
        })
        .on('scroll.logo', function () {
            if (transitionable) {
                console.log(window.scrollY);
                update_logo_components(
                    scroll_scale(
                        window.scrollY));
                update_logo_line();
            }
        });

    self.scrollOverSel = function (_) {
        if (!arguments.length) return scroll_over_sel;
        scroll_over_sel = _;
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.render = function () {
        // update logo components per window
        var window_width = window.innerWidth,
            window_height = window.innerHeight;
        logo_components.forEach(function (d, i) {
            var updated = d.rules(window_width,
                                  window_height);

            d.start = updated.start;
            d.end = updated.end;
            d.interpolator =
                add_interpolator(updated)
                    .interpolator;

            console.log(d);
        });

        distance_to_scroll = calc_distance_to_scroll();
        scroll_scale.domain([0, distance_to_scroll]);

        update_logo_components(
            scroll_scale(
                window.scrollY));


        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .style('top', function (d) {
                return d.start.top;
            })
            .style('bottom', function (d) {
                return d.start.bottom;
            })
            .style('left', function (d) {
                return d.start.left;
            })
            .style('right', function (d) {
                return d.start.right;
            })
            .style('font-size', function (d) {
                return d.start['font-size'];
            })
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
        });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        logo_line = logo_svg.selectAll('path')
            .data([logo_verticies()])
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', line);
    };

    function update_logo_components (percent_progress) {
        console.log(percent_progress);
        if (!logo_sel) return;
        logo_sel
            .style('top', function (d) {
                return d.interpolator.top(percent_progress);
            })
            .style('bottom', function (d) {
                return d.interpolator.bottom(percent_progress);
            })
            .style('left', function (d) {
                return d.interpolator.left(percent_progress);
            })
            .style('right', function (d) {
                return d.interpolator.right(percent_progress);
            })
            .style('font-size', function (d) {
                return d.interpolator
                        ['font-size'](percent_progress);
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = [logo_verticies()];
        logo_line.data(verticies);
        logo_line.attr('d', line);
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        logo_line_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            if (i === 0) {
                logo_line_verticies.push(
                    [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))]);
            } else {
                logo_line_verticies.push(
                    [bounds.left - 10,
                     (bounds.top + (bounds.height*(2/3)))]);
            }

            logo_line_verticies.push(
                [bounds.right + 10,
                 (bounds.top + (bounds.height*(2/3)))]);

        });
        return logo_line_verticies;
    }

    function calc_distance_to_scroll () {
        var scrolling_distance = window.innerHeight;
        scroll_over_sel.style('margin-top', scrolling_distance +
                                            'px');
        return scrolling_distance;
    }

    function add_interpolator (states) {
        states.interpolator = {};
        for (var key in states.start) {
            states.interpolator[key] =
                d3.interpolateString(
                    states.start[key],
                    states.end[key]);
                
        }
        return states;
    }

    return self;
};
},{"./logo_components":43}],43:[function(require,module,exports){
module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left',
    start: {
        top: '30%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Grad',
    cls: 'logo-component--grad text-left',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Show',
    cls: 'logo-component--show text-right',
    type: 'line',
    start: {
        top: 'auto',
        bottom: '60%',
        left: 'auto',
        right: '30%',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: 'auto',
        bottom: '50%',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: 'auto',
                bottom: (height * 0.6) + 'px',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: 'auto',
                bottom: (height * 0.5) + 'px',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: '2014',
    cls: 'logo-component--2014 text-right',
    type: 'line',
    start: {
        top: 'auto',
        bottom: '40%',
        left: 'auto',
        right: '30%',
        'font-size': '50px',
        'line-height': '50px'
    },
    end: {
        top: 'auto',
        bottom: '50px',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: 'auto',
                bottom: (height * 0.4) + 'px',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '50px',
                'line-height': '50px'
            },
            end: {
                top: 'auto',
                bottom: '50px',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Rhode Island School of Design<br>'+
          'Annual Grad Thesis Exhibition',
    cls: 'logo-component--subheadline text-left',
    type: 'subsidiary',
    start: {
        top: '50%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '60%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}];
},{}],44:[function(require,module,exports){
module.exports=require(13)
},{}],45:[function(require,module,exports){
var Departments = require('../departments'),
    Logo = require('./logo'),
    Work = require('./work'),
    Translate = require('./translate');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);
    var translate = Translate();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05a', true)
            .classed('full-width-work', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid-wrapper');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid'))
            .render();

        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        var work_background_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work-background');

        var work_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work');
        work.container(work_sel)
            .render();

            
        work.lightbox
            .container(lightbox_container);


        translate
            .translated(work_sel)
            .over(d3.select('.grid'))
            .background(work_background_sel)
            .setup();
    });

    return self;
};
},{"../departments":78,"./logo":47,"./translate":49,"./work":50}],46:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        selected_sel,
        to_transition = {
            container: {
                start: {
                    'background-color': 'rgba(239, 65, 54, 0)',
                    opacity: 0
                },
                end: {
                    'background-color': 'rgba(239, 65, 54, 0.9)',
                    opacity: 1
                }
            }
        },
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var data = sel.datum();
        console.log('data');
        console.log(data);
        console.log('data.modules');
        console.log(data.modules);

        var lightbox_grid_sel = container
            .append('div')
            .attr('class', 'grid');

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta col-2-10');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-work offset-2-10 col-8-10');

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        lightbox_work_sel
            .append('p')
            .attr('class', 'lightbox-description')
            .text(data.description);

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .append('img')
            .attr('src', function (d) {
                return d.sizes.max_1240 ? d.sizes.max_1240 : d.src;
            });

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('img')
            .attr('src', data.avatar);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        lightbox_meta_info_sel
            .append('a')
            .attr('class', 'lightbox-meta-info--personal-link')
            .attr('href', data.url)
            .text('Behance');


        container
            .style(to_transition.container.start);

        container.classed('active', true);
        body_sel.classed('lightbox-open', true);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
                body_sel.classed('lightbox-open', false);
            });
    }

    return self;
};
},{}],47:[function(require,module,exports){
var logoComponents = require('./logo_components');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
        logo_svg,
        logo_line,
        line = d3.svg.line();

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true),
        prev_scroll_progress = 0;

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            // update logo components per window
            if (logo_sel) {
                logo_sel.each(function (d) {
                    var updated = d.rules(window_width,
                                          window_height);

                    d.start = updated.start;
                    d.end = updated.end;
                    d.interpolator =
                        add_interpolator(updated)
                            .interpolator;

                    console.log(d);
                });
            }
            update_logo_components(prev_scroll_progress);
            update_logo_line();
        })
        .on('scroll.logo', function () {
            var scroll_progress = scroll_scale(window.scrollY);
            if (scroll_progress != prev_scroll_progress) {
                update_logo_components(scroll_progress);
                update_logo_line();
            }
            prev_scroll_progress = scroll_progress;
        });

    self.scrollOverSel = function (_) {
        if (!arguments.length) return scroll_over_sel;
        scroll_over_sel = _;
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.render = function () {
        // update logo components per window
        var window_width = window.innerWidth,
            window_height = window.innerHeight;
        logo_components.forEach(function (d, i) {
            var updated = d.rules(window_width,
                                  window_height);

            d.start = updated.start;
            d.end = updated.end;
            d.interpolator =
                add_interpolator(updated)
                    .interpolator;

            console.log(d);
        });

        distance_to_scroll = calc_distance_to_scroll();
        scroll_scale.domain([0, distance_to_scroll]);

        update_logo_components(
            scroll_scale(
                window.scrollY));


        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .style('top', function (d) {
                return d.start.top;
            })
            .style('bottom', function (d) {
                return d.start.bottom;
            })
            .style('left', function (d) {
                return d.start.left;
            })
            .style('right', function (d) {
                return d.start.right;
            })
            .style('font-size', function (d) {
                return d.start['font-size'];
            })
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
        });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        logo_line = logo_svg.selectAll('path')
            .data([logo_verticies()])
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', line);
    };

    function update_logo_components (percent_progress) {
        console.log(percent_progress);
        if (!logo_sel) return;
        logo_sel
            .style('top', function (d) {
                return d.interpolator.top(percent_progress);
            })
            .style('bottom', function (d) {
                return d.interpolator.bottom(percent_progress);
            })
            .style('left', function (d) {
                return d.interpolator.left(percent_progress);
            })
            .style('right', function (d) {
                return d.interpolator.right(percent_progress);
            })
            .style('font-size', function (d) {
                return d.interpolator
                        ['font-size'](percent_progress);
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = [logo_verticies()];
        logo_line.data(verticies);
        logo_line.attr('d', line);
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        logo_line_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            if (i === 0) {
                logo_line_verticies.push(
                    [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))]);
            } else {
                logo_line_verticies.push(
                    [bounds.left - 10,
                     (bounds.top + (bounds.height*(2/3)))]);
            }

            logo_line_verticies.push(
                [bounds.right + 10,
                 (bounds.top + (bounds.height*(2/3)))]);

        });
        return logo_line_verticies;
    }

    function calc_distance_to_scroll () {
        var scrolling_distance = window.innerHeight;
        scroll_over_sel.style('margin-top', scrolling_distance +
                                            'px');
        return scrolling_distance;
    }

    function add_interpolator (states) {
        states.interpolator = {};
        for (var key in states.start) {
            states.interpolator[key] =
                d3.interpolateString(
                    states.start[key],
                    states.end[key]);
                
        }
        return states;
    }

    return self;
};
},{"./logo_components":48}],48:[function(require,module,exports){
module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left logo-component--title',
    start: {
        top: '30%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Grad',
    cls: 'logo-component--grad text-left logo-component--title',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Show',
    cls: 'logo-component--show text-right logo-component--title',
    type: 'line',
    start: {
        top: '45%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '50%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.45) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: '2014',
    cls: 'logo-component--2014 text-right logo-component--title',
    type: 'line',
    start: {
        top: '60%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '95%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height - 80) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Rhode Island School of Design<br>'+
          'Annual Grad Thesis Exhibition',
    cls: 'logo-component--subheadline text-left',
    type: 'subsidiary',
    start: {
        top: '50%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '60%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.5) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: 'RI Convention Center<br>'+
          'Exhibition Hall A<br>' +
          'One Sabin Street, Providence<br><br>' +
          'Open 12–5pm Daily<br>'+
          'May 16–31',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
    start: {
        top: '30%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: '<svg>' +
          '</svg>',
    cls: 'logo-component--asterisk text-left',
    type: 'subsidiary',
    start: {
        top: '30%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}];
},{}],49:[function(require,module,exports){
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
},{}],50:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 120;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    d3.select(window)
        .on('resize.work', function () {
            resize_masonic();
        });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return +d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return +d.cover.height + masonic_gutter;
        })
        .columnWidth(200 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true);
            // .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        var work_sel_enter_meta =
            work_sel_enter
                .append('div')
                .attr('class', 'piece-meta-wrapper');
        work_sel_enter_meta
            .append('img')
            .attr('class', 'list-avatar')
            .attr('src', function (d) {
                return d.avatar;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'student_name piece-meta')
            .text(function (d) {
                return d.student_name;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'risd_program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);
        // var widths = d3.scale.identity()
        //     .domain(width_extent);

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module_index = Math.floor(Math.random() *
                                   modules_to_include.length),
                random_module =
                    modules_to_include[random_module_index],
                reorder_modules_to_include = [];

            reorder_modules_to_include.push(random_module);
            modules_to_include
                .slice(0,random_module_index)
                .forEach(function (md, mi) {
                    reorder_modules_to_include
                        .push(md);
                });

            modules_to_include.slice(
                    random_module_index+1,
                    modules_to_include.length)
                .forEach(function (md, mi) {
                    reorder_modules_to_include
                        .push(md);
                });



            var max_1240_height =
                (random_module.height/random_module.width) *
                1240;
            var random_cover = {
                original_width: 1240,
                original_height: max_1240_height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': reorder_modules_to_include,
                'cover': random_cover,
                description: d.details.description,
                avatar: d.owners[0].images['138'],
                url: d.owners[0].url
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":44,"./lightbox_fade_up":46}],51:[function(require,module,exports){
module.exports=require(13)
},{}],52:[function(require,module,exports){
module.exports = function department () {
    var self = {},
        wrapper,
        cls = 'department',
        departments,
        activator,
        activator_text,
        blanket_sel,
        grid_sel,
        active_state = false,
        body_sel = d3.select('body');

    var data = [
        'Architecture',
        'Ceramics',
        'Digital + Media',
        'Furniture',
        'Glass',
        'Graphic Design',
        'Industrial Design',
        'Interior Architecture',
        'Jewelry + Metalsmithing',
        'Landscape Architecture',
        'Painting',
        'Photography',
        'Printmaking',
        'Sculpture',
        'Textiles',
        'All'
    ];

    self.dispatch = d3.dispatch('filter');

    self.wrapper = function (_) {
        if (!arguments.length) return wrapper;
        wrapper = _;
        return self;
    };
    self.departments = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.grid = function (_) {
        if (!arguments.length) return grid_sel;
        grid_sel = _;
        return self;
    };

    self.render = function () {
        if (!wrapper) throw "requires a wrapper";

        activator = wrapper.append('div')
            .attr('class', 'button department-activator col-10-10')
            .on('click' , function () {
                toggle_state();
            });

        activator_text = activator.append('p')
            .attr('class', 'department-activator-text')
            .text('filter by department');

        blanket_sel = wrapper.append('div')
            .attr('class', 'department-blanket');


        departments = wrapper.append('div')
            .attr('class', 'department-list');
        
        departments
            .append('ul')
            .selectAll(cls)
            .data(data)
            .enter()
            .append('li')
            .append('p')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                console.log('filter', d);
                var program = d;
                if (program === 'All') program = 'Departments';
                activator_text.text(program);
                self.dispatch.filter(d);
                toggle_state();
            });

        blanket_sel.on('click', function () {
            toggle_state();
        });
    };

    function toggle_state () {
        console.log('toggle');
        active_state = active_state ? false : true;
        wrapper.classed('departments--active', active_state);
        body_sel.classed('no-scroll', active_state);
        grid_sel.classed('z-index-30', active_state);
    }


    return self;
};
},{}],53:[function(require,module,exports){
var Departments = require('./departments'),
    Logo = require('./logo'),
    Work = require('./work'),
    Translate = require('./translate'),
    Nav = require('./section_nav');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);
    var translate = Translate();
    var nav = Nav();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05b', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid-wrapper');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05b/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid-about'))
            .render();

        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');

        var work_background_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work-background');

        var grid_work_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'grid grid-work');
        
        var work_wrapper = grid_work_sel
            .append('div')
            .attr('class', 'work-wrapper row');


        var top_nav_sel = d3.select('.grid-wrapper')
            .append('nav')
            .attr('class', 'nav-section');

        work.bottom
            .additionalMarginBottomSel(d3.select('.grid-work'));

        var department_sel = work_wrapper
            .append('div')
            .attr('class', 'departments col-2-10');

        departments
            .wrapper(department_sel)
            .grid(grid_work_sel)
            .render();


        var work_sel = work_wrapper
            .append('div')
            .attr('id', 'work')
            .attr('class', 'work col-8-10 offset-2-10');

        work.container(work_sel)
            .render();

            
        work.lightbox
            .container(lightbox_container);


        translate
            .translate(work_sel)
            .over(d3.select('.intro-wrapper'))
            .background(work_background_sel)
            .fixed(department_sel)
            .nav(top_nav_sel)
            .scrollLead(d3.select('.scroll-lead'))
            .setup();

        departments.dispatch
            .on('filter.work', function (d) {
                work.filter(d);
            });

        nav.wrapper(top_nav_sel)
            .render();
    });

    return self;
};
},{"./departments":52,"./logo":55,"./section_nav":58,"./translate":59,"./work":60}],54:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        selected_sel,
        to_transition = {
            container: {
                start: {
                    'background-color': 'rgba(239, 65, 54, 0)',
                    opacity: 0
                },
                end: {
                    'background-color': 'rgba(239, 65, 54, 0.9)',
                    opacity: 1
                }
            }
        },
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var data = sel.datum();
        console.log('data');
        console.log(data);
        console.log('data.modules');
        console.log(data.modules);

        var lightbox_grid_sel = container
            .append('div')
            .attr('class', 'grid');

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta col-2-10');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-work offset-2-10 col-8-10');

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        lightbox_work_sel
            .append('p')
            .attr('class', 'lightbox-description')
            .text(data.description);

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .append('img')
            .attr('src', function (d) {
                return d.sizes.max_1240 ? d.sizes.max_1240 : d.src;
            });

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        lightbox_meta_info_sel
            .append('a')
            .attr('class', 'lightbox-meta-info--personal-link')
            .attr('href', data.url)
            .text('Behance');


        container
            .style(to_transition.container.start);

        container.classed('active', true);
        body_sel.classed('no-scroll', true);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
                body_sel.classed('no-scroll', false);
            });
    }

    return self;
};
},{}],55:[function(require,module,exports){
var logoComponents = require('./logo_components'),
    logoConnecting = require('./logo_connecting');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
        logo_connecting_paths = logoConnecting,
        logo_svg,
        logo_line,
        logo_connecting,
        straight_line = d3.svg.line();

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true),
        prev_scroll_progress = 0;

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            // update logo components per window
            if (logo_sel) {
                logo_sel.each(function (d) {
                    var updated = d.rules(window_width,
                                          window_height);

                    d.start = updated.start;
                    d.end = updated.end;
                    d.interpolator =
                        add_interpolator(updated)
                            .interpolator;
                });
            }
            update_logo_components(prev_scroll_progress);
            update_logo_line();
        })
        .on('scroll.logo', function () {
            var scroll_progress = scroll_scale(window.scrollY);
            if (scroll_progress != prev_scroll_progress) {
                update_logo_components(scroll_progress);
                update_logo_line();
            }
            prev_scroll_progress = scroll_progress;

            logo_container_sel
                .classed('logo-svg--end',
                         (scroll_progress === 1) ? true : false);
        });

    self.scrollOverSel = function (_) {
        if (!arguments.length) return scroll_over_sel;
        scroll_over_sel = _;
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.render = function () {
        // update logo components per window
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_components.forEach(function (d, i) {
            var updated = d.rules(window_width,
                                  window_height);

            d.start = updated.start;
            d.end = updated.end;
            d.interpolator =
                add_interpolator(updated)
                    .interpolator;
        });

        distance_to_scroll = calc_distance_to_scroll();
        scroll_scale.domain([0, distance_to_scroll]);

        update_logo_components(
            scroll_scale(
                window.scrollY));


        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .style('top', function (d) {
                return d.start.top;
            })
            .style('bottom', function (d) {
                return d.start.bottom;
            })
            .style('left', function (d) {
                return d.start.left;
            })
            .style('right', function (d) {
                return d.start.right;
            })
            .style('font-size', function (d) {
                return d.start['font-size'];
            })
            .style('line-height', function (d) {
                return d.start['line-height'];
            })
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
        });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        var verticies = logo_verticies();

        logo_line = logo_svg.selectAll('path')
            .data(verticies.straight)
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', straight_line);

        logo_connecting =
            logo_svg
                .selectAll('.logo-connecting')
                .data(verticies.connecting)
                .enter()
                .append('path')
                    .attr('class', 'logo-connecting')
                    .attr('d', function (d) {
                        return d;
                    });
    };

    function update_logo_components (percent_progress) {
        if (!logo_sel) return;
        logo_sel
            .style('top', function (d) {
                return d.interpolator.top(percent_progress);
            })
            .style('bottom', function (d) {
                return d.interpolator.bottom(percent_progress);
            })
            .style('left', function (d) {
                return d.interpolator.left(percent_progress);
            })
            .style('right', function (d) {
                return d.interpolator.right(percent_progress);
            })
            .style('font-size', function (d) {
                return d.interpolator
                        ['font-size'](percent_progress);
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = logo_verticies();

        logo_line
            .data(verticies.straight)
            .attr('d', straight_line);

        logo_connecting
            .data(verticies.connecting)
            .attr('d', function (d) {
                    return d;
                });
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        var logo_connecting_segments = [];

        logo_line_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))];
            } else {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(2/3)))];
            }

            second = [bounds.right + 6,
                 (bounds.top + (bounds.height*(2/3)))];

            logo_line_verticies.push([first, second]);

        });

        for (var i = 0; i < logo_line_verticies.length; i++) {
            if ((i+1) < logo_line_verticies.length) {
                var start = logo_line_verticies[i][1],
                    end = logo_line_verticies[i+1][0];

                logo_connecting_segments
                    .push(
                        logo_connecting_paths[i]
                            .segment(start, end));
            }
        }
        return {
            straight: logo_line_verticies,
            connecting: logo_connecting_segments
        };
    }

    function calc_distance_to_scroll () {
        var scrolling_distance = window.innerHeight;
        scroll_over_sel.style('margin-top', scrolling_distance +
                                            'px');
        return scrolling_distance;
    }

    function add_interpolator (states) {
        // sizes
        // { min1400: {},  min1024: {}, min768: {}, min300: {}}
        states.interpolator = {};
        for (var key in states.start) {
            states.interpolator[key] =
                d3.interpolateString(
                    states.start[key],
                    states.end[key]);
        }
        return states;
    }

    return self;
};
},{"./logo_components":56,"./logo_connecting":57}],56:[function(require,module,exports){
module.exports = [{
    html: 'RISD',
    type: 'line',
    cls: 'logo-component--risd text-left logo-component--title',
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: (width * 0.2) + 'px',
                    right: 'auto',
                    'font-size': '40px',
                    'line-height': '42px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Grad',
    cls: 'logo-component--grad text-left logo-component--title',
    type: 'line',
    start: {
        top: '40%',
        bottom: 'auto',
        left: '30%',
        right: 'auto',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '20%',
        bottom: 'auto',
        left: '50px',
        right: 'auto',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1400) {
            return {
                start: {
                    top: (height * 0.4) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.2) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.4) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.2) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: 'Show',
    cls: 'logo-component--show text-right logo-component--title',
    type: 'line',
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.45) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.85) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.52) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height * 0.85) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.52) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height * 0.85) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
}, {
    html: '2014',
    cls: 'logo-component--2014 text-right logo-component--title',
    type: 'line',
    start: {
        top: '60%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '60px',
        'line-height': '42px'
    },
    end: {
        top: '95%',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '20px',
        'line-height': '14px'
    },
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.6) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height - 80) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.6) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '60px',
                    'line-height': '42px'
                },
                end: {
                    top: (height - 80) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '20px',
                    'line-height': '14px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.6) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '60px',
                'line-height': '42px'
            },
            end: {
                top: (height - 80) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '20px',
                'line-height': '14px'
            }
        };
    }
},
// {
//     html: 'Rhode Island School of Design<br>'+
//           'Annual Grad Thesis Exhibition',
//     cls: 'logo-component--subheadline text-left',
//     type: 'subsidiary',
//     start: {
//         top: '50%',
//         bottom: 'auto',
//         left: '30%',
//         right: 'auto',
//         'font-size': '20px',
//         'line-height': '28px'
//     },
//     end: {
//         top: '88%',
//         bottom: 'auto',
//         left: '50px',
//         right: 'auto',
//         'font-size': '13px',
//         'line-height': '17px'
//     },
//     rules: function (width, height) {
//         if (width < 768) {
//             return {
//                 start: {
//                     top: (height * 0.5) + 'px',
//                     bottom: 'auto',
//                     left: (width * 0.3) + 'px',
//                     right: 'auto',
//                     'font-size': '20px',
//                     'line-height': '28px'
//                 },
//                 end: {
//                     top: (height * 0.88) + 'px',
//                     bottom: 'auto',
//                     left: '50px',
//                     right: 'auto',
//                     'font-size': '13px',
//                     'line-height': '17px'
//                 }
//             };
//         }
//         if (width < 1024) {
//             return {
//                 start: {
//                     top: (height * 0.5) + 'px',
//                     bottom: 'auto',
//                     left: (width * 0.3) + 'px',
//                     right: 'auto',
//                     'font-size': '20px',
//                     'line-height': '28px'
//                 },
//                 end: {
//                     top: (height * 0.88) + 'px',
//                     bottom: 'auto',
//                     left: '50px',
//                     right: 'auto',
//                     'font-size': '13px',
//                     'line-height': '17px'
//                 }
//             };
//         }
//         return {
//             start: {
//                 top: (height * 0.5) + 'px',
//                 bottom: 'auto',
//                 left: (width * 0.3) + 'px',
//                 right: 'auto',
//                 'font-size': '20px',
//                 'line-height': '28px'
//             },
//             end: {
//                 top: (height * 0.88) + 'px',
//                 bottom: 'auto',
//                 left: '50px',
//                 right: 'auto',
//                 'font-size': '13px',
//                 'line-height': '17px'
//             }
//         };
//     }
// },
{
    html: 'Open 12–5pm Daily<br>'+
          'May 16–31<br><br>' +
          'Opening Reception<br>' +
          'May 15, 6–8pm',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
    rules: function (width, height) {
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '13px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: 'RI Convention Center<br>'+
          'Exhibition Hall A<br>' +
          'One Sabin Street, Providence',
    cls: 'logo-component--location text-left',
    type: 'subsidiary',
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.5) + 'px',
                    bottom: 'auto',
                    left: (width * 0.3) + 'px',
                    right: 'auto',
                    'font-size': '20px',
                    'line-height': '28px'
                },
                end: {
                    top: (height * 0.88) + 'px',
                    bottom: 'auto',
                    left: '50px',
                    right: 'auto',
                    'font-size': '13px',
                    'line-height': '17px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '20px',
                    'line-height': '28px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '13px',
                    'line-height': '17px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.55) + 'px',
                bottom: 'auto',
                left: (width * 0.3) + 'px',
                right: 'auto',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: (height * 0.88) + 'px',
                bottom: 'auto',
                left: '50px',
                right: 'auto',
                'font-size': '13px',
                'line-height': '17px'
            }
        };
    }
}, {
    html: '<svg>' +
          '</svg>',
    cls: 'logo-component--asterisk text-left',
    type: 'subsidiary',
    start: {
        top: '30%',
        bottom: 'auto',
        left: 'auto',
        right: '30%',
        'font-size': '20px',
        'line-height': '28px'
    },
    end: {
        top: '50px',
        bottom: 'auto',
        left: 'auto',
        right: '50px',
        'font-size': '10px',
        'line-height': '17px'
    },
    rules: function (width, height) {
        if (width < 768) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '20px',
                    'line-height': '28px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '10px',
                    'line-height': '17px'
                }
            };
        }
        if (width < 1024) {
            return {
                start: {
                    top: (height * 0.3) + 'px',
                    bottom: 'auto',
                    left: 'auto',
                    right: (width * 0.3) + 'px',
                    'font-size': '20px',
                    'line-height': '28px'
                },
                end: {
                    top: '50px',
                    bottom: 'auto',
                    left: 'auto',
                    right: '50px',
                    'font-size': '10px',
                    'line-height': '17px'
                }
            };
        }
        return {
            start: {
                top: (height * 0.3) + 'px',
                bottom: 'auto',
                left: 'auto',
                right: (width * 0.3) + 'px',
                'font-size': '20px',
                'line-height': '28px'
            },
            end: {
                top: '50px',
                bottom: 'auto',
                left: 'auto',
                right: '50px',
                'font-size': '10px',
                'line-height': '17px'
            }
        };
    }
}];
},{}],57:[function(require,module,exports){
// segment functions take a start
// and and end point. returning
// an array of points that will
// be used to drawn a line connecting
// the start and end.

// both start and end are arrays,
// start = [x,y],  end = [x,y]
module.exports = [{
    from: 'RISD',
    to: 'Grad',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        d += ' c '+
             //cp1
             '0,0 ' +
             //cp2
             (delta_x * 0.08) + ',0 ' +
             //x,y
             (delta_x * 0.1) + ',' +
             (0);

             // total progress
             // x: 0.1
             // y: 0

        d += ' c ' +
             //cp1
             (delta_x * 0.18) + ',0 '+
             //cp2
             (delta_x * 0.18) + ',' + (delta_y * 0.4) + ' ' +
             //x,y
             (0) + ',' +
             ((delta_y * 0.4));
             
             // total progress
             // x: 0.1
             // y: 0.4

        d += ' c ' +
             //cp1
             (-(delta_x * 0.4137)) + ',0 '+
             //cp2
             (-(delta_x * 1)) + ',' + (-(delta_y * 0.128)) + ' ' +
             //x,y
             (-(delta_x * 1.206)) + ',' +
             ((delta_y * 0.03));
             
             // total progress
             // x: -1.106
             // y: 0.43

        d += ' c ' +
             //cp1
             (-(delta_x * 0.148)) + ',' + (delta_y * 0.13244) + ' ' +
             //cp2
             (-(delta_x * 0.15)) + ',' + (delta_y * 0.3908) + ' ' +
             //x,y
             (0) + ',' +
             ((delta_y * 0.549));

             // total progress
             // x: -1.106
             // y: 0.9727

        d += ' c ' +
             //cp1
             ((delta_x * 0.03310)) + ',' + (delta_y * 0.01145) + ' ' +
             //cp2
             ((delta_x * 0.0675)) + ',' + (delta_y * 0.01870) + ' ' +
             //x,y
             ((delta_x * 0.0915)) + ',' +
             ((delta_y * 0.0188));

             // total progress
             // x: -1.106 + 0.0915 = -1.0145
             // y: 0.9727 + 0.0273 = 1.0

        d += ' c ' +
             //cp1
             ((delta_x * 0.024)) + ',' + (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.024)) + ',' + (delta_y * 0) + ' ' +
             //x,y
             ((delta_x * 0.0365)) + ',' +
             (0);

             // total progress
             // x: -1
             // y: 1

        return d;
    }
}, {
    from: 'Grad',
    to: 'Show',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        return d;
    }
}, {
    from: 'Show',
    to: '2014',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        d += ' c '+
             //cp1
             (delta_x * 0.0481637478756) + ',0 ' +
             //cp2
             (delta_x * 0.0847336141284) + ',0 ' +
             //x,y
             (delta_x * 0.111549545555) + ',' +
             (0);

        d += ' c ' +
             //cp1
             ((delta_x * 0)) + ',' +
             (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.113027414468)) + ',' +
             (delta_y * -0.498616793298) + ' ' +
             //x,y
             ((delta_x * -0.365824281386)) + ',' +
             (delta_y * -0.738116111436);

        d += ' c ' +
             //cp1
             ((delta_x * -0.330894849627)) + ',' +
             (delta_y * -0.218897330996) + ' ' +
             //cp2
             ((delta_x * -0.705298160053)) + ',' +
             (delta_y * -0.140405221118) + ' ' +
             //x,y
             ((delta_x * -0.968703908963)) + ',' +
             (delta_y * 0.053263198909);

        d += ' c ' +
             //cp1
             ((delta_x * -0.383152294391)) + ',' +
             (delta_y * 0.273777518021) + ' ' +
             //cp2
             ((delta_x * -0.530990911106)) + ',' +
             (delta_y * 1.0091954023) + ' ' +
             //x,y
             ((delta_x * -0.209385206532)) + ',' +
             (delta_y * 1.4154880187);

        d += ' c ' +
             //cp1
             ((delta_x * 0.0713293430873)) + ',' +
             (delta_y * 0.137385544516) + ' ' +
             //cp2
             ((delta_x * 0.239385206532)) + ',' +
             (delta_y * 0.282232612507) + ' ' +
             //x,y
             ((delta_x * 0.35666888347)) + ',' +
             (delta_y * 0.272232612507);

        d += ' c ' +
             //cp1
             ((delta_x * 0.0355575260474)) + ',' +
             (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.0406340057637)) + ',' +
             (delta_y * 0) + ' ' +
             //x,y
             ((delta_x * 0.0795093475209 )) + ',' +
             (delta_y * 0);

        return d;
    }
}];
},{}],58:[function(require,module,exports){
module.exports = function section_nav () {
    var self = {},
        wrapper_sel,
        data = [{
            text: 'About',
        }, {
            text: 'Visit'
        }, {
            text: 'Work'
        }];

    self.wrapper = function (_) {
        if (!arguments.length) return wrapper_sel;
        wrapper_sel = _;
        return self;
    };

    self.render = function () {
        var container = wrapper_sel.append('div')
            .attr('class', 'grid grid-nav')
            .append('div')
            .attr('class', 'col-10-10')
            .append('div')
            .attr('class', 'nav-section-items');

        container.selectAll('.nav-section-item')
            .data(data)
            .enter()
            .append('div')
            .attr('class', 'nav-section-item')
            .append('a')
            .attr('href', function (d) {
                // return '#' + d.text.toLowerCase();
                return;
            })
            .append('p')
            .text(function (d) {
                return d.text;
            });

        return self;
    };


    return self;
};
},{}],59:[function(require,module,exports){
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
        opacity_nav_scale = d3.scale.linear()
            .domain([-200, 0])
            .range([0, 1])
            .clamp(true),
        opacity_scroll_lead_scale = d3.scale.linear()
            .domain([0, 150])
            .range([1, 0])
            .clamp(true),
        // selection that will fade in
        // typically navigation
        fixed_sel,
        logo_container_offset,
        top_nav_sel,
        scroll_lead_sel;

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

    self.scrollLead = function (_) {
        if (!arguments.length) return scroll_lead_sel;
        scroll_lead_sel = _;
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
                make_moves();
            })
            .on('touchmove.translate', function () {
                make_moves();
            })
            .on('resize.translate', function () {
                update_scroll_target_values();
            });
    };

    function make_moves () {
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


        if (pageYOffset > (logo_container_offset -200)) {
            top_nav_sel.classed('nav-section--active',
                                true);
        } else {
            top_nav_sel.classed('nav-section--active',
                                false);
        }
        top_nav_sel.style('opacity',
                opacity_nav_scale(pageYOffset -
                                  logo_container_offset));
        scroll_lead_sel.style('opacity',
                opacity_scroll_lead_scale(pageYOffset));
    }

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
},{}],60:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        iso,
        risd_programs = ['All'];

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    d3.select(window)
        .on('resize.work', function () {
            
        });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true);
            // .classed('col-10-10', true);

        render_data();

        return self;
    };

    self.filter = function (_) {
        if (arguments.length != 1) throw "filter takes one argument";

        var program = _;
        if (program === 'All') program = '';

        if (iso) {
            iso.arrange({
                filter: function (itemElem) {
                    return d3.select(itemElem)
                        .classed(format_program(program));
                }
            });
        }
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        var wide_count = 0,
            wide_frequency = 5;
        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    var extra_class = '';
                    if (d.cover.width > d.cover.height) {
                        wide_count += 1;
                        if ((wide_count/wide_frequency) === 0) {
                            extra_class = ' wide-piece';
                        }
                    }
                    return 'piece ' +
                        format_program(d.risd_program) +
                        extra_class;
                });

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                });

        var work_sel_enter_meta =
            work_sel_enter
                .append('div')
                .attr('class', 'piece-meta-wrapper');

        work_sel_enter_meta
            .append('p')
            .attr('class', 'student_name piece-meta')
            .text(function (d) {
                return d.student_name;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'risd_program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        iso = new Isotope(container.node(), {
            itemSelector: '.piece',
            masonry: {
                columnWidth: '.piece',
                gutter: 30
            }
        });

        window.iso = iso;
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);
        // var widths = d3.scale.identity()
        //     .domain(width_extent);

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module =
                modules_to_include[Math.floor(Math.random() *
                                   modules_to_include.length)];

            var random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': modules_to_include,
                'cover': random_cover,
                description: d.details.description,
                avatar: d.owners[0].images['138'],
                url: d.owners[0].url
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":51,"./lightbox_fade_up":54}],61:[function(require,module,exports){
module.exports=require(13)
},{}],62:[function(require,module,exports){
var Departments = require('../departments'),
    Logo = require('./logo'),
    Work = require('./work'),
    Translate = require('./translate');

module.exports = function concept_04 () {
    var self = {},
        window_sel = d3.select(window),
        grid_sel;

    self.dispatch = d3.dispatch('htmlLoaded');

    var departments = Departments();
    var logo = Logo();
    var work = Work(self);
    var translate = Translate();

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_05a', true)
            .classed('concept_05c', true)
            .classed('full-width-work', true)
            .html('');

        // .logo-container is a neighbor of .grid
        var logo_container_sel = body
            .append('div')
            .attr('class', 'logo-container');

        logo.container(logo_container_sel);

        grid_sel = body
            .append('div')
            .attr('class', 'grid-wrapper');



        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_05c/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            self.dispatch.htmlLoaded();
        });

        return self;
    };

    self.dispatch.on('htmlLoaded.departments', function () {
        departments
            .wrapper(d3.select('.departments'))
            .render();
    });

    self.dispatch.on('htmlLoaded.work', function () {
        logo.scrollOverSel(d3.select('.grid'))
            .render();

        var lightbox_container = d3.select('body')
            .append('div')
            .attr('class', 'lightbox');

        work.bottom.additionalMarginBottomSel(d3.select('.grid'));

        var work_background_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work-background');

        var work_sel = d3.select('.grid-wrapper')
            .append('div')
            .attr('class', 'work');
        work.container(work_sel)
            .render();

            
        work.lightbox
            .container(lightbox_container);


        translate
            .translated(work_sel)
            .over(d3.select('.grid'))
            .background(work_background_sel)
            .setup();
    });

    return self;
};
},{"../departments":78,"./logo":64,"./translate":67,"./work":68}],63:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container,
        selected_sel,
        to_transition = {
            container: {
                start: {
                    'background-color': 'rgba(239, 65, 54, 0)',
                    opacity: 0
                },
                end: {
                    'background-color': 'rgba(239, 65, 54, 0.9)',
                    opacity: 1
                }
            }
        },
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('container');

    self.dispatch.on('container', function () {
        container.on('click', function () {
            close();
        });
    });

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;
        self.dispatch.container();
        return self;
    };

    // pass in data to make show up
    self.show = function (sel) {
        if (!container) throw "Expected container.";
        selected_sel = sel;

        var data = sel.datum();
        console.log('data');
        console.log(data);
        console.log('data.modules');
        console.log(data.modules);

        var lightbox_grid_sel = container
            .append('div')
            .attr('class', 'grid');

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta col-2-10');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-work offset-2-10 col-8-10');

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        lightbox_work_sel
            .append('p')
            .attr('class', 'lightbox-description')
            .text(data.description);

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .append('img')
            .attr('src', function (d) {
                return d.sizes.max_1240 ? d.sizes.max_1240 : d.src;
            });

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        lightbox_meta_info_sel
            .append('a')
            .attr('class', 'lightbox-meta-info--personal-link')
            .attr('href', data.url)
            .text('Behance');


        container
            .style(to_transition.container.start);

        container.classed('active', true);
        body_sel.classed('lightbox-open', true);

        d3.transition()
            .duration(280)
            .ease('cubic-out')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.end);
            });

    };

    function close() {
        d3.transition()
            .duration(280)
            .ease('cubic-in')
            .each(function () {
                container
                    .transition()
                    .style(to_transition.container.start);
            })
            .each('end', function () {
                selected_sel.style('display', 'block');
                container.classed('active', false);
                container.html('');
                body_sel.classed('lightbox-open', false);
            });
    }

    return self;
};
},{}],64:[function(require,module,exports){
var logoComponents = require('./logo_components'),
    logoPaths = require('./logo_static_paths');

module.exports = function work () {
    var self = {},
        window_sel = d3.select(window),
        scroll_over_sel,
        distance_to_scroll = 0,
        logo_container_sel,
        logo_sel,
        logo_line_sel,
        logo_subsidiary_sel,
        logo_components = logoComponents,
        logo_component_paths = logoPaths,
        logo_svg,
        logo_line,
        logo_connecting_line,
        straight_line = d3.svg.line();

    var scroll_scale = d3.scale.linear()
        .domain([0, distance_to_scroll])
        .range([0, 1])
        .clamp(true),
        prev_scroll_progress = 0;

    window_sel
        .on('resize.logo', function () {
            var window_width = window.innerWidth,
                window_height = window.innerHeight;

            distance_to_scroll = calc_distance_to_scroll();
            scroll_scale.domain([0, distance_to_scroll]);

            logo_svg
                .attr('width', window_width)
                .attr('height', window_height);

            // update logo components per window
            if (logo_sel) {
                logo_sel.each(function (d) {
                    var updated = d.rules(window_width,
                                          window_height);

                    d.start = updated.start;
                    d.end = updated.end;
                    d.interpolator =
                        add_interpolator(updated)
                            .interpolator;

                    console.log(d);
                });
            }
            update_logo_components(prev_scroll_progress);
            update_logo_line();
        })
        .on('scroll.logo', function () {
            var scroll_progress = scroll_scale(window.scrollY);
            if (scroll_progress != prev_scroll_progress) {
                update_logo_components(scroll_progress);
                update_logo_line();
            }
            prev_scroll_progress = scroll_progress;
        });

    self.scrollOverSel = function (_) {
        if (!arguments.length) return scroll_over_sel;
        scroll_over_sel = _;
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.render = function () {
        // update logo components per window
        var window_width = window.innerWidth,
            window_height = window.innerHeight;
        logo_components.forEach(function (d, i) {
            var updated = d.rules(window_width,
                                  window_height);

            d.start = updated.start;
            d.end = updated.end;
            d.interpolator =
                add_interpolator(updated)
                    .interpolator;

            console.log(d);
        });

        distance_to_scroll = calc_distance_to_scroll();
        scroll_scale.domain([0, distance_to_scroll]);

        update_logo_components(
            scroll_scale(
                window.scrollY));


        logo_sel = logo_container_sel.selectAll('logo-component')
            .data(logo_components)
            .enter()
            .append('div')
            .attr('class', function (d) {
                return 'logo-component ' + d.cls;
            })
            .style('top', function (d) {
                return d.start.top;
            })
            .style('bottom', function (d) {
                return d.start.bottom;
            })
            .style('left', function (d) {
                return d.start.left;
            })
            .style('right', function (d) {
                return d.start.right;
            })
            .style('font-size', function (d) {
                return d.start['font-size'];
            })
            .style('line-height', function (d) {
                return d.start['line-height'];
            })
            .html(function (d) {
                return d.html;
            });

        logo_line_sel = logo_sel.filter(function (d, i) {
            return d.type === 'line';
        });

        logo_subsidiary_sel = logo_sel.filter(function (d, i) {
            return d.type === 'subsidiary';
        });

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        var verticies = logo_verticies();

        logo_line = logo_svg.selectAll('.logo-line')
            .data(verticies.straight)
            .enter()
            .append('path')
                .attr('class', 'logo-line')
                .attr('d', straight_line);

        logo_connecting_line =
            logo_svg
                .selectAll('.logo-connecting')
                .data(verticies.connecting)
                .enter()
                .append('path')
                    .attr('class', 'logo-connecting')
                    .attr('d', function (d) {
                        return d.segment;
                    })
                    .attr('transform', function (d) {
                        return 'translate(' + d.translate.x +
                            ',' + d.translate.y + ') scale(' +
                            d.scale.x + ',' + d.scale.y + ')';
                    });
    };

    function update_logo_components (percent_progress) {
        if (!logo_sel) return;
        logo_sel
            .style('top', function (d) {
                return d.interpolator.top(percent_progress);
            })
            .style('bottom', function (d) {
                return d.interpolator.bottom(percent_progress);
            })
            .style('left', function (d) {
                return d.interpolator.left(percent_progress);
            })
            .style('right', function (d) {
                return d.interpolator.right(percent_progress);
            })
            .style('font-size', function (d) {
                return d.interpolator
                        ['font-size'](percent_progress);
            })
            .style('line-height', function (d) {
                return d.interpolator
                        ['line-height'](percent_progress);
            });
    }

    function update_logo_line () {
        var verticies = logo_verticies();
        logo_line
            .data(verticies.straight)
            .attr('d', straight_line);

        logo_connecting_line
            .data(verticies.connecting)
            .attr('d', function (d) {
                return d.segment;
            })
            .attr('transform', function (d) {
                return 'translate(' + d.translate.x +
                    ',' + d.translate.y + ') scale(' +
                    d.scale.x + ',' + d.scale.y + ')';
            });
    }

    function logo_verticies () {
        var logo_line_verticies = [];
        var logo_connecting_line_segments = [];
        logo_line_sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(2/3)))];
            } else {
                first = [bounds.left - 10,
                     (bounds.top + (bounds.height*(2/3)))];
            }

            second = [bounds.right + 10,
                 (bounds.top + (bounds.height*(2/3)))];

            logo_line_verticies.push([first, second]);

        });
        for (var i = 0; i < logo_line_verticies.length; i++) {
            if ((i+1) < logo_line_verticies.length) {
                var start = logo_line_verticies[i][1],
                    end = logo_line_verticies[i+1][0];

                var delta_x = start[0] - end[0],
                    delta_y = end[1] - start[1];

                console.log('delta x, delta y');
                console.log(delta_x, delta_y);
                var d = {};
                d.scale = {
                    x: delta_x/logo_component_paths[i].width,
                    y: delta_y/logo_component_paths[i].height
                };
                d.translate = {
                    x: start[0] -
                        (logo_component_paths[i].width *
                         d.scale.x),
                    y: end[1] -
                        (logo_component_paths[i].height *
                         d.scale.y)
                };
                d.segment = logo_component_paths[i].segment;

                logo_connecting_line_segments.push(d);
            }
        }
        return {
            straight: logo_line_verticies,
            connecting: logo_connecting_line_segments
        };
    }

    function calc_distance_to_scroll () {
        var scrolling_distance = window.innerHeight;
        scroll_over_sel.style('margin-top', scrolling_distance +
                                            'px');
        return scrolling_distance;
    }

    function add_interpolator (states) {
        states.interpolator = {};
        for (var key in states.start) {
            states.interpolator[key] =
                d3.interpolateString(
                    states.start[key],
                    states.end[key]);
                
        }
        return states;
    }

    return self;
};
},{"./logo_components":65,"./logo_static_paths":66}],65:[function(require,module,exports){
module.exports=require(48)
},{}],66:[function(require,module,exports){
// all d attributesneed a first point.
// if you wanted the line to start
// at 100,200, it should be:
// d = 'M100,200' + segement

module.exports = [{
    from: 'RISD',
    to: 'Grad',
    width: 145.25,
    height: 131,
    segment:'M145.293,0 c3.215,0,6.297,0,9.211,' +
        '0c50.17,0,44.455,65.185,3.248,64.784' +
        'C97.514,64.198,12.484,46.08-17.041,69.185' +
        ' c-22.054,17.258-23.264,51.452-1.284,58' +
        'c4.748,1.414,9.815,2.5,13.299,2.5s5.317,0,5.317,0'
}, {
    from: 'Grad',
    to: 'Show',
    width: 279.67,
    height: 88.15,
    segment:'M145.293,0 c3.215,0,6.297,0,9.211,' +
        '0c50.17,0,44.455,65.185,3.248,64.784' +
        'C97.514,64.198,12.484,46.08-17.041,69.185' +
        ' c-22.054,17.258-23.264,51.452-1.284,58' +
        'c4.748,1.414,9.815,2.5,13.299,2.5s5.317,0,5.317,0'
}, {
    from: 'Show',
    to: '2014',
    width: 146.79,
    height: 103.8,
    segment:'M145.293,0 c3.215,0,6.297,0,9.211,' +
        '0c50.17,0,44.455,65.185,3.248,64.784' +
        'C97.514,64.198,12.484,46.08-17.041,69.185' +
        ' c-22.054,17.258-23.264,51.452-1.284,58' +
        'c4.748,1.414,9.815,2.5,13.299,2.5s5.317,0,5.317,0'
}];
},{}],67:[function(require,module,exports){
module.exports=require(49)
},{}],68:[function(require,module,exports){
var Bottom = require('./bottom'),
    Lightbox = require('./lightbox_fade_up');

module.exports = function work () {
    var self = {},
        data = [],
        container,
        work_sel,
        risd_programs = ['All'],
        masonic_gutter = 120;

    self.dispatch = d3.dispatch('dataLoaded');

    // deal with window bottom loading more
    var bottom = self.bottom = Bottom();
    var lightbox = self.lightbox = Lightbox();

    bottom.dispatch.on('bottom', function () {
        get_more_data();
    });

    d3.select(window)
        .on('resize.work', function () {
            resize_masonic();
        });

    function get_more_data () {
        self.dispatch.on('dataLoaded', function () {
            bottom.dirty(false);
            render_data();
        });
        get_data();
    }
    // end dealing with window

    var masonic = d3.masonic()
        .width(function (d) {
            return +d.cover.width + masonic_gutter;
        })
        .height(function (d) {
            return +d.cover.height + masonic_gutter;
        })
        .columnWidth(200 + masonic_gutter);

    self.data = function (_) {
        if (!arguments.length) return data;
        data = data.concat(_);
        return self;
    };

    self.container = function (_) {
        if (!arguments.length) return container;
        container = _;

        // side effect of updating container
        bottom.container(container);

        return self;
    };

    self.render = function () {
        if (!data.length) {
            self.dispatch.on('dataLoaded', function () {
                self.render();
            });

            get_data();
            return self;

        } else {
            self.dispatch.on('dataLoaded', null);
        }

        container
            .classed('masonic', true);
            // .classed('col-10-10', true);

        render_data();

        return self;
    };

    function render_data() {
        work_sel = container.selectAll('.piece')
            .data(data);

        work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                        format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.cover.width + 'px';
                })
                .style('height', function (d) {
                    return d.cover.height + 'px';
                })
                .style('opacity', 0);

        work_sel_enter
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                })
                .attr('width', function (d) {
                    return d.cover.width;
                });

        var work_sel_enter_meta =
            work_sel_enter
                .append('div')
                .attr('class', 'piece-meta-wrapper');
        work_sel_enter_meta
            .append('p')
            .attr('class', 'student_name piece-meta')
            .text(function (d) {
                return d.student_name;
            });
        work_sel_enter_meta
            .append('p')
            .attr('class', 'risd_program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel_enter.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        resize_masonic();
    }

    function resize_masonic () {
        var outerWidth = container.property('offsetWidth');

        masonic
            .outerWidth(outerWidth)
            .reset();

        work_sel
            .datum(masonic)
            .style("width", function (d) {
                return d.width + 'px';
            })
            .style("height", function (d) {
                return d.height + 'px';
            })
            .style("left", function (d) { return d.x + 'px'; })
            .style("top", function (d) { return d.y + 'px'; })
            .datum(function (d) {
                return d.data;
            });

        container.style('height', masonic.outerHeight() + 'px');
    }

    function get_data () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work =
                format_data_cover_with_modules(work);

            self.data(shuffle(formatted_work));
            self.dispatch.dataLoaded();
        });
    }

    // data comes out as:
    // [{
    //     'project_name': d.name,
    //     'student_name': d.owners[0].display_name,
    //     'risd_program': d.risd_program,
    //     'modules': modules_to_include,
    //     'cover': random_cover
    // }, ]
    function format_data_cover_with_modules (work) {

        var formatted_work = [];

        // determine the extent of widths
        var all_modules = [];
        work.forEach(function (d, i) {
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    all_modules.push(md);
                }
            });
        });

        // set a scale for mapping
        // width the an image to the
        // width of the masonic version
        var width_extent = d3.extent(all_modules, function (d) {
                            return d.width; }
                        );
        console.log('width_extent');
        console.log(width_extent);
        var widths = d3.scale.ordinal()
            .domain(width_extent)
            .range([100, 200, 400]);
        // var widths = d3.scale.identity()
        //     .domain(width_extent);

        work.forEach(function (d, i) {
            var modules_to_include = [];
            d.details.modules.forEach(function (md, mi) {
                if (md.type === 'image') {
                    modules_to_include.push(md);
                }
            });

            // random_cover_option
            var random_module_index = Math.floor(Math.random() *
                                   modules_to_include.length),
                random_module =
                    modules_to_include[random_module_index],
                reorder_modules_to_include = [];

            reorder_modules_to_include.push(random_module);
            modules_to_include
                .slice(0,random_module_index)
                .forEach(function (md, mi) {
                    reorder_modules_to_include
                        .push(md);
                });

            modules_to_include.slice(
                    random_module_index+1,
                    modules_to_include.length)
                .forEach(function (md, mi) {
                    reorder_modules_to_include
                        .push(md);
                });



            var max_1240_height =
                (random_module.height/random_module.width) *
                1240;
            var random_cover = {
                original_width: 1240,
                original_height: max_1240_height,
                width: widths(random_module.width),
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;

            formatted_work.push({
                'project_name': d.name,
                'student_name': d.owners[0].display_name,
                'risd_program': d.risd_program,
                'modules': reorder_modules_to_include,
                'cover': random_cover,
                description: d.details.description,
                avatar: d.owners[0].images['138'],
                url: d.owners[0].url
            });

            if (risd_programs.indexOf(d.risd_program) < 0) {
                risd_programs.push(d.risd_program);
            }
        });

        return formatted_work;
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }

    return self;
};
},{"./bottom":61,"./lightbox_fade_up":63}],69:[function(require,module,exports){
// segment functions take a start
// and and end point. returning
// an array of points that will
// be used to drawn a line connecting
// the start and end.

// both start and end are arrays,
// start = [x,y],  end = [x,y]
module.exports = [{
    from: 'RISD',
    to: 'Grad',
    segment: function (start, end) {
        var current_delta = {
                x: start[0] - end[0],
                y: end[1] - start[1]
            },
            drawn_delta = {
                x: 115.253,
                y: 189.185
            };

        var d = 'M' + start[0] + ',' + start[1];

        d += 'c0,0 0.936,8.851 0.936,' +
             (16.81+((current_delta.y-drawn_delta.y)/2)) +
             'c0,28.042-15.901,67.37-61.185,67.37' +
             'c-53.297,0 -79.807,0 -79.807,0'+
             'l0-52 ' +
             'c0,0,35.921-4.393,48.649,3.758' +
             'c37.861,24.242,29.645,46.777-3.8,80.242' +
             'c-17.027,17.038-44.629,17-44.629,48.653 '+
             'c0,18.013,0,24.347,0,' +
             (24.347+((current_delta.y-drawn_delta.y)/2));

        if (current_delta.x > drawn_delta.x) {
            d += 'l' + (current_delta.x - drawn_delta.x)  + ',0';
        }

        return d;
    }
}, {
    from: 'Grad',
    to: 'Show',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        d += 'c115.039,0.852 371.006,204.5 571.427,115.732 ' +
             'c157.928-69.948,67.032-178.978-45.405-130.958 ' +
             'c-141.016,60.226-346.596,300.976-43.016,322.226 ' +
             'c200,14,457.94-105.579,667.987-104.757 ' +
             'c24.487,0.096,51.499,0.185,77.013,0.266 ' +
             'c14.761,0.047,42,0.132,42,0.132';

        return d;
    }
}, {
    from: 'Show',
    to: '2014',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        d += ' c '+
             //cp1
             (delta_x * 0.0481637478756) + ',0 ' +
             //cp2
             (delta_x * 0.0847336141284) + ',0 ' +
             //x,y
             (delta_x * 0.111549545555) + ',' +
             (0);

        d += ' c ' +
             //cp1
             ((delta_x * 0)) + ',' +
             (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.113027414468)) + ',' +
             (delta_y * -0.498616793298) + ' ' +
             //x,y
             ((delta_x * -0.365824281386)) + ',' +
             (delta_y * -0.738116111436);

        d += ' c ' +
             //cp1
             ((delta_x * -0.330894849627)) + ',' +
             (delta_y * -0.218897330996) + ' ' +
             //cp2
             ((delta_x * -0.705298160053)) + ',' +
             (delta_y * -0.140405221118) + ' ' +
             //x,y
             ((delta_x * -0.968703908963)) + ',' +
             (delta_y * 0.053263198909);

        d += ' c ' +
             //cp1
             ((delta_x * -0.383152294391)) + ',' +
             (delta_y * 0.273777518021) + ' ' +
             //cp2
             ((delta_x * -0.530990911106)) + ',' +
             (delta_y * 1.0091954023) + ' ' +
             //x,y
             ((delta_x * -0.209385206532)) + ',' +
             (delta_y * 1.4154880187);

        d += ' c ' +
             //cp1
             ((delta_x * 0.0713293430873)) + ',' +
             (delta_y * 0.137385544516) + ' ' +
             //cp2
             ((delta_x * 0.239385206532)) + ',' +
             (delta_y * 0.282232612507) + ' ' +
             //x,y
             ((delta_x * 0.35666888347)) + ',' +
             (delta_y * 0.272232612507);

        d += ' c ' +
             //cp1
             ((delta_x * 0.0355575260474)) + ',' +
             (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.0406340057637)) + ',' +
             (delta_y * 0) + ' ' +
             //x,y
             ((delta_x * 0.0795093475209 )) + ',' +
             (delta_y * 0);

        return d;
    }
}];
},{}],70:[function(require,module,exports){
var Utility = require('./svg');

module.exports = function logo_scale () {
    var utility = Utility();

    var segments = [{
            from: 'RISD',
            to: 'Grad',
            // scaleUsing: {
            //     func: utility.scaleAnchorY,
            //     args: {
            //         start: 2,
            //         end: 9
            //     }
            // },
            scaleUsing: {
                func: utility.scaleProportionalY,
                args: {}
            },
            original: 'M94.26-15 '+
                'h29.796 ' +
                'c0,0,0.936,8.851,0.936,16.81 '+
                'c0,28.042-15.901,67.37-61.185,67.37' +
                'C10.51,69.18-16,69.185-16,69.185' +
                'v-52' +
                'c0,0,35.921-4.393,48.649,3.758' +
                'c37.861,24.242,29.645,46.777-3.8,80.242' +
                'c-17.027,17.038-44.629,17-44.629,48.653' +
                'c0,18.013,0,24.347,0,24.347'
        }, {
            from: 'Grad',
            to: 'Show',
            scaleUsing: {
                func: utility.scaleProportionalX,
                args: {}
            },
            original: 'M-16-14.786' +
                'c115.039,0.852,371.006,204.5,571.427,115.732' +
                'c157.928-69.948,67.032-178.978-45.405-130.958' +
                'c-141.016,60.226-346.596,300.976-43.016,322.226' +
                'c200,14,457.94-105.579,667.987-104.757' +
                'c24.487,0.096,51.499,0.185,77.013,0.266' +
                'c14.761,0.047,42,0.132,42,0.132'
        }, {
            from: 'Show',
            to: '2014',
            scaleUsing: {
                func: utility.scaleProportionalY,
                args: {}
            },
            original: 'M116.745-15' +
                'c0,0,0,3.103,0,13' +
                'c0,12.82-25.702,19.756-44.745,27' +
                'C44.486,35.467,18,36.02,18,61.5' +
                'c0,26,17.5,36.828,44.778,36.828' +
                'C102.667,98.328,104,51,104,51' +
                'H-16' +
                'v36' +
                'c0,0,39.618,9.865,62,36' +
                'c21.141,24.686,23.541,28,47.023,28' +
                'C108,151,118,151,118,151v47.724'
        }];

    var temp_path = d3.select('body')
        .append('svg')
        .style('display', 'none')
        .append('path');

    segments.forEach(function (d, i) {
        temp_path.attr('d', d.original);
        console.log(temp_path);

        utility.convertToRelative(temp_path.node());

        d.relative = temp_path.attr('d');

        d.scale = d.scaleUsing
                   .func(temp_path.node(), d.scaleUsing.args);
    });

    window.segments = segments;

    return segments;
};
},{"./svg":77}],71:[function(require,module,exports){
module.exports = function fullscreen () {
    var self = {},
        selection,
        img_width = 0,
        img_height = 0;

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        selection.each(function (d, i) {
            this.onload = function () {
                if (img_height < this.naturalHeight) {
                    img_height = this.height;
                }
                if (img_width < this.naturalWidth) {
                    img_width = this.width;
                }
                make_full_screen();
            };
            
        });

        return self;
    };
    self.resize = function () {
        make_full_screen();
        return self;
    };

    self.setup = function () {
        d3.select(window)
            .on('resize.fullscreen', function () {
                make_full_screen();
            });

        return self;
    };


    function make_full_screen () {
        if (!selection) throw "full screen requires a selection";

        var width = window.innerWidth,
            height = window.innerHeight;

        if (height > width) {
            selection
                .style('width',
                    ( width * (img_width/img_height)) +'px');
            selection.style('height', '100%');
        } else {
            selection
                .style('height',
                    ( height * (img_width/img_height)) +'px');
            selection.style('width', '100%');
        }
    }
    return self;
};
},{}],72:[function(require,module,exports){
var Nav = require('./overlay_nav'),
    Logo = require('./logo');

module.exports = function site () {
    var self = {},
        color_values = {
            purple: 'rgb(38, 34, 98);',
            orange: 'rgb(255, 61, 56);',
            'lt-purple': 'rgb(146, 53, 125)',
            green: 'rgb(144, 218, 73)',
            blue: 'rgb(43, 89, 184)'
        },
        use_images_as_overlay_background = true,
        background_image_rotation_method = 'block',
        background_image_rotation_methods = ['fade', 'block'];

    var colors = Object.keys(color_values);

    var nav = Nav();
    var logo = Logo();

    self.dispatch = d3.dispatch('htmlLoaded');

    self.render = function () {
        var body = d3.select('body');
        body.html('');

        var random_index = Math.floor(Math.random() * colors.length);

        var color = colors[random_index];
        var alt_colors = colors.slice(0,random_index)
                               .concat(colors.slice(
                                                random_index + 1,
                                                colors.length));

        var alt_color = alt_colors[
                            Math.floor(
                                Math.random() *
                                alt_colors.length)];

        body.classed('concept_06', true);
        body.classed('body-' + color, true);
        body.classed('body-alt-' + alt_color, true);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                'src/concept_06/body.html', function (html) {

            body.node().appendChild(html.cloneNode(true))          ;
            self.dispatch.htmlLoaded();

            var pairs = d3.selectAll('.overlay-nav-item')
                .datum(function () { return this.dataset; });


            if (use_images_as_overlay_background) {
                nav.rotateBackground(
                        d3.selectAll('.rotating-background-image'))
                    .rotateMethod(background_image_rotation_method);
            } else {
                d3.selectAll('.rotating-background-image').remove();
                d3.select('.overlay-background-image-screen')
                    .classed('no-images', true);
            }
            nav.selection(pairs)
                .setup();

            logo.container(d3.select('.logo-line'))
                .attachResize()
                .render();
        });
        return self;
    };

    return self;
};
},{"./logo":73,"./overlay_nav":75}],73:[function(require,module,exports){
var connectLogoScale = require('./connect_logo_scale');
var connectLogo = require('./connect_logo');

module.exports = function logo () {
    var self = {},
        window_sel = d3.select(window),
        logo_container_sel,
        logo_svg,
        logo_text_sel,
        logo_line_text_sel,
        logo_line_connecting_sel,
        straight_line = d3.svg.line(),
        connect_logo = connectLogo,
        connect_logo_scale = connectLogoScale();

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.attachResize = function () {
        window_sel
            .on('resize.logo', function () {
                var window_width = window.innerWidth,
                    window_height = window.innerHeight;

                logo_svg
                    .attr('width', window_width)
                    .attr('height', window_height);

                if (logo_line_connecting_sel) {
                    update_logo_line();
                }

            });
        return self;
    };

    self.render = function () {
        // set up svg
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        // selection of the text that will define the line
        logo_text_sel = d3.select('header')
                          .selectAll('.logo-text-component');

        // verticies for 
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies);

        logo_line_text_sel = logo_svg.selectAll('.logo-line-text')
            .data(text_verticies)
            .enter()
            .append('path')
                .attr('class', 'logo-line-text')
                .attr('d', straight_line);

        logo_line_connecting_sel =
            logo_svg
                .selectAll('.logo-line-connecting')
                .data(connecting_segments)
                .enter()
                .append('path')
                    .attr('class', 'logo-line-connecting')
                    .attr('d', function (d) { return d; });
    };

    function update_logo_line () {
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies);

        logo_line_text_sel
            .data(text_verticies)
            .attr('d', straight_line);

        logo_line_connecting_sel
            .data(connecting_segments)
            .attr('d', function (d) { return d; });
    }

    function logo_line_text_verticies (sel) {
        var text_verticies = [];

        sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(0.55)))];
            } else {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.55)))];
            }

            second = [bounds.right + 6,
                 (bounds.top + (bounds.height*(0.55)))];

            text_verticies.push([first, second]);

        });

        console.log(text_verticies);

        return text_verticies;
    }

    function logo_line_connecting_segments(start_end_points) {
        var connecting_segments = [];
        for (var i = 0; i < start_end_points.length; i++) {
            if ((i+1) < start_end_points.length) {
                var start = start_end_points[i][1],
                    end = start_end_points[i+1][0];

                connecting_segments
                    .push(
                        connect_logo_scale[i]
                            .scale(start, end));
            }
        }
        return connecting_segments;
    }

    return self;
};
},{"./connect_logo":69,"./connect_logo_scale":70}],74:[function(require,module,exports){
var RotateSvg = require('./rotate');

module.exports = function button () {
    var self = {},
        selection,
        dimensions;

    var rotate_svg = RotateSvg();

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        dimensions = get_dimensions(selection);
        rotate_svg
            .selection(selection.select('#flower'));

        return self;
    };

    self.start = function () {
        rotate_svg.start();
        return self;
    };

    function get_dimensions (selection) {
        return selection.node().getBoundingClientRect();
    }

    return self;
};
},{"./rotate":76}],75:[function(require,module,exports){
var fullscreenImg = require('./fullscreen_img'),
    Button = require('./overlay_button');

module.exports = function nav () {
    var self = {},
        target_sel,
        rotate_background_sel,
        rotate_background_length = 0,
        rotate_direction_ascending = true,
        overlaid = false,
        body_sel = d3.select('body'),
        rotate_methods = {
            fade: rotate_fade,
            block: rotate_block
        },
        rotate_method = 'fade';

    var full_screen = fullscreenImg().setup();
    var button = Button();

    self.selection = function (_) {
        if (!arguments.length) return target_sel;
        target_sel = _;

        button
            .selection(target_sel)
            .start();

        return self;
    };

    self.rotateMethod = function (_) {
        if (!arguments.length) return rotate_method;
        rotate_method = _;
        return self;
    };

    self.rotateBackground = function (_) {
        if (!arguments.length) return rotate_background_sel;
        rotate_background_sel = _;

        // set intial values;
        rotate_background_sel
            .datum(function (d, i) {
                d = {};

                d.opacity = (i === 0) ? 1 : 0;
                rotate_background_length += 1;

                return d;
            });

        full_screen.selection(rotate_background_sel)
            .resize();

        return self;
    };

    self.setup = function () {
        if (!target_sel) throw "requires elements to pair";
        target_sel
            .on('click.nav', function (d, di) {
                target_sel
                    .select('#flower');
                overlaid = overlaid ? false : true;
                if (overlaid) rotate();
                activate_deactivate(d);
            });
    };

    function activate_deactivate (d) {
        var overlay = d3.select(d.activate);
        overlay.classed('overlaid', overlaid);
        body_sel.classed('no-scroll', overlaid);
        body_sel.classed(d.body, overlaid);
    }

    function rotate () {
        rotate_methods[rotate_method]();
    }

    function rotate_block () {
        var speed = 800,
            pause = 8000;

        rotate_background_sel
            .transition()
            .duration(500 * rotate_background_length)
            .delay(function (d, i) {
                return i * speed;
            })
            .each('start', function () {
                rotate_background_sel.style('display', 'none');
            })
            .style('display', 'block')
            .each('end', function () {
                setTimeout(function () {
                    rotate_background_sel.style('display', 'none');
                    if (overlaid) rotate();
                }, pause);
            });

    }

    function rotate_fade () {
        rotate_background_sel.transition()
            .duration(5000)
            .each("start", function () {
                rotate_background_sel.each(function (d, i) {
                    d3.select(this).style('z-index', d.z);
                });
            })
            .style('opacity', function (d) {
                return d.opacity;
            })
            .each("end", function () {
                // find current 
                var current_index = 0,
                    next_current_index;

                // get the current index
                rotate_background_sel.each(function (d, i) {
                    if (d.current) {
                        current_index = i;
                    }
                });

                // set the next index based on ascending or not
                // also changing ascending bool if necessary
                if (rotate_direction_ascending) {
                    next_current_index = current_index + 1;
                    if (next_current_index >
                         (rotate_background_length - 1)) {
                        current_index =
                            rotate_background_length - 2;
                        rotate_direction_ascending = false;
                    }
                } else {
                    next_current_index = current_index - 1;
                    if (next_current_index < 0) {
                        next_current_index = 0;
                        rotate_direction_ascending = true;
                    }
                }

                // set opacity values based on next current index
                rotate_background_sel.each(function (d, i) {
                    d.opacity = ((i === next_current_index) ||
                                 (i === current_index)) ?
                                1 : 0;
                    d.current = (i === next_current_index) ?
                                true : false;

                    if (i === next_current_index) {
                        d.z = 3;
                    } else if (i === current_index) {
                        d.z = 2;
                    } else {
                        d.z = 1;
                    }

                });

                if (overlaid) rotate();
            });
    }

    return self;
};
},{"./fullscreen_img":71,"./overlay_button":74}],76:[function(require,module,exports){
module.exports = function rotate () {
    var self = {},
        selection,
        offset = 0,
        speed = 0.2,
        start = Date.now(),
        radius;

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        radius = selection.node().getBoundingClientRect().height/2;

        return self;
    };

    self.start = function () {
        start = Date.now();

        selection
            .on('mouseover', function () {
                speed = 1;
            })
            .on('mouseout', function () {
                speed = 0.2;
            })
            .on('click.rotate', function () {
                setTimeout(function () {
                    speed = 0.2;
                }, 1000);
                speed = 5;
            });


        d3.timer(function () {
            var angle = (Date.now() - start) * speed;
            selection
                .style(vendor+'transform',
                      'rotate('+ (angle/radius) +'deg)');
        });
    };

    function get_position () {
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;

        
    }

    return self;
};
},{}],77:[function(require,module,exports){
module.exports = function svg () {
    var self = {};

    self.convertToRelative = function (path) {
        function set(type) {
            var args = [].slice.call(arguments, 1),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            segs.replaceItem(rseg, i);
        }
        var dx, dy, x0, y0, x1, y1, x2, y2,
            segs = path.pathSegList;
        for (var x = 0, y = 0, i = 0, len = segs.numberOfItems;
             i < len;
             i++) {
            
            var seg = segs.getItem(i),
                c   = seg.pathSegTypeAsLetter;

            if (/[MLHVCSQTAZz]/.test(c)) {
                if ('x1' in seg) x1 = seg.x1 - x;
                if ('x2' in seg) x2 = seg.x2 - x;
                if ('y1' in seg) y1 = seg.y1 - y;
                if ('y2' in seg) y2 = seg.y2 - y;
                if ('x'  in seg) dx = -x + (x = seg.x);
                if ('y'  in seg) dy = -y + (y = seg.y);
                switch (c) {
                    case 'M':
                        set('Moveto',dx,dy);
                        break;
                    case 'L':
                        set('Lineto',dx,dy);
                        break;
                    case 'H':
                        set('LinetoHorizontal',dx);
                        break;
                    case 'V':
                        set('LinetoVertical',dy);
                        break;
                    case 'C':
                        set('CurvetoCubic',dx,dy,x1,y1,x2,y2);
                        break;
                    case 'S':
                        set('CurvetoCubicSmooth',dx,dy,x2,y2);
                        break;
                    case 'Q':
                        set('CurvetoQuadratic',dx,dy,x1,y1);
                        break;
                    case 'T':
                        set('CurvetoQuadraticSmooth',dx,dy);
                        break;
                    case 'A':
                        set('Arc',dx,dy,seg.r1,seg.r2,seg.angle,
                            seg.largeArcFlag,seg.sweepFlag);
                        break;
                    case 'Z': case 'z': x = x0; y = y0; break;
                }
            } else {
                if ('x' in seg) x += seg.x;
                if ('y' in seg) y += seg.y;
            }
            // store the start of a subpath
            if (c == 'M' || c == 'm') {
                x0 = x;
                y0 = y;
            }
        }
        path.setAttribute('d',
                          path.getAttribute('d')
                              .replace(/Z/g, 'z'));
    };

    self.pathDelta = function (path) {
        var delta = {
            x: 0,
            y: 0
        };

        var start = path.getPointAtLength(0),
            end = path.getPointAtLength(path.getTotalLength());

        delta.x = end.x - start.x;
        delta.y = end.y - start.y;

        return delta;
    };

    // pass in a path element
    // and the path segement indicies
    // that will be scaled
    self.scaleAnchorY = function (path, anchors) {
        // console.log('scaleAnchorY');
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        return function (start, end) {
            // current delta
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            for (var name in anchors) {
                var to_replace = segments.getItem(anchors[name]);
                var replace_with =
                    path.createSVGPathSegCurvetoCubicRel(
                        to_replace.x,
                        to_replace.y + ((delta.current.y-
                                         delta.drawn.y)/2),
                        to_replace.x1,
                        to_replace.y1,
                        to_replace.x2,
                        to_replace.y2);
                segments.replaceItem(replace_with, anchors[name]);
            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportional = function (path) {
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                console.log('seg.x, seg.y');
                console.log(seg.x + ',' + seg.y);
                if ('x1' in seg) x1 = seg.x1 * ratio.x;
                if ('x2' in seg) x2 = seg.x2 * ratio.x;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                if ('x'  in seg) dx = seg.x  * ratio.x;
                if ('y'  in seg) dy = seg.y  * ratio.y;
                // console.log(dx, dy);
                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalY = function (path) {
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                console.log('seg.x, seg.y');
                console.log(seg.x + ',' + seg.y);
                if ('x1' in seg) x1 = seg.x1;
                if ('x2' in seg) x2 = seg.x2;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                if ('x'  in seg) dx = seg.x;
                if ('y'  in seg) dy = seg.y  * ratio.y;
                // console.log(dx, dy);
                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalX = function (path) {
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                console.log('seg.x, seg.y');
                console.log(seg.x + ',' + seg.y);
                if ('x1' in seg) x1 = seg.x1 * ratio.x;
                if ('x2' in seg) x2 = seg.x2 * ratio.x;
                if ('y1' in seg) y1 = seg.y1;
                if ('y2' in seg) y2 = seg.y2;
                if ('x'  in seg) dx = seg.x  * ratio.x;
                if ('y'  in seg) dy = seg.y;
                // console.log(dx, dy);
                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    return self;
};
},{}],78:[function(require,module,exports){
module.exports = function () {
    var self = {},
        wrapper,
        cls = 'department';

    var departments = [
        'Architecture',
        'Ceramics',
        'Digital + Media',
        'Furniture Design',
        'Glass',
        'Graphic Design',
        'Industrial Design',
        'Interior Architecture',
        'Jewelry + Metalsmithing',
        'Landscape Architecture',
        'Painting',
        'Photography',
        'Printmaking',
        'Sculpture',
        'Textiles'
    ];

    self.wrapper = function (x) {
        if (!arguments.length) return wrapper;
        wrapper = x;
        return self;
    };
    self.departments = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.render = function () {
        if (!wrapper) throw "requires a wrapper";

        wrapper
            .append('ul')
            .selectAll(cls)
            .data(departments)
            .enter()
            .append('li')
            .append('p')
            .text(function (d) {
                return d;
            });
    };


    return self;
};
},{}],79:[function(require,module,exports){
var prototypes = {
    concept: {
        '00': Concept_00,
        '01': Concept_01,
        '01a': Concept_01a,
        '02': Concept_02,
        '03': Concept_03,
        '04': Concept_04,
        '04a': Concept_04a,
        '04b': Concept_04b,
        '04c': Concept_04c,
        '04d': Concept_04d,
        '04e': Concept_04e,
		'04g': Concept_04g,
        '05': Concept_05,
        '05a': Concept_05a,
        '05b': Concept_05b,
        '05c': Concept_05c,
        '06': Concept_06
    },
    work: {
        '01': Work_01,
        '01a': Work_01a,
        '01b': Work_01b,
        '02': Work_02,
        '03': Work_03,
        '04': Work_04
    },
    index: {
        '00': function () {}
    }
};

var prototype_to_load = (function () {
    var hash_vars = ['index', '00'];

    var hash = window.location.hash;

    if (hash) {
        hash_vars = hash.split('#')[1].split('&')[0].split('=');
    }

    // return ['work', '01']
    return hash_vars;
})();

exhibition = prototypes[prototype_to_load[0]][prototype_to_load[1]]();

window.exhibition = exhibition;

function Work_01 () {
    var work = require('./work_01/index.js')().render();
    return work;
}
function Work_01a () {
    var work = require('./work_01a/index.js')().render();
    return work;
}
function Work_01b () {
    var work = require('./work_01b/index.js')().render();
    return work;
}
function Work_02 () {
    var work = require('./work_02/index.js')().render();
    return work;
}
function Work_03 () {
    var work = require('./work_03/index.js')().render();
    return work;
}
function Work_04 () {
    var work = require('./work_04/index.js')().render();
    return work;
}

function Concept_00 () {
    var concept = require('./concept_00/index.js')().render();
    return concept;
}

function Concept_01 () {
    var concept = require('./concept_01/index.js')().render();
    return concept;
}

function Concept_01a () {
    var concept = require('./concept_01a/index.js')().render();
    return concept;
}

function Concept_02 () {
    var concept = require('./concept_02/index.js')().render();
    return concept;
}

function Concept_03 () {
    var concept = require('./concept_03/index.js')().render();
    return concept;
}

function Concept_04 () {
    var concept = require('./concept_04/index.js')().render();
    return concept;
}

function Concept_04a () {
    var concept = require('./concept_04a/index.js')().render();
    return concept;
}

function Concept_04b () {
    var concept = require('./concept_04b/index.js')().render();
    return concept;
}

function Concept_04c () {
    var concept = require('./concept_04c/index.js')().render();
    return concept;
}

function Concept_04d () {
    var concept = require('./concept_04d/index.js')().render();
    return concept;
}

function Concept_04e () {
    var concept = require('./concept_04e/index.js')().render();
    return concept;
}

function Concept_04g () {
    var concept = require('./concept_04g/index.js')().render();
    return concept;
}

function Concept_05 () {
    var concept = require('./concept_05/index.js')().render();
    return concept;
}

function Concept_05a () {
    var concept = require('./concept_05a/index.js')().render();
    return concept;
}

function Concept_05b () {
    var concept = require('./concept_05b/index.js')().render();
    return concept;
}

function Concept_05c () {
    var concept = require('./concept_05c/index.js')().render();
    return concept;
}

function Concept_06 () {
    var concept = require('./concept_06/index.js')().render();
    return concept;
}
},{"./concept_00/index.js":2,"./concept_01/index.js":5,"./concept_01a/index.js":7,"./concept_02/index.js":9,"./concept_03/index.js":11,"./concept_04/index.js":12,"./concept_04a/index.js":14,"./concept_04b/index.js":18,"./concept_04c/index.js":23,"./concept_04d/index.js":28,"./concept_04e/index.js":33,"./concept_04g/index.js":38,"./concept_05/index.js":41,"./concept_05a/index.js":45,"./concept_05b/index.js":53,"./concept_05c/index.js":62,"./concept_06/index.js":72,"./work_01/index.js":81,"./work_01a/index.js":83,"./work_01b/index.js":85,"./work_02/index.js":87,"./work_03/index.js":89,"./work_04/index.js":91}],80:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <div class="filters"></div>' +
'    <div class="work"></div>' +
'</div>';
},{}],81:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_01', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.module.width + 'px';
                })
                .style('height', function (d) {
                    return d.module.height + 'px';
                })
            .append('img')
                .attr('src', function (d) {
                    
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    gutter: 20
                }
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":80}],82:[function(require,module,exports){
module.exports=require(80)
},{}],83:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_01a', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.module.width + 'px';
                })
                .style('height', function (d) {
                    return d.module.height + 'px';
                })
            .append('img')
                .attr('src', function (d) {
                    
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece'
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":82}],84:[function(require,module,exports){
module.exports=require(80)
},{}],85:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_01b', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    return d.module.width/2 + 'px';
                })
                .style('height', function (d) {
                    return d.module.height/2 + 'px';
                })
            .append('img')
                .attr('src', function (d) {
                    
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    gutter: 20
                }
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":84}],86:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <div class="work"></div>' +
'</div>';
},{}],87:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_02', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_department': d.risd_department,
                            'module': md
                        });
                    }
                });
            });

            self.data(formatted_work).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', 'piece')
                .style('width', function (d) {
                    if (d.module.width > d.module.height) {
                        return '100px';
                    } else {
                        return ((d.module.height/d.module.width) *
                                 100) + 'px';
                    }
                })
                .style('height', function (d) {
                    if (d.module.height > d.module.width) {
                        return '100px';
                    } else {
                        return ((d.module.width/d.module.height) *
                                 100) + 'px';
                    }
                })
                .style('background-image', function (d) {
                    return 'url(' + d.module.src + ')';
                });
        var iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    gutter: 20
                }
            });
        window.iso = iso;
    }


    return self;
};
},{"./html":86}],88:[function(require,module,exports){
module.exports=require(80)
},{}],89:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_03', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);
            var formatted_work = [];
            work.forEach(function (d, i) {
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        formatted_work.push({
                            'project_name': d.name,
                            'student_name': d.owners[0].display_name,
                            'risd_program': d.risd_program,
                            'module': md
                        });
                        if (risd_programs
                                .indexOf(d.risd_program) < 0) {

                            risd_programs.push(d.risd_program);
                        }
                    }
                });
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' + format_program(d.risd_program);
                })
                .style('width', function (d) {
                    if (d.module.width > d.module.height) {
                        return '100px';
                    } else {
                        return ((d.module.height/d.module.width) *
                                 100) + 'px';
                    }
                })
                .style('height', function (d) {
                    if (d.module.height > d.module.width) {
                        return '100px';
                    } else {
                        return ((d.module.width/d.module.height) *
                                 100) + 'px';
                    }
                })
                .style('background-image', function (d) {
                    return 'url(' + d.module.src + ')';
                })
            .append('img')
                .attr('src', function (d) {
                    return d.module.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece'
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":88}],90:[function(require,module,exports){
module.exports=require(80)
},{}],91:[function(require,module,exports){
var html = require('./html');

module.exports = function work_01 () {
    var self = {},
        data,
        grid_selection,
        work_container_selection,
        work_selection,
        filter_container_selection,
        filter_selection,
        risd_programs = ['All'],
        iso;

    self.render = function () {
        var body = d3.select('body');
        body.html(html);
        body.classed('work_04', true);

        grid_selection = d3.select('.grid');
        work_container_selection = grid_selection.select('.work');
        filter_container_selection = grid_selection
            .select('.filters');

        if (data) {
            render_work();
        } else {
            get_and_render_work();
        }

        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    function get_and_render_work () {
        d3.json("http://" +
                window.location.host +
                window.location.pathname +
                'data/projects20140408.json', function (work) {

            console.log('work');
            console.log(work);

            var cover_options = ['202', '404'];
            var cover_dimensions = {
                'cover115': {
                    width: 115,
                    height: 90
                },
                'cover202': {
                    width: 202,
                    height: 158
                },
                'cover230': {
                    width: 230,
                    height: 180
                },
                'cover404': {
                    width: 404,
                    height: 316
                }
            };

            var formatted_work = [];
            work.forEach(function (d, i) {
                var modules_to_include = [];
                d.details.modules.forEach(function (md, mi) {
                    if (md.type === 'image') {
                        modules_to_include.push(md);
                    }
                });

                var random_cover_option =
                    cover_options[Math.floor(Math.random() *
                                       cover_options.length)];

                var random_cover = {
                    width: cover_dimensions[
                                'cover'+random_cover_option].width,
                    height: cover_dimensions[
                                'cover'+random_cover_option].height,
                    src: d.covers[random_cover_option],
                    clss: 'cover'+random_cover_option
                };

                formatted_work.push({
                    'project_name': d.name,
                    'student_name': d.owners[0].display_name,
                    'risd_program': d.risd_program,
                    'modules': modules_to_include,
                    'cover': random_cover
                });

                if (risd_programs.indexOf(d.risd_program) < 0) {
                    risd_programs.push(d.risd_program);
                }
            });

            self.data(shuffle(formatted_work)).render();
        });
    }

    function render_work () {
        work = work_container_selection.selectAll('.piece')
            .data(data)
            .enter()
            .append('div')
                .attr('class', function (d) {
                    return 'piece ' +
                           format_program(d.risd_program) + ' ' +
                           d.cover.clss;
                })
            .append('img')
                .attr('src', function (d) {
                    return d.cover.src;
                });

        iso = new Isotope(work_container_selection.node(), {
                itemSelector: '.piece',
                masonry: {
                    columnWidth: 202,
                    gutter: 20
                }
            });
        window.iso = iso;

        filter_selection = filter_container_selection
            .selectAll('filter')
            .data(risd_programs)
            .enter()
            .append('p')
            .attr('class', 'filter')
            .text(function (d) {
                return d;
            })
            .on('click', function (d) {
                var program = d;
                if (program === 'All') program = '';
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                                    .classed(format_program(
                                                program));
                    }
                });
            });
    }

    function shuffle (o) {
        for(var j, x, i = o.length;
            i;
            j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function format_program(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{"./html":90}]},{},[79])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAwL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvbWFwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDEvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAxL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDFhL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDIvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wMy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0L2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRhL2JvdHRvbS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0YS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0YS9sb2dvLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRhL3dvcmsuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGIvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGIvbGlnaHRib3hfem9vbV91cC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0Yi93b3JrLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRjL2xpZ2h0Ym94X3pvb21fdXAuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGMvd29yay5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0ZC9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0ZC9saWdodGJveF9mYWRlX3VwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRkL3dvcmsuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGUvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNGcvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1L2xvZ28uanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNS9sb2dvX2NvbXBvbmVudHMuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWEvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWEvbGlnaHRib3hfZmFkZV91cC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1YS9sb2dvLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDVhL2xvZ29fY29tcG9uZW50cy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1YS90cmFuc2xhdGUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWEvd29yay5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi9kZXBhcnRtZW50cy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi9saWdodGJveF9mYWRlX3VwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDViL2xvZ28uanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWIvbG9nb19jb21wb25lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDViL2xvZ29fY29ubmVjdGluZy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi9zZWN0aW9uX25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yi90cmFuc2xhdGUuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWIvd29yay5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA1Yy9saWdodGJveF9mYWRlX3VwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDVjL2xvZ28uanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWMvbG9nb19zdGF0aWNfcGF0aHMuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNWMvd29yay5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L2Nvbm5lY3RfbG9nby5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L2Nvbm5lY3RfbG9nb19zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L2Z1bGxzY3JlZW5faW1nLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDYvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNi9sb2dvLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDYvb3ZlcmxheV9idXR0b24uanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wNi9vdmVybGF5X25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L3JvdGF0ZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA2L3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9kZXBhcnRtZW50cy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL2h0bWwuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29ya18wMS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxYS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxYi9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAyL2h0bWwuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29ya18wMi9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAzL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmtfMDQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDblBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdlBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN6TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9SQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPVxuJzxkaXYgY2xhc3M9XCJncmlkXCI+JyArXG4nICAgIDxzZWN0aW9uIGlkPVwiYWJvdXRcIiBjbGFzcz1cImFib3V0XCI+JyArXG4nICAgICAgICA8aGdyb3VwIGNsYXNzPVwidGl0bGVcIj4nICtcbicgICAgICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nIHNjaG9vbFwiPlJJU0Q8L2gxPicgK1xuJyAgICAgICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmcgZXZlbnRcIj5HcmFkIFNob3c8L2gxPicgK1xuJyAgICAgICAgPC9oZ3JvdXA+JyArXG4nICAgICAgICA8aGdyb3VwIGNsYXNzPVwic3VidGl0bGVcIj4nICtcbicgICAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nIHNjaG9vbFwiPlJob2RlIElzbGFuZCBTY2hvb2wgb2YgRGVzaWduPC9oMz4nICtcbicgICAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nIGV2ZW50XCI+R3JhZHVhdGUgVGhlc2lzIEV4aGliaXRpb248L2gzPicgK1xuJyAgICAgICAgPC9oZ3JvdXA+JyArXG4nICAgICAgICA8cD5EYS4geiBzaG93LjwvcD4nICtcbicgICAgPC9zZWN0aW9uPicgK1xuJyAgICA8c2VjdGlvbiBpZD1cIndoZXJlXCIgY2xhc3M9XCJ3aGVyZVwiPicgK1xuJyAgICAgICAgPGRpdiBjbGFzcz1cIm1hcFwiPicgK1xuJyAgICAgICAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHdpZHRoPVwiNTAwcHhcIicgK1xuJyAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiNDA3LjAyM3B4XCIgdmlld0JveD1cIjAgMCA1MDAgNDA3LjAyM1wiIGVuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCA1MDAgNDA3LjAyM1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+JyArXG4nICAgICAgICAgICAgPGRlZnM+JyArXG4nICAgICAgICAgICAgICAgIDxtYXJrZXIgaWQ9XCJtYXJrZXItcG9pXCIgY2xhc3M9XCJtYXJrZXItcG9pXCIgIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBtYXJrZXJXaWR0aD1cIjUwXCIgbWFya2VySGVpZ2h0PVwiNTBcIiBtYXJrZXJVbml0cz1cInVzZXJTcGFjZW9uVXNlXCIgcmVmWD1cIjI1XCIgcmVmWT1cIjI1XCI+JyArXG4nICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCIzMS4zMzgsMTYuODI4IDQ1LjY1NywxMS4zOCA1MCwyNC40NTUgMzUuNDQ2LDI5LjE3NiA0NS40MjMsNDEuMjgzIDM0LjM5LDUwIDI1LDM3LjA0NSAxNS42MTEsNTAgNC41NzgsNDEuMjgzICcgK1xuJyAgICAgICAgICAgICAgICAgICAgICAgIDE0LjU1NCwyOS4xNzYgMCwyNC40NTUgNC4zNDMsMTEuMzggMTguNjYyLDE2LjgyOCAxOC4zMSwwIDMxLjY5MSwwIFwiLz4nICtcbicgICAgICAgICAgICAgICAgPC9tYXJrZXI+JyArXG4nICAgICAgICAgICAgPC9kZWZzPicgK1xuJyAgICAgICAgICAgIDxnIGNsYXNzPVwic3RyZWV0c1wiPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAsODEuNDA0YzAsMCw1MS4zMzQsMi44NCw2OC4zNzIsOC4wNDZzNjIuOTQ3LDE1LjE0Niw2Mi45NDcsMTUuMTQ2JyArXG4nICAgICAgICAgICAgICAgICAgICBzNTEuMTE1LDguNTIsNzkuNTEyLTAuOTQ3YzI4LjM5Ny05LjQ2NSwxMjkuNjgtNTQuOTAyLDEyOS42OC01NC45MDJzMzkuNzU2LTguNTIsNjguNjI2LDcuNTcybDUzLjAwOCw1MS4xMTUnICtcbicgICAgICAgICAgICAgICAgICAgIGMwLDAsMTYuNTY2LDI4Ljg3LDIxLjI5OSw0Mi41OTZjNC43MzIsMTMuNzI1LDExLjgzMiwyNC4zODksMTIuNzc4LDQxLjA2NHMwLDUxLjY5OSwwLDUxLjY5OVM1MDAsMjc0LjUwMiw1MDAsMjgyLjA3NCcgK1xuJyAgICAgICAgICAgICAgICAgICAgcy00LjcyNSwzNi40NDMtNS4xOTgsNDcuMzI4Yy0wLjQ3NCwxMC44ODctMS40Miw0OC4yNzUtMS40Miw0OC4yNzVzMy4zMTMsMjMuNjY4LDMuMzEzLDI5LjM0NlwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDcuMTgyLDBMNDEuODY5LDIzOS40OGMwLDAtMjAuMzUyLDY2LjczNC01LjY4LDExNC41MzUnICtcbicgICAgICAgICAgICAgICAgICAgIGMxNC42NzIsNDcuODAzLDIxLjc3MSw1My4wMDgsMjEuNzcxLDUzLjAwOFwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zMS4wNzIsMzA0Ljc2NGw1OS4yNjEtMjUuMzM2bDUwLjY2Ny0yOGw3MC42NjctODQuMDAxYzAsMCw0LjY2Ny0xMC42NjcsMjcuMzMzLTIyJyArXG4nICAgICAgICAgICAgICAgICAgICBzNjMuMzMzLTI4LDYzLjMzMy0yOGw2NS4zMzMtMzEuMzMzbDM0LjM1Ni0zMy4xODJcIi8+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjIxLjY2NywwYzAsMC0zLjMzMyw0MS40MjYtNS4xMTksNTguMDkzczMuNzg2LDM1LjMzMywzLjc4NiwzNS4zMzNzMS4zMzMsMTIuNjY3LDE4LjY2Nyw0MCcgK1xuJyAgICAgICAgICAgICAgICAgICAgYzE3LjMzMywyNy4zMzQsMy4zMzMsMzcuMzM0LDMuMzMzLDM3LjMzNGwtMjIsMjIuNTg0TDE5OSwyMjMuNDI2YzAsMC0yNi42NjcsMzkuMzM0LTI5LjMzMyw0Mi42NjhzLTE1LjMzMywxNC0yOS4zMzMsNi42NjYnICtcbicgICAgICAgICAgICAgICAgICAgIHMtMjIsMC0yMiwwcy03LjMzMyw0LTIyLjY2NywxMC42NjZjLTE1LjMzMyw2LjY2OC0zOS43ODEsMTAuNzI5LTM5Ljc4MSwxMC43MjlcIi8+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNjcuNzAyLDE0NC43NThsMTYuMTQ3LDYuNzI0YzAsMCwxNC43OTcsNC4zMzcsMzAuODcsMi4wOTNsNzYuMDI2LTEuNTgybDI1LjgwMiwxLjU4MicgK1xuJyAgICAgICAgICAgICAgICAgICAgbDI0LjcxMi0xLjMyOGMwLDAsNC40NTQtMC4wMzMsOC43NC0yLjc1OGMxLjYwMy0xLjAxOCwzLjc2MSwwLjIwNyw3Ljg0MywxLjczOGwxMy4wMTEsMi45OTJsMzEuMzgxLDguMjMyJyArXG4nICAgICAgICAgICAgICAgICAgICBjMCwwLDEzLjI2NiwxLjI3NiwyMC45MiwxMC45NzFzMzEuMzgxLDMyLjE0NSwzMS4zODEsMzIuMTQ1bDM4LjUyMiw0MC41NjRsMzMuMTY2LDMzLjY3OGwyNS4yNTcsMjIuNzA1bDI1Ljc2OCwyMi45NjEnICtcbicgICAgICAgICAgICAgICAgICAgIGwxNy4xNDcsMTUuNTY0XCIvPicgK1xuJyAgICAgICAgICAgIDwvZz4nICtcbicgICAgICAgICAgICA8ZyBjbGFzcz1cInBvaVwiPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE5NC45NiwxNjcuODk1XCIvPicgK1xuJyAgICAgICAgICAgIDwvZz4nICtcbicgICAgICAgICAgICA8L3N2Zz4nICtcbicgICAgICAgIDwvZGl2PicgK1xuJyAgICAgICAgPGRpdiBjbGFzcz1cImxvY2F0aW9uLXdyaXR0ZW5cIj4nICtcbicgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnVpbGRpbmdcIj4nICtcbicgICAgICAgICAgICAgICAgPHA+UkkgQ29udmVudGlvbiBDZW50ZXI8L3A+JyArXG4nICAgICAgICAgICAgICAgIDxwPkV4aGliaXQgSGFsbCBBPC9wPicgK1xuJyAgICAgICAgICAgICAgICA8cD5PbmUgU2FiaW4gU3RyZWV0LCBQcm92aWRlbmNlPC9wPicgK1xuJyAgICAgICAgICAgIDwvZGl2PicgK1xuJyAgICAgICAgPC9kaXY+JyArXG4nICAgIDwvc2VjdGlvbj4nICtcbic8L2Rpdj4nOyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyksXG4gICAgU1ZHTWFwID0gcmVxdWlyZSgnLi9tYXAnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge1xuICAgICAgICBtYXA6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICAvLyBsb2FkIHRoZSBtYXBcbiAgICAgICAgc2VsZi5tYXAgPSBTVkdNYXAucGF0aHMoZDMuc2VsZWN0QWxsKCcuc3RyZWV0cyBwYXRoJykpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTWFwICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBtYXAsXG4gICAgICAgIHBhdGhzX3NlbGVjdGlvbixcbiAgICAgICAgc3RhdGUgPSAnaGlkZGVuJztcblxuICAgIHNlbGYucGF0aHMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwYXRoc19zZWxlY3Rpb247XG4gICAgICAgIHBhdGhzX3NlbGVjdGlvbiA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnN0YXRlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc3RhdGU7XG4gICAgICAgIHN0YXRlID0geDtcbiAgICAgICAgYXBwbHlfc3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGx5X3N0YXRlICgpIHtcbiAgICAgICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfc2hvd1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIiwgdHdlZW5fZGFzaHNbc3RhdGVdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnLS0tLS0tJyk7XG4gICAgY29uc29sZS5sb2coJ1RvZ2dsZSBtYXAgc3RhdGU6Jyk7XG4gICAgY29uc29sZS5sb2coJ2V4aGliaXRpb24ubWFwLnN0YXRlKFwiaGlkZGVuXCIpJyk7XG4gICAgY29uc29sZS5sb2coJ2V4aGliaXRpb24ubWFwLnN0YXRlKFwic2hvd2luZ1wiKScpO1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0nKTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9XG4nPGRpdiBjbGFzcz1cImdyaWRcIj4nICtcbic8L2Rpdj4nOyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc3ZnLFxuICAgICAgICBwYXRocyxcbiAgICAgICAgcG9pcyA9IHt9LFxuICAgICAgICBuYW1lZF9wYXRocyA9IHt9LFxuICAgICAgICBuYW1lZF90ZXh0ID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KTtcblxuICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgfTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBvaV9iYm94ID0gcG9pc1snY29udmVudGlvbi1jZW50ZXItbWFya2VyJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHZhciBwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA9XG4gICAgICAgICAgICBwb2lfYmJveC50b3AgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgaWYgKChuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9PT0gJ2hpZGRlbicpICZcbiAgICAgICAgICAgIChwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA8IDApKSB7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnc2hvd2luZycpO1xuICAgICAgICB9IGVsc2UgaWYgKChuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXRlID09PSAnc2hvd2luZycpICZcbiAgICAgICAgICAgICAgICAgICAocG9pX3JlbGF0aW9uc2hpcF90b193aW5kb3cgPiAwKSkge1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVTZWNvbmQoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhbmltYXRlRmlyc3QnLCAnYW5pbWF0ZVNlY29uZCcpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZUZpcnN0JywgZnVuY3Rpb24gKHRyYW5zaXRpb25fdG9fc3RhdGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rpc3BhdGNoZWQgYW5pbWF0ZUZpcnN0Jyk7XG4gICAgICAgIFxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMzAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cbiAgICAgICAgbmFtZWRfdGV4dFsnZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwKVxuICAgICAgICAgICAgLmRlbGF5KDI3MDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVTZWNvbmQnLFxuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHRyYW5zaXRpb25fdG9fc3RhdGUpIHtcbiAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9IHRyYW5zaXRpb25fdG9fc3RhdGU7XG5cbiAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgICAgIC5kZWxheSgyNzAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JyxcbiAgICAgICAgICAgICAgICAodHJhbnNpdGlvbl90b19zdGF0ZSA9PT0gJ2hpZGRlbicpID8gMCA6IDEpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmh0bWwoaHRtbCk7XG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ3NyYy9jb25jZXB0XzAxL2NvbmNlcHQtMS5zdmcnLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG5cbiAgICAgICAgICAgIHZhciBzdmdfZnJhZ2VtZW50ID0gZDMuc2VsZWN0KCcuZ3JpZCcpLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChyZXN1bHRzLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgICAgICAgIHN2ZyA9IGQzLnNlbGVjdCgnLmdyaWQgc3ZnJyk7XG5cbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNsaW5lXzFfIHBhdGgnKTtcbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0KCcjbGluZSBwYXRoJyk7XG5cbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gJ2hpZGRlbic7XG5cbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgJzAsJyArXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldFRvdGFsTGVuZ3RoKCkpO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgJzAsJyArXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpKTtcblxuXG4gICAgICAgICAgICBwb2lzWydjb252ZW50aW9uLWNlbnRlci1tYXJrZXInXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2Ryb3BfcGluIHBhdGgnKTtcblxuXG4gICAgICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJyNob21lICN0ZXh0XzJfJyk7XG4gICAgICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ10uc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI21hcCAjdGV4dF8xXywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjbGFuZCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjc3RyZWV0LCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNkcm9wX3BpbicpO1xuICAgICAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXS5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZUZpcnN0KCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxYSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc3ZnLFxuICAgICAgICBwYXRocyxcbiAgICAgICAgbmFtZWRfcGF0aHMgPSB7fSxcbiAgICAgICAgbmFtZWRfdGV4dCA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyk7XG5cbiAgICB2YXIgdHdlZW5fZGFzaHMgPSB7XG4gICAgICAgICdoaWRkZW4nOiAgdHdlZW5fZGFzaF9oaWRlLFxuICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfc2hvd1xuICAgIH07XG4gICAgXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhbmltYXRlRmlyc3QnLCAnYW5pbWF0ZVNlY29uZCcpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZUZpcnN0JywgZnVuY3Rpb24gKHRyYW5zaXRpb25fdG9fc3RhdGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rpc3BhdGNoZWQgYW5pbWF0ZUZpcnN0Jyk7XG4gICAgICAgIFxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMzAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cbiAgICAgICAgbmFtZWRfdGV4dFsnZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwKVxuICAgICAgICAgICAgLmRlbGF5KDI3MDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN2Z19iYm94ID0gc3ZnLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgIHBhdGhfYmJveCA9IG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgIGN1cnJlbnRfbGVuZ3RoID0gMDtcblxuICAgICAgICBpZiAoc3ZnX2Jib3gudG9wICA8IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnRfbGVuZ3RoID1cbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgICAgICAgICAuc2NhbGUod2luZG93LmlubmVySGVpZ2h0IC0gcGF0aF9iYm94LnRvcCk7XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRfbGVuZ3RoICsgJywnICtcbiAgICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnRvdGFsX2xlbmd0aCk7XG5cbiAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgKGN1cnJlbnRfbGVuZ3RoL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvdGFsX2xlbmd0aCkpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmh0bWwoaHRtbCk7XG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ3NyYy9jb25jZXB0XzAxL2NvbmNlcHQtMS5zdmcnLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG5cbiAgICAgICAgICAgIHZhciBzdmdfZnJhZ2VtZW50ID0gZDMuc2VsZWN0KCcuZ3JpZCcpLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChyZXN1bHRzLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgICAgICAgIHN2ZyA9IGQzLnNlbGVjdCgnLmdyaWQgc3ZnJyk7XG5cbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNsaW5lXzFfIHBhdGgnKTtcbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0KCcjbGluZSBwYXRoJyk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHBhdGggaW4gbmFtZWRfcGF0aHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbCA9IG5hbWVkX3BhdGhzW3BhdGhdLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgICAgICAgICAgaCA9IG5hbWVkX3BhdGhzW3BhdGhdLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbcGF0aF0uc3RhdGUgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW3BhdGhdLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcwLCcgKyBsICk7XG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbcGF0aF0udG90YWxfbGVuZ3RoID0gbDtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1twYXRoXS5zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAgICAgICAgIC5kb21haW4oWzAsIGhdKVxuICAgICAgICAgICAgICAgICAgICAucmFuZ2UoWzAsIGxdKVxuICAgICAgICAgICAgICAgICAgICAuY2xhbXAodHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI2hvbWUgI3RleHRfMl8nKTtcbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ3NlY29uZC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJyNtYXAgI3RleHRfMV8sICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNtYXAgI2Ryb3BfcGluJyk7XG5cbiAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJyNtYXAgI2xhbmQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjc3RyZWV0JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgdGV4dCBpbiBuYW1lZF90ZXh0KSB7XG4gICAgICAgICAgICAgICAgbmFtZWRfdGV4dFt0ZXh0XS5zdHlsZSgnb3BhY2l0eScsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc3ZnLFxuICAgICAgICBwYXRocyxcbiAgICAgICAgbmFtZWRfcGF0aHMgPSB7fSxcbiAgICAgICAgbmFtZWRfdGV4dCA9IHt9LFxuICAgICAgICBsb2dvcyA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyk7XG5cbiAgICB2YXIgdHdlZW5fZGFzaHMgPSB7XG4gICAgICAgICdoaWRkZW4nOiAgdHdlZW5fZGFzaF9oaWRlLFxuICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfc2hvd1xuICAgIH07XG4gICAgdmFyIHR3ZWVuX2Rhc2hfb3Bwb3NpdGUgPSB7XG4gICAgICAgICdoaWRkZW4nOiAgdHdlZW5fZGFzaF9zaG93X3JldmVyc2UsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9oaWRlX3JldmVyc2VcbiAgICB9O1xuXG4gICAgd2luZG93X3NlbC5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBcbiAgICB9KTtcbiAgICBcbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FuaW1hdGVGaXJzdCcsICdhbmltYXRlU2Vjb25kJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlRmlyc3QnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlRmlyc3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDApXG4gICAgICAgICAgICAuZGVsYXkoMTcwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIGxvZ29zWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnc2hvd2luZycpO1xuICAgICAgICB9LCAzMDAwKTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVTZWNvbmQnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlU2Vjb25kJyk7XG5cbiAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW4nKVxuICAgICAgICAgICAgLmF0dHJUd2Vlbignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoX29wcG9zaXRlW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBsb2dvc1snZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1vdXQnKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgbG9nb3NbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNDAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbicpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cblxuICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxODAwKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLW91dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTgwMClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNDAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbicpXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuXG5cblxuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9IHRyYW5zaXRpb25fdG9fc3RhdGU7XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDIvY29uY2VwdC0yLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmVfMV8gcGF0aCcpO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNsaW5lIHBhdGgnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5zdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10uc3RhdGUgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAnMCwnICtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VG90YWxMZW5ndGgoKSk7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAnMCwnICtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldFRvdGFsTGVuZ3RoKCkpO1xuXG4gICAgICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJyNob21lICN0ZXh0XzFfJyk7XG4gICAgICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ10uc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI21hcCAjdGV4dCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjbGFuZCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjc3RyZWV0LCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNkcm9wX3BpbicpO1xuICAgICAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXS5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgICAgICBsb2dvc1snZmlyc3Qtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjbG9nbyB0ZXh0Jyk7XG4gICAgICAgICAgICBsb2dvc1snc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI2xvZ29fMV8gdGV4dCcpO1xuXG4gICAgICAgICAgICBsb2dvc1snZmlyc3Qtc2VjdGlvbiddLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICBsb2dvc1snc2Vjb25kLXNlY3Rpb24nXS5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlX3JldmVyc2UoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCwwLFwiICsgbCArIFwiLFwiICsgbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjAsXCIgKyBsICsgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvd19yZXZlcnNlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsICsgXCIwLFwiICsgbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjAsMCxcIiArIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzdmcsXG4gICAgICAgIHBhdGhzID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KTtcblxuICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgfTtcbiAgICB2YXIgdHdlZW5fZGFzaF9vcHBvc2l0ZSA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX3Nob3dfcmV2ZXJzZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX2hpZGVfcmV2ZXJzZVxuICAgIH07XG5cbiAgICB3aW5kb3dfc2VsLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgIH0pO1xuICAgIFxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYW5pbWF0ZUZpcnN0JywgJ2FuaW1hdGVTZWNvbmQnKTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVGaXJzdCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIFxuICAgICAgICBwYXRocy5saW5lLmZpcnN0XG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIHBhdGhzLmhpZGVfc2hvdy5maXJzdC5hbGxcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDApXG4gICAgICAgICAgICAuZGVsYXkoMTcwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHBhdGhzLmxvZ28uZmlyc3QuYWxsXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNDAwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVTZWNvbmQnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlU2Vjb25kJyk7XG5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5Jykub24oJ2NsaWNrJywgbnVsbCk7XG5cbiAgICAgICAgcGF0aHMubGluZS5maXJzdFxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgcGF0aFR3ZWVuKHBhdGhzLmxpbmUuc2Vjb25kLmF0dHIoJ2QnKSksIDQpO1xuXG5cbiAgICAgICAgZGVsZXRlIHBhdGhzLmxvZ28uZmlyc3RbJ2FsbCddO1xuICAgICAgICBmb3IgKHZhciBpdGVtIGluIHBhdGhzLmxvZ28uZmlyc3QpIHtcbiAgICAgICAgICAgIHBhdGhzLmxvZ28uZmlyc3RbaXRlbV1cbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAgICAgLmF0dHJUd2VlbigndHJhbnNmb3JtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRocy5sb2dvLmZpcnN0W2l0ZW1dLmF0dHIoJ3RyYW5zZm9ybScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHMubG9nby5zZWNvbmRbaXRlbV0uYXR0cigndHJhbnNmb3JtJykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDIvY29uY2VwdC0yLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgcGF0aHMubG9nbyA9IHtcbiAgICAgICAgICAgICAgICBmaXJzdDoge1xuICAgICAgICAgICAgICAgICAgICByaXNkOiBzdmcuc2VsZWN0KCcjaG9tZSAjbG9nbyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCgxKScpLFxuICAgICAgICAgICAgICAgICAgICBncmFkOiBzdmcuc2VsZWN0KCcjaG9tZSAjbG9nbyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCgyKScpLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiBzdmcuc2VsZWN0KCcjaG9tZSAjbG9nbyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCgzKScpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBzdmcuc2VsZWN0KCcjaG9tZSAjbG9nbyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCg0KScpLFxuICAgICAgICAgICAgICAgICAgICBhbGw6IHN2Zy5zZWxlY3RBbGwoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDEpLCcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDIpLCcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDMpLCcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoNCknKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Vjb25kOiB7XG4gICAgICAgICAgICAgICAgICAgIHJpc2Q6IHN2Zy5zZWxlY3QoJyNtYXAgI2xvZ29fMV8gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMSknKSxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZDogc3ZnLnNlbGVjdCgnI21hcCAjbG9nb18xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCgyKScpLFxuICAgICAgICAgICAgICAgICAgICBzaG93OiBzdmcuc2VsZWN0KCcjbWFwICNsb2dvXzFfICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDMpJyksXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IHN2Zy5zZWxlY3QoJyNtYXAgI2xvZ29fMV8gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoNCknKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIHNlY3Rpb24gaW4gcGF0aHMubG9nbykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGl0ZW0gaW4gcGF0aHMubG9nb1tzZWN0aW9uXSkge1xuICAgICAgICAgICAgICAgICAgICBwYXRocy5sb2dvW3NlY3Rpb25dW2l0ZW1dXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICBwYXRocy5saW5lID0ge1xuICAgICAgICAgICAgICAgIGZpcnN0OiBzdmcuc2VsZWN0KCcjbGluZV8xXyBwYXRoJyksXG4gICAgICAgICAgICAgICAgc2Vjb25kOiBzdmcuc2VsZWN0KCcjbGluZSBwYXRoJylcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGN1ciBpbiBwYXRocy5saW5lKSB7XG4gICAgICAgICAgICAgICAgcGF0aHMubGluZVtjdXJdLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICAnMCwnK1xuICAgICAgICAgICAgICAgICAgICBwYXRocy5saW5lW2N1cl0ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VG90YWxMZW5ndGgoKSk7XG5cbiAgICAgICAgICAgICAgICBwYXRocy5saW5lW2N1cl0uc3RhdGUgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIHBhdGhzLmhpZGVfc2hvdyA9IHtcbiAgICAgICAgICAgICAgICBmaXJzdDoge1xuICAgICAgICAgICAgICAgICAgICBzdWJoZWFkOiBzdmcuc2VsZWN0KCcjaG9tZSAjdGV4dF8xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZzpudGgtY2hpbGQoMSkgdGV4dCcpLFxuICAgICAgICAgICAgICAgICAgICBkYXRlOiBzdmcuc2VsZWN0KCcjaG9tZSAjdGV4dF8xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc+ICo6bnRoLWNoaWxkKDYpJyksXG4gICAgICAgICAgICAgICAgICAgIGFsbDogc3ZnLnNlbGVjdEFsbCgnI2hvbWUgI3RleHRfMV8gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPiAqOm50aC1jaGlsZCg2KSwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2hvbWUgI3RleHRfMV8gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2c6bnRoLWNoaWxkKDEpIHRleHQnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2Vjb25kOiB7XG4gICAgICAgICAgICAgICAgICAgIGxvY19kYXRlOiBzdmcuc2VsZWN0KCcjdGV4dCA+ICo6bnRoLWNoaWxkKDYpJyksXG4gICAgICAgICAgICAgICAgICAgIGFsbDogc3ZnLnNlbGVjdCgnI3RleHQgPiAqOm50aC1jaGlsZCg2KScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGF0aHMuaGlkZV9zaG93LmZpcnN0LmFsbC5zdHlsZSgnb3BhY2l0eScsIDApO1xuICAgICAgICAgICAgcGF0aHMuaGlkZV9zaG93LnNlY29uZC5hbGwuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuXG5cbiAgICAgICAgICAgIHBhdGhzLm1hcCA9IHtcbiAgICAgICAgICAgICAgICBkcm9wX3Bpbjogc3ZnLnNlbGVjdCgnI2Ryb3BfcGluJyksXG4gICAgICAgICAgICAgICAgdGV4dDogc3ZnLnNlbGVjdEFsbCgnI3RleHQgPiAqOm50aC1jaGlsZCgyKSwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjdGV4dCA+ICo6bnRoLWNoaWxkKDQpJylcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBhdGhzLm1hcC5kcm9wX3Bpbi5hdHRyKCd0cmFuc2Zvcm0nLCAnc2NhbGUoMCknKTtcbiAgICAgICAgICAgIHBhdGhzLm1hcC50ZXh0LnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlRmlyc3QoJ3Nob3dpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfaGlkZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcobCArIFwiLFwiICsgbCwgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvdygpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLFwiICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfaGlkZV9yZXZlcnNlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsMCxcIiArIGwgKyBcIixcIiArIGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIwLFwiICsgbCArIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3dfcmV2ZXJzZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLFwiICsgbCArIFwiMCxcIiArIGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIwLDAsXCIgKyBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF0aFR3ZWVuKGQxLCBwcmVjaXNpb24pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBhdGgwID0gdGhpcyxcbiAgICAgICAgICAgIHBhdGgxID0gcGF0aDAuY2xvbmVOb2RlKCksXG4gICAgICAgICAgICBuMCA9IHBhdGgwLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBuMSA9IChwYXRoMS5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQxKSwgcGF0aDEpLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgIFxuICAgICAgICAvLyBVbmlmb3JtIHNhbXBsaW5nIG9mIGRpc3RhbmNlIGJhc2VkIG9uIHNwZWNpZmllZCBwcmVjaXNpb24uXG4gICAgICAgIHZhciBkaXN0YW5jZXMgPSBbMF0sIGkgPSAwLCBkdCA9IHByZWNpc2lvbiAvIE1hdGgubWF4KG4wLCBuMSk7XG4gICAgICAgIHdoaWxlICgoaSArPSBkdCkgPCAxKSBkaXN0YW5jZXMucHVzaChpKTtcbiAgICAgICAgZGlzdGFuY2VzLnB1c2goMSk7XG4gICAgIFxuICAgICAgICAvLyBDb21wdXRlIHBvaW50LWludGVycG9sYXRvcnMgYXQgZWFjaCBkaXN0YW5jZS5cbiAgICAgICAgdmFyIHBvaW50cyA9IGRpc3RhbmNlcy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgICAgIHZhciBwMCA9IHBhdGgwLmdldFBvaW50QXRMZW5ndGgodCAqIG4wKSxcbiAgICAgICAgICAgICAgcDEgPSBwYXRoMS5nZXRQb2ludEF0TGVuZ3RoKHQgKiBuMSk7XG4gICAgICAgICAgcmV0dXJuIGQzLmludGVycG9sYXRlKFtwMC54LCBwMC55XSwgW3AxLngsIHAxLnldKTtcbiAgICAgICAgfSk7XG4gICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgICAgIHJldHVybiB0IDwgMSA/IFwiTVwiICsgcG9pbnRzLm1hcChmdW5jdGlvbihwKSB7IHJldHVybiBwKHQpOyB9KS5qb2luKFwiTFwiKSA6IGQxO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc2VsLFxuICAgICAgICBsb2dvX2NvbXBvbmVudHMgPSBbe1xuICAgICAgICAgICAgdGV4dDogJ1JJU0QnLFxuICAgICAgICAgICAgY2xzOiAnbG9nby1jb21wb25lbnQtLXJpc2QnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRleHQ6ICdHcmFkJyxcbiAgICAgICAgICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1ncmFkJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZXh0OiAnU2hvdycsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tc2hvdydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGV4dDogJzIwMTQnLFxuICAgICAgICAgICAgY2xzOiAnbG9nby1jb21wb25lbnQtLTIwMTQnXG4gICAgICAgIH1dLFxuICAgICAgICBsb2dvX3N2ZyxcbiAgICAgICAgbG9nb19saW5lLFxuICAgICAgICBsaW5lID0gZDMuc3ZnLmxpbmUoKTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb25jZXB0XzA0JywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb250YWluZXInKTtcblxuICAgICAgICBsb2dvX3NlbCA9IGxvZ29fY29udGFpbmVyX3NlbC5zZWxlY3RBbGwoJ2xvZ28tY29tcG9uZW50JylcbiAgICAgICAgICAgIC5kYXRhKGxvZ29fY29tcG9uZW50cylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xvZ28tY29tcG9uZW50ICcgKyBkLmNscztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnRleHQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIGxvZ29fbGluZSA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgICAgICAuZGF0YShbbG9nb192ZXJ0aWNpZXMoKV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tbGluZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKTtcblxuICAgICAgICBncmlkX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDQvZ3JpZC5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgZ3JpZF9zZWwubm9kZSgpLmFwcGVuZENoaWxkKGh0bWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgdmVydGljaWVzID0gW2xvZ29fdmVydGljaWVzKCldO1xuICAgICAgICBsb2dvX2xpbmUuZGF0YSh2ZXJ0aWNpZXMpO1xuICAgICAgICBsb2dvX2xpbmUuYXR0cignZCcsIGxpbmUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fdmVydGljaWVzICgpIHtcbiAgICAgICAgdmFyIGxvZ29fbGluZV92ZXJ0aWNpZXMgPSBbXTtcbiAgICAgICAgbG9nb19zZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfdmVydGljaWVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIFtib3VuZHMubGVmdCAtIDEwLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICBbYm91bmRzLnJpZ2h0ICsgMTAsXG4gICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbG9nb19saW5lX3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwiLy8gcmVxdWlyZXMgZDNcblxuLy8gcGFzcyBpdCBhIGNvbnRhaW5lciwgd2hvc2UgcmVsYXRpb25zaGlwIHRvIHRoZSBib3R0b21cbi8vIG9mIHRoZSB3aW5kb3cgeW91J2QgbGlrZSB0byBrbm93LiBhbmQgaWYgaXRzIGNvbnRhaW5lclxuLy8gaGFzIGEgbWFyZ2luIGJvdHRvbSwgcGFzcyB0aGF0IGluIGFzXG4vLyBhZGRpdGlvbmFsX21hcmdpbl9ib3R0b21fc2VsLlxuXG4vLyB3aWxsIHNlbGYuZGlzcGF0Y2ggd2lsbCBkaXNwYXRjaCB0aGUgbWVzc2FnZSAnYm90dG9tJ1xuLy8gd2hlbiB0aGUgY29udGFpbmVyIGlzIGF0IHRoZSBib3R0b20gb2YgdGhlIHdpbmRvd1xuLy8gaXQgc2V0cyB0aGUgYGRpcnR5YCBmbGFnIHRvIHRydWUuXG5cbi8vIGVsc2Ugd2hlcmUsIGdyYWIgbW9yZSBkYXRhLCBhbmQgdGhlbiByZXNldFxuLy8gdGhlIGBkaXJ0eWAgZmxhZyB0byBmYWxzZS5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBib3R0b20gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRpcnR5ID0gZmFsc2UsXG4gICAgICAgIGFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbSA9IDAsXG4gICAgICAgIGFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbV9zZWwsXG4gICAgICAgIGNvbnRhaW5lcl9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2JvdHRvbScpO1xuXG4gICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgLm9uKCdyZXNpemUuYm90dG9tJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFhZGRpdGlvbmFsX21hcmdpbl9ib3R0b21fc2VsKSByZXR1cm47XG5cbiAgICAgICAgICAgIGFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbSA9XG4gICAgICAgICAgICAgICAgK2FkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbV9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tYm90dG9tJylcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF07XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignc2Nyb2xsLmJvdHRvbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghY29udGFpbmVyX3NlbCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGRpcnR5KSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBjYm94ID0gY29udGFpbmVyX3NlbC5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgIGlmICgoY2JveC5ib3R0b20gKyBhZGRpdGlvbmFsX21hcmdpbl9ib3R0b20pIDw9XG4gICAgICAgICAgICAgICAgKHdpbmRvdy5pbm5lckhlaWdodCkpIHtcblxuICAgICAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmJvdHRvbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHNlbGYuYWRkaXRpb25hbE1hcmdpbkJvdHRvbVNlbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbV9zZWw7XG4gICAgICAgIGFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbV9zZWwgPSBfO1xuXG4gICAgICAgIC8vIHNpZGUgZWZmZWN0IG9mIHVwZGF0aW5nXG4gICAgICAgIGFkZGl0aW9uYWxfbWFyZ2luX2JvdHRvbSA9XG4gICAgICAgICAgICArYWRkaXRpb25hbF9tYXJnaW5fYm90dG9tX3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbWFyZ2luLWJvdHRvbScpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF07XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRpcnR5ID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGlydHk7XG4gICAgICAgIGRpcnR5ID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgRGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpLFxuICAgIFdvcmsgPSByZXF1aXJlKCcuL3dvcmsnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wNCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBncmlkX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnaHRtbExvYWRlZCcpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gRGVwYXJ0bWVudHMoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcbiAgICB2YXIgd29yayA9IFdvcmsoc2VsZik7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDQgY29uY2VwdF8wNGEnLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIC8vIC5sb2dvLWNvbnRhaW5lciBpcyBhIG5laWdoYm9yIG9mIC5ncmlkXG4gICAgICAgIHZhciBsb2dvX2NvbnRhaW5lcl9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbG9nby5jb250YWluZXIobG9nb19jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIGdyaWRfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNGEvZ3JpZC5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgZ3JpZF9zZWwubm9kZSgpLmFwcGVuZENoaWxkKGh0bWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guaHRtbExvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC5kZXBhcnRtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC53cmFwcGVyKGQzLnNlbGVjdCgnLmRlcGFydG1lbnRzJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsaWdodGJveF9jb250YWluZXIgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveCcpO1xuICAgICAgICB3b3JrLmxpZ2h0Ym94XG4gICAgICAgICAgICAuY29udGFpbmVyKGxpZ2h0Ym94X2NvbnRhaW5lcilcbiAgICAgICAgICAgIC5vcmlnaW5hbENvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrJykpO1xuXG4gICAgICAgIHdvcmsuYm90dG9tLmFkZGl0aW9uYWxNYXJnaW5Cb3R0b21TZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKTtcblxuICAgICAgICB3b3JrLmNvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zZWwsXG4gICAgICAgIGxvZ29fY29tcG9uZW50cyA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnUklTRCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tcmlzZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGV4dDogJ0dyYWQnLFxuICAgICAgICAgICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWdyYWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRleHQ6ICdTaG93JyxcbiAgICAgICAgICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1zaG93J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZXh0OiAnMjAxNCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tMjAxNCdcbiAgICAgICAgfV0sXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX2xpbmUsXG4gICAgICAgIGxpbmUgPSBkMy5zdmcubGluZSgpO1xuXG4gICAgd2luZG93X3NlbC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG9nb19jb250YWluZXJfc2VsO1xuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ29fc2VsID0gbG9nb19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnbG9nby1jb21wb25lbnQnKVxuICAgICAgICAgICAgLmRhdGEobG9nb19jb21wb25lbnRzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbG9nby1jb21wb25lbnQgJyArIGQuY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQudGV4dDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fc3ZnID0gbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLXN2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgbG9nb19saW5lID0gbG9nb19zdmcuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgICAgICAgIC5kYXRhKFtsb2dvX3ZlcnRpY2llcygpXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lJylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICgpIHtcbiAgICAgICAgdmFyIHZlcnRpY2llcyA9IFtsb2dvX3ZlcnRpY2llcygpXTtcbiAgICAgICAgbG9nb19saW5lLmRhdGEodmVydGljaWVzKTtcbiAgICAgICAgbG9nb19saW5lLmF0dHIoJ2QnLCBsaW5lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX3ZlcnRpY2llcyAoKSB7XG4gICAgICAgIHZhciBsb2dvX2xpbmVfdmVydGljaWVzID0gW107XG4gICAgICAgIGxvZ29fc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfdmVydGljaWVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIFtib3VuZHMubGVmdCArIDMsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbYm91bmRzLmxlZnQgLSAxMCxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2dvX2xpbmVfdmVydGljaWVzLnB1c2goXG4gICAgICAgICAgICAgICAgW2JvdW5kcy5yaWdodCArIDEwLFxuICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldKTtcblxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxvZ29fbGluZV92ZXJ0aWNpZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBCb3R0b20gPSByZXF1aXJlKCcuL2JvdHRvbScpLFxuICAgIExpZ2h0Ym94ID0gcmVxdWlyZSgnLi4vY29uY2VwdF8wNGIvbGlnaHRib3hfem9vbV91cCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB3b3JrX3NlbCxcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIG1hc29uaWNfZ3V0dGVyID0gMTA7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2RhdGFMb2FkZWQnKTtcblxuICAgIC8vIGRlYWwgd2l0aCB3aW5kb3cgYm90dG9tIGxvYWRpbmcgbW9yZVxuICAgIHZhciBib3R0b20gPSBzZWxmLmJvdHRvbSA9IEJvdHRvbSgpO1xuICAgIHZhciBsaWdodGJveCA9IHNlbGYubGlnaHRib3ggPSBMaWdodGJveCgpO1xuXG4gICAgYm90dG9tLmRpc3BhdGNoLm9uKCdib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldF9tb3JlX2RhdGEoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldF9tb3JlX2RhdGEgKCkge1xuICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm90dG9tLmRpcnR5KGZhbHNlKTtcbiAgICAgICAgICAgIHJlbmRlcl9kYXRhKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZXRfZGF0YSgpO1xuICAgIH1cbiAgICAvLyBlbmQgZGVhbGluZyB3aXRoIHdpbmRvd1xuXG4gICAgdmFyIG1hc29uaWMgPSBkMy5tYXNvbmljKClcbiAgICAgICAgLndpZHRoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuaGVpZ2h0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5oZWlnaHQgKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNvbHVtbldpZHRoKDIwMiArIG1hc29uaWNfZ3V0dGVyKTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChfKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuXG4gICAgICAgIC8vIHNpZGUgZWZmZWN0IG9mIHVwZGF0aW5nIGNvbnRhaW5lclxuICAgICAgICBib3R0b20uY29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdtYXNvbmljJywgdHJ1ZSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb2wtMTAtMTAnLCB0cnVlKTtcblxuICAgICAgICByZW5kZXJfZGF0YSgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZGF0YSgpIHtcbiAgICAgICAgd29ya19zZWwgPSBjb250YWluZXIuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKSArIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIuY2xzcztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGg7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChsaWdodGJveC5zaG93KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzaXplX21hc29uaWMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfbWFzb25pYyAoKSB7XG4gICAgICAgIHZhciBvdXRlcldpZHRoID0gY29udGFpbmVyLnByb3BlcnR5KCdvZmZzZXRXaWR0aCcpO1xuXG4gICAgICAgIG1hc29uaWNcbiAgICAgICAgICAgIC5vdXRlcldpZHRoKG91dGVyV2lkdGgpXG4gICAgICAgICAgICAucmVzZXQoKTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLmRhdHVtKG1hc29uaWMpXG4gICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueCArICdweCc7IH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueSArICdweCc7IH0pXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5kYXRhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLnN0eWxlKCdoZWlnaHQnLCBtYXNvbmljLm91dGVySGVpZ2h0KCkgKyAncHgnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfZGF0YSAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9XG4gICAgICAgICAgICAgICAgZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzKHdvcmspO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5kYXRhTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGRhdGEgY29tZXMgb3V0IGFzOlxuICAgIC8vIFt7XG4gICAgLy8gICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgLy8gICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgLy8gICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAvLyAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgLy8gICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgIC8vIH0sIF1cbiAgICBmdW5jdGlvbiBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMgKHdvcmspIHtcbiAgICAgICAgdmFyIGNvdmVyX29wdGlvbnMgPSBbJzIwMicsICc0MDQnXTtcbiAgICAgICAgdmFyIGNvdmVyX2RpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICAnY292ZXIxMTUnOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDExNSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDkwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvdmVyMjAyJzoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNThcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY292ZXIyMzAnOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIzMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb3ZlcjQwNCc6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogKDQwNCArIG1hc29uaWNfZ3V0dGVyKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICgzMTYgKyBtYXNvbmljX2d1dHRlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcblxuICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcbiAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3Zlcl9vcHRpb24gPVxuICAgICAgICAgICAgICAgIGNvdmVyX29wdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY292ZXJfb3B0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogY292ZXJfZGltZW5zaW9uc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25dLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogY292ZXJfZGltZW5zaW9uc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25dLmhlaWdodCxcbiAgICAgICAgICAgICAgICBzcmM6IGQuY292ZXJzW3JhbmRvbV9jb3Zlcl9vcHRpb25dLFxuICAgICAgICAgICAgICAgIGNsc3M6ICdjb3ZlcicrcmFuZG9tX2NvdmVyX29wdGlvblxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICAgICAnY292ZXInOiByYW5kb21fY292ZXJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtcy5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcbiAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkX3dvcms7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBEZXBhcnRtZW50cyA9IHJlcXVpcmUoJy4uL2RlcGFydG1lbnRzJyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdodG1sTG9hZGVkJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBEZXBhcnRtZW50cygpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yayhzZWxmKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29uY2VwdF8wNCBjb25jZXB0XzA0YicsIHRydWUpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgLy8gLmxvZ28tY29udGFpbmVyIGlzIGEgbmVpZ2hib3Igb2YgLmdyaWRcbiAgICAgICAgdmFyIGxvZ29fY29udGFpbmVyX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb250YWluZXInKTtcblxuICAgICAgICBsb2dvLmNvbnRhaW5lcihsb2dvX2NvbnRhaW5lcl9zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuXG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ3NyYy9jb25jZXB0XzA0Yi9ncmlkLmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBncmlkX3NlbC5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5odG1sTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZXBhcnRtZW50c1xuICAgICAgICAgICAgLndyYXBwZXIoZDMuc2VsZWN0KCcuZGVwYXJ0bWVudHMnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94Jyk7XG4gICAgICAgIHdvcmsubGlnaHRib3hcbiAgICAgICAgICAgIC5jb250YWluZXIobGlnaHRib3hfY29udGFpbmVyKVxuICAgICAgICAgICAgLm9yaWdpbmFsQ29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSk7XG5cbiAgICAgICAgd29yay5ib3R0b20uYWRkaXRpb25hbE1hcmdpbkJvdHRvbVNlbChkMy5zZWxlY3QoJy5ncmlkJykpO1xuXG4gICAgICAgIHdvcmsuY29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpZ2h0Ym94ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lcixcbiAgICAgICAgbGlnaHRib3hfc2VsLFxuICAgICAgICBsaWdodGJveF9pbWdfc2VsLFxuICAgICAgICBzZWxlY3RlZF9zZWwsXG4gICAgICAgIHRvX3RyYW5zaXRpb24gPSB7XG4gICAgICAgICAgICBkaXY6IHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ21hdHJpeCgxLDAsMCwxLDAsMCknLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGggKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCArICdweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1nOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzBweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAwICsgJ3B4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY29udGFpbmVyJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdjb250YWluZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnRhaW5lci5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCBsaWdodGJveCcpO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLm9yaWdpbmFsQ29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JpZ2luYWxfY29udGFpbmVyO1xuICAgICAgICBvcmlnaW5hbF9jb250YWluZXIgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuICAgICAgICBzZWxmLmRpc3BhdGNoLmNvbnRhaW5lcigpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkYXRhIHRvIG1ha2Ugc2hvdyB1cFxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHRocm93IFwiRXhwZWN0ZWQgY29udGFpbmVyLlwiO1xuICAgICAgICBzZWxlY3RlZF9zZWwgPSBzZWw7XG5cbiAgICAgICAgdmFyIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3ggPVxuICAgICAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyXG4gICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB2YXIgY29weSA9IHNlbC5ub2RlKCkuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB2YXIgY29weV9zZWwgPSBkMy5zZWxlY3QoY29weSk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvcHkgPSBjb250YWluZXIubm9kZSgpLmFwcGVuZENoaWxkKGNvcHkpO1xuICAgICAgICBsaWdodGJveF9zZWwgPSBjb250YWluZXIuc2VsZWN0KCcucGllY2UnKTtcbiAgICAgICAgbGlnaHRib3hfaW1nX3NlbCA9IGxpZ2h0Ym94X3NlbC5zZWxlY3QoJ2ltZycpO1xuXG5cbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQud2lkdGggPSBzZWwuc3R5bGUoJ3dpZHRoJyk7XG5cbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQuaGVpZ2h0ID0gc2VsLnN0eWxlKCdoZWlnaHQnKTtcbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQudG9wID1cbiAgICAgICAgICAgICgrc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdICtcbiAgICAgICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3gudG9wKSArICdweCc7XG4gICAgICAgIHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0LmxlZnQgPVxuICAgICAgICAgICAgKCtzZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdICtcbiAgICAgICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3gubGVmdCkgKyAncHgnO1xuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydFsnLXdlYmtpdC10cmFuc2Zvcm0nXSA9XG4gICAgICAgICAgICBzZWwuc3R5bGUoJy13ZWJraXQtdHJhbnNmb3JtJyk7XG5cblxuICAgICAgICB0b190cmFuc2l0aW9uLmltZy5zdGFydC53aWR0aCA9XG4gICAgICAgICAgICBsaWdodGJveF9pbWdfc2VsXG4gICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnKTtcbiAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuc3RhcnQuaGVpZ2h0ID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2ltZ19zZWxcbiAgICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnKTtcblxuXG4gICAgICAgIHZhciBkYXRhID0gc2VsLmRhdHVtKCk7XG5cblxuICAgICAgICBjb250YWluZXIuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICAgICAgbGlnaHRib3hfc2VsXG4gICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQpO1xuXG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDI4MClcbiAgICAgICAgICAgIC5lYWNoKCdzdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZF9zZWwuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsaWdodGJveF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5kaXYuZW5kKTtcblxuICAgICAgICAgICAgICAgIGxpZ2h0Ym94X2ltZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5pbWcuZW5kKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBkMy50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyODApXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGlnaHRib3hfc2VsXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0KTtcblxuICAgICAgICAgICAgICAgIGxpZ2h0Ym94X2ltZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5pbWcuc3RhcnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfc2VsLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEJvdHRvbSA9IHJlcXVpcmUoJy4vYm90dG9tJyksXG4gICAgTGlnaHRib3ggPSByZXF1aXJlKCcuL2xpZ2h0Ym94X3pvb21fdXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhID0gW10sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgd29ya19zZWwsXG4gICAgICAgIHJpc2RfcHJvZ3JhbXMgPSBbJ0FsbCddLFxuICAgICAgICBtYXNvbmljX2d1dHRlciA9IC0yMDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnZGF0YUxvYWRlZCcpO1xuXG4gICAgXG4gICAgdmFyIGJvdHRvbSA9IHNlbGYuYm90dG9tID0gQm90dG9tKCk7XG4gICAgdmFyIGxpZ2h0Ym94ID0gc2VsZi5saWdodGJveCA9IExpZ2h0Ym94KCk7XG5cbiAgICAvLyBkZWFsIHdpdGggd2luZG93IGJvdHRvbSBsb2FkaW5nIG1vcmVcbiAgICBib3R0b20uZGlzcGF0Y2gub24oJ2JvdHRvbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2V0X21vcmVfZGF0YSgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0X21vcmVfZGF0YSAoKSB7XG4gICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlydHkoZmFsc2UpO1xuICAgICAgICAgICAgcmVuZGVyX2RhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdldF9kYXRhKCk7XG4gICAgfVxuICAgIC8vIGVuZCBkZWFsaW5nIHdpdGggd2luZG93XG5cblxuICAgIHZhciBtYXNvbmljID0gZDMubWFzb25pYygpXG4gICAgICAgIC53aWR0aChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGggKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmhlaWdodChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuaGVpZ2h0ICsgbWFzb25pY19ndXR0ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5jb2x1bW5XaWR0aCgyMDIgKyBtYXNvbmljX2d1dHRlcik7XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoXyk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gXztcblxuICAgICAgICAvLyBzaWRlIGVmZmVjdCBvZiB1cGRhdGluZyBjb250YWluZXJcbiAgICAgICAgYm90dG9tLmNvbnRhaW5lcihjb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbmRlcigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdldF9kYXRhKCk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbWFzb25pYycsIHRydWUpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29sLTEwLTEwJywgdHJ1ZSk7XG5cbiAgICAgICAgcmVuZGVyX2RhdGEoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2RhdGEoKSB7XG4gICAgICAgIHdvcmtfc2VsID0gY29udGFpbmVyLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSkgKyBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLmNsc3M7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLnNyYztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLndpZHRoO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc2l6ZV9tYXNvbmljKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplX21hc29uaWMgKCkge1xuICAgICAgICB2YXIgb3V0ZXJXaWR0aCA9IGNvbnRhaW5lci5wcm9wZXJ0eSgnb2Zmc2V0V2lkdGgnKTtcblxuICAgICAgICBtYXNvbmljXG4gICAgICAgICAgICAub3V0ZXJXaWR0aChvdXRlcldpZHRoKVxuICAgICAgICAgICAgLnJlc2V0KCk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5kYXR1bShtYXNvbmljKVxuICAgICAgICAgICAgLnN0eWxlKFwid2lkdGhcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC53aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnggKyAncHgnOyB9KVxuICAgICAgICAgICAgLnN0eWxlKFwidG9wXCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnkgKyAncHgnOyB9KVxuICAgICAgICAgICAgLmRhdHVtKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZSgnaGVpZ2h0JywgbWFzb25pYy5vdXRlckhlaWdodCgpICsgJ3B4Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X2RhdGEgKCkge1xuICAgICAgICBkMy5qc29uKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnZGF0YS9wcm9qZWN0czIwMTQwNDA4Lmpzb24nLCBmdW5jdGlvbiAod29yaykge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd29yaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cod29yayk7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPVxuICAgICAgICAgICAgICAgIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyh3b3JrKTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZGF0YUxvYWRlZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBkYXRhIGNvbWVzIG91dCBhczpcbiAgICAvLyBbe1xuICAgIC8vICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgIC8vICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgIC8vICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgLy8gICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgIC8vICAgICAnY292ZXInOiByYW5kb21fY292ZXJcbiAgICAvLyB9LCBdXG4gICAgZnVuY3Rpb24gZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzICh3b3JrKSB7XG4gICAgICAgIHZhciBjb3Zlcl9vcHRpb25zID0gWycyMDInLCAnNDA0J107XG4gICAgICAgIHZhciBjb3Zlcl9kaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgJ2NvdmVyMTE1Jzoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA5MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb3ZlcjIwMic6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAyLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMTU4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2NvdmVyMjMwJzoge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAyMzAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxODBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY292ZXI0MDQnOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICg0MDQgKyBtYXNvbmljX2d1dHRlciksXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAoMzE2ICsgbWFzb25pY19ndXR0ZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG5cbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciByYW5kb21fY292ZXJfb3B0aW9uID1cbiAgICAgICAgICAgICAgICBjb3Zlcl9vcHRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdmVyX29wdGlvbnMubGVuZ3RoKV07XG5cbiAgICAgICAgICAgIHZhciByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGNvdmVyX2RpbWVuc2lvbnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdmVyJytyYW5kb21fY292ZXJfb3B0aW9uXS53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvdmVyX2RpbWVuc2lvbnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvdmVyJytyYW5kb21fY292ZXJfb3B0aW9uXS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc3JjOiBkLmNvdmVyc1tyYW5kb21fY292ZXJfb3B0aW9uXSxcbiAgICAgICAgICAgICAgICBjbHNzOiAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXMuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmlzZF9wcm9ncmFtcy5wdXNoKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZF93b3JrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgRGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpLFxuICAgIFdvcmsgPSByZXF1aXJlKCcuL3dvcmsnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wNCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBncmlkX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnaHRtbExvYWRlZCcpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gRGVwYXJ0bWVudHMoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcbiAgICB2YXIgd29yayA9IFdvcmsoc2VsZik7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDQgY29uY2VwdF8wNGEgY29uY2VwdF8wNGMnLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIC8vIC5sb2dvLWNvbnRhaW5lciBpcyBhIG5laWdoYm9yIG9mIC5ncmlkXG4gICAgICAgIHZhciBsb2dvX2NvbnRhaW5lcl9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbG9nby5jb250YWluZXIobG9nb19jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIGdyaWRfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNGEvZ3JpZC5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgZ3JpZF9zZWwubm9kZSgpLmFwcGVuZENoaWxkKGh0bWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guaHRtbExvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC5kZXBhcnRtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC53cmFwcGVyKGQzLnNlbGVjdCgnLmRlcGFydG1lbnRzJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsaWdodGJveF9jb250YWluZXIgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveCcpO1xuICAgICAgICB3b3JrLmxpZ2h0Ym94XG4gICAgICAgICAgICAuY29udGFpbmVyKGxpZ2h0Ym94X2NvbnRhaW5lcilcbiAgICAgICAgICAgIC5vcmlnaW5hbENvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrJykpO1xuXG4gICAgICAgIHdvcmsuYm90dG9tLmFkZGl0aW9uYWxNYXJnaW5Cb3R0b21TZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKTtcblxuICAgICAgICB3b3JrLmNvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaWdodGJveCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBvcmlnaW5hbF9jb250YWluZXIsXG4gICAgICAgIGxpZ2h0Ym94X3NlbCxcbiAgICAgICAgbGlnaHRib3hfaW1nX3NlbCxcbiAgICAgICAgc2VsZWN0ZWRfc2VsLFxuICAgICAgICB0b190cmFuc2l0aW9uID0ge1xuICAgICAgICAgICAgZGl2OiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6ICdtYXRyaXgoMSwwLDAsMSwwLDApJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgKyAncHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGltZzoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbGNfdG9fdHJhbnNpdGlvbl9pbWcgPSBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuc3RhcnQud2lkdGggPSBkLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLnN0YXJ0LmhlaWdodCA9IGQuaGVpZ2h0ICsgJ3B4JztcblxuICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuZW5kLndpZHRoID0gZC5vcmlnaW5hbF93aWR0aCArICdweCc7XG4gICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5lbmQuaGVpZ2h0ID0gZC5vcmlnaW5hbF9oZWlnaHQgKyAncHgnO1xuXG5cbiAgICAgICAgICAgIGlmIChkLm9yaWdpbmFsX2hlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC50b3AgPSAnMHB4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuZW5kLnRvcCA9XG4gICAgICAgICAgICAgICAgICAgICgod2luZG93LmlubmVySGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICBkLm9yaWdpbmFsX2hlaWdodCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkLm9yaWdpbmFsX3dpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5lbmQubGVmdCA9ICcwcHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5lbmQubGVmdCA9XG4gICAgICAgICAgICAgICAgICAgICgod2luZG93LmlubmVyV2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgIGQub3JpZ2luYWxfd2lkdGgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjb250YWluZXInKTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2NvbnRhaW5lcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29udGFpbmVyLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VsZi5vcmlnaW5hbENvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG9yaWdpbmFsX2NvbnRhaW5lcjtcbiAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gXztcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5jb250YWluZXIoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8vIHBhc3MgaW4gZGF0YSB0byBtYWtlIHNob3cgdXBcbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB0aHJvdyBcIkV4cGVjdGVkIGNvbnRhaW5lci5cIjtcbiAgICAgICAgc2VsZWN0ZWRfc2VsID0gc2VsO1xuXG4gICAgICAgIHZhciBvcmlnaW5hbF9jb250YWluZXJfYm94ID1cbiAgICAgICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lclxuICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdmFyIGNvcHkgPSBzZWwubm9kZSgpLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgdmFyIGNvcHlfc2VsID0gZDMuc2VsZWN0KGNvcHkpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9jb3B5ID0gY29udGFpbmVyLm5vZGUoKS5hcHBlbmRDaGlsZChjb3B5KTtcbiAgICAgICAgbGlnaHRib3hfc2VsID0gY29udGFpbmVyLnNlbGVjdCgnLnBpZWNlJyk7XG4gICAgICAgIGxpZ2h0Ym94X2ltZ19zZWwgPSBsaWdodGJveF9zZWwuc2VsZWN0KCdpbWcnKTtcblxuXG4gICAgICAgIHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0LndpZHRoID0gc2VsLnN0eWxlKCd3aWR0aCcpO1xuXG4gICAgICAgIHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0LmhlaWdodCA9IHNlbC5zdHlsZSgnaGVpZ2h0Jyk7XG4gICAgICAgIHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0LnRvcCA9XG4gICAgICAgICAgICAoK3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJylcbiAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXSArXG4gICAgICAgICAgICBvcmlnaW5hbF9jb250YWluZXJfYm94LnRvcCkgKyAncHgnO1xuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydC5sZWZ0ID1cbiAgICAgICAgICAgICgrc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JylcbiAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXSArXG4gICAgICAgICAgICBvcmlnaW5hbF9jb250YWluZXJfYm94LmxlZnQpICsgJ3B4JztcbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnRbJy13ZWJraXQtdHJhbnNmb3JtJ10gPVxuICAgICAgICAgICAgc2VsLnN0eWxlKCctd2Via2l0LXRyYW5zZm9ybScpO1xuXG5cbiAgICAgICAgdmFyIGRhdGEgPSBzZWwuZGF0dW0oKTtcblxuICAgICAgICBjYWxjX3RvX3RyYW5zaXRpb25faW1nKGRhdGEuY292ZXIpO1xuXG5cbiAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIHRydWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X2ltZ19zZWxcbiAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmltZy5zdGFydCk7XG4gICAgICAgIGxpZ2h0Ym94X3NlbFxuICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0KTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0b190cmFuc2l0aW9uLmRpdik7XG5cbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhY2goJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkX3NlbC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxpZ2h0Ym94X3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmRpdi5lbmQpO1xuXG4gICAgICAgICAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmltZy5lbmQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDI4MClcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsaWdodGJveF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQpO1xuXG4gICAgICAgICAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmltZy5zdGFydCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZF9zZWwuc3R5bGUoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5odG1sKCcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgQm90dG9tID0gcmVxdWlyZSgnLi9ib3R0b20nKSxcbiAgICBMaWdodGJveCA9IHJlcXVpcmUoJy4vbGlnaHRib3hfem9vbV91cCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB3b3JrX3NlbCxcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIG1hc29uaWNfZ3V0dGVyID0gMjA7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2RhdGFMb2FkZWQnKTtcblxuICAgIC8vIGRlYWwgd2l0aCB3aW5kb3cgYm90dG9tIGxvYWRpbmcgbW9yZVxuICAgIHZhciBib3R0b20gPSBzZWxmLmJvdHRvbSA9IEJvdHRvbSgpO1xuICAgIHZhciBsaWdodGJveCA9IHNlbGYubGlnaHRib3ggPSBMaWdodGJveCgpO1xuXG4gICAgYm90dG9tLmRpc3BhdGNoLm9uKCdib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldF9tb3JlX2RhdGEoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldF9tb3JlX2RhdGEgKCkge1xuICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm90dG9tLmRpcnR5KGZhbHNlKTtcbiAgICAgICAgICAgIHJlbmRlcl9kYXRhKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZXRfZGF0YSgpO1xuICAgIH1cbiAgICAvLyBlbmQgZGVhbGluZyB3aXRoIHdpbmRvd1xuXG4gICAgdmFyIG1hc29uaWMgPSBkMy5tYXNvbmljKClcbiAgICAgICAgLndpZHRoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gK2QuY292ZXIud2lkdGggKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmhlaWdodChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuICtkLmNvdmVyLmhlaWdodCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuY29sdW1uV2lkdGgoMjAwICsgbWFzb25pY19ndXR0ZXIpO1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IF87XG5cbiAgICAgICAgLy8gc2lkZSBlZmZlY3Qgb2YgdXBkYXRpbmcgY29udGFpbmVyXG4gICAgICAgIGJvdHRvbS5jb250YWluZXIoY29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnZXRfZGF0YSgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLmNsYXNzZWQoJ21hc29uaWMnLCB0cnVlKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbC0xMC0xMCcsIHRydWUpO1xuXG4gICAgICAgIHJlbmRlcl9kYXRhKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9kYXRhKCkge1xuICAgICAgICB3b3JrX3NlbCA9IGNvbnRhaW5lci5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5zcmM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNTA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGxpZ2h0Ym94LnNob3cpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNpemVfbWFzb25pYygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZV9tYXNvbmljICgpIHtcbiAgICAgICAgdmFyIG91dGVyV2lkdGggPSBjb250YWluZXIucHJvcGVydHkoJ29mZnNldFdpZHRoJyk7XG5cbiAgICAgICAgbWFzb25pY1xuICAgICAgICAgICAgLm91dGVyV2lkdGgob3V0ZXJXaWR0aClcbiAgICAgICAgICAgIC5yZXNldCgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuZGF0dW0obWFzb25pYylcbiAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb250YWluZXIuc3R5bGUoJ2hlaWdodCcsIG1hc29uaWMub3V0ZXJIZWlnaHQoKSArICdweCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9kYXRhICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID1cbiAgICAgICAgICAgICAgICBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMod29yayk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGFMb2FkZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZGF0YSBjb21lcyBvdXQgYXM6XG4gICAgLy8gW3tcbiAgICAvLyAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAvLyAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAvLyAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgIC8vICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAvLyAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgLy8gfSwgXVxuICAgIGZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAod29yaykge1xuXG4gICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuXG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgZXh0ZW50IG9mIHdpZHRoc1xuICAgICAgICB2YXIgYWxsX21vZHVsZXMgPSBbXTtcbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBhbGxfbW9kdWxlcy5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2V0IGEgc2NhbGUgZm9yIG1hcHBpbmdcbiAgICAgICAgLy8gd2lkdGggdGhlIGFuIGltYWdlIHRvIHRoZVxuICAgICAgICAvLyB3aWR0aCBvZiB0aGUgbWFzb25pYyB2ZXJzaW9uXG4gICAgICAgIHZhciB3aWR0aF9leHRlbnQgPSBkMy5leHRlbnQoYWxsX21vZHVsZXMsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGg7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3aWR0aF9leHRlbnQnKTtcbiAgICAgICAgY29uc29sZS5sb2cod2lkdGhfZXh0ZW50KTtcbiAgICAgICAgdmFyIHdpZHRocyA9IGQzLnNjYWxlLm9yZGluYWwoKVxuICAgICAgICAgICAgLmRvbWFpbih3aWR0aF9leHRlbnQpXG4gICAgICAgICAgICAucmFuZ2UoWzEwMCwgMjAwLCA0MDBdKTtcblxuICAgICAgICB3aW5kb3cud2lkdGhzID0gd2lkdGhzO1xuXG4gICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIG1vZHVsZXNfdG9faW5jbHVkZSA9IFtdO1xuICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyByYW5kb21fY292ZXJfb3B0aW9uXG4gICAgICAgICAgICB2YXIgcmFuZG9tX21vZHVsZSA9XG4gICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5sZW5ndGgpXTtcblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogK3JhbmRvbV9tb2R1bGUud2lkdGgsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfaGVpZ2h0OiArcmFuZG9tX21vZHVsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRocyhyYW5kb21fbW9kdWxlLndpZHRoKSxcbiAgICAgICAgICAgICAgICBzcmM6IHJhbmRvbV9tb2R1bGUuc3JjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmFuZG9tX2NvdmVyLmhlaWdodCA9IChyYW5kb21fY292ZXIud2lkdGgqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUuaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLndpZHRoO1xuXG4gICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgICAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChyaXNkX3Byb2dyYW1zLmluZGV4T2YoZC5yaXNkX3Byb2dyYW0pIDwgMCkge1xuICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRfd29yaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIERlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrJyksXG4gICAgTG9nbyA9IHJlcXVpcmUoJy4vbG9nbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDQgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgZ3JpZF9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2h0bWxMb2FkZWQnKTtcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IERlcGFydG1lbnRzKCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG4gICAgdmFyIHdvcmsgPSBXb3JrKHNlbGYpO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb25jZXB0XzA0IGNvbmNlcHRfMDRkJywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICAvLyAubG9nby1jb250YWluZXIgaXMgYSBuZWlnaGJvciBvZiAuZ3JpZFxuICAgICAgICB2YXIgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ28uY29udGFpbmVyKGxvZ29fY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICBncmlkX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDRhL2dyaWQuaHRtbCcsIGZ1bmN0aW9uIChodG1sKSB7XG5cbiAgICAgICAgICAgIGdyaWRfc2VsLm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmh0bWxMb2FkZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQuZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAud3JhcHBlcihkMy5zZWxlY3QoJy5kZXBhcnRtZW50cycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGlnaHRib3hfY29udGFpbmVyID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gnKTtcbiAgICAgICAgd29yay5saWdodGJveFxuICAgICAgICAgICAgLmNvbnRhaW5lcihsaWdodGJveF9jb250YWluZXIpXG4gICAgICAgICAgICAub3JpZ2luYWxDb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKTtcblxuICAgICAgICB3b3JrLmJvdHRvbS5hZGRpdGlvbmFsTWFyZ2luQm90dG9tU2VsKGQzLnNlbGVjdCgnLmdyaWQnKSk7XG5cbiAgICAgICAgd29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlnaHRib3ggKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyLFxuICAgICAgICBsaWdodGJveF9zZWwsXG4gICAgICAgIGxpZ2h0Ym94X2ltZ19zZWwsXG4gICAgICAgIHNlbGVjdGVkX3NlbCxcbiAgICAgICAgdG9fdHJhbnNpdGlvbiA9IHtcbiAgICAgICAgICAgIGRpdjoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzBweCcsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAnbWF0cml4KDEsMCwwLDEsMCwwKScsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbWc6IHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICcwcHgnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMHB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRhaW5lcjoge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoMzgsIDM0LCA5OCwgMCknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAncmdiYSgzOCwgMzQsIDk4LCAwLjgpJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FsY190b190cmFuc2l0aW9uX2ltZyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5zdGFydC53aWR0aCA9IGQud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuc3RhcnQuaGVpZ2h0ID0gZC5oZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5lbmQud2lkdGggPSBkLm9yaWdpbmFsX3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC5oZWlnaHQgPSBkLm9yaWdpbmFsX2hlaWdodCArICdweCc7XG5cblxuICAgICAgICAgICAgaWYgKGQub3JpZ2luYWxfaGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdG9fdHJhbnNpdGlvbi5pbWcuZW5kLnRvcCA9ICcwcHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b190cmFuc2l0aW9uLmltZy5lbmQudG9wID1cbiAgICAgICAgICAgICAgICAgICAgKCh3aW5kb3cuaW5uZXJIZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgIGQub3JpZ2luYWxfaGVpZ2h0KSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGQub3JpZ2luYWxfd2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC5sZWZ0ID0gJzBweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvX3RyYW5zaXRpb24uaW1nLmVuZC5sZWZ0ID1cbiAgICAgICAgICAgICAgICAgICAgKCh3aW5kb3cuaW5uZXJXaWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgZC5vcmlnaW5hbF93aWR0aCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NvbnRhaW5lcicpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignY29udGFpbmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLm9yaWdpbmFsQ29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3JpZ2luYWxfY29udGFpbmVyO1xuICAgICAgICBvcmlnaW5hbF9jb250YWluZXIgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuICAgICAgICBzZWxmLmRpc3BhdGNoLmNvbnRhaW5lcigpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBkYXRhIHRvIG1ha2Ugc2hvdyB1cFxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHRocm93IFwiRXhwZWN0ZWQgY29udGFpbmVyLlwiO1xuICAgICAgICBzZWxlY3RlZF9zZWwgPSBzZWw7XG5cbiAgICAgICAgdmFyIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3ggPVxuICAgICAgICAgICAgb3JpZ2luYWxfY29udGFpbmVyXG4gICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB2YXIgY29weSA9IHNlbC5ub2RlKCkuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB2YXIgY29weV9zZWwgPSBkMy5zZWxlY3QoY29weSk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvcHkgPSBjb250YWluZXIubm9kZSgpLmFwcGVuZENoaWxkKGNvcHkpO1xuICAgICAgICBsaWdodGJveF9zZWwgPSBjb250YWluZXIuc2VsZWN0KCcucGllY2UnKTtcbiAgICAgICAgbGlnaHRib3hfaW1nX3NlbCA9IGxpZ2h0Ym94X3NlbC5zZWxlY3QoJ2ltZycpO1xuXG5cbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQud2lkdGggPSBzZWwuc3R5bGUoJ3dpZHRoJyk7XG5cbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQuaGVpZ2h0ID0gc2VsLnN0eWxlKCdoZWlnaHQnKTtcbiAgICAgICAgdG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQudG9wID1cbiAgICAgICAgICAgICgrc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdICtcbiAgICAgICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3gudG9wKSArICdweCc7XG4gICAgICAgIHRvX3RyYW5zaXRpb24uZGl2LnN0YXJ0LmxlZnQgPVxuICAgICAgICAgICAgKCtzZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdICtcbiAgICAgICAgICAgIG9yaWdpbmFsX2NvbnRhaW5lcl9ib3gubGVmdCkgKyAncHgnO1xuICAgICAgICB0b190cmFuc2l0aW9uLmRpdi5zdGFydFsnLXdlYmtpdC10cmFuc2Zvcm0nXSA9XG4gICAgICAgICAgICBzZWwuc3R5bGUoJy13ZWJraXQtdHJhbnNmb3JtJyk7XG5cblxuICAgICAgICB2YXIgZGF0YSA9IHNlbC5kYXR1bSgpO1xuXG4gICAgICAgIGNhbGNfdG9fdHJhbnNpdGlvbl9pbWcoZGF0YS5jb3Zlcik7XG5cblxuICAgICAgICBjb250YWluZXIuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uaW1nLnN0YXJ0KTtcbiAgICAgICAgbGlnaHRib3hfc2VsXG4gICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQpO1xuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmNvbnRhaW5lci5zdGFydCk7XG5cbiAgICAgICAgY29uc29sZS5sb2codG9fdHJhbnNpdGlvbi5kaXYpO1xuXG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDI4MClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1vdXQnKVxuICAgICAgICAgICAgLmVhY2goJ3N0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkX3NlbC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxpZ2h0Ym94X3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmRpdi5lbmQpO1xuXG4gICAgICAgICAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmltZy5lbmQpO1xuXG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uY29udGFpbmVyLmVuZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsaWdodGJveF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5kaXYuc3RhcnQpO1xuXG4gICAgICAgICAgICAgICAgbGlnaHRib3hfaW1nX3NlbFxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmltZy5zdGFydCk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuc3RhcnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfc2VsLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEJvdHRvbSA9IHJlcXVpcmUoJy4vYm90dG9tJyksXG4gICAgTGlnaHRib3ggPSByZXF1aXJlKCcuL2xpZ2h0Ym94X2ZhZGVfdXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhID0gW10sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgd29ya19zZWwsXG4gICAgICAgIHJpc2RfcHJvZ3JhbXMgPSBbJ0FsbCddLFxuICAgICAgICBtYXNvbmljX2d1dHRlciA9IDIwO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdkYXRhTG9hZGVkJyk7XG5cbiAgICAvLyBkZWFsIHdpdGggd2luZG93IGJvdHRvbSBsb2FkaW5nIG1vcmVcbiAgICB2YXIgYm90dG9tID0gc2VsZi5ib3R0b20gPSBCb3R0b20oKTtcbiAgICB2YXIgbGlnaHRib3ggPSBzZWxmLmxpZ2h0Ym94ID0gTGlnaHRib3goKTtcblxuICAgIGJvdHRvbS5kaXNwYXRjaC5vbignYm90dG9tJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXRfbW9yZV9kYXRhKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRfbW9yZV9kYXRhICgpIHtcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJvdHRvbS5kaXJ0eShmYWxzZSk7XG4gICAgICAgICAgICByZW5kZXJfZGF0YSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICB9XG4gICAgLy8gZW5kIGRlYWxpbmcgd2l0aCB3aW5kb3dcblxuICAgIHZhciBtYXNvbmljID0gZDMubWFzb25pYygpXG4gICAgICAgIC53aWR0aChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuICtkLmNvdmVyLndpZHRoICsgbWFzb25pY19ndXR0ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5oZWlnaHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiArZC5jb3Zlci5oZWlnaHQgKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNvbHVtbldpZHRoKDIwMCArIG1hc29uaWNfZ3V0dGVyKTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChfKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuXG4gICAgICAgIC8vIHNpZGUgZWZmZWN0IG9mIHVwZGF0aW5nIGNvbnRhaW5lclxuICAgICAgICBib3R0b20uY29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdtYXNvbmljJywgdHJ1ZSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb2wtMTAtMTAnLCB0cnVlKTtcblxuICAgICAgICByZW5kZXJfZGF0YSgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZGF0YSgpIHtcbiAgICAgICAgd29ya19zZWwgPSBjb250YWluZXIuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGg7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChsaWdodGJveC5zaG93KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzaXplX21hc29uaWMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfbWFzb25pYyAoKSB7XG4gICAgICAgIHZhciBvdXRlcldpZHRoID0gY29udGFpbmVyLnByb3BlcnR5KCdvZmZzZXRXaWR0aCcpO1xuXG4gICAgICAgIG1hc29uaWNcbiAgICAgICAgICAgIC5vdXRlcldpZHRoKG91dGVyV2lkdGgpXG4gICAgICAgICAgICAucmVzZXQoKTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLmRhdHVtKG1hc29uaWMpXG4gICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueCArICdweCc7IH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueSArICdweCc7IH0pXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5kYXRhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLnN0eWxlKCdoZWlnaHQnLCBtYXNvbmljLm91dGVySGVpZ2h0KCkgKyAncHgnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfZGF0YSAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9XG4gICAgICAgICAgICAgICAgZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzKHdvcmspO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5kYXRhTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGRhdGEgY29tZXMgb3V0IGFzOlxuICAgIC8vIFt7XG4gICAgLy8gICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgLy8gICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgLy8gICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAvLyAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgLy8gICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgIC8vIH0sIF1cbiAgICBmdW5jdGlvbiBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMgKHdvcmspIHtcblxuICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIGV4dGVudCBvZiB3aWR0aHNcbiAgICAgICAgdmFyIGFsbF9tb2R1bGVzID0gW107XG4gICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsX21vZHVsZXMucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNldCBhIHNjYWxlIGZvciBtYXBwaW5nXG4gICAgICAgIC8vIHdpZHRoIHRoZSBhbiBpbWFnZSB0byB0aGVcbiAgICAgICAgLy8gd2lkdGggb2YgdGhlIG1hc29uaWMgdmVyc2lvblxuICAgICAgICB2YXIgd2lkdGhfZXh0ZW50ID0gZDMuZXh0ZW50KGFsbF9tb2R1bGVzLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZygnd2lkdGhfZXh0ZW50Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHdpZHRoX2V4dGVudCk7XG4gICAgICAgIHZhciB3aWR0aHMgPSBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgICAgICAgIC5kb21haW4od2lkdGhfZXh0ZW50KVxuICAgICAgICAgICAgLnJhbmdlKFsxMDAsIDIwMCwgNDAwXSk7XG5cbiAgICAgICAgd2luZG93LndpZHRocyA9IHdpZHRocztcblxuICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcbiAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcmFuZG9tX2NvdmVyX29wdGlvblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9tb2R1bGUgPVxuICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUubGVuZ3RoKV07XG5cbiAgICAgICAgICAgIHZhciByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfd2lkdGg6ICtyYW5kb21fbW9kdWxlLndpZHRoLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogK3JhbmRvbV9tb2R1bGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aHMocmFuZG9tX21vZHVsZS53aWR0aCksXG4gICAgICAgICAgICAgICAgc3JjOiByYW5kb21fbW9kdWxlLnNyY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJhbmRvbV9jb3Zlci5oZWlnaHQgPSAocmFuZG9tX2NvdmVyLndpZHRoKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLmhlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS53aWR0aDtcblxuICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICAgICAnY292ZXInOiByYW5kb21fY292ZXJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtcy5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcbiAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkX3dvcms7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBEZXBhcnRtZW50cyA9IHJlcXVpcmUoJy4uL2RlcGFydG1lbnRzJyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdodG1sTG9hZGVkJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBEZXBhcnRtZW50cygpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yayhzZWxmKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29uY2VwdF8wNCBjb25jZXB0XzA0ZCcsIHRydWUpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgLy8gLmxvZ28tY29udGFpbmVyIGlzIGEgbmVpZ2hib3Igb2YgLmdyaWRcbiAgICAgICAgdmFyIGxvZ29fY29udGFpbmVyX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb250YWluZXInKTtcblxuICAgICAgICBsb2dvLmNvbnRhaW5lcihsb2dvX2NvbnRhaW5lcl9zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuXG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ3NyYy9jb25jZXB0XzA0ZS9ncmlkLmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBncmlkX3NlbC5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5odG1sTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZXBhcnRtZW50c1xuICAgICAgICAgICAgLndyYXBwZXIoZDMuc2VsZWN0KCcuZGVwYXJ0bWVudHMnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxpZ2h0Ym94X2NvbnRhaW5lciA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94Jyk7XG4gICAgICAgIHdvcmsubGlnaHRib3hcbiAgICAgICAgICAgIC5jb250YWluZXIobGlnaHRib3hfY29udGFpbmVyKVxuICAgICAgICAgICAgLm9yaWdpbmFsQ29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSk7XG5cbiAgICAgICAgd29yay5ib3R0b20uYWRkaXRpb25hbE1hcmdpbkJvdHRvbVNlbChkMy5zZWxlY3QoJy5ncmlkJykpO1xuXG4gICAgICAgIHdvcmsuY29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmsnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgRGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpLFxuICAgIFdvcmsgPSByZXF1aXJlKCcuL3dvcmsnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wNCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBncmlkX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnaHRtbExvYWRlZCcpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gRGVwYXJ0bWVudHMoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcbiAgICB2YXIgd29yayA9IFdvcmsoc2VsZik7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDQgY29uY2VwdF8wNGcnLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIC8vIC5sb2dvLWNvbnRhaW5lciBpcyBhIG5laWdoYm9yIG9mIC5ncmlkXG4gICAgICAgIHZhciBsb2dvX2NvbnRhaW5lcl9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tY29udGFpbmVyJyk7XG5cbiAgICAgICAgbG9nby5jb250YWluZXIobG9nb19jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIGdyaWRfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNGcvZ3JpZC5odG1sJywgZnVuY3Rpb24gKGh0bWwpIHtcblxuICAgICAgICAgICAgZ3JpZF9zZWwubm9kZSgpLmFwcGVuZENoaWxkKGh0bWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guaHRtbExvYWRlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC5kZXBhcnRtZW50cycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAvLyBkZXBhcnRtZW50c1xuICAgICAgICAgICAvLyAud3JhcHBlcihkMy5zZWxlY3QoJy5kZXBhcnRtZW50cycpKVxuICAgICAgICAgICAvLyAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsaWdodGJveF9jb250YWluZXIgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveCcpO1xuICAgICAgICB3b3JrLmxpZ2h0Ym94XG4gICAgICAgICAgICAuY29udGFpbmVyKGxpZ2h0Ym94X2NvbnRhaW5lcilcbiAgICAgICAgICAgIC5vcmlnaW5hbENvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrJykpO1xuXG4gICAgICAgIHdvcmsuYm90dG9tLmFkZGl0aW9uYWxNYXJnaW5Cb3R0b21TZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKTtcblxuICAgICAgICB3b3JrLmNvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIERlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wNCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBncmlkX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnaHRtbExvYWRlZCcpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gRGVwYXJ0bWVudHMoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuY2xhc3NlZCgnY29uY2VwdF8wNScsIHRydWUpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgLy8gLmxvZ28tY29udGFpbmVyIGlzIGEgbmVpZ2hib3Igb2YgLmdyaWRcbiAgICAgICAgdmFyIGxvZ29fY29udGFpbmVyX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb250YWluZXInKTtcblxuICAgICAgICBsb2dvLmNvbnRhaW5lcihsb2dvX2NvbnRhaW5lcl9zZWwpO1xuXG4gICAgICAgIGdyaWRfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNS9ncmlkLmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBncmlkX3NlbC5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5odG1sTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdodG1sTG9hZGVkLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZXBhcnRtZW50c1xuICAgICAgICAgICAgLndyYXBwZXIoZDMuc2VsZWN0KCcuZGVwYXJ0bWVudHMnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nby5zY3JvbGxPdmVyU2VsKGQzLnNlbGVjdCgnLmdyaWQnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgbG9nb0NvbXBvbmVudHMgPSByZXF1aXJlKCcuL2xvZ29fY29tcG9uZW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsLFxuICAgICAgICBkaXN0YW5jZV90b19zY3JvbGwgPSAwLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc2VsLFxuICAgICAgICBsb2dvX2xpbmVfc2VsLFxuICAgICAgICBsb2dvX3N1YnNpZGlhcnlfc2VsLFxuICAgICAgICBsb2dvX2NvbXBvbmVudHMgPSBsb2dvQ29tcG9uZW50cyxcbiAgICAgICAgbG9nb19zdmcsXG4gICAgICAgIGxvZ29fbGluZSxcbiAgICAgICAgbGluZSA9IGQzLnN2Zy5saW5lKCksXG4gICAgICAgIHRyYW5zaXRpb25hYmxlID0gdHJ1ZTtcblxuICAgIHZhciBzY3JvbGxfc2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCBkaXN0YW5jZV90b19zY3JvbGxdKVxuICAgICAgICAucmFuZ2UoWzAsIDFdKVxuICAgICAgICAuY2xhbXAodHJ1ZSk7XG5cbiAgICB3aW5kb3dfc2VsXG4gICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gY2FsY19kaXN0YW5jZV90b19zY3JvbGwoKTtcbiAgICAgICAgICAgIHNjcm9sbF9zY2FsZS5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pO1xuXG4gICAgICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUoKTtcblxuXG4gICAgICAgICAgICAvLyB1cGRhdGUgbG9nbyBjb21wb25lbnRzIHBlciB3aW5kb3dcbiAgICAgICAgICAgIGlmIChsb2dvX3NlbCkge1xuICAgICAgICAgICAgICAgIGxvZ29fc2VsLmRhdGEuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGQucnVsZXMod2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZC5zdGFydCA9IHVwZGF0ZWQuc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGQuZW5kID0gdXBkYXRlZC5lbmQ7XG4gICAgICAgICAgICAgICAgICAgIGQuaW50ZXJwb2xhdG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZF9pbnRlcnBvbGF0b3IodXBkYXRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdG9yO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAub24oJ3Njcm9sbC5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25hYmxlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cod2luZG93LnNjcm9sbFkpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMoXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbF9zY2FsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxZKSk7XG4gICAgICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHNlbGYuc2Nyb2xsT3ZlclNlbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNjcm9sbF9vdmVyX3NlbDtcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG9nb19jb250YWluZXJfc2VsO1xuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBsb2dvIGNvbXBvbmVudHMgcGVyIHdpbmRvd1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBsb2dvX2NvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBkLnJ1bGVzKHdpbmRvd193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgZC5zdGFydCA9IHVwZGF0ZWQuc3RhcnQ7XG4gICAgICAgICAgICBkLmVuZCA9IHVwZGF0ZWQuZW5kO1xuICAgICAgICAgICAgZC5pbnRlcnBvbGF0b3IgPVxuICAgICAgICAgICAgICAgIGFkZF9pbnRlcnBvbGF0b3IodXBkYXRlZClcbiAgICAgICAgICAgICAgICAgICAgLmludGVycG9sYXRvcjtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsKCk7XG4gICAgICAgIHNjcm9sbF9zY2FsZS5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pO1xuXG4gICAgICAgIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMoXG4gICAgICAgICAgICBzY3JvbGxfc2NhbGUoXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFkpKTtcblxuXG4gICAgICAgIGxvZ29fc2VsID0gbG9nb19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnbG9nby1jb21wb25lbnQnKVxuICAgICAgICAgICAgLmRhdGEobG9nb19jb21wb25lbnRzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbG9nby1jb21wb25lbnQgJyArIGQuY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydC50b3A7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LmJvdHRvbTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdyaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQucmlnaHQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0Wydmb250LXNpemUnXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmh0bWw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX2xpbmVfc2VsID0gbG9nb19zZWwuZmlsdGVyKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gZC50eXBlID09PSAnbGluZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fc3Vic2lkaWFyeV9zZWwgPSBsb2dvX3NlbC5maWx0ZXIoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnR5cGUgPT09ICdzdWJzaWRpYXJ5JztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICBsb2dvX2xpbmUgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoW2xvZ29fdmVydGljaWVzKCldKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMgKHBlcmNlbnRfcHJvZ3Jlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgIGlmICghbG9nb19zZWwpIHJldHVybjtcbiAgICAgICAgbG9nb19zZWxcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IudG9wKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IuYm90dG9tKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLmxlZnQocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdyaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLnJpZ2h0KHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZm9udC1zaXplJ10ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdsaW5lLWhlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2xpbmUtaGVpZ2h0J10ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICgpIHtcbiAgICAgICAgdmFyIHZlcnRpY2llcyA9IFtsb2dvX3ZlcnRpY2llcygpXTtcbiAgICAgICAgbG9nb19saW5lLmRhdGEodmVydGljaWVzKTtcbiAgICAgICAgbG9nb19saW5lLmF0dHIoJ2QnLCBsaW5lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX3ZlcnRpY2llcyAoKSB7XG4gICAgICAgIHZhciBsb2dvX2xpbmVfdmVydGljaWVzID0gW107XG4gICAgICAgIGxvZ29fbGluZV9zZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfdmVydGljaWVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIFtib3VuZHMubGVmdCAtIDEwLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICBbYm91bmRzLnJpZ2h0ICsgMTAsXG4gICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbG9nb19saW5lX3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjX2Rpc3RhbmNlX3RvX3Njcm9sbCAoKSB7XG4gICAgICAgIHZhciBzY3JvbGxpbmdfZGlzdGFuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHNjcm9sbF9vdmVyX3NlbC5zdHlsZSgnbWFyZ2luLXRvcCcsIHNjcm9sbGluZ19kaXN0YW5jZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICByZXR1cm4gc2Nyb2xsaW5nX2Rpc3RhbmNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9pbnRlcnBvbGF0b3IgKHN0YXRlcykge1xuICAgICAgICBzdGF0ZXMuaW50ZXJwb2xhdG9yID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzdGF0ZXMuc3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlcy5pbnRlcnBvbGF0b3Jba2V5XSA9XG4gICAgICAgICAgICAgICAgZDMuaW50ZXJwb2xhdGVTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5zdGFydFtrZXldLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuZW5kW2tleV0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gW3tcbiAgICBodG1sOiAnUklTRCcsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1yaXNkIHRleHQtbGVmdCcsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnMzAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICczMCUnLFxuICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAnZm9udC1zaXplJzogJzUwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnNTBweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc1MHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICdHcmFkJyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tZ3JhZCB0ZXh0LWxlZnQnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBzdGFydDoge1xuICAgICAgICB0b3A6ICc0MCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJzMwJScsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICdmb250LXNpemUnOiAnNTBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICc1MHB4J1xuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgIH0sXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNCkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNTBweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnU2hvdycsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLXNob3cgdGV4dC1yaWdodCcsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICBib3R0b206ICc2MCUnLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnMzAlJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc1MHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzUwcHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIGJvdHRvbTogJzUwJScsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAoaGVpZ2h0ICogMC42KSArICdweCcsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc1MHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogKGhlaWdodCAqIDAuNSkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICcyMDE0JyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tMjAxNCB0ZXh0LXJpZ2h0JyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgIGJvdHRvbTogJzQwJScsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICczMCUnLFxuICAgICAgICAnZm9udC1zaXplJzogJzUwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnNTBweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICdhdXRvJyxcbiAgICAgICAgYm90dG9tOiAnNTBweCcsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAoaGVpZ2h0ICogMC40KSArICdweCcsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc1MHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJzUwcHgnLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICdSaG9kZSBJc2xhbmQgU2Nob29sIG9mIERlc2lnbjxicj4nK1xuICAgICAgICAgICdBbm51YWwgR3JhZCBUaGVzaXMgRXhoaWJpdGlvbicsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLXN1YmhlYWRsaW5lIHRleHQtbGVmdCcsXG4gICAgdHlwZTogJ3N1YnNpZGlhcnknLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMzAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnNjAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC41KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNikgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufV07IiwidmFyIERlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvJyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpLFxuICAgIFRyYW5zbGF0ZSA9IHJlcXVpcmUoJy4vdHJhbnNsYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wNCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBncmlkX3NlbDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnaHRtbExvYWRlZCcpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gRGVwYXJ0bWVudHMoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcbiAgICB2YXIgd29yayA9IFdvcmsoc2VsZik7XG4gICAgdmFyIHRyYW5zbGF0ZSA9IFRyYW5zbGF0ZSgpO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb25jZXB0XzA1YScsIHRydWUpXG4gICAgICAgICAgICAuY2xhc3NlZCgnZnVsbC13aWR0aC13b3JrJywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICAvLyAubG9nby1jb250YWluZXIgaXMgYSBuZWlnaGJvciBvZiAuZ3JpZFxuICAgICAgICB2YXIgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ28uY29udGFpbmVyKGxvZ29fY29udGFpbmVyX3NlbCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQtd3JhcHBlcicpO1xuXG5cblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDVhL2dyaWQuaHRtbCcsIGZ1bmN0aW9uIChodG1sKSB7XG5cbiAgICAgICAgICAgIGdyaWRfc2VsLm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmh0bWxMb2FkZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQuZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAud3JhcHBlcihkMy5zZWxlY3QoJy5kZXBhcnRtZW50cycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2dvLnNjcm9sbE92ZXJTZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9jb250YWluZXIgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveCcpO1xuXG4gICAgICAgIHdvcmsuYm90dG9tLmFkZGl0aW9uYWxNYXJnaW5Cb3R0b21TZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKTtcblxuICAgICAgICB2YXIgd29ya19iYWNrZ3JvdW5kX3NlbCA9IGQzLnNlbGVjdCgnLmdyaWQtd3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmstYmFja2dyb3VuZCcpO1xuXG4gICAgICAgIHZhciB3b3JrX3NlbCA9IGQzLnNlbGVjdCgnLmdyaWQtd3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmsnKTtcbiAgICAgICAgd29yay5jb250YWluZXIod29ya19zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICB3b3JrLmxpZ2h0Ym94XG4gICAgICAgICAgICAuY29udGFpbmVyKGxpZ2h0Ym94X2NvbnRhaW5lcik7XG5cblxuICAgICAgICB0cmFuc2xhdGVcbiAgICAgICAgICAgIC50cmFuc2xhdGVkKHdvcmtfc2VsKVxuICAgICAgICAgICAgLm92ZXIoZDMuc2VsZWN0KCcuZ3JpZCcpKVxuICAgICAgICAgICAgLmJhY2tncm91bmQod29ya19iYWNrZ3JvdW5kX3NlbClcbiAgICAgICAgICAgIC5zZXR1cCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlnaHRib3ggKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgc2VsZWN0ZWRfc2VsLFxuICAgICAgICB0b190cmFuc2l0aW9uID0ge1xuICAgICAgICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAncmdiYSgyMzksIDY1LCA1NCwgMCknLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAncmdiYSgyMzksIDY1LCA1NCwgMC45KScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NvbnRhaW5lcicpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignY29udGFpbmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gXztcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5jb250YWluZXIoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8vIHBhc3MgaW4gZGF0YSB0byBtYWtlIHNob3cgdXBcbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB0aHJvdyBcIkV4cGVjdGVkIGNvbnRhaW5lci5cIjtcbiAgICAgICAgc2VsZWN0ZWRfc2VsID0gc2VsO1xuXG4gICAgICAgIHZhciBkYXRhID0gc2VsLmRhdHVtKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGF0YS5tb2R1bGVzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEubW9kdWxlcyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2dyaWRfc2VsID0gY29udGFpbmVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhIGNvbC0yLTEwJyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X3dvcmtfc2VsID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtd29yayBvZmZzZXQtMi0xMCBjb2wtOC0xMCcpO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdoMicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5wcm9qZWN0X25hbWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAudGV4dChkYXRhLmRlc2NyaXB0aW9uKTtcblxuICAgICAgICBsaWdodGJveF93b3JrX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhLm1vZHVsZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZScpXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc2l6ZXMubWF4XzEyNDAgPyBkLnNpemVzLm1heF8xMjQwIDogZC5zcmM7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9pbmZvX3NlbCA9IGxpZ2h0Ym94X21ldGFfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mbycpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZGF0YS5hdmF0YXIpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tc3R1ZGVudC1uYW1lJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuc3R1ZGVudF9uYW1lKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXJpc2QtcHJvZ3JhbScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnJpc2RfcHJvZ3JhbSk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1wZXJzb25hbC1saW5rJylcbiAgICAgICAgICAgIC5hdHRyKCdocmVmJywgZGF0YS51cmwpXG4gICAgICAgICAgICAudGV4dCgnQmVoYW5jZScpO1xuXG5cbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuc3RhcnQpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbGlnaHRib3gtb3BlbicsIHRydWUpO1xuXG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDI4MClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1vdXQnKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmNvbnRhaW5lci5lbmQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDI4MClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbicpXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uY29udGFpbmVyLnN0YXJ0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkX3NlbC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmh0bWwoJycpO1xuICAgICAgICAgICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ2xpZ2h0Ym94LW9wZW4nLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGxvZ29Db21wb25lbnRzID0gcmVxdWlyZSgnLi9sb2dvX2NvbXBvbmVudHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIHNjcm9sbF9vdmVyX3NlbCxcbiAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gMCxcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsLFxuICAgICAgICBsb2dvX3NlbCxcbiAgICAgICAgbG9nb19saW5lX3NlbCxcbiAgICAgICAgbG9nb19zdWJzaWRpYXJ5X3NlbCxcbiAgICAgICAgbG9nb19jb21wb25lbnRzID0gbG9nb0NvbXBvbmVudHMsXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX2xpbmUsXG4gICAgICAgIGxpbmUgPSBkMy5zdmcubGluZSgpO1xuXG4gICAgdmFyIHNjcm9sbF9zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pXG4gICAgICAgIC5yYW5nZShbMCwgMV0pXG4gICAgICAgIC5jbGFtcCh0cnVlKSxcbiAgICAgICAgcHJldl9zY3JvbGxfcHJvZ3Jlc3MgPSAwO1xuXG4gICAgd2luZG93X3NlbFxuICAgICAgICAub24oJ3Jlc2l6ZS5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsKCk7XG4gICAgICAgICAgICBzY3JvbGxfc2NhbGUuZG9tYWluKFswLCBkaXN0YW5jZV90b19zY3JvbGxdKTtcblxuICAgICAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3dfd2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgbG9nbyBjb21wb25lbnRzIHBlciB3aW5kb3dcbiAgICAgICAgICAgIGlmIChsb2dvX3NlbCkge1xuICAgICAgICAgICAgICAgIGxvZ29fc2VsLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBkLnJ1bGVzKHdpbmRvd193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGQuc3RhcnQgPSB1cGRhdGVkLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBkLmVuZCA9IHVwZGF0ZWQuZW5kO1xuICAgICAgICAgICAgICAgICAgICBkLmludGVycG9sYXRvciA9XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRfaW50ZXJwb2xhdG9yKHVwZGF0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmludGVycG9sYXRvcjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMocHJldl9zY3JvbGxfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ3Njcm9sbC5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNjcm9sbF9wcm9ncmVzcyA9IHNjcm9sbF9zY2FsZSh3aW5kb3cuc2Nyb2xsWSk7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsX3Byb2dyZXNzICE9IHByZXZfc2Nyb2xsX3Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhzY3JvbGxfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZfc2Nyb2xsX3Byb2dyZXNzID0gc2Nyb2xsX3Byb2dyZXNzO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuc2Nyb2xsT3ZlclNlbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNjcm9sbF9vdmVyX3NlbDtcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG9nb19jb250YWluZXJfc2VsO1xuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBsb2dvIGNvbXBvbmVudHMgcGVyIHdpbmRvd1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBsb2dvX2NvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBkLnJ1bGVzKHdpbmRvd193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgZC5zdGFydCA9IHVwZGF0ZWQuc3RhcnQ7XG4gICAgICAgICAgICBkLmVuZCA9IHVwZGF0ZWQuZW5kO1xuICAgICAgICAgICAgZC5pbnRlcnBvbGF0b3IgPVxuICAgICAgICAgICAgICAgIGFkZF9pbnRlcnBvbGF0b3IodXBkYXRlZClcbiAgICAgICAgICAgICAgICAgICAgLmludGVycG9sYXRvcjtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsKCk7XG4gICAgICAgIHNjcm9sbF9zY2FsZS5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pO1xuXG4gICAgICAgIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMoXG4gICAgICAgICAgICBzY3JvbGxfc2NhbGUoXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFkpKTtcblxuXG4gICAgICAgIGxvZ29fc2VsID0gbG9nb19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnbG9nby1jb21wb25lbnQnKVxuICAgICAgICAgICAgLmRhdGEobG9nb19jb21wb25lbnRzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbG9nby1jb21wb25lbnQgJyArIGQuY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydC50b3A7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LmJvdHRvbTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdyaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQucmlnaHQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0Wydmb250LXNpemUnXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmh0bWw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX2xpbmVfc2VsID0gbG9nb19zZWwuZmlsdGVyKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gZC50eXBlID09PSAnbGluZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fc3Vic2lkaWFyeV9zZWwgPSBsb2dvX3NlbC5maWx0ZXIoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnR5cGUgPT09ICdzdWJzaWRpYXJ5JztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICBsb2dvX2xpbmUgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEoW2xvZ29fdmVydGljaWVzKCldKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMgKHBlcmNlbnRfcHJvZ3Jlc3MpIHtcbiAgICAgICAgY29uc29sZS5sb2cocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgIGlmICghbG9nb19zZWwpIHJldHVybjtcbiAgICAgICAgbG9nb19zZWxcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IudG9wKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IuYm90dG9tKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLmxlZnQocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdyaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLnJpZ2h0KHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnZm9udC1zaXplJ10ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdsaW5lLWhlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2xpbmUtaGVpZ2h0J10ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICgpIHtcbiAgICAgICAgdmFyIHZlcnRpY2llcyA9IFtsb2dvX3ZlcnRpY2llcygpXTtcbiAgICAgICAgbG9nb19saW5lLmRhdGEodmVydGljaWVzKTtcbiAgICAgICAgbG9nb19saW5lLmF0dHIoJ2QnLCBsaW5lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX3ZlcnRpY2llcyAoKSB7XG4gICAgICAgIHZhciBsb2dvX2xpbmVfdmVydGljaWVzID0gW107XG4gICAgICAgIGxvZ29fbGluZV9zZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfdmVydGljaWVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIFtib3VuZHMubGVmdCAtIDEwLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICBbYm91bmRzLnJpZ2h0ICsgMTAsXG4gICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbG9nb19saW5lX3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjX2Rpc3RhbmNlX3RvX3Njcm9sbCAoKSB7XG4gICAgICAgIHZhciBzY3JvbGxpbmdfZGlzdGFuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHNjcm9sbF9vdmVyX3NlbC5zdHlsZSgnbWFyZ2luLXRvcCcsIHNjcm9sbGluZ19kaXN0YW5jZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICByZXR1cm4gc2Nyb2xsaW5nX2Rpc3RhbmNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9pbnRlcnBvbGF0b3IgKHN0YXRlcykge1xuICAgICAgICBzdGF0ZXMuaW50ZXJwb2xhdG9yID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzdGF0ZXMuc3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlcy5pbnRlcnBvbGF0b3Jba2V5XSA9XG4gICAgICAgICAgICAgICAgZDMuaW50ZXJwb2xhdGVTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5zdGFydFtrZXldLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuZW5kW2tleV0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gW3tcbiAgICBodG1sOiAnUklTRCcsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1yaXNkIHRleHQtbGVmdCBsb2dvLWNvbXBvbmVudC0tdGl0bGUnLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzMwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMzAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgIH0sXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnR3JhZCcsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWdyYWQgdGV4dC1sZWZ0IGxvZ28tY29tcG9uZW50LS10aXRsZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzQwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMzAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC40KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNSkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICdTaG93JyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tc2hvdyB0ZXh0LXJpZ2h0IGxvZ28tY29tcG9uZW50LS10aXRsZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzQ1JScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnMzAlJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC40NSkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnMjAxNCcsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLTIwMTQgdGV4dC1yaWdodCBsb2dvLWNvbXBvbmVudC0tdGl0bGUnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBzdGFydDoge1xuICAgICAgICB0b3A6ICc2MCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzMwJScsXG4gICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICAgIHRvcDogJzk1JScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgIH0sXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNikgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgLSA4MCkgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICdSaG9kZSBJc2xhbmQgU2Nob29sIG9mIERlc2lnbjxicj4nK1xuICAgICAgICAgICdBbm51YWwgR3JhZCBUaGVzaXMgRXhoaWJpdGlvbicsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLXN1YmhlYWRsaW5lIHRleHQtbGVmdCcsXG4gICAgdHlwZTogJ3N1YnNpZGlhcnknLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzUwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMzAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnNjAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC41KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNikgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSwge1xuICAgIGh0bWw6ICdSSSBDb252ZW50aW9uIENlbnRlcjxicj4nK1xuICAgICAgICAgICdFeGhpYml0aW9uIEhhbGwgQTxicj4nICtcbiAgICAgICAgICAnT25lIFNhYmluIFN0cmVldCwgUHJvdmlkZW5jZTxicj48YnI+JyArXG4gICAgICAgICAgJ09wZW4gMTLigJM1cG0gRGFpbHk8YnI+JytcbiAgICAgICAgICAnTWF5IDE24oCTMzEnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1sb2NhdGlvbiB0ZXh0LWxlZnQnLFxuICAgIHR5cGU6ICdzdWJzaWRpYXJ5JyxcbiAgICBzdGFydDoge1xuICAgICAgICB0b3A6ICczMCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzMwJScsXG4gICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAnZm9udC1zaXplJzogJzEwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICB9LFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJzxzdmc+JyArXG4gICAgICAgICAgJzwvc3ZnPicsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWFzdGVyaXNrIHRleHQtbGVmdCcsXG4gICAgdHlwZTogJ3N1YnNpZGlhcnknLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzMwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnMzAlJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICdmb250LXNpemUnOiAnMTBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgIH0sXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1dOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNsYXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICAvLyB0aGUgc2VsZWN0aW9uIHRoYXQgaXMgYmVpbmcgdHJhbnNsYXRlZFxuICAgICAgICB0cmFuc2xhdGVkX3NlbCxcbiAgICAgICAgLy8gdGhlIHNlbGVjdGlvbiB0aGF0IGlzIGJlaW5nIHRyYW5zbGF0ZWQgb3ZlclxuICAgICAgICAvLyB0aGlzIHdpbGwgZGV0ZXJtaW5lIHRoZSBoZWlnaHQgdGhhdCBtdXN0IGJlXG4gICAgICAgIC8vIHNjcm9sbCBwYXNzZWQsIGJlZm9yZSB0aGUgdHJhbnNsYXRlZF9zZWxcbiAgICAgICAgLy8gaXMgdHJhbnNsYXRlZCBvdmVyXG4gICAgICAgIG92ZXJfc2VsLFxuICAgICAgICBvdmVyX3NlbF9oZWlnaHQgPSAwLFxuICAgICAgICAvLyB0aGUgc2VsZWN0aW9uIGZvciB0aGUgZnVsbCBzY3JlZW4gZWxlbWVudFxuICAgICAgICAvLyB3aG9zZSB6LWluZGV4IGFuZCBvcGFjaXR5IGdldCBhZGp1c3RlZFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIGp1c3Qgc2xpZGluZyBpbiwgdGhlIGltYWdlc1xuICAgICAgICAvLyBzbGlkZSBpbiBvdmVyIHRoZSBuZXcgYmFja2dyb3VuZC5cbiAgICAgICAgYmFja2dyb3VuZF9zZWwsXG4gICAgICAgIG9wYWNpdHlfc2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgMjAwXSkgIC8vIGRpc3RhbmNlIHRvIHNjcm9sbFxuICAgICAgICAgICAgLnJhbmdlKFswLDFdKSAgICAgIC8vIG9wYWNpdHkgdmFsdWVzXG4gICAgICAgICAgICAuY2xhbXAodHJ1ZSk7XG5cbiAgICB2YXIgdmVuZG9yID0gW1wiXCIsIFwiLXdlYmtpdC1cIiwgXCItbW96LVwiLCBcIi1tcy1cIiwgXCItby1cIl0ucmVkdWNlKFxuICAgICAgICBmdW5jdGlvbiAocCwgdikge1xuICAgICAgICAgICAgcmV0dXJuIHYgKyBcInRyYW5zZm9ybVwiIGluIGRvY3VtZW50LmJvZHkuc3R5bGUgPyB2IDogcDtcbiAgICAgICAgfSk7XG5cbiAgICBzZWxmLnRyYW5zbGF0ZWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0cmFuc2xhdGVkX3NlbDtcbiAgICAgICAgdHJhbnNsYXRlZF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5vdmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gb3Zlcl9zZWw7XG4gICAgICAgIG92ZXJfc2VsID0gXztcblxuICAgICAgICBvdmVyX3NlbF9oZWlnaHQgPSBnZXRfb3Zlcl9zZWxfaGVpZ2h0KCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYmFja2dyb3VuZCA9IGZ1bmN0aW9uKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYmFja2dyb3VuZF9zZWw7XG4gICAgICAgIGJhY2tncm91bmRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Njcm9sbC50cmFuc2xhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VZT2Zmc2V0ID4gb3Zlcl9zZWxfaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUodmVuZG9yKyd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoMHB4LCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoLShvdmVyX3NlbF9oZWlnaHQgLSBwYWdlWU9mZnNldCkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4KScpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVkX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHZlbmRvcisndHJhbnNmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKDBweCwnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3Zlcl9zZWxfaGVpZ2h0IC0gcGFnZVlPZmZzZXQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgpJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBvcGFjaXR5X3ZhbCA9IG9wYWNpdHlfc2NhbGUocGFnZVlPZmZzZXQtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyX3NlbF9oZWlnaHQpO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIG9wYWNpdHlfdmFsKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChcImFjdGl2ZVwiLCAob3BhY2l0eV92YWwgPiAwKSA/IDE6IDApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbigncmVzaXplLnRyYW5zbGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBvdmVyX3NlbF9oZWlnaHQgPSBnZXRfb3Zlcl9zZWxfaGVpZ2h0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X292ZXJfc2VsX2hlaWdodCAoKSB7XG4gICAgICAgIGlmICghb3Zlcl9zZWwpIHJldHVybiAwO1xuICAgICAgICByZXR1cm4gb3Zlcl9zZWwubm9kZSgpXG4gICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgLmhlaWdodDtcbiAgICB9XG5cblxuICAgIFxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBCb3R0b20gPSByZXF1aXJlKCcuL2JvdHRvbScpLFxuICAgIExpZ2h0Ym94ID0gcmVxdWlyZSgnLi9saWdodGJveF9mYWRlX3VwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGF0YSA9IFtdLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHdvcmtfc2VsLFxuICAgICAgICByaXNkX3Byb2dyYW1zID0gWydBbGwnXSxcbiAgICAgICAgbWFzb25pY19ndXR0ZXIgPSAxMjA7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2RhdGFMb2FkZWQnKTtcblxuICAgIC8vIGRlYWwgd2l0aCB3aW5kb3cgYm90dG9tIGxvYWRpbmcgbW9yZVxuICAgIHZhciBib3R0b20gPSBzZWxmLmJvdHRvbSA9IEJvdHRvbSgpO1xuICAgIHZhciBsaWdodGJveCA9IHNlbGYubGlnaHRib3ggPSBMaWdodGJveCgpO1xuXG4gICAgYm90dG9tLmRpc3BhdGNoLm9uKCdib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldF9tb3JlX2RhdGEoKTtcbiAgICB9KTtcblxuICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgIC5vbigncmVzaXplLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXNpemVfbWFzb25pYygpO1xuICAgICAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldF9tb3JlX2RhdGEgKCkge1xuICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm90dG9tLmRpcnR5KGZhbHNlKTtcbiAgICAgICAgICAgIHJlbmRlcl9kYXRhKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBnZXRfZGF0YSgpO1xuICAgIH1cbiAgICAvLyBlbmQgZGVhbGluZyB3aXRoIHdpbmRvd1xuXG4gICAgdmFyIG1hc29uaWMgPSBkMy5tYXNvbmljKClcbiAgICAgICAgLndpZHRoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICByZXR1cm4gK2QuY292ZXIud2lkdGggKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmhlaWdodChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuICtkLmNvdmVyLmhlaWdodCArIG1hc29uaWNfZ3V0dGVyO1xuICAgICAgICB9KVxuICAgICAgICAuY29sdW1uV2lkdGgoMjAwICsgbWFzb25pY19ndXR0ZXIpO1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IF87XG5cbiAgICAgICAgLy8gc2lkZSBlZmZlY3Qgb2YgdXBkYXRpbmcgY29udGFpbmVyXG4gICAgICAgIGJvdHRvbS5jb250YWluZXIoY29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBnZXRfZGF0YSgpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLmNsYXNzZWQoJ21hc29uaWMnLCB0cnVlKTtcbiAgICAgICAgICAgIC8vIC5jbGFzc2VkKCdjb2wtMTAtMTAnLCB0cnVlKTtcblxuICAgICAgICByZW5kZXJfZGF0YSgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZGF0YSgpIHtcbiAgICAgICAgd29ya19zZWwgPSBjb250YWluZXIuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGg7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsX2VudGVyX21ldGEgPVxuICAgICAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tZXRhLXdyYXBwZXInKTtcbiAgICAgICAgd29ya19zZWxfZW50ZXJfbWV0YVxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaXN0LWF2YXRhcicpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5hdmF0YXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd29ya19zZWxfZW50ZXJfbWV0YVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3R1ZGVudF9uYW1lIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdHVkZW50X25hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd29ya19zZWxfZW50ZXJfbWV0YVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmlzZF9wcm9ncmFtIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5yaXNkX3Byb2dyYW07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNTA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGxpZ2h0Ym94LnNob3cpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNpemVfbWFzb25pYygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZV9tYXNvbmljICgpIHtcbiAgICAgICAgdmFyIG91dGVyV2lkdGggPSBjb250YWluZXIucHJvcGVydHkoJ29mZnNldFdpZHRoJyk7XG5cbiAgICAgICAgbWFzb25pY1xuICAgICAgICAgICAgLm91dGVyV2lkdGgob3V0ZXJXaWR0aClcbiAgICAgICAgICAgIC5yZXNldCgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuZGF0dW0obWFzb25pYylcbiAgICAgICAgICAgIC5zdHlsZShcIndpZHRoXCIsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImhlaWdodFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKFwibGVmdFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC54ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5zdHlsZShcInRvcFwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC55ICsgJ3B4JzsgfSlcbiAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmRhdGE7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb250YWluZXIuc3R5bGUoJ2hlaWdodCcsIG1hc29uaWMub3V0ZXJIZWlnaHQoKSArICdweCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldF9kYXRhICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID1cbiAgICAgICAgICAgICAgICBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMod29yayk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGFMb2FkZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZGF0YSBjb21lcyBvdXQgYXM6XG4gICAgLy8gW3tcbiAgICAvLyAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAvLyAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAvLyAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgIC8vICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAvLyAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyXG4gICAgLy8gfSwgXVxuICAgIGZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAod29yaykge1xuXG4gICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuXG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgZXh0ZW50IG9mIHdpZHRoc1xuICAgICAgICB2YXIgYWxsX21vZHVsZXMgPSBbXTtcbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBhbGxfbW9kdWxlcy5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2V0IGEgc2NhbGUgZm9yIG1hcHBpbmdcbiAgICAgICAgLy8gd2lkdGggdGhlIGFuIGltYWdlIHRvIHRoZVxuICAgICAgICAvLyB3aWR0aCBvZiB0aGUgbWFzb25pYyB2ZXJzaW9uXG4gICAgICAgIHZhciB3aWR0aF9leHRlbnQgPSBkMy5leHRlbnQoYWxsX21vZHVsZXMsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGg7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3aWR0aF9leHRlbnQnKTtcbiAgICAgICAgY29uc29sZS5sb2cod2lkdGhfZXh0ZW50KTtcbiAgICAgICAgdmFyIHdpZHRocyA9IGQzLnNjYWxlLm9yZGluYWwoKVxuICAgICAgICAgICAgLmRvbWFpbih3aWR0aF9leHRlbnQpXG4gICAgICAgICAgICAucmFuZ2UoWzEwMCwgMjAwLCA0MDBdKTtcbiAgICAgICAgLy8gdmFyIHdpZHRocyA9IGQzLnNjYWxlLmlkZW50aXR5KClcbiAgICAgICAgLy8gICAgIC5kb21haW4od2lkdGhfZXh0ZW50KTtcblxuICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcbiAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gcmFuZG9tX2NvdmVyX29wdGlvblxuICAgICAgICAgICAgdmFyIHJhbmRvbV9tb2R1bGVfaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUubGVuZ3RoKSxcbiAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlID1cbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlW3JhbmRvbV9tb2R1bGVfaW5kZXhdLFxuICAgICAgICAgICAgICAgIHJlb3JkZXJfbW9kdWxlc190b19pbmNsdWRlID0gW107XG5cbiAgICAgICAgICAgIHJlb3JkZXJfbW9kdWxlc190b19pbmNsdWRlLnB1c2gocmFuZG9tX21vZHVsZSk7XG4gICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGVcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCxyYW5kb21fbW9kdWxlX2luZGV4KVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVvcmRlcl9tb2R1bGVzX3RvX2luY2x1ZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLnNsaWNlKFxuICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlX2luZGV4KzEsXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgICAgICByZW9yZGVyX21vZHVsZXNfdG9faW5jbHVkZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnB1c2gobWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgdmFyIG1heF8xMjQwX2hlaWdodCA9XG4gICAgICAgICAgICAgICAgKHJhbmRvbV9tb2R1bGUuaGVpZ2h0L3JhbmRvbV9tb2R1bGUud2lkdGgpICpcbiAgICAgICAgICAgICAgICAxMjQwO1xuICAgICAgICAgICAgdmFyIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogMTI0MCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF9oZWlnaHQ6IG1heF8xMjQwX2hlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhzKHJhbmRvbV9tb2R1bGUud2lkdGgpLFxuICAgICAgICAgICAgICAgIHNyYzogcmFuZG9tX21vZHVsZS5zcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByYW5kb21fY292ZXIuaGVpZ2h0ID0gKHJhbmRvbV9jb3Zlci53aWR0aCpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS5oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUud2lkdGg7XG5cbiAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgJ21vZHVsZXMnOiByZW9yZGVyX21vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICAgICAnY292ZXInOiByYW5kb21fY292ZXIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGQuZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBhdmF0YXI6IGQub3duZXJzWzBdLmltYWdlc1snMTM4J10sXG4gICAgICAgICAgICAgICAgdXJsOiBkLm93bmVyc1swXS51cmxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtcy5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcbiAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkX3dvcms7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVwYXJ0bWVudCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd3JhcHBlcixcbiAgICAgICAgY2xzID0gJ2RlcGFydG1lbnQnLFxuICAgICAgICBkZXBhcnRtZW50cyxcbiAgICAgICAgYWN0aXZhdG9yLFxuICAgICAgICBhY3RpdmF0b3JfdGV4dCxcbiAgICAgICAgYmxhbmtldF9zZWwsXG4gICAgICAgIGdyaWRfc2VsLFxuICAgICAgICBhY3RpdmVfc3RhdGUgPSBmYWxzZSxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHZhciBkYXRhID0gW1xuICAgICAgICAnQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0NlcmFtaWNzJyxcbiAgICAgICAgJ0RpZ2l0YWwgKyBNZWRpYScsXG4gICAgICAgICdGdXJuaXR1cmUnLFxuICAgICAgICAnR2xhc3MnLFxuICAgICAgICAnR3JhcGhpYyBEZXNpZ24nLFxuICAgICAgICAnSW5kdXN0cmlhbCBEZXNpZ24nLFxuICAgICAgICAnSW50ZXJpb3IgQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0pld2VscnkgKyBNZXRhbHNtaXRoaW5nJyxcbiAgICAgICAgJ0xhbmRzY2FwZSBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnUGFpbnRpbmcnLFxuICAgICAgICAnUGhvdG9ncmFwaHknLFxuICAgICAgICAnUHJpbnRtYWtpbmcnLFxuICAgICAgICAnU2N1bHB0dXJlJyxcbiAgICAgICAgJ1RleHRpbGVzJyxcbiAgICAgICAgJ0FsbCdcbiAgICBdO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdmaWx0ZXInKTtcblxuICAgIHNlbGYud3JhcHBlciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHdyYXBwZXI7XG4gICAgICAgIHdyYXBwZXIgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHNlbGYuZGVwYXJ0bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJkZXBhcnRtZW50cyBpcyBhIGdldHRlclwiO1xuICAgICAgICByZXR1cm4gZGVwYXJ0bWVudHM7XG4gICAgfTtcblxuICAgIHNlbGYuZ3JpZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGdyaWRfc2VsO1xuICAgICAgICBncmlkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF3cmFwcGVyKSB0aHJvdyBcInJlcXVpcmVzIGEgd3JhcHBlclwiO1xuXG4gICAgICAgIGFjdGl2YXRvciA9IHdyYXBwZXIuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2J1dHRvbiBkZXBhcnRtZW50LWFjdGl2YXRvciBjb2wtMTAtMTAnKVxuICAgICAgICAgICAgLm9uKCdjbGljaycgLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlX3N0YXRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBhY3RpdmF0b3JfdGV4dCA9IGFjdGl2YXRvci5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlcGFydG1lbnQtYWN0aXZhdG9yLXRleHQnKVxuICAgICAgICAgICAgLnRleHQoJ2ZpbHRlciBieSBkZXBhcnRtZW50Jyk7XG5cbiAgICAgICAgYmxhbmtldF9zZWwgPSB3cmFwcGVyLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkZXBhcnRtZW50LWJsYW5rZXQnKTtcblxuXG4gICAgICAgIGRlcGFydG1lbnRzID0gd3JhcHBlci5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGVwYXJ0bWVudC1saXN0Jyk7XG4gICAgICAgIFxuICAgICAgICBkZXBhcnRtZW50c1xuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChjbHMpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsdGVyJywgZCk7XG4gICAgICAgICAgICAgICAgdmFyIHByb2dyYW0gPSBkO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmFtID09PSAnQWxsJykgcHJvZ3JhbSA9ICdEZXBhcnRtZW50cyc7XG4gICAgICAgICAgICAgICAgYWN0aXZhdG9yX3RleHQudGV4dChwcm9ncmFtKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmZpbHRlcihkKTtcbiAgICAgICAgICAgICAgICB0b2dnbGVfc3RhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGJsYW5rZXRfc2VsLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRvZ2dsZV9zdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdG9nZ2xlX3N0YXRlICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvZ2dsZScpO1xuICAgICAgICBhY3RpdmVfc3RhdGUgPSBhY3RpdmVfc3RhdGUgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgIHdyYXBwZXIuY2xhc3NlZCgnZGVwYXJ0bWVudHMtLWFjdGl2ZScsIGFjdGl2ZV9zdGF0ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIGFjdGl2ZV9zdGF0ZSk7XG4gICAgICAgIGdyaWRfc2VsLmNsYXNzZWQoJ3otaW5kZXgtMzAnLCBhY3RpdmVfc3RhdGUpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBEZXBhcnRtZW50cyA9IHJlcXVpcmUoJy4vZGVwYXJ0bWVudHMnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvJyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpLFxuICAgIFRyYW5zbGF0ZSA9IHJlcXVpcmUoJy4vdHJhbnNsYXRlJyksXG4gICAgTmF2ID0gcmVxdWlyZSgnLi9zZWN0aW9uX25hdicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDQgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgZ3JpZF9zZWw7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2h0bWxMb2FkZWQnKTtcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IERlcGFydG1lbnRzKCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG4gICAgdmFyIHdvcmsgPSBXb3JrKHNlbGYpO1xuICAgIHZhciB0cmFuc2xhdGUgPSBUcmFuc2xhdGUoKTtcbiAgICB2YXIgbmF2ID0gTmF2KCk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDViJywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICAvLyAubG9nby1jb250YWluZXIgaXMgYSBuZWlnaGJvciBvZiAuZ3JpZFxuICAgICAgICB2YXIgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ28uY29udGFpbmVyKGxvZ29fY29udGFpbmVyX3NlbCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQtd3JhcHBlcicpO1xuXG5cblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDViL2dyaWQuaHRtbCcsIGZ1bmN0aW9uIChodG1sKSB7XG5cbiAgICAgICAgICAgIGdyaWRfc2VsLm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmh0bWxMb2FkZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nby5zY3JvbGxPdmVyU2VsKGQzLnNlbGVjdCgnLmdyaWQtYWJvdXQnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfY29udGFpbmVyID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gnKTtcblxuICAgICAgICB2YXIgd29ya19iYWNrZ3JvdW5kX3NlbCA9IGQzLnNlbGVjdCgnLmdyaWQtd3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmstYmFja2dyb3VuZCcpO1xuXG4gICAgICAgIHZhciBncmlkX3dvcmtfc2VsID0gZDMuc2VsZWN0KCcuZ3JpZC13cmFwcGVyJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCBncmlkLXdvcmsnKTtcbiAgICAgICAgXG4gICAgICAgIHZhciB3b3JrX3dyYXBwZXIgPSBncmlkX3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmstd3JhcHBlciByb3cnKTtcblxuXG4gICAgICAgIHZhciB0b3BfbmF2X3NlbCA9IGQzLnNlbGVjdCgnLmdyaWQtd3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCduYXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25hdi1zZWN0aW9uJyk7XG5cbiAgICAgICAgd29yay5ib3R0b21cbiAgICAgICAgICAgIC5hZGRpdGlvbmFsTWFyZ2luQm90dG9tU2VsKGQzLnNlbGVjdCgnLmdyaWQtd29yaycpKTtcblxuICAgICAgICB2YXIgZGVwYXJ0bWVudF9zZWwgPSB3b3JrX3dyYXBwZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZGVwYXJ0bWVudHMgY29sLTItMTAnKTtcblxuICAgICAgICBkZXBhcnRtZW50c1xuICAgICAgICAgICAgLndyYXBwZXIoZGVwYXJ0bWVudF9zZWwpXG4gICAgICAgICAgICAuZ3JpZChncmlkX3dvcmtfc2VsKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG5cbiAgICAgICAgdmFyIHdvcmtfc2VsID0gd29ya193cmFwcGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2lkJywgJ3dvcmsnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmsgY29sLTgtMTAgb2Zmc2V0LTItMTAnKTtcblxuICAgICAgICB3b3JrLmNvbnRhaW5lcih3b3JrX3NlbClcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICAgICAgXG4gICAgICAgIHdvcmsubGlnaHRib3hcbiAgICAgICAgICAgIC5jb250YWluZXIobGlnaHRib3hfY29udGFpbmVyKTtcblxuXG4gICAgICAgIHRyYW5zbGF0ZVxuICAgICAgICAgICAgLnRyYW5zbGF0ZSh3b3JrX3NlbClcbiAgICAgICAgICAgIC5vdmVyKGQzLnNlbGVjdCgnLmludHJvLXdyYXBwZXInKSlcbiAgICAgICAgICAgIC5iYWNrZ3JvdW5kKHdvcmtfYmFja2dyb3VuZF9zZWwpXG4gICAgICAgICAgICAuZml4ZWQoZGVwYXJ0bWVudF9zZWwpXG4gICAgICAgICAgICAubmF2KHRvcF9uYXZfc2VsKVxuICAgICAgICAgICAgLnNjcm9sbExlYWQoZDMuc2VsZWN0KCcuc2Nyb2xsLWxlYWQnKSlcbiAgICAgICAgICAgIC5zZXR1cCgpO1xuXG4gICAgICAgIGRlcGFydG1lbnRzLmRpc3BhdGNoXG4gICAgICAgICAgICAub24oJ2ZpbHRlci53b3JrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB3b3JrLmZpbHRlcihkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG5hdi53cmFwcGVyKHRvcF9uYXZfc2VsKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlnaHRib3ggKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgc2VsZWN0ZWRfc2VsLFxuICAgICAgICB0b190cmFuc2l0aW9uID0ge1xuICAgICAgICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAncmdiYSgyMzksIDY1LCA1NCwgMCknLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAncmdiYSgyMzksIDY1LCA1NCwgMC45KScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NvbnRhaW5lcicpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignY29udGFpbmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gXztcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5jb250YWluZXIoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8vIHBhc3MgaW4gZGF0YSB0byBtYWtlIHNob3cgdXBcbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB0aHJvdyBcIkV4cGVjdGVkIGNvbnRhaW5lci5cIjtcbiAgICAgICAgc2VsZWN0ZWRfc2VsID0gc2VsO1xuXG4gICAgICAgIHZhciBkYXRhID0gc2VsLmRhdHVtKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGF0YS5tb2R1bGVzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEubW9kdWxlcyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2dyaWRfc2VsID0gY29udGFpbmVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhIGNvbC0yLTEwJyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X3dvcmtfc2VsID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtd29yayBvZmZzZXQtMi0xMCBjb2wtOC0xMCcpO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdoMicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5wcm9qZWN0X25hbWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAudGV4dChkYXRhLmRlc2NyaXB0aW9uKTtcblxuICAgICAgICBsaWdodGJveF93b3JrX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhLm1vZHVsZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZScpXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc2l6ZXMubWF4XzEyNDAgPyBkLnNpemVzLm1heF8xMjQwIDogZC5zcmM7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9pbmZvX3NlbCA9IGxpZ2h0Ym94X21ldGFfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mbycpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tc3R1ZGVudC1uYW1lJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuc3R1ZGVudF9uYW1lKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXJpc2QtcHJvZ3JhbScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnJpc2RfcHJvZ3JhbSk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1wZXJzb25hbC1saW5rJylcbiAgICAgICAgICAgIC5hdHRyKCdocmVmJywgZGF0YS51cmwpXG4gICAgICAgICAgICAudGV4dCgnQmVoYW5jZScpO1xuXG5cbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuc3RhcnQpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgdHJ1ZSk7XG5cbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLW91dCcpXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uY29udGFpbmVyLmVuZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjgwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuc3RhcnQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRfc2VsLnN0eWxlKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBsb2dvQ29tcG9uZW50cyA9IHJlcXVpcmUoJy4vbG9nb19jb21wb25lbnRzJyksXG4gICAgbG9nb0Nvbm5lY3RpbmcgPSByZXF1aXJlKCcuL2xvZ29fY29ubmVjdGluZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsLFxuICAgICAgICBkaXN0YW5jZV90b19zY3JvbGwgPSAwLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc2VsLFxuICAgICAgICBsb2dvX2xpbmVfc2VsLFxuICAgICAgICBsb2dvX3N1YnNpZGlhcnlfc2VsLFxuICAgICAgICBsb2dvX2NvbXBvbmVudHMgPSBsb2dvQ29tcG9uZW50cyxcbiAgICAgICAgbG9nb19jb25uZWN0aW5nX3BhdGhzID0gbG9nb0Nvbm5lY3RpbmcsXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX2xpbmUsXG4gICAgICAgIGxvZ29fY29ubmVjdGluZyxcbiAgICAgICAgc3RyYWlnaHRfbGluZSA9IGQzLnN2Zy5saW5lKCk7XG5cbiAgICB2YXIgc2Nyb2xsX3NjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgZGlzdGFuY2VfdG9fc2Nyb2xsXSlcbiAgICAgICAgLnJhbmdlKFswLCAxXSlcbiAgICAgICAgLmNsYW1wKHRydWUpLFxuICAgICAgICBwcmV2X3Njcm9sbF9wcm9ncmVzcyA9IDA7XG5cbiAgICB3aW5kb3dfc2VsXG4gICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgZGlzdGFuY2VfdG9fc2Nyb2xsID0gY2FsY19kaXN0YW5jZV90b19zY3JvbGwoKTtcbiAgICAgICAgICAgIHNjcm9sbF9zY2FsZS5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pO1xuXG4gICAgICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBsb2dvIGNvbXBvbmVudHMgcGVyIHdpbmRvd1xuICAgICAgICAgICAgaWYgKGxvZ29fc2VsKSB7XG4gICAgICAgICAgICAgICAgbG9nb19zZWwuZWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlZCA9IGQucnVsZXMod2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZC5zdGFydCA9IHVwZGF0ZWQuc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGQuZW5kID0gdXBkYXRlZC5lbmQ7XG4gICAgICAgICAgICAgICAgICAgIGQuaW50ZXJwb2xhdG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZF9pbnRlcnBvbGF0b3IodXBkYXRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW50ZXJwb2xhdG9yO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhwcmV2X3Njcm9sbF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignc2Nyb2xsLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsX3Byb2dyZXNzID0gc2Nyb2xsX3NjYWxlKHdpbmRvdy5zY3JvbGxZKTtcbiAgICAgICAgICAgIGlmIChzY3JvbGxfcHJvZ3Jlc3MgIT0gcHJldl9zY3JvbGxfcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbG9nb19jb21wb25lbnRzKHNjcm9sbF9wcm9ncmVzcyk7XG4gICAgICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldl9zY3JvbGxfcHJvZ3Jlc3MgPSBzY3JvbGxfcHJvZ3Jlc3M7XG5cbiAgICAgICAgICAgIGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgIC5jbGFzc2VkKCdsb2dvLXN2Zy0tZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAoc2Nyb2xsX3Byb2dyZXNzID09PSAxKSA/IHRydWUgOiBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5zY3JvbGxPdmVyU2VsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2Nyb2xsX292ZXJfc2VsO1xuICAgICAgICBzY3JvbGxfb3Zlcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdXBkYXRlIGxvZ28gY29tcG9uZW50cyBwZXIgd2luZG93XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19jb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciB1cGRhdGVkID0gZC5ydWxlcyh3aW5kb3dfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgICAgIGQuc3RhcnQgPSB1cGRhdGVkLnN0YXJ0O1xuICAgICAgICAgICAgZC5lbmQgPSB1cGRhdGVkLmVuZDtcbiAgICAgICAgICAgIGQuaW50ZXJwb2xhdG9yID1cbiAgICAgICAgICAgICAgICBhZGRfaW50ZXJwb2xhdG9yKHVwZGF0ZWQpXG4gICAgICAgICAgICAgICAgICAgIC5pbnRlcnBvbGF0b3I7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsKCk7XG4gICAgICAgIHNjcm9sbF9zY2FsZS5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pO1xuXG4gICAgICAgIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMoXG4gICAgICAgICAgICBzY3JvbGxfc2NhbGUoXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFkpKTtcblxuXG4gICAgICAgIGxvZ29fc2VsID0gbG9nb19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnbG9nby1jb21wb25lbnQnKVxuICAgICAgICAgICAgLmRhdGEobG9nb19jb21wb25lbnRzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbG9nby1jb21wb25lbnQgJyArIGQuY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydC50b3A7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LmJvdHRvbTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdyaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQucmlnaHQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0Wydmb250LXNpemUnXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xpbmUtaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydFsnbGluZS1oZWlnaHQnXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmh0bWw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX2xpbmVfc2VsID0gbG9nb19zZWwuZmlsdGVyKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gZC50eXBlID09PSAnbGluZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fc3Vic2lkaWFyeV9zZWwgPSBsb2dvX3NlbC5maWx0ZXIoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnR5cGUgPT09ICdzdWJzaWRpYXJ5JztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICB2YXIgdmVydGljaWVzID0gbG9nb192ZXJ0aWNpZXMoKTtcblxuICAgICAgICBsb2dvX2xpbmUgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgICAgICAgLmRhdGEodmVydGljaWVzLnN0cmFpZ2h0KVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSk7XG5cbiAgICAgICAgbG9nb19jb25uZWN0aW5nID1cbiAgICAgICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmxvZ28tY29ubmVjdGluZycpXG4gICAgICAgICAgICAgICAgLmRhdGEodmVydGljaWVzLmNvbm5lY3RpbmcpXG4gICAgICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tY29ubmVjdGluZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fY29tcG9uZW50cyAocGVyY2VudF9wcm9ncmVzcykge1xuICAgICAgICBpZiAoIWxvZ29fc2VsKSByZXR1cm47XG4gICAgICAgIGxvZ29fc2VsXG4gICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLnRvcChwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yLmJvdHRvbShwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci5sZWZ0KHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgncmlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci5yaWdodChwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuaW50ZXJwb2xhdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2ZvbnQtc2l6ZSddKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnbGluZS1oZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgWydsaW5lLWhlaWdodCddKHBlcmNlbnRfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB2ZXJ0aWNpZXMgPSBsb2dvX3ZlcnRpY2llcygpO1xuXG4gICAgICAgIGxvZ29fbGluZVxuICAgICAgICAgICAgLmRhdGEodmVydGljaWVzLnN0cmFpZ2h0KVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBzdHJhaWdodF9saW5lKTtcblxuICAgICAgICBsb2dvX2Nvbm5lY3RpbmdcbiAgICAgICAgICAgIC5kYXRhKHZlcnRpY2llcy5jb25uZWN0aW5nKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX3ZlcnRpY2llcyAoKSB7XG4gICAgICAgIHZhciBsb2dvX2xpbmVfdmVydGljaWVzID0gW107XG4gICAgICAgIHZhciBsb2dvX2Nvbm5lY3Rpbmdfc2VnbWVudHMgPSBbXTtcblxuICAgICAgICBsb2dvX2xpbmVfc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0IC0gNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldO1xuXG4gICAgICAgICAgICBsb2dvX2xpbmVfdmVydGljaWVzLnB1c2goW2ZpcnN0LCBzZWNvbmRdKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvZ29fbGluZV92ZXJ0aWNpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoaSsxKSA8IGxvZ29fbGluZV92ZXJ0aWNpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbG9nb19saW5lX3ZlcnRpY2llc1tpXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbG9nb19saW5lX3ZlcnRpY2llc1tpKzFdWzBdO1xuXG4gICAgICAgICAgICAgICAgbG9nb19jb25uZWN0aW5nX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nb19jb25uZWN0aW5nX3BhdGhzW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlZ21lbnQoc3RhcnQsIGVuZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdHJhaWdodDogbG9nb19saW5lX3ZlcnRpY2llcyxcbiAgICAgICAgICAgIGNvbm5lY3Rpbmc6IGxvZ29fY29ubmVjdGluZ19zZWdtZW50c1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsICgpIHtcbiAgICAgICAgdmFyIHNjcm9sbGluZ19kaXN0YW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsLnN0eWxlKCdtYXJnaW4tdG9wJywgc2Nyb2xsaW5nX2Rpc3RhbmNlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgIHJldHVybiBzY3JvbGxpbmdfZGlzdGFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX2ludGVycG9sYXRvciAoc3RhdGVzKSB7XG4gICAgICAgIC8vIHNpemVzXG4gICAgICAgIC8vIHsgbWluMTQwMDoge30sICBtaW4xMDI0OiB7fSwgbWluNzY4OiB7fSwgbWluMzAwOiB7fX1cbiAgICAgICAgc3RhdGVzLmludGVycG9sYXRvciA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc3RhdGVzLnN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZXMuaW50ZXJwb2xhdG9yW2tleV0gPVxuICAgICAgICAgICAgICAgIGQzLmludGVycG9sYXRlU3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuc3RhcnRba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVzLmVuZFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGVzO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IFt7XG4gICAgaHRtbDogJ1JJU0QnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tcmlzZCB0ZXh0LWxlZnQgbG9nby1jb21wb25lbnQtLXRpdGxlJyxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHdpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMikgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4yKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNDBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA8IDEwMjQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnR3JhZCcsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWdyYWQgdGV4dC1sZWZ0IGxvZ28tY29tcG9uZW50LS10aXRsZScsXG4gICAgdHlwZTogJ2xpbmUnLFxuICAgIHN0YXJ0OiB7XG4gICAgICAgIHRvcDogJzQwJScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnMzAlJyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgfSxcbiAgICBlbmQ6IHtcbiAgICAgICAgdG9wOiAnMjAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHdpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMikgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA8IDEwMjQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC40KSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4yKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoIDwgMTQwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjQpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjIpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjQpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4yKSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJ1Nob3cnLFxuICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1zaG93IHRleHQtcmlnaHQgbG9nby1jb21wb25lbnQtLXRpdGxlJyxcbiAgICB0eXBlOiAnbGluZScsXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh3aWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjQ1KSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC44NSkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA8IDEwMjQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC41MikgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuODUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUyKSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuODUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnMjAxNCcsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLTIwMTQgdGV4dC1yaWdodCBsb2dvLWNvbXBvbmVudC0tdGl0bGUnLFxuICAgIHR5cGU6ICdsaW5lJyxcbiAgICBzdGFydDoge1xuICAgICAgICB0b3A6ICc2MCUnLFxuICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICByaWdodDogJzMwJScsXG4gICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICc0MnB4J1xuICAgIH0sXG4gICAgZW5kOiB7XG4gICAgICAgIHRvcDogJzk1JScsXG4gICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgIH0sXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh3aWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjYpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnNDJweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgLSA4MCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTRweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA8IDEwMjQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC42KSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICc2MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0IC0gODApICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE0cHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjYpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzQycHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0IC0gODApICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxNHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sXG4vLyB7XG4vLyAgICAgaHRtbDogJ1Job2RlIElzbGFuZCBTY2hvb2wgb2YgRGVzaWduPGJyPicrXG4vLyAgICAgICAgICAgJ0FubnVhbCBHcmFkIFRoZXNpcyBFeGhpYml0aW9uJyxcbi8vICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tc3ViaGVhZGxpbmUgdGV4dC1sZWZ0Jyxcbi8vICAgICB0eXBlOiAnc3Vic2lkaWFyeScsXG4vLyAgICAgc3RhcnQ6IHtcbi8vICAgICAgICAgdG9wOiAnNTAlJyxcbi8vICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4vLyAgICAgICAgIGxlZnQ6ICczMCUnLFxuLy8gICAgICAgICByaWdodDogJ2F1dG8nLFxuLy8gICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuLy8gICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbi8vICAgICB9LFxuLy8gICAgIGVuZDoge1xuLy8gICAgICAgICB0b3A6ICc4OCUnLFxuLy8gICAgICAgICBib3R0b206ICdhdXRvJyxcbi8vICAgICAgICAgbGVmdDogJzUwcHgnLFxuLy8gICAgICAgICByaWdodDogJ2F1dG8nLFxuLy8gICAgICAgICAnZm9udC1zaXplJzogJzEzcHgnLFxuLy8gICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbi8vICAgICB9LFxuLy8gICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuLy8gICAgICAgICBpZiAod2lkdGggPCA3NjgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICAgICAgc3RhcnQ6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC41KSArICdweCcsXG4vLyAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4Jyxcbi8vICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbi8vICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4Jyxcbi8vICAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBlbmQ6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC44OCkgKyAncHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbi8vICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEzcHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmICh3aWR0aCA8IDEwMjQpIHtcbi8vICAgICAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICAgICAgc3RhcnQ6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC41KSArICdweCcsXG4vLyAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgICAgICBsZWZ0OiAod2lkdGggKiAwLjMpICsgJ3B4Jyxcbi8vICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbi8vICAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4Jyxcbi8vICAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICBlbmQ6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC44OCkgKyAncHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbi8vICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEzcHgnLFxuLy8gICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICBzdGFydDoge1xuLy8gICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuNSkgKyAncHgnLFxuLy8gICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuLy8gICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuLy8gICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4vLyAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4Jyxcbi8vICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbi8vICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICBlbmQ6IHtcbi8vICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjg4KSArICdweCcsXG4vLyAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4vLyAgICAgICAgICAgICAgICAgbGVmdDogJzUwcHgnLFxuLy8gICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4vLyAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxM3B4Jyxcbi8vICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9XG4vLyB9LFxue1xuICAgIGh0bWw6ICdPcGVuIDEy4oCTNXBtIERhaWx5PGJyPicrXG4gICAgICAgICAgJ01heSAxNuKAkzMxPGJyPjxicj4nICtcbiAgICAgICAgICAnT3BlbmluZyBSZWNlcHRpb248YnI+JyArXG4gICAgICAgICAgJ01heSAxNSwgNuKAkzhwbScsXG4gICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWxvY2F0aW9uIHRleHQtbGVmdCcsXG4gICAgdHlwZTogJ3N1YnNpZGlhcnknLFxuICAgIHJ1bGVzOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxM3B4JyxcbiAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59LCB7XG4gICAgaHRtbDogJ1JJIENvbnZlbnRpb24gQ2VudGVyPGJyPicrXG4gICAgICAgICAgJ0V4aGliaXRpb24gSGFsbCBBPGJyPicgK1xuICAgICAgICAgICdPbmUgU2FiaW4gU3RyZWV0LCBQcm92aWRlbmNlJyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tbG9jYXRpb24gdGV4dC1sZWZ0JyxcbiAgICB0eXBlOiAnc3Vic2lkaWFyeScsXG4gICAgcnVsZXM6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh3aWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjUpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjg4KSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTNweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZHRoIDwgMTAyNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICh3aWR0aCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxM3B4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICB0b3A6IChoZWlnaHQgKiAwLjU1KSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuODgpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICBsZWZ0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEzcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn0sIHtcbiAgICBodG1sOiAnPHN2Zz4nICtcbiAgICAgICAgICAnPC9zdmc+JyxcbiAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tYXN0ZXJpc2sgdGV4dC1sZWZ0JyxcbiAgICB0eXBlOiAnc3Vic2lkaWFyeScsXG4gICAgc3RhcnQ6IHtcbiAgICAgICAgdG9wOiAnMzAlJyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICczMCUnLFxuICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAnbGluZS1oZWlnaHQnOiAnMjhweCdcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgICB0b3A6ICc1MHB4JyxcbiAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgcmlnaHQ6ICc1MHB4JyxcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMHB4JyxcbiAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgfSxcbiAgICBydWxlczogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKHdpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogKGhlaWdodCAqIDAuMykgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogKHdpZHRoICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMjBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzEwcHgnLFxuICAgICAgICAgICAgICAgICAgICAnbGluZS1oZWlnaHQnOiAnMTdweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWR0aCA8IDEwMjQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzI4cHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnNTBweCcsXG4gICAgICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcxN3B4J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgdG9wOiAoaGVpZ2h0ICogMC4zKSArICdweCcsXG4gICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgbGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAod2lkdGggKiAwLjMpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAnZm9udC1zaXplJzogJzIwcHgnLFxuICAgICAgICAgICAgICAgICdsaW5lLWhlaWdodCc6ICcyOHB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgIHRvcDogJzUwcHgnLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICByaWdodDogJzUwcHgnLFxuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzE3cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufV07IiwiLy8gc2VnbWVudCBmdW5jdGlvbnMgdGFrZSBhIHN0YXJ0XG4vLyBhbmQgYW5kIGVuZCBwb2ludC4gcmV0dXJuaW5nXG4vLyBhbiBhcnJheSBvZiBwb2ludHMgdGhhdCB3aWxsXG4vLyBiZSB1c2VkIHRvIGRyYXduIGEgbGluZSBjb25uZWN0aW5nXG4vLyB0aGUgc3RhcnQgYW5kIGVuZC5cblxuLy8gYm90aCBzdGFydCBhbmQgZW5kIGFyZSBhcnJheXMsXG4vLyBzdGFydCA9IFt4LHldLCAgZW5kID0gW3gseV1cbm1vZHVsZS5leHBvcnRzID0gW3tcbiAgICBmcm9tOiAnUklTRCcsXG4gICAgdG86ICdHcmFkJyxcbiAgICBzZWdtZW50OiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICB2YXIgZGVsdGFfeCA9IHN0YXJ0WzBdIC0gZW5kWzBdLFxuICAgICAgICAgICAgZGVsdGFfeSA9IGVuZFsxXSAtIHN0YXJ0WzFdO1xuXG4gICAgICAgIHZhciBkID0gJ00nICsgc3RhcnRbMF0gKyAnLCcgKyBzdGFydFsxXTtcblxuICAgICAgICBkICs9ICcgYyAnK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgJzAsMCAnICtcbiAgICAgICAgICAgICAvL2NwMlxuICAgICAgICAgICAgIChkZWx0YV94ICogMC4wOCkgKyAnLDAgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoZGVsdGFfeCAqIDAuMSkgKyAnLCcgK1xuICAgICAgICAgICAgICgwKTtcblxuICAgICAgICAgICAgIC8vIHRvdGFsIHByb2dyZXNzXG4gICAgICAgICAgICAgLy8geDogMC4xXG4gICAgICAgICAgICAgLy8geTogMFxuXG4gICAgICAgIGQgKz0gJyBjICcgK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjE4KSArICcsMCAnK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjE4KSArICcsJyArIChkZWx0YV95ICogMC40KSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoMCkgKyAnLCcgK1xuICAgICAgICAgICAgICgoZGVsdGFfeSAqIDAuNCkpO1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIC8vIHRvdGFsIHByb2dyZXNzXG4gICAgICAgICAgICAgLy8geDogMC4xXG4gICAgICAgICAgICAgLy8geTogMC40XG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoLShkZWx0YV94ICogMC40MTM3KSkgKyAnLDAgJytcbiAgICAgICAgICAgICAvL2NwMlxuICAgICAgICAgICAgICgtKGRlbHRhX3ggKiAxKSkgKyAnLCcgKyAoLShkZWx0YV95ICogMC4xMjgpKSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoLShkZWx0YV94ICogMS4yMDYpKSArICcsJyArXG4gICAgICAgICAgICAgKChkZWx0YV95ICogMC4wMykpO1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgIC8vIHRvdGFsIHByb2dyZXNzXG4gICAgICAgICAgICAgLy8geDogLTEuMTA2XG4gICAgICAgICAgICAgLy8geTogMC40M1xuXG4gICAgICAgIGQgKz0gJyBjICcgK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKC0oZGVsdGFfeCAqIDAuMTQ4KSkgKyAnLCcgKyAoZGVsdGFfeSAqIDAuMTMyNDQpICsgJyAnICtcbiAgICAgICAgICAgICAvL2NwMlxuICAgICAgICAgICAgICgtKGRlbHRhX3ggKiAwLjE1KSkgKyAnLCcgKyAoZGVsdGFfeSAqIDAuMzkwOCkgKyAnICcgK1xuICAgICAgICAgICAgIC8veCx5XG4gICAgICAgICAgICAgKDApICsgJywnICtcbiAgICAgICAgICAgICAoKGRlbHRhX3kgKiAwLjU0OSkpO1xuXG4gICAgICAgICAgICAgLy8gdG90YWwgcHJvZ3Jlc3NcbiAgICAgICAgICAgICAvLyB4OiAtMS4xMDZcbiAgICAgICAgICAgICAvLyB5OiAwLjk3MjdcblxuICAgICAgICBkICs9ICcgYyAnICtcbiAgICAgICAgICAgICAvL2NwMVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMDMzMTApKSArICcsJyArIChkZWx0YV95ICogMC4wMTE0NSkgKyAnICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4wNjc1KSkgKyAnLCcgKyAoZGVsdGFfeSAqIDAuMDE4NzApICsgJyAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMDkxNSkpICsgJywnICtcbiAgICAgICAgICAgICAoKGRlbHRhX3kgKiAwLjAxODgpKTtcblxuICAgICAgICAgICAgIC8vIHRvdGFsIHByb2dyZXNzXG4gICAgICAgICAgICAgLy8geDogLTEuMTA2ICsgMC4wOTE1ID0gLTEuMDE0NVxuICAgICAgICAgICAgIC8vIHk6IDAuOTcyNyArIDAuMDI3MyA9IDEuMFxuXG4gICAgICAgIGQgKz0gJyBjICcgK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4wMjQpKSArICcsJyArIChkZWx0YV95ICogMCkgKyAnICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4wMjQpKSArICcsJyArIChkZWx0YV95ICogMCkgKyAnICcgK1xuICAgICAgICAgICAgIC8veCx5XG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4wMzY1KSkgKyAnLCcgK1xuICAgICAgICAgICAgICgwKTtcblxuICAgICAgICAgICAgIC8vIHRvdGFsIHByb2dyZXNzXG4gICAgICAgICAgICAgLy8geDogLTFcbiAgICAgICAgICAgICAvLyB5OiAxXG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxufSwge1xuICAgIGZyb206ICdHcmFkJyxcbiAgICB0bzogJ1Nob3cnLFxuICAgIHNlZ21lbnQ6IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBkZWx0YV94ID0gc3RhcnRbMF0gLSBlbmRbMF0sXG4gICAgICAgICAgICBkZWx0YV95ID0gZW5kWzFdIC0gc3RhcnRbMV07XG5cbiAgICAgICAgdmFyIGQgPSAnTScgKyBzdGFydFswXSArICcsJyArIHN0YXJ0WzFdO1xuXG4gICAgICAgIHJldHVybiBkO1xuICAgIH1cbn0sIHtcbiAgICBmcm9tOiAnU2hvdycsXG4gICAgdG86ICcyMDE0JyxcbiAgICBzZWdtZW50OiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICB2YXIgZGVsdGFfeCA9IHN0YXJ0WzBdIC0gZW5kWzBdLFxuICAgICAgICAgICAgZGVsdGFfeSA9IGVuZFsxXSAtIHN0YXJ0WzFdO1xuXG4gICAgICAgIHZhciBkID0gJ00nICsgc3RhcnRbMF0gKyAnLCcgKyBzdGFydFsxXTtcblxuICAgICAgICBkICs9ICcgYyAnK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjA0ODE2Mzc0Nzg3NTYpICsgJywwICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjA4NDczMzYxNDEyODQpICsgJywwICcgK1xuICAgICAgICAgICAgIC8veCx5XG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjExMTU0OTU0NTU1NSkgKyAnLCcgK1xuICAgICAgICAgICAgICgwKTtcblxuICAgICAgICBkICs9ICcgYyAnICtcbiAgICAgICAgICAgICAvL2NwMVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDApKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwKSArICcgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjExMzAyNzQxNDQ2OCkpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIC0wLjQ5ODYxNjc5MzI5OCkgKyAnICcgK1xuICAgICAgICAgICAgIC8veCx5XG4gICAgICAgICAgICAgKChkZWx0YV94ICogLTAuMzY1ODI0MjgxMzg2KSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogLTAuNzM4MTE2MTExNDM2KTtcblxuICAgICAgICBkICs9ICcgYyAnICtcbiAgICAgICAgICAgICAvL2NwMVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIC0wLjMzMDg5NDg0OTYyNykpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIC0wLjIxODg5NzMzMDk5NikgKyAnICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKChkZWx0YV94ICogLTAuNzA1Mjk4MTYwMDUzKSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogLTAuMTQwNDA1MjIxMTE4KSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC45Njg3MDM5MDg5NjMpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwLjA1MzI2MzE5ODkwOSk7XG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC4zODMxNTIyOTQzOTEpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwLjI3Mzc3NzUxODAyMSkgKyAnICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKChkZWx0YV94ICogLTAuNTMwOTkwOTExMTA2KSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogMS4wMDkxOTU0MDIzKSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC4yMDkzODUyMDY1MzIpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAxLjQxNTQ4ODAxODcpO1xuXG4gICAgICAgIGQgKz0gJyBjICcgK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4wNzEzMjkzNDMwODczKSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogMC4xMzczODU1NDQ1MTYpICsgJyAnICtcbiAgICAgICAgICAgICAvL2NwMlxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMjM5Mzg1MjA2NTMyKSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogMC4yODIyMzI2MTI1MDcpICsgJyAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMzU2NjY4ODgzNDcpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwLjI3MjIzMjYxMjUwNyk7XG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjAzNTU1NzUyNjA0NzQpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwKSArICcgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjA0MDYzNDAwNTc2MzcpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwKSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjA3OTUwOTM0NzUyMDkgKSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogMCk7XG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxufV07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWN0aW9uX25hdiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd3JhcHBlcl9zZWwsXG4gICAgICAgIGRhdGEgPSBbe1xuICAgICAgICAgICAgdGV4dDogJ0Fib3V0JyxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGV4dDogJ1Zpc2l0J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZXh0OiAnV29yaydcbiAgICAgICAgfV07XG5cbiAgICBzZWxmLndyYXBwZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB3cmFwcGVyX3NlbDtcbiAgICAgICAgd3JhcHBlcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB3cmFwcGVyX3NlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCBncmlkLW5hdicpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvbC0xMC0xMCcpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25hdi1zZWN0aW9uLWl0ZW1zJyk7XG5cbiAgICAgICAgY29udGFpbmVyLnNlbGVjdEFsbCgnLm5hdi1zZWN0aW9uLWl0ZW0nKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ25hdi1zZWN0aW9uLWl0ZW0nKVxuICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignaHJlZicsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuICcjJyArIGQudGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQudGV4dDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zbGF0ZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgLy8gdGhlIHNlbGVjdGlvbiB0aGF0IGlzIGJlaW5nIHRyYW5zbGF0ZWRcbiAgICAgICAgdHJhbnNsYXRlX3NlbCxcbiAgICAgICAgLy8gdGhlIHNlbGVjdGlvbiB0aGF0IGlzIGJlaW5nIHRyYW5zbGF0ZWQgb3ZlclxuICAgICAgICAvLyB0aGlzIHdpbGwgZGV0ZXJtaW5lIHRoZSBoZWlnaHQgdGhhdCBtdXN0IGJlXG4gICAgICAgIC8vIHNjcm9sbCBwYXNzZWQsIGJlZm9yZSB0aGUgdHJhbnNsYXRlZF9zZWxcbiAgICAgICAgLy8gaXMgdHJhbnNsYXRlZCBvdmVyXG4gICAgICAgIG92ZXJfc2VsLFxuICAgICAgICBvdmVyX3NlbF9oZWlnaHQgPSAwLFxuICAgICAgICAvLyB0aGUgc2VsZWN0aW9uIGZvciB0aGUgZnVsbCBzY3JlZW4gZWxlbWVudFxuICAgICAgICAvLyB3aG9zZSB6LWluZGV4IGFuZCBvcGFjaXR5IGdldCBhZGp1c3RlZFxuICAgICAgICAvLyBpbnN0ZWFkIG9mIGp1c3Qgc2xpZGluZyBpbiwgdGhlIGltYWdlc1xuICAgICAgICAvLyBzbGlkZSBpbiBvdmVyIHRoZSBuZXcgYmFja2dyb3VuZC5cbiAgICAgICAgYmFja2dyb3VuZF9zZWwsXG4gICAgICAgIG9wYWNpdHlfYmFja2dyb3VuZF9zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCAyMDBdKSAgLy8gZGlzdGFuY2UgdG8gc2Nyb2xsXG4gICAgICAgICAgICAucmFuZ2UoWzAsMV0pICAgICAgLy8gb3BhY2l0eSB2YWx1ZXNcbiAgICAgICAgICAgIC5jbGFtcCh0cnVlKSxcbiAgICAgICAgb3BhY2l0eV9maXhlZF9zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFs0MDAsIDIwMF0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIDFdKVxuICAgICAgICAgICAgLmNsYW1wKHRydWUpLFxuICAgICAgICBvcGFjaXR5X25hdl9zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFstMjAwLCAwXSlcbiAgICAgICAgICAgIC5yYW5nZShbMCwgMV0pXG4gICAgICAgICAgICAuY2xhbXAodHJ1ZSksXG4gICAgICAgIG9wYWNpdHlfc2Nyb2xsX2xlYWRfc2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgMTUwXSlcbiAgICAgICAgICAgIC5yYW5nZShbMSwgMF0pXG4gICAgICAgICAgICAuY2xhbXAodHJ1ZSksXG4gICAgICAgIC8vIHNlbGVjdGlvbiB0aGF0IHdpbGwgZmFkZSBpblxuICAgICAgICAvLyB0eXBpY2FsbHkgbmF2aWdhdGlvblxuICAgICAgICBmaXhlZF9zZWwsXG4gICAgICAgIGxvZ29fY29udGFpbmVyX29mZnNldCxcbiAgICAgICAgdG9wX25hdl9zZWwsXG4gICAgICAgIHNjcm9sbF9sZWFkX3NlbDtcblxuICAgIHZhciB2ZW5kb3IgPSBbXCJcIiwgXCItd2Via2l0LVwiLCBcIi1tb3otXCIsIFwiLW1zLVwiLCBcIi1vLVwiXS5yZWR1Y2UoXG4gICAgICAgIGZ1bmN0aW9uIChwLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gdiArIFwidHJhbnNmb3JtXCIgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSA/IHYgOiBwO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYudHJhbnNsYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdHJhbnNsYXRlX3NlbDtcbiAgICAgICAgdHJhbnNsYXRlX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm5hdiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRvcF9uYXZfc2VsO1xuICAgICAgICB0b3BfbmF2X3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNjcm9sbExlYWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzY3JvbGxfbGVhZF9zZWw7XG4gICAgICAgIHNjcm9sbF9sZWFkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm92ZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvdmVyX3NlbDtcbiAgICAgICAgb3Zlcl9zZWwgPSBfO1xuXG4gICAgICAgIG92ZXJfc2VsX2hlaWdodCA9IGdldF9vdmVyX3NlbF9oZWlnaHQoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5iYWNrZ3JvdW5kID0gZnVuY3Rpb24oXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBiYWNrZ3JvdW5kX3NlbDtcbiAgICAgICAgYmFja2dyb3VuZF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5maXhlZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGZpeGVkX3NlbDtcbiAgICAgICAgZml4ZWRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHVwZGF0ZV9zY3JvbGxfdGFyZ2V0X3ZhbHVlcygpO1xuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdzY3JvbGwudHJhbnNsYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1ha2VfbW92ZXMoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3RvdWNobW92ZS50cmFuc2xhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbWFrZV9tb3ZlcygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbigncmVzaXplLnRyYW5zbGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVfc2Nyb2xsX3RhcmdldF92YWx1ZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYWtlX21vdmVzICgpIHtcbiAgICAgICAgaWYgKHBhZ2VZT2Zmc2V0ID4gb3Zlcl9zZWxfaGVpZ2h0KSB7XG4gICAgICAgICAgICBvdmVyX3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSh2ZW5kb3IrJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoMHB4LCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKC0ob3Zlcl9zZWxfaGVpZ2h0IC0gcGFnZVlPZmZzZXQpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAncHgpJyk7XG4gICAgICAgICAgICB0cmFuc2xhdGVfc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKHZlbmRvcisndHJhbnNmb3JtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgwcHgsJyArXG4gICAgICAgICAgICAgICAgICAgICAgIChvdmVyX3NlbF9oZWlnaHQgLSBwYWdlWU9mZnNldCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAncHgpJyk7XG5cbiAgICAgICAgICAgIGZpeGVkX3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIG9wYWNpdHlfZml4ZWRfc2NhbGUoXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZV9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRvcCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcGFjaXR5X3ZhbCA9XG4gICAgICAgICAgICBvcGFjaXR5X2JhY2tncm91bmRfc2NhbGUocGFnZVlPZmZzZXQtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3Zlcl9zZWxfaGVpZ2h0KTtcbiAgICAgICAgYmFja2dyb3VuZF9zZWxcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIG9wYWNpdHlfdmFsKVxuICAgICAgICAgICAgLmNsYXNzZWQoXCJhY3RpdmVcIiwgKG9wYWNpdHlfdmFsID4gMCkgPyAxOiAwKTtcblxuXG4gICAgICAgIGlmIChwYWdlWU9mZnNldCA+IChsb2dvX2NvbnRhaW5lcl9vZmZzZXQgLTIwMCkpIHtcbiAgICAgICAgICAgIHRvcF9uYXZfc2VsLmNsYXNzZWQoJ25hdi1zZWN0aW9uLS1hY3RpdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvcF9uYXZfc2VsLmNsYXNzZWQoJ25hdi1zZWN0aW9uLS1hY3RpdmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdG9wX25hdl9zZWwuc3R5bGUoJ29wYWNpdHknLFxuICAgICAgICAgICAgICAgIG9wYWNpdHlfbmF2X3NjYWxlKHBhZ2VZT2Zmc2V0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dvX2NvbnRhaW5lcl9vZmZzZXQpKTtcbiAgICAgICAgc2Nyb2xsX2xlYWRfc2VsLnN0eWxlKCdvcGFjaXR5JyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5X3Njcm9sbF9sZWFkX3NjYWxlKHBhZ2VZT2Zmc2V0KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlX3Njcm9sbF90YXJnZXRfdmFsdWVzICgpIHtcbiAgICAgICAgb3Zlcl9zZWxfaGVpZ2h0ID0gZ2V0X292ZXJfc2VsX2hlaWdodCgpO1xuICAgICAgICBsb2dvX2NvbnRhaW5lcl9vZmZzZXQgPSBnZXRfbG9nb19jb250YWluZXJfb2Zmc2V0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0X292ZXJfc2VsX2hlaWdodCAoKSB7XG4gICAgICAgIGlmICghb3Zlcl9zZWwpIHJldHVybiAwO1xuICAgICAgICByZXR1cm4gb3Zlcl9zZWwubm9kZSgpXG4gICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgLmhlaWdodDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfbG9nb19jb250YWluZXJfb2Zmc2V0ICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG5cblxuICAgIFxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBCb3R0b20gPSByZXF1aXJlKCcuL2JvdHRvbScpLFxuICAgIExpZ2h0Ym94ID0gcmVxdWlyZSgnLi9saWdodGJveF9mYWRlX3VwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGF0YSA9IFtdLFxuICAgICAgICBjb250YWluZXIsXG4gICAgICAgIHdvcmtfc2VsLFxuICAgICAgICBpc28sXG4gICAgICAgIHJpc2RfcHJvZ3JhbXMgPSBbJ0FsbCddO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdkYXRhTG9hZGVkJyk7XG5cbiAgICAvLyBkZWFsIHdpdGggd2luZG93IGJvdHRvbSBsb2FkaW5nIG1vcmVcbiAgICB2YXIgYm90dG9tID0gc2VsZi5ib3R0b20gPSBCb3R0b20oKTtcbiAgICB2YXIgbGlnaHRib3ggPSBzZWxmLmxpZ2h0Ym94ID0gTGlnaHRib3goKTtcblxuICAgIGJvdHRvbS5kaXNwYXRjaC5vbignYm90dG9tJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXRfbW9yZV9kYXRhKCk7XG4gICAgfSk7XG5cbiAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAub24oJ3Jlc2l6ZS53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0X21vcmVfZGF0YSAoKSB7XG4gICAgICAgIHNlbGYuZGlzcGF0Y2gub24oJ2RhdGFMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlydHkoZmFsc2UpO1xuICAgICAgICAgICAgcmVuZGVyX2RhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGdldF9kYXRhKCk7XG4gICAgfVxuICAgIC8vIGVuZCBkZWFsaW5nIHdpdGggd2luZG93XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0gZGF0YS5jb25jYXQoXyk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gXztcblxuICAgICAgICAvLyBzaWRlIGVmZmVjdCBvZiB1cGRhdGluZyBjb250YWluZXJcbiAgICAgICAgYm90dG9tLmNvbnRhaW5lcihjb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbmRlcigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdldF9kYXRhKCk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuY2xhc3NlZCgnbWFzb25pYycsIHRydWUpO1xuICAgICAgICAgICAgLy8gLmNsYXNzZWQoJ2NvbC0xMC0xMCcsIHRydWUpO1xuXG4gICAgICAgIHJlbmRlcl9kYXRhKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZmlsdGVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT0gMSkgdGhyb3cgXCJmaWx0ZXIgdGFrZXMgb25lIGFyZ3VtZW50XCI7XG5cbiAgICAgICAgdmFyIHByb2dyYW0gPSBfO1xuICAgICAgICBpZiAocHJvZ3JhbSA9PT0gJ0FsbCcpIHByb2dyYW0gPSAnJztcblxuICAgICAgICBpZiAoaXNvKSB7XG4gICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGZvcm1hdF9wcm9ncmFtKHByb2dyYW0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZGF0YSgpIHtcbiAgICAgICAgd29ya19zZWwgPSBjb250YWluZXIuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgdmFyIHdpZGVfY291bnQgPSAwLFxuICAgICAgICAgICAgd2lkZV9mcmVxdWVuY3kgPSA1O1xuICAgICAgICB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXh0cmFfY2xhc3MgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQuY292ZXIud2lkdGggPiBkLmNvdmVyLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZV9jb3VudCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh3aWRlX2NvdW50L3dpZGVfZnJlcXVlbmN5KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhX2NsYXNzID0gJyB3aWRlLXBpZWNlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhX2NsYXNzO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5zcmM7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsX2VudGVyX21ldGEgPVxuICAgICAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tZXRhLXdyYXBwZXInKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlcl9tZXRhXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdHVkZW50X25hbWUgcGllY2UtbWV0YScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0dWRlbnRfbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3b3JrX3NlbF9lbnRlcl9tZXRhXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyaXNkX3Byb2dyYW0gcGllY2UtbWV0YScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnJpc2RfcHJvZ3JhbTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlzbyA9IG5ldyBJc290b3BlKGNvbnRhaW5lci5ub2RlKCksIHtcbiAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5waWVjZScsXG4gICAgICAgICAgICBtYXNvbnJ5OiB7XG4gICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIGd1dHRlcjogMzBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfZGF0YSAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9XG4gICAgICAgICAgICAgICAgZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzKHdvcmspO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5kYXRhTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGRhdGEgY29tZXMgb3V0IGFzOlxuICAgIC8vIFt7XG4gICAgLy8gICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgLy8gICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgLy8gICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAvLyAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgLy8gICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgIC8vIH0sIF1cbiAgICBmdW5jdGlvbiBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMgKHdvcmspIHtcblxuICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIGV4dGVudCBvZiB3aWR0aHNcbiAgICAgICAgdmFyIGFsbF9tb2R1bGVzID0gW107XG4gICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsX21vZHVsZXMucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNldCBhIHNjYWxlIGZvciBtYXBwaW5nXG4gICAgICAgIC8vIHdpZHRoIHRoZSBhbiBpbWFnZSB0byB0aGVcbiAgICAgICAgLy8gd2lkdGggb2YgdGhlIG1hc29uaWMgdmVyc2lvblxuICAgICAgICB2YXIgd2lkdGhfZXh0ZW50ID0gZDMuZXh0ZW50KGFsbF9tb2R1bGVzLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZygnd2lkdGhfZXh0ZW50Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHdpZHRoX2V4dGVudCk7XG4gICAgICAgIHZhciB3aWR0aHMgPSBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgICAgICAgIC5kb21haW4od2lkdGhfZXh0ZW50KVxuICAgICAgICAgICAgLnJhbmdlKFsxMDAsIDIwMCwgNDAwXSk7XG4gICAgICAgIC8vIHZhciB3aWR0aHMgPSBkMy5zY2FsZS5pZGVudGl0eSgpXG4gICAgICAgIC8vICAgICAuZG9tYWluKHdpZHRoX2V4dGVudCk7XG5cbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgIHZhciByYW5kb21fbW9kdWxlID1cbiAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLmxlbmd0aCldO1xuXG4gICAgICAgICAgICB2YXIgcmFuZG9tX2NvdmVyID0ge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsX3dpZHRoOiArcmFuZG9tX21vZHVsZS53aWR0aCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF9oZWlnaHQ6ICtyYW5kb21fbW9kdWxlLmhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhzKHJhbmRvbV9tb2R1bGUud2lkdGgpLFxuICAgICAgICAgICAgICAgIHNyYzogcmFuZG9tX21vZHVsZS5zcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByYW5kb21fY292ZXIuaGVpZ2h0ID0gKHJhbmRvbV9jb3Zlci53aWR0aCpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS5oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUud2lkdGg7XG5cbiAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkLmRldGFpbHMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgYXZhdGFyOiBkLm93bmVyc1swXS5pbWFnZXNbJzEzOCddLFxuICAgICAgICAgICAgICAgIHVybDogZC5vd25lcnNbMF0udXJsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXMuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmlzZF9wcm9ncmFtcy5wdXNoKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZF93b3JrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgRGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28nKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrJyksXG4gICAgVHJhbnNsYXRlID0gcmVxdWlyZSgnLi90cmFuc2xhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGdyaWRfc2VsO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdodG1sTG9hZGVkJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBEZXBhcnRtZW50cygpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yayhzZWxmKTtcbiAgICB2YXIgdHJhbnNsYXRlID0gVHJhbnNsYXRlKCk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDVhJywgdHJ1ZSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb25jZXB0XzA1YycsIHRydWUpXG4gICAgICAgICAgICAuY2xhc3NlZCgnZnVsbC13aWR0aC13b3JrJywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICAvLyAubG9nby1jb250YWluZXIgaXMgYSBuZWlnaGJvciBvZiAuZ3JpZFxuICAgICAgICB2YXIgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ28uY29udGFpbmVyKGxvZ29fY29udGFpbmVyX3NlbCk7XG5cbiAgICAgICAgZ3JpZF9zZWwgPSBib2R5XG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQtd3JhcHBlcicpO1xuXG5cblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDVjL2dyaWQuaHRtbCcsIGZ1bmN0aW9uIChodG1sKSB7XG5cbiAgICAgICAgICAgIGdyaWRfc2VsLm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmh0bWxMb2FkZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2h0bWxMb2FkZWQuZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAud3JhcHBlcihkMy5zZWxlY3QoJy5kZXBhcnRtZW50cycpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignaHRtbExvYWRlZC53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2dvLnNjcm9sbE92ZXJTZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9jb250YWluZXIgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveCcpO1xuXG4gICAgICAgIHdvcmsuYm90dG9tLmFkZGl0aW9uYWxNYXJnaW5Cb3R0b21TZWwoZDMuc2VsZWN0KCcuZ3JpZCcpKTtcblxuICAgICAgICB2YXIgd29ya19iYWNrZ3JvdW5kX3NlbCA9IGQzLnNlbGVjdCgnLmdyaWQtd3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmstYmFja2dyb3VuZCcpO1xuXG4gICAgICAgIHZhciB3b3JrX3NlbCA9IGQzLnNlbGVjdCgnLmdyaWQtd3JhcHBlcicpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmsnKTtcbiAgICAgICAgd29yay5jb250YWluZXIod29ya19zZWwpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICB3b3JrLmxpZ2h0Ym94XG4gICAgICAgICAgICAuY29udGFpbmVyKGxpZ2h0Ym94X2NvbnRhaW5lcik7XG5cblxuICAgICAgICB0cmFuc2xhdGVcbiAgICAgICAgICAgIC50cmFuc2xhdGVkKHdvcmtfc2VsKVxuICAgICAgICAgICAgLm92ZXIoZDMuc2VsZWN0KCcuZ3JpZCcpKVxuICAgICAgICAgICAgLmJhY2tncm91bmQod29ya19iYWNrZ3JvdW5kX3NlbClcbiAgICAgICAgICAgIC5zZXR1cCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlnaHRib3ggKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgc2VsZWN0ZWRfc2VsLFxuICAgICAgICB0b190cmFuc2l0aW9uID0ge1xuICAgICAgICAgICAgY29udGFpbmVyOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAncmdiYSgyMzksIDY1LCA1NCwgMCknLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAncmdiYSgyMzksIDY1LCA1NCwgMC45KScsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NvbnRhaW5lcicpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignY29udGFpbmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250YWluZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gXztcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5jb250YWluZXIoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIC8vIHBhc3MgaW4gZGF0YSB0byBtYWtlIHNob3cgdXBcbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB0aHJvdyBcIkV4cGVjdGVkIGNvbnRhaW5lci5cIjtcbiAgICAgICAgc2VsZWN0ZWRfc2VsID0gc2VsO1xuXG4gICAgICAgIHZhciBkYXRhID0gc2VsLmRhdHVtKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygnZGF0YS5tb2R1bGVzJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEubW9kdWxlcyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2dyaWRfc2VsID0gY29udGFpbmVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhIGNvbC0yLTEwJyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X3dvcmtfc2VsID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtd29yayBvZmZzZXQtMi0xMCBjb2wtOC0xMCcpO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdoMicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5wcm9qZWN0X25hbWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAudGV4dChkYXRhLmRlc2NyaXB0aW9uKTtcblxuICAgICAgICBsaWdodGJveF93b3JrX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhLm1vZHVsZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZScpXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc2l6ZXMubWF4XzEyNDAgPyBkLnNpemVzLm1heF8xMjQwIDogZC5zcmM7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9pbmZvX3NlbCA9IGxpZ2h0Ym94X21ldGFfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mbycpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tc3R1ZGVudC1uYW1lJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuc3R1ZGVudF9uYW1lKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXJpc2QtcHJvZ3JhbScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnJpc2RfcHJvZ3JhbSk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1wZXJzb25hbC1saW5rJylcbiAgICAgICAgICAgIC5hdHRyKCdocmVmJywgZGF0YS51cmwpXG4gICAgICAgICAgICAudGV4dCgnQmVoYW5jZScpO1xuXG5cbiAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAuc3R5bGUodG9fdHJhbnNpdGlvbi5jb250YWluZXIuc3RhcnQpO1xuXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbGlnaHRib3gtb3BlbicsIHRydWUpO1xuXG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDI4MClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1vdXQnKVxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSh0b190cmFuc2l0aW9uLmNvbnRhaW5lci5lbmQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDI4MClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbicpXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKHRvX3RyYW5zaXRpb24uY29udGFpbmVyLnN0YXJ0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkX3NlbC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmh0bWwoJycpO1xuICAgICAgICAgICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ2xpZ2h0Ym94LW9wZW4nLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGxvZ29Db21wb25lbnRzID0gcmVxdWlyZSgnLi9sb2dvX2NvbXBvbmVudHMnKSxcbiAgICBsb2dvUGF0aHMgPSByZXF1aXJlKCcuL2xvZ29fc3RhdGljX3BhdGhzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBzY3JvbGxfb3Zlcl9zZWwsXG4gICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IDAsXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zZWwsXG4gICAgICAgIGxvZ29fbGluZV9zZWwsXG4gICAgICAgIGxvZ29fc3Vic2lkaWFyeV9zZWwsXG4gICAgICAgIGxvZ29fY29tcG9uZW50cyA9IGxvZ29Db21wb25lbnRzLFxuICAgICAgICBsb2dvX2NvbXBvbmVudF9wYXRocyA9IGxvZ29QYXRocyxcbiAgICAgICAgbG9nb19zdmcsXG4gICAgICAgIGxvZ29fbGluZSxcbiAgICAgICAgbG9nb19jb25uZWN0aW5nX2xpbmUsXG4gICAgICAgIHN0cmFpZ2h0X2xpbmUgPSBkMy5zdmcubGluZSgpO1xuXG4gICAgdmFyIHNjcm9sbF9zY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pXG4gICAgICAgIC5yYW5nZShbMCwgMV0pXG4gICAgICAgIC5jbGFtcCh0cnVlKSxcbiAgICAgICAgcHJldl9zY3JvbGxfcHJvZ3Jlc3MgPSAwO1xuXG4gICAgd2luZG93X3NlbFxuICAgICAgICAub24oJ3Jlc2l6ZS5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsKCk7XG4gICAgICAgICAgICBzY3JvbGxfc2NhbGUuZG9tYWluKFswLCBkaXN0YW5jZV90b19zY3JvbGxdKTtcblxuICAgICAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3dfd2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgbG9nbyBjb21wb25lbnRzIHBlciB3aW5kb3dcbiAgICAgICAgICAgIGlmIChsb2dvX3NlbCkge1xuICAgICAgICAgICAgICAgIGxvZ29fc2VsLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBkLnJ1bGVzKHdpbmRvd193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGQuc3RhcnQgPSB1cGRhdGVkLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBkLmVuZCA9IHVwZGF0ZWQuZW5kO1xuICAgICAgICAgICAgICAgICAgICBkLmludGVycG9sYXRvciA9XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRfaW50ZXJwb2xhdG9yKHVwZGF0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmludGVycG9sYXRvcjtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMocHJldl9zY3JvbGxfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICB9KVxuICAgICAgICAub24oJ3Njcm9sbC5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNjcm9sbF9wcm9ncmVzcyA9IHNjcm9sbF9zY2FsZSh3aW5kb3cuc2Nyb2xsWSk7XG4gICAgICAgICAgICBpZiAoc2Nyb2xsX3Byb2dyZXNzICE9IHByZXZfc2Nyb2xsX3Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlX2xvZ29fY29tcG9uZW50cyhzY3JvbGxfcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZfc2Nyb2xsX3Byb2dyZXNzID0gc2Nyb2xsX3Byb2dyZXNzO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuc2Nyb2xsT3ZlclNlbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNjcm9sbF9vdmVyX3NlbDtcbiAgICAgICAgc2Nyb2xsX292ZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG9nb19jb250YWluZXJfc2VsO1xuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBsb2dvIGNvbXBvbmVudHMgcGVyIHdpbmRvd1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBsb2dvX2NvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZWQgPSBkLnJ1bGVzKHdpbmRvd193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgZC5zdGFydCA9IHVwZGF0ZWQuc3RhcnQ7XG4gICAgICAgICAgICBkLmVuZCA9IHVwZGF0ZWQuZW5kO1xuICAgICAgICAgICAgZC5pbnRlcnBvbGF0b3IgPVxuICAgICAgICAgICAgICAgIGFkZF9pbnRlcnBvbGF0b3IodXBkYXRlZClcbiAgICAgICAgICAgICAgICAgICAgLmludGVycG9sYXRvcjtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpc3RhbmNlX3RvX3Njcm9sbCA9IGNhbGNfZGlzdGFuY2VfdG9fc2Nyb2xsKCk7XG4gICAgICAgIHNjcm9sbF9zY2FsZS5kb21haW4oWzAsIGRpc3RhbmNlX3RvX3Njcm9sbF0pO1xuXG4gICAgICAgIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMoXG4gICAgICAgICAgICBzY3JvbGxfc2NhbGUoXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFkpKTtcblxuXG4gICAgICAgIGxvZ29fc2VsID0gbG9nb19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnbG9nby1jb21wb25lbnQnKVxuICAgICAgICAgICAgLmRhdGEobG9nb19jb21wb25lbnRzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbG9nby1jb21wb25lbnQgJyArIGQuY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydC50b3A7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LmJvdHRvbTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdyaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3RhcnQucmlnaHQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0YXJ0Wydmb250LXNpemUnXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xpbmUtaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdGFydFsnbGluZS1oZWlnaHQnXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuaHRtbChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmh0bWw7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX2xpbmVfc2VsID0gbG9nb19zZWwuZmlsdGVyKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gZC50eXBlID09PSAnbGluZSc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fc3Vic2lkaWFyeV9zZWwgPSBsb2dvX3NlbC5maWx0ZXIoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnR5cGUgPT09ICdzdWJzaWRpYXJ5JztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICB2YXIgdmVydGljaWVzID0gbG9nb192ZXJ0aWNpZXMoKTtcblxuICAgICAgICBsb2dvX2xpbmUgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJy5sb2dvLWxpbmUnKVxuICAgICAgICAgICAgLmRhdGEodmVydGljaWVzLnN0cmFpZ2h0KVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSk7XG5cbiAgICAgICAgbG9nb19jb25uZWN0aW5nX2xpbmUgPVxuICAgICAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubG9nby1jb25uZWN0aW5nJylcbiAgICAgICAgICAgICAgICAuZGF0YSh2ZXJ0aWNpZXMuY29ubmVjdGluZylcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb25uZWN0aW5nJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuc2VnbWVudDtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC50cmFuc2xhdGUueCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJywnICsgZC50cmFuc2xhdGUueSArICcpIHNjYWxlKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuc2NhbGUueCArICcsJyArIGQuc2NhbGUueSArICcpJztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2NvbXBvbmVudHMgKHBlcmNlbnRfcHJvZ3Jlc3MpIHtcbiAgICAgICAgaWYgKCFsb2dvX3NlbCkgcmV0dXJuO1xuICAgICAgICBsb2dvX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCd0b3AnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci50b3AocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvci5ib3R0b20ocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IubGVmdChwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ3JpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3IucmlnaHQocGVyY2VudF9wcm9ncmVzcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmludGVycG9sYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgWydmb250LXNpemUnXShwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2xpbmUtaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5pbnRlcnBvbGF0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnbGluZS1oZWlnaHQnXShwZXJjZW50X3Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgdmVydGljaWVzID0gbG9nb192ZXJ0aWNpZXMoKTtcbiAgICAgICAgbG9nb19saW5lXG4gICAgICAgICAgICAuZGF0YSh2ZXJ0aWNpZXMuc3RyYWlnaHQpXG4gICAgICAgICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpO1xuXG4gICAgICAgIGxvZ29fY29ubmVjdGluZ19saW5lXG4gICAgICAgICAgICAuZGF0YSh2ZXJ0aWNpZXMuY29ubmVjdGluZylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zZWdtZW50O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnRyYW5zbGF0ZS54ICtcbiAgICAgICAgICAgICAgICAgICAgJywnICsgZC50cmFuc2xhdGUueSArICcpIHNjYWxlKCcgK1xuICAgICAgICAgICAgICAgICAgICBkLnNjYWxlLnggKyAnLCcgKyBkLnNjYWxlLnkgKyAnKSc7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX3ZlcnRpY2llcyAoKSB7XG4gICAgICAgIHZhciBsb2dvX2xpbmVfdmVydGljaWVzID0gW107XG4gICAgICAgIHZhciBsb2dvX2Nvbm5lY3RpbmdfbGluZV9zZWdtZW50cyA9IFtdO1xuICAgICAgICBsb2dvX2xpbmVfc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0IC0gMTAsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgMTAsXG4gICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDIvMykpKV07XG5cbiAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChbZmlyc3QsIHNlY29uZF0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvZ29fbGluZV92ZXJ0aWNpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoaSsxKSA8IGxvZ29fbGluZV92ZXJ0aWNpZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gbG9nb19saW5lX3ZlcnRpY2llc1tpXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gbG9nb19saW5lX3ZlcnRpY2llc1tpKzFdWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRlbHRhX3ggPSBzdGFydFswXSAtIGVuZFswXSxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGFfeSA9IGVuZFsxXSAtIHN0YXJ0WzFdO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbHRhIHgsIGRlbHRhIHknKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkZWx0YV94LCBkZWx0YV95KTtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IHt9O1xuICAgICAgICAgICAgICAgIGQuc2NhbGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGRlbHRhX3gvbG9nb19jb21wb25lbnRfcGF0aHNbaV0ud2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHk6IGRlbHRhX3kvbG9nb19jb21wb25lbnRfcGF0aHNbaV0uaGVpZ2h0XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkLnRyYW5zbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogc3RhcnRbMF0gLVxuICAgICAgICAgICAgICAgICAgICAgICAgKGxvZ29fY29tcG9uZW50X3BhdGhzW2ldLndpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgICAgICBkLnNjYWxlLngpLFxuICAgICAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLVxuICAgICAgICAgICAgICAgICAgICAgICAgKGxvZ29fY29tcG9uZW50X3BhdGhzW2ldLmhlaWdodCAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgZC5zY2FsZS55KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZC5zZWdtZW50ID0gbG9nb19jb21wb25lbnRfcGF0aHNbaV0uc2VnbWVudDtcblxuICAgICAgICAgICAgICAgIGxvZ29fY29ubmVjdGluZ19saW5lX3NlZ21lbnRzLnB1c2goZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0cmFpZ2h0OiBsb2dvX2xpbmVfdmVydGljaWVzLFxuICAgICAgICAgICAgY29ubmVjdGluZzogbG9nb19jb25uZWN0aW5nX2xpbmVfc2VnbWVudHNcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjX2Rpc3RhbmNlX3RvX3Njcm9sbCAoKSB7XG4gICAgICAgIHZhciBzY3JvbGxpbmdfZGlzdGFuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHNjcm9sbF9vdmVyX3NlbC5zdHlsZSgnbWFyZ2luLXRvcCcsIHNjcm9sbGluZ19kaXN0YW5jZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICByZXR1cm4gc2Nyb2xsaW5nX2Rpc3RhbmNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9pbnRlcnBvbGF0b3IgKHN0YXRlcykge1xuICAgICAgICBzdGF0ZXMuaW50ZXJwb2xhdG9yID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzdGF0ZXMuc3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlcy5pbnRlcnBvbGF0b3Jba2V5XSA9XG4gICAgICAgICAgICAgICAgZDMuaW50ZXJwb2xhdGVTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlcy5zdGFydFtrZXldLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZXMuZW5kW2tleV0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIi8vIGFsbCBkIGF0dHJpYnV0ZXNuZWVkIGEgZmlyc3QgcG9pbnQuXG4vLyBpZiB5b3Ugd2FudGVkIHRoZSBsaW5lIHRvIHN0YXJ0XG4vLyBhdCAxMDAsMjAwLCBpdCBzaG91bGQgYmU6XG4vLyBkID0gJ00xMDAsMjAwJyArIHNlZ2VtZW50XG5cbm1vZHVsZS5leHBvcnRzID0gW3tcbiAgICBmcm9tOiAnUklTRCcsXG4gICAgdG86ICdHcmFkJyxcbiAgICB3aWR0aDogMTQ1LjI1LFxuICAgIGhlaWdodDogMTMxLFxuICAgIHNlZ21lbnQ6J00xNDUuMjkzLDAgYzMuMjE1LDAsNi4yOTcsMCw5LjIxMSwnICtcbiAgICAgICAgJzBjNTAuMTcsMCw0NC40NTUsNjUuMTg1LDMuMjQ4LDY0Ljc4NCcgK1xuICAgICAgICAnQzk3LjUxNCw2NC4xOTgsMTIuNDg0LDQ2LjA4LTE3LjA0MSw2OS4xODUnICtcbiAgICAgICAgJyBjLTIyLjA1NCwxNy4yNTgtMjMuMjY0LDUxLjQ1Mi0xLjI4NCw1OCcgK1xuICAgICAgICAnYzQuNzQ4LDEuNDE0LDkuODE1LDIuNSwxMy4yOTksMi41czUuMzE3LDAsNS4zMTcsMCdcbn0sIHtcbiAgICBmcm9tOiAnR3JhZCcsXG4gICAgdG86ICdTaG93JyxcbiAgICB3aWR0aDogMjc5LjY3LFxuICAgIGhlaWdodDogODguMTUsXG4gICAgc2VnbWVudDonTTE0NS4yOTMsMCBjMy4yMTUsMCw2LjI5NywwLDkuMjExLCcgK1xuICAgICAgICAnMGM1MC4xNywwLDQ0LjQ1NSw2NS4xODUsMy4yNDgsNjQuNzg0JyArXG4gICAgICAgICdDOTcuNTE0LDY0LjE5OCwxMi40ODQsNDYuMDgtMTcuMDQxLDY5LjE4NScgK1xuICAgICAgICAnIGMtMjIuMDU0LDE3LjI1OC0yMy4yNjQsNTEuNDUyLTEuMjg0LDU4JyArXG4gICAgICAgICdjNC43NDgsMS40MTQsOS44MTUsMi41LDEzLjI5OSwyLjVzNS4zMTcsMCw1LjMxNywwJ1xufSwge1xuICAgIGZyb206ICdTaG93JyxcbiAgICB0bzogJzIwMTQnLFxuICAgIHdpZHRoOiAxNDYuNzksXG4gICAgaGVpZ2h0OiAxMDMuOCxcbiAgICBzZWdtZW50OidNMTQ1LjI5MywwIGMzLjIxNSwwLDYuMjk3LDAsOS4yMTEsJyArXG4gICAgICAgICcwYzUwLjE3LDAsNDQuNDU1LDY1LjE4NSwzLjI0OCw2NC43ODQnICtcbiAgICAgICAgJ0M5Ny41MTQsNjQuMTk4LDEyLjQ4NCw0Ni4wOC0xNy4wNDEsNjkuMTg1JyArXG4gICAgICAgICcgYy0yMi4wNTQsMTcuMjU4LTIzLjI2NCw1MS40NTItMS4yODQsNTgnICtcbiAgICAgICAgJ2M0Ljc0OCwxLjQxNCw5LjgxNSwyLjUsMTMuMjk5LDIuNXM1LjMxNywwLDUuMzE3LDAnXG59XTsiLCJ2YXIgQm90dG9tID0gcmVxdWlyZSgnLi9ib3R0b20nKSxcbiAgICBMaWdodGJveCA9IHJlcXVpcmUoJy4vbGlnaHRib3hfZmFkZV91cCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICB3b3JrX3NlbCxcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIG1hc29uaWNfZ3V0dGVyID0gMTIwO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdkYXRhTG9hZGVkJyk7XG5cbiAgICAvLyBkZWFsIHdpdGggd2luZG93IGJvdHRvbSBsb2FkaW5nIG1vcmVcbiAgICB2YXIgYm90dG9tID0gc2VsZi5ib3R0b20gPSBCb3R0b20oKTtcbiAgICB2YXIgbGlnaHRib3ggPSBzZWxmLmxpZ2h0Ym94ID0gTGlnaHRib3goKTtcblxuICAgIGJvdHRvbS5kaXNwYXRjaC5vbignYm90dG9tJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBnZXRfbW9yZV9kYXRhKCk7XG4gICAgfSk7XG5cbiAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAub24oJ3Jlc2l6ZS53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVzaXplX21hc29uaWMoKTtcbiAgICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRfbW9yZV9kYXRhICgpIHtcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignZGF0YUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJvdHRvbS5kaXJ0eShmYWxzZSk7XG4gICAgICAgICAgICByZW5kZXJfZGF0YSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICB9XG4gICAgLy8gZW5kIGRlYWxpbmcgd2l0aCB3aW5kb3dcblxuICAgIHZhciBtYXNvbmljID0gZDMubWFzb25pYygpXG4gICAgICAgIC53aWR0aChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgcmV0dXJuICtkLmNvdmVyLndpZHRoICsgbWFzb25pY19ndXR0ZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5oZWlnaHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIHJldHVybiArZC5jb3Zlci5oZWlnaHQgKyBtYXNvbmljX2d1dHRlcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmNvbHVtbldpZHRoKDIwMCArIG1hc29uaWNfZ3V0dGVyKTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdChfKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBfO1xuXG4gICAgICAgIC8vIHNpZGUgZWZmZWN0IG9mIHVwZGF0aW5nIGNvbnRhaW5lclxuICAgICAgICBib3R0b20uY29udGFpbmVyKGNvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVuZGVyKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZ2V0X2RhdGEoKTtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLm9uKCdkYXRhTG9hZGVkJywgbnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5jbGFzc2VkKCdtYXNvbmljJywgdHJ1ZSk7XG4gICAgICAgICAgICAvLyAuY2xhc3NlZCgnY29sLTEwLTEwJywgdHJ1ZSk7XG5cbiAgICAgICAgcmVuZGVyX2RhdGEoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2RhdGEoKSB7XG4gICAgICAgIHdvcmtfc2VsID0gY29udGFpbmVyLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIud2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLnNyYztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLndpZHRoO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB3b3JrX3NlbF9lbnRlcl9tZXRhID1cbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbWV0YS13cmFwcGVyJyk7XG4gICAgICAgIHdvcmtfc2VsX2VudGVyX21ldGFcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N0dWRlbnRfbmFtZSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3R1ZGVudF9uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHdvcmtfc2VsX2VudGVyX21ldGFcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jpc2RfcHJvZ3JhbSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucmlzZF9wcm9ncmFtO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChsaWdodGJveC5zaG93KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzaXplX21hc29uaWMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfbWFzb25pYyAoKSB7XG4gICAgICAgIHZhciBvdXRlcldpZHRoID0gY29udGFpbmVyLnByb3BlcnR5KCdvZmZzZXRXaWR0aCcpO1xuXG4gICAgICAgIG1hc29uaWNcbiAgICAgICAgICAgIC5vdXRlcldpZHRoKG91dGVyV2lkdGgpXG4gICAgICAgICAgICAucmVzZXQoKTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLmRhdHVtKG1hc29uaWMpXG4gICAgICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZShcImxlZnRcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueCArICdweCc7IH0pXG4gICAgICAgICAgICAuc3R5bGUoXCJ0b3BcIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQueSArICdweCc7IH0pXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5kYXRhO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLnN0eWxlKCdoZWlnaHQnLCBtYXNvbmljLm91dGVySGVpZ2h0KCkgKyAncHgnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRfZGF0YSAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9XG4gICAgICAgICAgICAgICAgZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzKHdvcmspO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5kYXRhTG9hZGVkKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGRhdGEgY29tZXMgb3V0IGFzOlxuICAgIC8vIFt7XG4gICAgLy8gICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgLy8gICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgLy8gICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAvLyAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgLy8gICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgIC8vIH0sIF1cbiAgICBmdW5jdGlvbiBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMgKHdvcmspIHtcblxuICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgdGhlIGV4dGVudCBvZiB3aWR0aHNcbiAgICAgICAgdmFyIGFsbF9tb2R1bGVzID0gW107XG4gICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsX21vZHVsZXMucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHNldCBhIHNjYWxlIGZvciBtYXBwaW5nXG4gICAgICAgIC8vIHdpZHRoIHRoZSBhbiBpbWFnZSB0byB0aGVcbiAgICAgICAgLy8gd2lkdGggb2YgdGhlIG1hc29uaWMgdmVyc2lvblxuICAgICAgICB2YXIgd2lkdGhfZXh0ZW50ID0gZDMuZXh0ZW50KGFsbF9tb2R1bGVzLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZygnd2lkdGhfZXh0ZW50Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHdpZHRoX2V4dGVudCk7XG4gICAgICAgIHZhciB3aWR0aHMgPSBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgICAgICAgIC5kb21haW4od2lkdGhfZXh0ZW50KVxuICAgICAgICAgICAgLnJhbmdlKFsxMDAsIDIwMCwgNDAwXSk7XG4gICAgICAgIC8vIHZhciB3aWR0aHMgPSBkMy5zY2FsZS5pZGVudGl0eSgpXG4gICAgICAgIC8vICAgICAuZG9tYWluKHdpZHRoX2V4dGVudCk7XG5cbiAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHJhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgIHZhciByYW5kb21fbW9kdWxlX2luZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLmxlbmd0aCksXG4gICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZSA9XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZVtyYW5kb21fbW9kdWxlX2luZGV4XSxcbiAgICAgICAgICAgICAgICByZW9yZGVyX21vZHVsZXNfdG9faW5jbHVkZSA9IFtdO1xuXG4gICAgICAgICAgICByZW9yZGVyX21vZHVsZXNfdG9faW5jbHVkZS5wdXNoKHJhbmRvbV9tb2R1bGUpO1xuICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlXG4gICAgICAgICAgICAgICAgLnNsaWNlKDAscmFuZG9tX21vZHVsZV9pbmRleClcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlb3JkZXJfbW9kdWxlc190b19pbmNsdWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZV9pbmRleCsxLFxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVvcmRlcl9tb2R1bGVzX3RvX2luY2x1ZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wdXNoKG1kKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgIHZhciBtYXhfMTI0MF9oZWlnaHQgPVxuICAgICAgICAgICAgICAgIChyYW5kb21fbW9kdWxlLmhlaWdodC9yYW5kb21fbW9kdWxlLndpZHRoKSAqXG4gICAgICAgICAgICAgICAgMTI0MDtcbiAgICAgICAgICAgIHZhciByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfd2lkdGg6IDEyNDAsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfaGVpZ2h0OiBtYXhfMTI0MF9oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRocyhyYW5kb21fbW9kdWxlLndpZHRoKSxcbiAgICAgICAgICAgICAgICBzcmM6IHJhbmRvbV9tb2R1bGUuc3JjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmFuZG9tX2NvdmVyLmhlaWdodCA9IChyYW5kb21fY292ZXIud2lkdGgqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUuaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLndpZHRoO1xuXG4gICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICdtb2R1bGVzJzogcmVvcmRlcl9tb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkLmRldGFpbHMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgYXZhdGFyOiBkLm93bmVyc1swXS5pbWFnZXNbJzEzOCddLFxuICAgICAgICAgICAgICAgIHVybDogZC5vd25lcnNbMF0udXJsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXMuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmlzZF9wcm9ncmFtcy5wdXNoKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlZF93b3JrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCIvLyBzZWdtZW50IGZ1bmN0aW9ucyB0YWtlIGEgc3RhcnRcbi8vIGFuZCBhbmQgZW5kIHBvaW50LiByZXR1cm5pbmdcbi8vIGFuIGFycmF5IG9mIHBvaW50cyB0aGF0IHdpbGxcbi8vIGJlIHVzZWQgdG8gZHJhd24gYSBsaW5lIGNvbm5lY3Rpbmdcbi8vIHRoZSBzdGFydCBhbmQgZW5kLlxuXG4vLyBib3RoIHN0YXJ0IGFuZCBlbmQgYXJlIGFycmF5cyxcbi8vIHN0YXJ0ID0gW3gseV0sICBlbmQgPSBbeCx5XVxubW9kdWxlLmV4cG9ydHMgPSBbe1xuICAgIGZyb206ICdSSVNEJyxcbiAgICB0bzogJ0dyYWQnLFxuICAgIHNlZ21lbnQ6IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBjdXJyZW50X2RlbHRhID0ge1xuICAgICAgICAgICAgICAgIHg6IHN0YXJ0WzBdIC0gZW5kWzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhd25fZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgeDogMTE1LjI1MyxcbiAgICAgICAgICAgICAgICB5OiAxODkuMTg1XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHZhciBkID0gJ00nICsgc3RhcnRbMF0gKyAnLCcgKyBzdGFydFsxXTtcblxuICAgICAgICBkICs9ICdjMCwwIDAuOTM2LDguODUxIDAuOTM2LCcgK1xuICAgICAgICAgICAgICgxNi44MSsoKGN1cnJlbnRfZGVsdGEueS1kcmF3bl9kZWx0YS55KS8yKSkgK1xuICAgICAgICAgICAgICdjMCwyOC4wNDItMTUuOTAxLDY3LjM3LTYxLjE4NSw2Ny4zNycgK1xuICAgICAgICAgICAgICdjLTUzLjI5NywwIC03OS44MDcsMCAtNzkuODA3LDAnK1xuICAgICAgICAgICAgICdsMC01MiAnICtcbiAgICAgICAgICAgICAnYzAsMCwzNS45MjEtNC4zOTMsNDguNjQ5LDMuNzU4JyArXG4gICAgICAgICAgICAgJ2MzNy44NjEsMjQuMjQyLDI5LjY0NSw0Ni43NzctMy44LDgwLjI0MicgK1xuICAgICAgICAgICAgICdjLTE3LjAyNywxNy4wMzgtNDQuNjI5LDE3LTQ0LjYyOSw0OC42NTMgJytcbiAgICAgICAgICAgICAnYzAsMTguMDEzLDAsMjQuMzQ3LDAsJyArXG4gICAgICAgICAgICAgKDI0LjM0NysoKGN1cnJlbnRfZGVsdGEueS1kcmF3bl9kZWx0YS55KS8yKSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRfZGVsdGEueCA+IGRyYXduX2RlbHRhLngpIHtcbiAgICAgICAgICAgIGQgKz0gJ2wnICsgKGN1cnJlbnRfZGVsdGEueCAtIGRyYXduX2RlbHRhLngpICArICcsMCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZDtcbiAgICB9XG59LCB7XG4gICAgZnJvbTogJ0dyYWQnLFxuICAgIHRvOiAnU2hvdycsXG4gICAgc2VnbWVudDogZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdmFyIGRlbHRhX3ggPSBzdGFydFswXSAtIGVuZFswXSxcbiAgICAgICAgICAgIGRlbHRhX3kgPSBlbmRbMV0gLSBzdGFydFsxXTtcblxuICAgICAgICB2YXIgZCA9ICdNJyArIHN0YXJ0WzBdICsgJywnICsgc3RhcnRbMV07XG5cbiAgICAgICAgZCArPSAnYzExNS4wMzksMC44NTIgMzcxLjAwNiwyMDQuNSA1NzEuNDI3LDExNS43MzIgJyArXG4gICAgICAgICAgICAgJ2MxNTcuOTI4LTY5Ljk0OCw2Ny4wMzItMTc4Ljk3OC00NS40MDUtMTMwLjk1OCAnICtcbiAgICAgICAgICAgICAnYy0xNDEuMDE2LDYwLjIyNi0zNDYuNTk2LDMwMC45NzYtNDMuMDE2LDMyMi4yMjYgJyArXG4gICAgICAgICAgICAgJ2MyMDAsMTQsNDU3Ljk0LTEwNS41NzksNjY3Ljk4Ny0xMDQuNzU3ICcgK1xuICAgICAgICAgICAgICdjMjQuNDg3LDAuMDk2LDUxLjQ5OSwwLjE4NSw3Ny4wMTMsMC4yNjYgJyArXG4gICAgICAgICAgICAgJ2MxNC43NjEsMC4wNDcsNDIsMC4xMzIsNDIsMC4xMzInO1xuXG4gICAgICAgIHJldHVybiBkO1xuICAgIH1cbn0sIHtcbiAgICBmcm9tOiAnU2hvdycsXG4gICAgdG86ICcyMDE0JyxcbiAgICBzZWdtZW50OiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICB2YXIgZGVsdGFfeCA9IHN0YXJ0WzBdIC0gZW5kWzBdLFxuICAgICAgICAgICAgZGVsdGFfeSA9IGVuZFsxXSAtIHN0YXJ0WzFdO1xuXG4gICAgICAgIHZhciBkID0gJ00nICsgc3RhcnRbMF0gKyAnLCcgKyBzdGFydFsxXTtcblxuICAgICAgICBkICs9ICcgYyAnK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjA0ODE2Mzc0Nzg3NTYpICsgJywwICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjA4NDczMzYxNDEyODQpICsgJywwICcgK1xuICAgICAgICAgICAgIC8veCx5XG4gICAgICAgICAgICAgKGRlbHRhX3ggKiAwLjExMTU0OTU0NTU1NSkgKyAnLCcgK1xuICAgICAgICAgICAgICgwKTtcblxuICAgICAgICBkICs9ICcgYyAnICtcbiAgICAgICAgICAgICAvL2NwMVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDApKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwKSArICcgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjExMzAyNzQxNDQ2OCkpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIC0wLjQ5ODYxNjc5MzI5OCkgKyAnICcgK1xuICAgICAgICAgICAgIC8veCx5XG4gICAgICAgICAgICAgKChkZWx0YV94ICogLTAuMzY1ODI0MjgxMzg2KSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogLTAuNzM4MTE2MTExNDM2KTtcblxuICAgICAgICBkICs9ICcgYyAnICtcbiAgICAgICAgICAgICAvL2NwMVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIC0wLjMzMDg5NDg0OTYyNykpICsgJywnICtcbiAgICAgICAgICAgICAoZGVsdGFfeSAqIC0wLjIxODg5NzMzMDk5NikgKyAnICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKChkZWx0YV94ICogLTAuNzA1Mjk4MTYwMDUzKSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogLTAuMTQwNDA1MjIxMTE4KSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC45Njg3MDM5MDg5NjMpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwLjA1MzI2MzE5ODkwOSk7XG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC4zODMxNTIyOTQzOTEpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwLjI3Mzc3NzUxODAyMSkgKyAnICcgK1xuICAgICAgICAgICAgIC8vY3AyXG4gICAgICAgICAgICAgKChkZWx0YV94ICogLTAuNTMwOTkwOTExMTA2KSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogMS4wMDkxOTU0MDIzKSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAtMC4yMDkzODUyMDY1MzIpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAxLjQxNTQ4ODAxODcpO1xuXG4gICAgICAgIGQgKz0gJyBjICcgK1xuICAgICAgICAgICAgIC8vY3AxXG4gICAgICAgICAgICAgKChkZWx0YV94ICogMC4wNzEzMjkzNDMwODczKSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogMC4xMzczODU1NDQ1MTYpICsgJyAnICtcbiAgICAgICAgICAgICAvL2NwMlxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMjM5Mzg1MjA2NTMyKSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogMC4yODIyMzI2MTI1MDcpICsgJyAnICtcbiAgICAgICAgICAgICAvL3gseVxuICAgICAgICAgICAgICgoZGVsdGFfeCAqIDAuMzU2NjY4ODgzNDcpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwLjI3MjIzMjYxMjUwNyk7XG5cbiAgICAgICAgZCArPSAnIGMgJyArXG4gICAgICAgICAgICAgLy9jcDFcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjAzNTU1NzUyNjA0NzQpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwKSArICcgJyArXG4gICAgICAgICAgICAgLy9jcDJcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjA0MDYzNDAwNTc2MzcpKSArICcsJyArXG4gICAgICAgICAgICAgKGRlbHRhX3kgKiAwKSArICcgJyArXG4gICAgICAgICAgICAgLy94LHlcbiAgICAgICAgICAgICAoKGRlbHRhX3ggKiAwLjA3OTUwOTM0NzUyMDkgKSkgKyAnLCcgK1xuICAgICAgICAgICAgIChkZWx0YV95ICogMCk7XG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxufV07IiwidmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuL3N2ZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvZ29fc2NhbGUgKCkge1xuICAgIHZhciB1dGlsaXR5ID0gVXRpbGl0eSgpO1xuXG4gICAgdmFyIHNlZ21lbnRzID0gW3tcbiAgICAgICAgICAgIGZyb206ICdSSVNEJyxcbiAgICAgICAgICAgIHRvOiAnR3JhZCcsXG4gICAgICAgICAgICAvLyBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAvLyAgICAgZnVuYzogdXRpbGl0eS5zY2FsZUFuY2hvclksXG4gICAgICAgICAgICAvLyAgICAgYXJnczoge1xuICAgICAgICAgICAgLy8gICAgICAgICBzdGFydDogMixcbiAgICAgICAgICAgIC8vICAgICAgICAgZW5kOiA5XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICBmdW5jOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICBhcmdzOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsOiAnTTk0LjI2LTE1ICcrXG4gICAgICAgICAgICAgICAgJ2gyOS43OTYgJyArXG4gICAgICAgICAgICAgICAgJ2MwLDAsMC45MzYsOC44NTEsMC45MzYsMTYuODEgJytcbiAgICAgICAgICAgICAgICAnYzAsMjguMDQyLTE1LjkwMSw2Ny4zNy02MS4xODUsNjcuMzcnICtcbiAgICAgICAgICAgICAgICAnQzEwLjUxLDY5LjE4LTE2LDY5LjE4NS0xNiw2OS4xODUnICtcbiAgICAgICAgICAgICAgICAndi01MicgK1xuICAgICAgICAgICAgICAgICdjMCwwLDM1LjkyMS00LjM5Myw0OC42NDksMy43NTgnICtcbiAgICAgICAgICAgICAgICAnYzM3Ljg2MSwyNC4yNDIsMjkuNjQ1LDQ2Ljc3Ny0zLjgsODAuMjQyJyArXG4gICAgICAgICAgICAgICAgJ2MtMTcuMDI3LDE3LjAzOC00NC42MjksMTctNDQuNjI5LDQ4LjY1MycgK1xuICAgICAgICAgICAgICAgICdjMCwxOC4wMTMsMCwyNC4zNDcsMCwyNC4zNDcnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdHcmFkJyxcbiAgICAgICAgICAgIHRvOiAnU2hvdycsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgZnVuYzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFgsXG4gICAgICAgICAgICAgICAgYXJnczoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbDogJ00tMTYtMTQuNzg2JyArXG4gICAgICAgICAgICAgICAgJ2MxMTUuMDM5LDAuODUyLDM3MS4wMDYsMjA0LjUsNTcxLjQyNywxMTUuNzMyJyArXG4gICAgICAgICAgICAgICAgJ2MxNTcuOTI4LTY5Ljk0OCw2Ny4wMzItMTc4Ljk3OC00NS40MDUtMTMwLjk1OCcgK1xuICAgICAgICAgICAgICAgICdjLTE0MS4wMTYsNjAuMjI2LTM0Ni41OTYsMzAwLjk3Ni00My4wMTYsMzIyLjIyNicgK1xuICAgICAgICAgICAgICAgICdjMjAwLDE0LDQ1Ny45NC0xMDUuNTc5LDY2Ny45ODctMTA0Ljc1NycgK1xuICAgICAgICAgICAgICAgICdjMjQuNDg3LDAuMDk2LDUxLjQ5OSwwLjE4NSw3Ny4wMTMsMC4yNjYnICtcbiAgICAgICAgICAgICAgICAnYzE0Ljc2MSwwLjA0Nyw0MiwwLjEzMiw0MiwwLjEzMidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZnJvbTogJ1Nob3cnLFxuICAgICAgICAgICAgdG86ICcyMDE0JyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICBmdW5jOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICBhcmdzOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsOiAnTTExNi43NDUtMTUnICtcbiAgICAgICAgICAgICAgICAnYzAsMCwwLDMuMTAzLDAsMTMnICtcbiAgICAgICAgICAgICAgICAnYzAsMTIuODItMjUuNzAyLDE5Ljc1Ni00NC43NDUsMjcnICtcbiAgICAgICAgICAgICAgICAnQzQ0LjQ4NiwzNS40NjcsMTgsMzYuMDIsMTgsNjEuNScgK1xuICAgICAgICAgICAgICAgICdjMCwyNiwxNy41LDM2LjgyOCw0NC43NzgsMzYuODI4JyArXG4gICAgICAgICAgICAgICAgJ0MxMDIuNjY3LDk4LjMyOCwxMDQsNTEsMTA0LDUxJyArXG4gICAgICAgICAgICAgICAgJ0gtMTYnICtcbiAgICAgICAgICAgICAgICAndjM2JyArXG4gICAgICAgICAgICAgICAgJ2MwLDAsMzkuNjE4LDkuODY1LDYyLDM2JyArXG4gICAgICAgICAgICAgICAgJ2MyMS4xNDEsMjQuNjg2LDIzLjU0MSwyOCw0Ny4wMjMsMjgnICtcbiAgICAgICAgICAgICAgICAnQzEwOCwxNTEsMTE4LDE1MSwxMTgsMTUxdjQ3LjcyNCdcbiAgICAgICAgfV07XG5cbiAgICB2YXIgdGVtcF9wYXRoID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKVxuICAgICAgICAuYXBwZW5kKCdwYXRoJyk7XG5cbiAgICBzZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIHRlbXBfcGF0aC5hdHRyKCdkJywgZC5vcmlnaW5hbCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRlbXBfcGF0aCk7XG5cbiAgICAgICAgdXRpbGl0eS5jb252ZXJ0VG9SZWxhdGl2ZSh0ZW1wX3BhdGgubm9kZSgpKTtcblxuICAgICAgICBkLnJlbGF0aXZlID0gdGVtcF9wYXRoLmF0dHIoJ2QnKTtcblxuICAgICAgICBkLnNjYWxlID0gZC5zY2FsZVVzaW5nXG4gICAgICAgICAgICAgICAgICAgLmZ1bmModGVtcF9wYXRoLm5vZGUoKSwgZC5zY2FsZVVzaW5nLmFyZ3MpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LnNlZ21lbnRzID0gc2VnbWVudHM7XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnVsbHNjcmVlbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc2VsZWN0aW9uLFxuICAgICAgICBpbWdfd2lkdGggPSAwLFxuICAgICAgICBpbWdfaGVpZ2h0ID0gMDtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIHNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB0aGlzLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1nX2hlaWdodCA8IHRoaXMubmF0dXJhbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBpbWdfaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbWdfd2lkdGggPCB0aGlzLm5hdHVyYWxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBpbWdfd2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtYWtlX2Z1bGxfc2NyZWVuKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgc2VsZi5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1ha2VfZnVsbF9zY3JlZW4oKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5mdWxsc2NyZWVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1ha2VfZnVsbF9zY3JlZW4oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIG1ha2VfZnVsbF9zY3JlZW4gKCkge1xuICAgICAgICBpZiAoIXNlbGVjdGlvbikgdGhyb3cgXCJmdWxsIHNjcmVlbiByZXF1aXJlcyBhIHNlbGVjdGlvblwiO1xuXG4gICAgICAgIHZhciB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGlmIChoZWlnaHQgPiB3aWR0aCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICggd2lkdGggKiAoaW1nX3dpZHRoL2ltZ19oZWlnaHQpKSArJ3B4Jyk7XG4gICAgICAgICAgICBzZWxlY3Rpb24uc3R5bGUoJ2hlaWdodCcsICcxMDAlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICggaGVpZ2h0ICogKGltZ193aWR0aC9pbWdfaGVpZ2h0KSkgKydweCcpO1xuICAgICAgICAgICAgc2VsZWN0aW9uLnN0eWxlKCd3aWR0aCcsICcxMDAlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBOYXYgPSByZXF1aXJlKCcuL292ZXJsYXlfbmF2JyksXG4gICAgTG9nbyA9IHJlcXVpcmUoJy4vbG9nbycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNpdGUgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbG9yX3ZhbHVlcyA9IHtcbiAgICAgICAgICAgIHB1cnBsZTogJ3JnYigzOCwgMzQsIDk4KTsnLFxuICAgICAgICAgICAgb3JhbmdlOiAncmdiKDI1NSwgNjEsIDU2KTsnLFxuICAgICAgICAgICAgJ2x0LXB1cnBsZSc6ICdyZ2IoMTQ2LCA1MywgMTI1KScsXG4gICAgICAgICAgICBncmVlbjogJ3JnYigxNDQsIDIxOCwgNzMpJyxcbiAgICAgICAgICAgIGJsdWU6ICdyZ2IoNDMsIDg5LCAxODQpJ1xuICAgICAgICB9LFxuICAgICAgICB1c2VfaW1hZ2VzX2FzX292ZXJsYXlfYmFja2dyb3VuZCA9IHRydWUsXG4gICAgICAgIGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kID0gJ2Jsb2NrJyxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2RzID0gWydmYWRlJywgJ2Jsb2NrJ107XG5cbiAgICB2YXIgY29sb3JzID0gT2JqZWN0LmtleXMoY29sb3JfdmFsdWVzKTtcblxuICAgIHZhciBuYXYgPSBOYXYoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnaHRtbExvYWRlZCcpO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5Jyk7XG4gICAgICAgIGJvZHkuaHRtbCgnJyk7XG5cbiAgICAgICAgdmFyIHJhbmRvbV9pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9ycy5sZW5ndGgpO1xuXG4gICAgICAgIHZhciBjb2xvciA9IGNvbG9yc1tyYW5kb21faW5kZXhdO1xuICAgICAgICB2YXIgYWx0X2NvbG9ycyA9IGNvbG9ycy5zbGljZSgwLHJhbmRvbV9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KGNvbG9ycy5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9pbmRleCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnMubGVuZ3RoKSk7XG5cbiAgICAgICAgdmFyIGFsdF9jb2xvciA9IGFsdF9jb2xvcnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdF9jb2xvcnMubGVuZ3RoKV07XG5cbiAgICAgICAgYm9keS5jbGFzc2VkKCdjb25jZXB0XzA2JywgdHJ1ZSk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS0nICsgY29sb3IsIHRydWUpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ2JvZHktYWx0LScgKyBhbHRfY29sb3IsIHRydWUpO1xuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNi9ib2R5Lmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBib2R5Lm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSkgICAgICAgICAgO1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5odG1sTG9hZGVkKCk7XG5cbiAgICAgICAgICAgIHZhciBwYWlycyA9IGQzLnNlbGVjdEFsbCgnLm92ZXJsYXktbmF2LWl0ZW0nKVxuICAgICAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRhdGFzZXQ7IH0pO1xuXG5cbiAgICAgICAgICAgIGlmICh1c2VfaW1hZ2VzX2FzX292ZXJsYXlfYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICAgIG5hdi5yb3RhdGVCYWNrZ3JvdW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcucm90YXRpbmctYmFja2dyb3VuZC1pbWFnZScpKVxuICAgICAgICAgICAgICAgICAgICAucm90YXRlTWV0aG9kKGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0QWxsKCcucm90YXRpbmctYmFja2dyb3VuZC1pbWFnZScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLm92ZXJsYXktYmFja2dyb3VuZC1pbWFnZS1zY3JlZW4nKVxuICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZCgnbm8taW1hZ2VzJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYXYuc2VsZWN0aW9uKHBhaXJzKVxuICAgICAgICAgICAgICAgIC5zZXR1cCgpO1xuXG4gICAgICAgICAgICBsb2dvLmNvbnRhaW5lcihkMy5zZWxlY3QoJy5sb2dvLWxpbmUnKSlcbiAgICAgICAgICAgICAgICAuYXR0YWNoUmVzaXplKClcbiAgICAgICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBjb25uZWN0TG9nb1NjYWxlID0gcmVxdWlyZSgnLi9jb25uZWN0X2xvZ29fc2NhbGUnKTtcbnZhciBjb25uZWN0TG9nbyA9IHJlcXVpcmUoJy4vY29ubmVjdF9sb2dvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nbyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX3RleHRfc2VsLFxuICAgICAgICBsb2dvX2xpbmVfdGV4dF9zZWwsXG4gICAgICAgIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlbCxcbiAgICAgICAgc3RyYWlnaHRfbGluZSA9IGQzLnN2Zy5saW5lKCksXG4gICAgICAgIGNvbm5lY3RfbG9nbyA9IGNvbm5lY3RMb2dvLFxuICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGUgPSBjb25uZWN0TG9nb1NjYWxlKCk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxvZ29fY29udGFpbmVyX3NlbDtcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3dfc2VsXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICAgICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvZ29fbGluZV9jb25uZWN0aW5nX3NlbCkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBzZXQgdXAgc3ZnXG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICAvLyBzZWxlY3Rpb24gb2YgdGhlIHRleHQgdGhhdCB3aWxsIGRlZmluZSB0aGUgbGluZVxuICAgICAgICBsb2dvX3RleHRfc2VsID0gZDMuc2VsZWN0KCdoZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubG9nby10ZXh0LWNvbXBvbmVudCcpO1xuXG4gICAgICAgIC8vIHZlcnRpY2llcyBmb3IgXG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyhsb2dvX3RleHRfc2VsKTtcbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPVxuICAgICAgICAgICAgICAgIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzKHRleHRfdmVydGljaWVzKTtcblxuICAgICAgICBsb2dvX2xpbmVfdGV4dF9zZWwgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJy5sb2dvLWxpbmUtdGV4dCcpXG4gICAgICAgICAgICAuZGF0YSh0ZXh0X3ZlcnRpY2llcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLXRleHQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSk7XG5cbiAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VsID1cbiAgICAgICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1jb25uZWN0aW5nJylcbiAgICAgICAgICAgICAgICAuZGF0YShjb25uZWN0aW5nX3NlZ21lbnRzKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUtY29ubmVjdGluZycpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICgpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMpO1xuXG4gICAgICAgIGxvZ29fbGluZV90ZXh0X3NlbFxuICAgICAgICAgICAgLmRhdGEodGV4dF92ZXJ0aWNpZXMpXG4gICAgICAgICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpO1xuXG4gICAgICAgIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlbFxuICAgICAgICAgICAgLmRhdGEoY29ubmVjdGluZ19zZWdtZW50cylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyAoc2VsKSB7XG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IFtdO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCArIDMsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcblxuICAgICAgICAgICAgdGV4dF92ZXJ0aWNpZXMucHVzaChbZmlyc3QsIHNlY29uZF0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRfdmVydGljaWVzKTtcblxuICAgICAgICByZXR1cm4gdGV4dF92ZXJ0aWNpZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHMoc3RhcnRfZW5kX3BvaW50cykge1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgoaSsxKSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gc3RhcnRfZW5kX3BvaW50c1tpXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gc3RhcnRfZW5kX3BvaW50c1tpKzFdWzBdO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdGluZ19zZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICAucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZVtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY2FsZShzdGFydCwgZW5kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpbmdfc2VnbWVudHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBSb3RhdGVTdmcgPSByZXF1aXJlKCcuL3JvdGF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1dHRvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc2VsZWN0aW9uLFxuICAgICAgICBkaW1lbnNpb25zO1xuXG4gICAgdmFyIHJvdGF0ZV9zdmcgPSBSb3RhdGVTdmcoKTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIGRpbWVuc2lvbnMgPSBnZXRfZGltZW5zaW9ucyhzZWxlY3Rpb24pO1xuICAgICAgICByb3RhdGVfc3ZnXG4gICAgICAgICAgICAuc2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3QoJyNmbG93ZXInKSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJvdGF0ZV9zdmcuc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9kaW1lbnNpb25zIChzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBmdWxsc2NyZWVuSW1nID0gcmVxdWlyZSgnLi9mdWxsc2NyZWVuX2ltZycpLFxuICAgIEJ1dHRvbiA9IHJlcXVpcmUoJy4vb3ZlcmxheV9idXR0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYXYgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHRhcmdldF9zZWwsXG4gICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbCxcbiAgICAgICAgcm90YXRlX2JhY2tncm91bmRfbGVuZ3RoID0gMCxcbiAgICAgICAgcm90YXRlX2RpcmVjdGlvbl9hc2NlbmRpbmcgPSB0cnVlLFxuICAgICAgICBvdmVybGFpZCA9IGZhbHNlLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICByb3RhdGVfbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIGZhZGU6IHJvdGF0ZV9mYWRlLFxuICAgICAgICAgICAgYmxvY2s6IHJvdGF0ZV9ibG9ja1xuICAgICAgICB9LFxuICAgICAgICByb3RhdGVfbWV0aG9kID0gJ2ZhZGUnO1xuXG4gICAgdmFyIGZ1bGxfc2NyZWVuID0gZnVsbHNjcmVlbkltZygpLnNldHVwKCk7XG4gICAgdmFyIGJ1dHRvbiA9IEJ1dHRvbigpO1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0YXJnZXRfc2VsO1xuICAgICAgICB0YXJnZXRfc2VsID0gXztcblxuICAgICAgICBidXR0b25cbiAgICAgICAgICAgIC5zZWxlY3Rpb24odGFyZ2V0X3NlbClcbiAgICAgICAgICAgIC5zdGFydCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJvdGF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHJvdGF0ZV9tZXRob2Q7XG4gICAgICAgIHJvdGF0ZV9tZXRob2QgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yb3RhdGVCYWNrZ3JvdW5kID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcm90YXRlX2JhY2tncm91bmRfc2VsO1xuICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9zZWwgPSBfO1xuXG4gICAgICAgIC8vIHNldCBpbnRpYWwgdmFsdWVzO1xuICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9zZWxcbiAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQgPSB7fTtcblxuICAgICAgICAgICAgICAgIGQub3BhY2l0eSA9IChpID09PSAwKSA/IDEgOiAwO1xuICAgICAgICAgICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX2xlbmd0aCArPSAxO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBmdWxsX3NjcmVlbi5zZWxlY3Rpb24ocm90YXRlX2JhY2tncm91bmRfc2VsKVxuICAgICAgICAgICAgLnJlc2l6ZSgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNldHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRhcmdldF9zZWwpIHRocm93IFwicmVxdWlyZXMgZWxlbWVudHMgdG8gcGFpclwiO1xuICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdicsIGZ1bmN0aW9uIChkLCBkaSkge1xuICAgICAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI2Zsb3dlcicpO1xuICAgICAgICAgICAgICAgIG92ZXJsYWlkID0gb3ZlcmxhaWQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKG92ZXJsYWlkKSByb3RhdGUoKTtcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZV9kZWFjdGl2YXRlKGQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlX2RlYWN0aXZhdGUgKGQpIHtcbiAgICAgICAgdmFyIG92ZXJsYXkgPSBkMy5zZWxlY3QoZC5hY3RpdmF0ZSk7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NlZCgnb3ZlcmxhaWQnLCBvdmVybGFpZCk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZChkLmJvZHksIG92ZXJsYWlkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByb3RhdGUgKCkge1xuICAgICAgICByb3RhdGVfbWV0aG9kc1tyb3RhdGVfbWV0aG9kXSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZV9ibG9jayAoKSB7XG4gICAgICAgIHZhciBzcGVlZCA9IDgwMCxcbiAgICAgICAgICAgIHBhdXNlID0gODAwMDtcblxuICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9zZWxcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDAgKiByb3RhdGVfYmFja2dyb3VuZF9sZW5ndGgpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIHNwZWVkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKCdzdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9zZWwuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdibG9jaycpXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9zZWwuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWQpIHJvdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0sIHBhdXNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcm90YXRlX2ZhZGUgKCkge1xuICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9zZWwudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwMClcbiAgICAgICAgICAgIC5lYWNoKFwic3RhcnRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJvdGF0ZV9iYWNrZ3JvdW5kX3NlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zdHlsZSgnei1pbmRleCcsIGQueik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5vcGFjaXR5O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lYWNoKFwiZW5kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIGN1cnJlbnQgXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRfaW5kZXggPSAwLFxuICAgICAgICAgICAgICAgICAgICBuZXh0X2N1cnJlbnRfaW5kZXg7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9zZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50X2luZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBuZXh0IGluZGV4IGJhc2VkIG9uIGFzY2VuZGluZyBvciBub3RcbiAgICAgICAgICAgICAgICAvLyBhbHNvIGNoYW5naW5nIGFzY2VuZGluZyBib29sIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgICAgIGlmIChyb3RhdGVfZGlyZWN0aW9uX2FzY2VuZGluZykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0X2N1cnJlbnRfaW5kZXggPSBjdXJyZW50X2luZGV4ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRfY3VycmVudF9pbmRleCA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHJvdGF0ZV9iYWNrZ3JvdW5kX2xlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50X2luZGV4ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9sZW5ndGggLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlX2RpcmVjdGlvbl9hc2NlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRfY3VycmVudF9pbmRleCA9IGN1cnJlbnRfaW5kZXggLSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dF9jdXJyZW50X2luZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dF9jdXJyZW50X2luZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZV9kaXJlY3Rpb25fYXNjZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHNldCBvcGFjaXR5IHZhbHVlcyBiYXNlZCBvbiBuZXh0IGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgICAgICByb3RhdGVfYmFja2dyb3VuZF9zZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBkLm9wYWNpdHkgPSAoKGkgPT09IG5leHRfY3VycmVudF9pbmRleCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpID09PSBjdXJyZW50X2luZGV4KSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxIDogMDtcbiAgICAgICAgICAgICAgICAgICAgZC5jdXJyZW50ID0gKGkgPT09IG5leHRfY3VycmVudF9pbmRleCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IG5leHRfY3VycmVudF9pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZC56ID0gMztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSBjdXJyZW50X2luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLnogPSAyO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZC56ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWQpIHJvdGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm90YXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzZWxlY3Rpb24sXG4gICAgICAgIG9mZnNldCA9IDAsXG4gICAgICAgIHNwZWVkID0gMC4yLFxuICAgICAgICBzdGFydCA9IERhdGUubm93KCksXG4gICAgICAgIHJhZGl1cztcblxuICAgIHZhciB2ZW5kb3IgPSBbXCJcIiwgXCItd2Via2l0LVwiLCBcIi1tb3otXCIsIFwiLW1zLVwiLCBcIi1vLVwiXS5yZWR1Y2UoXG4gICAgICAgIGZ1bmN0aW9uIChwLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gdiArIFwidHJhbnNmb3JtXCIgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSA/IHYgOiBwO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIHJhZGl1cyA9IHNlbGVjdGlvbi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LzI7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gMTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gMC4yO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2sucm90YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzcGVlZCA9IDAuMjtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICBzcGVlZCA9IDU7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIGQzLnRpbWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IChEYXRlLm5vdygpIC0gc3RhcnQpICogc3BlZWQ7XG4gICAgICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAuc3R5bGUodmVuZG9yKyd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICdyb3RhdGUoJysgKGFuZ2xlL3JhZGl1cykgKydkZWcpJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfcG9zaXRpb24gKCkge1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN2ZyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYuY29udmVydFRvUmVsYXRpdmUgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICBmdW5jdGlvbiBzZXQodHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHJzZWcsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkeCwgZHksIHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICBzZWdzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgZm9yICh2YXIgeCA9IDAsIHkgPSAwLCBpID0gMCwgbGVuID0gc2Vncy5udW1iZXJPZkl0ZW1zO1xuICAgICAgICAgICAgIGkgPCBsZW47XG4gICAgICAgICAgICAgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzZWcgPSBzZWdzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgYyAgID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgIGlmICgvW01MSFZDU1FUQVp6XS8udGVzdChjKSkge1xuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgLSB4O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgLSB4O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgLSB5O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgLSB5O1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSAteCArICh4ID0gc2VnLngpO1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSAteSArICh5ID0gc2VnLnkpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTW92ZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0bycsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG9Ib3Jpem9udGFsJyxkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVic6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b1ZlcnRpY2FsJyxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpYycsZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdRJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b1F1YWRyYXRpYycsZHgsZHkseDEseTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0FyYycsZHgsZHksc2VnLnIxLHNlZy5yMixzZWcuYW5nbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnLmxhcmdlQXJjRmxhZyxzZWcuc3dlZXBGbGFnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdaJzogY2FzZSAneic6IHggPSB4MDsgeSA9IHkwOyBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSB4ICs9IHNlZy54O1xuICAgICAgICAgICAgICAgIGlmICgneScgaW4gc2VnKSB5ICs9IHNlZy55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHN0YXJ0IG9mIGEgc3VicGF0aFxuICAgICAgICAgICAgaWYgKGMgPT0gJ00nIHx8IGMgPT0gJ20nKSB7XG4gICAgICAgICAgICAgICAgeDAgPSB4O1xuICAgICAgICAgICAgICAgIHkwID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguZ2V0QXR0cmlidXRlKCdkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9aL2csICd6JykpO1xuICAgIH07XG5cbiAgICBzZWxmLnBhdGhEZWx0YSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKDApLFxuICAgICAgICAgICAgZW5kID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKHBhdGguZ2V0VG90YWxMZW5ndGgoKSk7XG5cbiAgICAgICAgZGVsdGEueCA9IGVuZC54IC0gc3RhcnQueDtcbiAgICAgICAgZGVsdGEueSA9IGVuZC55IC0gc3RhcnQueTtcblxuICAgICAgICByZXR1cm4gZGVsdGE7XG4gICAgfTtcblxuICAgIC8vIHBhc3MgaW4gYSBwYXRoIGVsZW1lbnRcbiAgICAvLyBhbmQgdGhlIHBhdGggc2VnZW1lbnQgaW5kaWNpZXNcbiAgICAvLyB0aGF0IHdpbGwgYmUgc2NhbGVkXG4gICAgc2VsZi5zY2FsZUFuY2hvclkgPSBmdW5jdGlvbiAocGF0aCwgYW5jaG9ycykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVBbmNob3JZJyk7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogc2VsZi5wYXRoRGVsdGEocGF0aClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgZGVsdGFcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gYW5jaG9ycykge1xuICAgICAgICAgICAgICAgIHZhciB0b19yZXBsYWNlID0gc2VnbWVudHMuZ2V0SXRlbShhbmNob3JzW25hbWVdKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZV93aXRoID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b0N1YmljUmVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55ICsgKChkZWx0YS5jdXJyZW50LnktXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhLmRyYXduLnkpLzIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueTEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55Mik7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZV93aXRoLCBhbmNob3JzW25hbWVdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWwgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IHNlbGYucGF0aERlbHRhKHBhdGgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlZy54LCBzZWcueScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlZy54ICsgJywnICsgc2VnLnkpO1xuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueSAgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWxZID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZWcueCwgc2VnLnknKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWcueCArICcsJyArIHNlZy55KTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxO1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDI7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueSAgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWxYID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZWcueCwgc2VnLnknKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWcueCArICcsJyArIHNlZy55KTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxO1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTI7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54ICAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55O1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3cmFwcGVyLFxuICAgICAgICBjbHMgPSAnZGVwYXJ0bWVudCc7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBbXG4gICAgICAgICdBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnQ2VyYW1pY3MnLFxuICAgICAgICAnRGlnaXRhbCArIE1lZGlhJyxcbiAgICAgICAgJ0Z1cm5pdHVyZSBEZXNpZ24nLFxuICAgICAgICAnR2xhc3MnLFxuICAgICAgICAnR3JhcGhpYyBEZXNpZ24nLFxuICAgICAgICAnSW5kdXN0cmlhbCBEZXNpZ24nLFxuICAgICAgICAnSW50ZXJpb3IgQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0pld2VscnkgKyBNZXRhbHNtaXRoaW5nJyxcbiAgICAgICAgJ0xhbmRzY2FwZSBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnUGFpbnRpbmcnLFxuICAgICAgICAnUGhvdG9ncmFwaHknLFxuICAgICAgICAnUHJpbnRtYWtpbmcnLFxuICAgICAgICAnU2N1bHB0dXJlJyxcbiAgICAgICAgJ1RleHRpbGVzJ1xuICAgIF07XG5cbiAgICBzZWxmLndyYXBwZXIgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB3cmFwcGVyO1xuICAgICAgICB3cmFwcGVyID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmRlcGFydG1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiZGVwYXJ0bWVudHMgaXMgYSBnZXR0ZXJcIjtcbiAgICAgICAgcmV0dXJuIGRlcGFydG1lbnRzO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF3cmFwcGVyKSB0aHJvdyBcInJlcXVpcmVzIGEgd3JhcHBlclwiO1xuXG4gICAgICAgIHdyYXBwZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY2xzKVxuICAgICAgICAgICAgLmRhdGEoZGVwYXJ0bWVudHMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBwcm90b3R5cGVzID0ge1xuICAgIGNvbmNlcHQ6IHtcbiAgICAgICAgJzAwJzogQ29uY2VwdF8wMCxcbiAgICAgICAgJzAxJzogQ29uY2VwdF8wMSxcbiAgICAgICAgJzAxYSc6IENvbmNlcHRfMDFhLFxuICAgICAgICAnMDInOiBDb25jZXB0XzAyLFxuICAgICAgICAnMDMnOiBDb25jZXB0XzAzLFxuICAgICAgICAnMDQnOiBDb25jZXB0XzA0LFxuICAgICAgICAnMDRhJzogQ29uY2VwdF8wNGEsXG4gICAgICAgICcwNGInOiBDb25jZXB0XzA0YixcbiAgICAgICAgJzA0Yyc6IENvbmNlcHRfMDRjLFxuICAgICAgICAnMDRkJzogQ29uY2VwdF8wNGQsXG4gICAgICAgICcwNGUnOiBDb25jZXB0XzA0ZSxcblx0XHQnMDRnJzogQ29uY2VwdF8wNGcsXG4gICAgICAgICcwNSc6IENvbmNlcHRfMDUsXG4gICAgICAgICcwNWEnOiBDb25jZXB0XzA1YSxcbiAgICAgICAgJzA1Yic6IENvbmNlcHRfMDViLFxuICAgICAgICAnMDVjJzogQ29uY2VwdF8wNWMsXG4gICAgICAgICcwNic6IENvbmNlcHRfMDZcbiAgICB9LFxuICAgIHdvcms6IHtcbiAgICAgICAgJzAxJzogV29ya18wMSxcbiAgICAgICAgJzAxYSc6IFdvcmtfMDFhLFxuICAgICAgICAnMDFiJzogV29ya18wMWIsXG4gICAgICAgICcwMic6IFdvcmtfMDIsXG4gICAgICAgICcwMyc6IFdvcmtfMDMsXG4gICAgICAgICcwNCc6IFdvcmtfMDRcbiAgICB9LFxuICAgIGluZGV4OiB7XG4gICAgICAgICcwMCc6IGZ1bmN0aW9uICgpIHt9XG4gICAgfVxufTtcblxudmFyIHByb3RvdHlwZV90b19sb2FkID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFzaF92YXJzID0gWydpbmRleCcsICcwMCddO1xuXG4gICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcblxuICAgIGlmIChoYXNoKSB7XG4gICAgICAgIGhhc2hfdmFycyA9IGhhc2guc3BsaXQoJyMnKVsxXS5zcGxpdCgnJicpWzBdLnNwbGl0KCc9Jyk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIFsnd29yaycsICcwMSddXG4gICAgcmV0dXJuIGhhc2hfdmFycztcbn0pKCk7XG5cbmV4aGliaXRpb24gPSBwcm90b3R5cGVzW3Byb3RvdHlwZV90b19sb2FkWzBdXVtwcm90b3R5cGVfdG9fbG9hZFsxXV0oKTtcblxud2luZG93LmV4aGliaXRpb24gPSBleGhpYml0aW9uO1xuXG5mdW5jdGlvbiBXb3JrXzAxICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wMS9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIHdvcms7XG59XG5mdW5jdGlvbiBXb3JrXzAxYSAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDFhL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gd29yaztcbn1cbmZ1bmN0aW9uIFdvcmtfMDFiICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wMWIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuZnVuY3Rpb24gV29ya18wMiAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuZnVuY3Rpb24gV29ya18wMyAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDMvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuZnVuY3Rpb24gV29ya18wNCAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDQvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzAwICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wMC9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAxL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMWEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAxYS9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDIgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAyL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMyAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDMvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNC9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDRhICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNGEvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA0YiAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDRiL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wNGMgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzA0Yy9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDRkICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNGQvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA0ZSAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDRlL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wNGcgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzA0Zy9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDUgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzA1L2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wNWEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzA1YS9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDViICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNWIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA1YyAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDVjL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wNiAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDYvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufSIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJyAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyc1wiPjwvZGl2PicgK1xuJyAgICA8ZGl2IGNsYXNzPVwid29ya1wiPjwvZGl2PicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrXzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhLFxuICAgICAgICBncmlkX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIGZpbHRlcl9zZWxlY3Rpb24sXG4gICAgICAgIHJpc2RfcHJvZ3JhbXMgPSBbJ0FsbCddLFxuICAgICAgICBpc287XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKTtcbiAgICAgICAgYm9keS5odG1sKGh0bWwpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ3dvcmtfMDEnLCB0cnVlKTtcblxuICAgICAgICBncmlkX3NlbGVjdGlvbiA9IGQzLnNlbGVjdCgnLmdyaWQnKTtcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb24uc2VsZWN0KCcud29yaycpO1xuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0KCcuZmlsdGVycycpO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZW5kZXJfd29yaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0X2FuZF9yZW5kZXJfd29yaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X2FuZF9yZW5kZXJfd29yayAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuICAgICAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUnOiBtZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKS5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICB3b3JrID0gd29ya19jb250YWluZXJfc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgKyBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUuc3JjO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgICAgICAgICAgZ3V0dGVyOiAyMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuaXNvID0gaXNvO1xuXG4gICAgICAgIGZpbHRlcl9zZWxlY3Rpb24gPSBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvblxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnZmlsdGVyJylcbiAgICAgICAgICAgIC5kYXRhKHJpc2RfcHJvZ3JhbXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZmlsdGVyJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2dyYW0gPSBkO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmFtID09PSAnQWxsJykgcHJvZ3JhbSA9ICcnO1xuICAgICAgICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QoaXRlbUVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChmb3JtYXRfcHJvZ3JhbShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrXzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhLFxuICAgICAgICBncmlkX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIGZpbHRlcl9zZWxlY3Rpb24sXG4gICAgICAgIHJpc2RfcHJvZ3JhbXMgPSBbJ0FsbCddLFxuICAgICAgICBpc287XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKTtcbiAgICAgICAgYm9keS5odG1sKGh0bWwpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ3dvcmtfMDFhJywgdHJ1ZSk7XG5cbiAgICAgICAgZ3JpZF9zZWxlY3Rpb24gPSBkMy5zZWxlY3QoJy5ncmlkJyk7XG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uLnNlbGVjdCgnLndvcmsnKTtcbiAgICAgICAgZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvblxuICAgICAgICAgICAgLnNlbGVjdCgnLmZpbHRlcnMnKTtcblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldF9hbmRfcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9hbmRfcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICBkMy5qc29uKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnZGF0YS9wcm9qZWN0czIwMTQwNDA4Lmpzb24nLCBmdW5jdGlvbiAod29yaykge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd29yaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cod29yayk7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcbiAgICAgICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9kdWxlJzogbWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluZGV4T2YoZC5yaXNkX3Byb2dyYW0pIDwgMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlzZF9wcm9ncmFtcy5wdXNoKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSkucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl93b3JrICgpIHtcbiAgICAgICAgd29yayA9IHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICsgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1vZHVsZS53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1vZHVsZS5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5pc28gPSBpc287XG5cbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbiA9IGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdmaWx0ZXInKVxuICAgICAgICAgICAgLmRhdGEocmlzZF9wcm9ncmFtcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmaWx0ZXInKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3JhbSA9IGQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyYW0gPT09ICdBbGwnKSBwcm9ncmFtID0gJyc7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGZvcm1hdF9wcm9ncmFtKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbixcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIGlzbztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wMWInLCB0cnVlKTtcblxuICAgICAgICBncmlkX3NlbGVjdGlvbiA9IGQzLnNlbGVjdCgnLmdyaWQnKTtcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb24uc2VsZWN0KCcud29yaycpO1xuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0KCcuZmlsdGVycycpO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZW5kZXJfd29yaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0X2FuZF9yZW5kZXJfd29yaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X2FuZF9yZW5kZXJfd29yayAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuICAgICAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUnOiBtZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKS5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICB3b3JrID0gd29ya19jb250YWluZXJfc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgKyBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLndpZHRoLzIgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUuaGVpZ2h0LzIgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGd1dHRlcjogMjBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcblxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uID0gZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2ZpbHRlcicpXG4gICAgICAgICAgICAuZGF0YShyaXNkX3Byb2dyYW1zKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZpbHRlcicpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmFtID0gZDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3JhbSA9PT0gJ0FsbCcpIHByb2dyYW0gPSAnJztcbiAgICAgICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoZm9ybWF0X3Byb2dyYW0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJyAgICA8ZGl2IGNsYXNzPVwid29ya1wiPjwvZGl2PicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrXzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhLFxuICAgICAgICBncmlkX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX3NlbGVjdGlvbjtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wMicsIHRydWUpO1xuXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZ3JpZCcpO1xuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvbi5zZWxlY3QoJy53b3JrJyk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJlbmRlcl93b3JrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRfYW5kX3JlbmRlcl93b3JrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfYW5kX3JlbmRlcl93b3JrICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG4gICAgICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmlzZF9kZXBhcnRtZW50JzogZC5yaXNkX2RlcGFydG1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZSc6IG1kXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShmb3JtYXR0ZWRfd29yaykucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl93b3JrICgpIHtcbiAgICAgICAgd29yayA9IHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQubW9kdWxlLndpZHRoID4gZC5tb2R1bGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzEwMHB4JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKGQubW9kdWxlLmhlaWdodC9kLm1vZHVsZS53aWR0aCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQubW9kdWxlLmhlaWdodCA+IGQubW9kdWxlLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzEwMHB4JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKGQubW9kdWxlLndpZHRoL2QubW9kdWxlLmhlaWdodCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1pbWFnZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCcgKyBkLm1vZHVsZS5zcmMgKyAnKSc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGd1dHRlcjogMjBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbixcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIGlzbztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wMycsIHRydWUpO1xuXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZ3JpZCcpO1xuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvbi5zZWxlY3QoJy53b3JrJyk7XG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3QoJy5maWx0ZXJzJyk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJlbmRlcl93b3JrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRfYW5kX3JlbmRlcl93b3JrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfYW5kX3JlbmRlcl93b3JrICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG4gICAgICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZSc6IG1kXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyaXNkX3Byb2dyYW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfd29yayAoKSB7XG4gICAgICAgIHdvcmsgPSB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24uc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5tb2R1bGUud2lkdGggPiBkLm1vZHVsZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnMTAwcHgnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoZC5tb2R1bGUuaGVpZ2h0L2QubW9kdWxlLndpZHRoKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDApICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5tb2R1bGUuaGVpZ2h0ID4gZC5tb2R1bGUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnMTAwcHgnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoZC5tb2R1bGUud2lkdGgvZC5tb2R1bGUuaGVpZ2h0KSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDApICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWltYWdlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoJyArIGQubW9kdWxlLnNyYyArICcpJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5pc28gPSBpc287XG5cbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbiA9IGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdmaWx0ZXInKVxuICAgICAgICAgICAgLmRhdGEocmlzZF9wcm9ncmFtcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmaWx0ZXInKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3JhbSA9IGQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyYW0gPT09ICdBbGwnKSBwcm9ncmFtID0gJyc7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGZvcm1hdF9wcm9ncmFtKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbixcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIGlzbztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wNCcsIHRydWUpO1xuXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZ3JpZCcpO1xuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvbi5zZWxlY3QoJy53b3JrJyk7XG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3QoJy5maWx0ZXJzJyk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJlbmRlcl93b3JrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRfYW5kX3JlbmRlcl93b3JrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfYW5kX3JlbmRlcl93b3JrICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuXG4gICAgICAgICAgICB2YXIgY292ZXJfb3B0aW9ucyA9IFsnMjAyJywgJzQwNCddO1xuICAgICAgICAgICAgdmFyIGNvdmVyX2RpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICAgICAgJ2NvdmVyMTE1Jzoge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTE1LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDkwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY292ZXIyMDInOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTU4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY292ZXIyMzAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMzAsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY292ZXI0MDQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDQsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzE2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG4gICAgICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciByYW5kb21fY292ZXJfb3B0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgY292ZXJfb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY292ZXJfb3B0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICAgICAgICAgIHZhciByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjb3Zlcl9kaW1lbnNpb25zW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25dLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvdmVyX2RpbWVuc2lvbnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3ZlcicrcmFuZG9tX2NvdmVyX29wdGlvbl0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBzcmM6IGQuY292ZXJzW3JhbmRvbV9jb3Zlcl9vcHRpb25dLFxuICAgICAgICAgICAgICAgICAgICBjbHNzOiAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgICAgICAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXMuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSkucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl93b3JrICgpIHtcbiAgICAgICAgd29yayA9IHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKSArICcgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLmNsc3M7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoOiAyMDIsXG4gICAgICAgICAgICAgICAgICAgIGd1dHRlcjogMjBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcblxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uID0gZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2ZpbHRlcicpXG4gICAgICAgICAgICAuZGF0YShyaXNkX3Byb2dyYW1zKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZpbHRlcicpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmFtID0gZDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3JhbSA9PT0gJ0FsbCcpIHByb2dyYW0gPSAnJztcbiAgICAgICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoZm9ybWF0X3Byb2dyYW0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
