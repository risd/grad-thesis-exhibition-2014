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
var Departments = require('../departments');

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

    var departments = Departments();

    window_sel.on('resize', function () {
        logo_svg
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight);

        update_logo_line();
    });

    self.render = function () {
        // put the dom in
        var body = d3.select('body')
            .classed('concept_04 concept_04a', true)
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
                'src/concept_04a/grid.html', function (html) {

            grid_sel.node().appendChild(html.cloneNode(true));
            departments
                .wrapper(d3.select('.departments'))
                .render();
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
},{"../departments":14}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
var prototypes = {
    concept: {
        '00': Concept_00,
        '01': Concept_01,
        '01a': Concept_01a,
        '02': Concept_02,
        '03': Concept_03,
        '04': Concept_04,
        '04a': Concept_04a
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
},{"./concept_00/index.js":2,"./concept_01/index.js":5,"./concept_01a/index.js":7,"./concept_02/index.js":9,"./concept_03/index.js":11,"./concept_04/index.js":12,"./concept_04a/index.js":13,"./work_01/index.js":17,"./work_01a/index.js":19,"./work_01b/index.js":21,"./work_02/index.js":23,"./work_03/index.js":25,"./work_04/index.js":27}],16:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <div class="filters"></div>' +
'    <div class="work"></div>' +
'</div>';
},{}],17:[function(require,module,exports){
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
},{"./html":16}],18:[function(require,module,exports){
module.exports=require(16)
},{}],19:[function(require,module,exports){
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
},{"./html":18}],20:[function(require,module,exports){
module.exports=require(16)
},{}],21:[function(require,module,exports){
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
},{"./html":20}],22:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <div class="work"></div>' +
'</div>';
},{}],23:[function(require,module,exports){
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
},{"./html":22}],24:[function(require,module,exports){
module.exports=require(16)
},{}],25:[function(require,module,exports){
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
},{"./html":24}],26:[function(require,module,exports){
module.exports=require(16)
},{}],27:[function(require,module,exports){
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
},{"./html":26}]},{},[15])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAwL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvbWFwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDEvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAxL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDFhL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDIvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvY29uY2VwdF8wMy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzA0L2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDRhL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2RlcGFydG1lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmtfMDEvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmtfMDFhL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmtfMDFiL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmtfMDIvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAyL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmtfMDMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29ya18wNC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9XG4nPGRpdiBjbGFzcz1cImdyaWRcIj4nICtcbicgICAgPHNlY3Rpb24gaWQ9XCJhYm91dFwiIGNsYXNzPVwiYWJvdXRcIj4nICtcbicgICAgICAgIDxoZ3JvdXAgY2xhc3M9XCJ0aXRsZVwiPicgK1xuJyAgICAgICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmcgc2Nob29sXCI+UklTRDwvaDE+JyArXG4nICAgICAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZyBldmVudFwiPkdyYWQgU2hvdzwvaDE+JyArXG4nICAgICAgICA8L2hncm91cD4nICtcbicgICAgICAgIDxoZ3JvdXAgY2xhc3M9XCJzdWJ0aXRsZVwiPicgK1xuJyAgICAgICAgICAgIDxoMyBjbGFzcz1cImhlYWRpbmcgc2Nob29sXCI+UmhvZGUgSXNsYW5kIFNjaG9vbCBvZiBEZXNpZ248L2gzPicgK1xuJyAgICAgICAgICAgIDxoMyBjbGFzcz1cImhlYWRpbmcgZXZlbnRcIj5HcmFkdWF0ZSBUaGVzaXMgRXhoaWJpdGlvbjwvaDM+JyArXG4nICAgICAgICA8L2hncm91cD4nICtcbicgICAgICAgIDxwPkRhLiB6IHNob3cuPC9wPicgK1xuJyAgICA8L3NlY3Rpb24+JyArXG4nICAgIDxzZWN0aW9uIGlkPVwid2hlcmVcIiBjbGFzcz1cIndoZXJlXCI+JyArXG4nICAgICAgICA8ZGl2IGNsYXNzPVwibWFwXCI+JyArXG4nICAgICAgICAgICAgPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCI1MDBweFwiJyArXG4nICAgICAgICAgICAgICAgICBoZWlnaHQ9XCI0MDcuMDIzcHhcIiB2aWV3Qm94PVwiMCAwIDUwMCA0MDcuMDIzXCIgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDUwMCA0MDcuMDIzXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4nICtcbicgICAgICAgICAgICA8ZGVmcz4nICtcbicgICAgICAgICAgICAgICAgPG1hcmtlciBpZD1cIm1hcmtlci1wb2lcIiBjbGFzcz1cIm1hcmtlci1wb2lcIiAgdmlld0JveD1cIjAgMCA1MCA1MFwiIG1hcmtlcldpZHRoPVwiNTBcIiBtYXJrZXJIZWlnaHQ9XCI1MFwiIG1hcmtlclVuaXRzPVwidXNlclNwYWNlb25Vc2VcIiByZWZYPVwiMjVcIiByZWZZPVwiMjVcIj4nICtcbicgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIHBvaW50cz1cIjMxLjMzOCwxNi44MjggNDUuNjU3LDExLjM4IDUwLDI0LjQ1NSAzNS40NDYsMjkuMTc2IDQ1LjQyMyw0MS4yODMgMzQuMzksNTAgMjUsMzcuMDQ1IDE1LjYxMSw1MCA0LjU3OCw0MS4yODMgJyArXG4nICAgICAgICAgICAgICAgICAgICAgICAgMTQuNTU0LDI5LjE3NiAwLDI0LjQ1NSA0LjM0MywxMS4zOCAxOC42NjIsMTYuODI4IDE4LjMxLDAgMzEuNjkxLDAgXCIvPicgK1xuJyAgICAgICAgICAgICAgICA8L21hcmtlcj4nICtcbicgICAgICAgICAgICA8L2RlZnM+JyArXG4nICAgICAgICAgICAgPGcgY2xhc3M9XCJzdHJlZXRzXCI+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMCw4MS40MDRjMCwwLDUxLjMzNCwyLjg0LDY4LjM3Miw4LjA0NnM2Mi45NDcsMTUuMTQ2LDYyLjk0NywxNS4xNDYnICtcbicgICAgICAgICAgICAgICAgICAgIHM1MS4xMTUsOC41Miw3OS41MTItMC45NDdjMjguMzk3LTkuNDY1LDEyOS42OC01NC45MDIsMTI5LjY4LTU0LjkwMnMzOS43NTYtOC41Miw2OC42MjYsNy41NzJsNTMuMDA4LDUxLjExNScgK1xuJyAgICAgICAgICAgICAgICAgICAgYzAsMCwxNi41NjYsMjguODcsMjEuMjk5LDQyLjU5NmM0LjczMiwxMy43MjUsMTEuODMyLDI0LjM4OSwxMi43NzgsNDEuMDY0czAsNTEuNjk5LDAsNTEuNjk5UzUwMCwyNzQuNTAyLDUwMCwyODIuMDc0JyArXG4nICAgICAgICAgICAgICAgICAgICBzLTQuNzI1LDM2LjQ0My01LjE5OCw0Ny4zMjhjLTAuNDc0LDEwLjg4Ny0xLjQyLDQ4LjI3NS0xLjQyLDQ4LjI3NXMzLjMxMywyMy42NjgsMy4zMTMsMjkuMzQ2XCIvPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEwNy4xODIsMEw0MS44NjksMjM5LjQ4YzAsMC0yMC4zNTIsNjYuNzM0LTUuNjgsMTE0LjUzNScgK1xuJyAgICAgICAgICAgICAgICAgICAgYzE0LjY3Miw0Ny44MDMsMjEuNzcxLDUzLjAwOCwyMS43NzEsNTMuMDA4XCIvPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMxLjA3MiwzMDQuNzY0bDU5LjI2MS0yNS4zMzZsNTAuNjY3LTI4bDcwLjY2Ny04NC4wMDFjMCwwLDQuNjY3LTEwLjY2NywyNy4zMzMtMjInICtcbicgICAgICAgICAgICAgICAgICAgIHM2My4zMzMtMjgsNjMuMzMzLTI4bDY1LjMzMy0zMS4zMzNsMzQuMzU2LTMzLjE4MlwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0yMjEuNjY3LDBjMCwwLTMuMzMzLDQxLjQyNi01LjExOSw1OC4wOTNzMy43ODYsMzUuMzMzLDMuNzg2LDM1LjMzM3MxLjMzMywxMi42NjcsMTguNjY3LDQwJyArXG4nICAgICAgICAgICAgICAgICAgICBjMTcuMzMzLDI3LjMzNCwzLjMzMywzNy4zMzQsMy4zMzMsMzcuMzM0bC0yMiwyMi41ODRMMTk5LDIyMy40MjZjMCwwLTI2LjY2NywzOS4zMzQtMjkuMzMzLDQyLjY2OHMtMTUuMzMzLDE0LTI5LjMzMyw2LjY2NicgK1xuJyAgICAgICAgICAgICAgICAgICAgcy0yMiwwLTIyLDBzLTcuMzMzLDQtMjIuNjY3LDEwLjY2NmMtMTUuMzMzLDYuNjY4LTM5Ljc4MSwxMC43MjktMzkuNzgxLDEwLjcyOVwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk02Ny43MDIsMTQ0Ljc1OGwxNi4xNDcsNi43MjRjMCwwLDE0Ljc5Nyw0LjMzNywzMC44NywyLjA5M2w3Ni4wMjYtMS41ODJsMjUuODAyLDEuNTgyJyArXG4nICAgICAgICAgICAgICAgICAgICBsMjQuNzEyLTEuMzI4YzAsMCw0LjQ1NC0wLjAzMyw4Ljc0LTIuNzU4YzEuNjAzLTEuMDE4LDMuNzYxLDAuMjA3LDcuODQzLDEuNzM4bDEzLjAxMSwyLjk5MmwzMS4zODEsOC4yMzInICtcbicgICAgICAgICAgICAgICAgICAgIGMwLDAsMTMuMjY2LDEuMjc2LDIwLjkyLDEwLjk3MXMzMS4zODEsMzIuMTQ1LDMxLjM4MSwzMi4xNDVsMzguNTIyLDQwLjU2NGwzMy4xNjYsMzMuNjc4bDI1LjI1NywyMi43MDVsMjUuNzY4LDIyLjk2MScgK1xuJyAgICAgICAgICAgICAgICAgICAgbDE3LjE0NywxNS41NjRcIi8+JyArXG4nICAgICAgICAgICAgPC9nPicgK1xuJyAgICAgICAgICAgIDxnIGNsYXNzPVwicG9pXCI+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTk0Ljk2LDE2Ny44OTVcIi8+JyArXG4nICAgICAgICAgICAgPC9nPicgK1xuJyAgICAgICAgICAgIDwvc3ZnPicgK1xuJyAgICAgICAgPC9kaXY+JyArXG4nICAgICAgICA8ZGl2IGNsYXNzPVwibG9jYXRpb24td3JpdHRlblwiPicgK1xuJyAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidWlsZGluZ1wiPicgK1xuJyAgICAgICAgICAgICAgICA8cD5SSSBDb252ZW50aW9uIENlbnRlcjwvcD4nICtcbicgICAgICAgICAgICAgICAgPHA+RXhoaWJpdCBIYWxsIEE8L3A+JyArXG4nICAgICAgICAgICAgICAgIDxwPk9uZSBTYWJpbiBTdHJlZXQsIFByb3ZpZGVuY2U8L3A+JyArXG4nICAgICAgICAgICAgPC9kaXY+JyArXG4nICAgICAgICA8L2Rpdj4nICtcbicgICAgPC9zZWN0aW9uPicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKSxcbiAgICBTVkdNYXAgPSByZXF1aXJlKCcuL21hcCcpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7XG4gICAgICAgIG1hcDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIC8vIGxvYWQgdGhlIG1hcFxuICAgICAgICBzZWxmLm1hcCA9IFNWR01hcC5wYXRocyhkMy5zZWxlY3RBbGwoJy5zdHJlZXRzIHBhdGgnKSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNYXAgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIG1hcCxcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uLFxuICAgICAgICBzdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgc2VsZi5wYXRocyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHBhdGhzX3NlbGVjdGlvbjtcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhdGUgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzdGF0ZTtcbiAgICAgICAgc3RhdGUgPSB4O1xuICAgICAgICBhcHBseV9zdGF0ZSgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwbHlfc3RhdGUgKCkge1xuICAgICAgICB2YXIgdHdlZW5fZGFzaHMgPSB7XG4gICAgICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBwYXRoc19zZWxlY3Rpb25cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLCB0d2Vlbl9kYXNoc1tzdGF0ZV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfaGlkZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcobCArIFwiLFwiICsgbCwgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvdygpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLFwiICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCctLS0tLS0nKTtcbiAgICBjb25zb2xlLmxvZygnVG9nZ2xlIG1hcCBzdGF0ZTonKTtcbiAgICBjb25zb2xlLmxvZygnZXhoaWJpdGlvbi5tYXAuc3RhdGUoXCJoaWRkZW5cIiknKTtcbiAgICBjb25zb2xlLmxvZygnZXhoaWJpdGlvbi5tYXAuc3RhdGUoXCJzaG93aW5nXCIpJyk7XG4gICAgY29uc29sZS5sb2coJy0tLS0tLScpO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzdmcsXG4gICAgICAgIHBhdGhzLFxuICAgICAgICBwb2lzID0ge30sXG4gICAgICAgIG5hbWVkX3BhdGhzID0ge30sXG4gICAgICAgIG5hbWVkX3RleHQgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuXG4gICAgd2luZG93X3NlbC5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9pX2Jib3ggPSBwb2lzWydjb252ZW50aW9uLWNlbnRlci1tYXJrZXInXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdmFyIHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93ID1cbiAgICAgICAgICAgIHBvaV9iYm94LnRvcCAtIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID09PSAnaGlkZGVuJykgJlxuICAgICAgICAgICAgKHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93IDwgMCkpIHtcblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhdGUgPT09ICdzaG93aW5nJykgJlxuICAgICAgICAgICAgICAgICAgIChwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA+IDApKSB7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FuaW1hdGVGaXJzdCcsICdhbmltYXRlU2Vjb25kJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlRmlyc3QnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlRmlyc3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDApXG4gICAgICAgICAgICAuZGVsYXkoMjcwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZVNlY29uZCcsXG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcblxuICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwKVxuICAgICAgICAgICAgLmRlbGF5KDI3MDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLFxuICAgICAgICAgICAgICAgICh0cmFuc2l0aW9uX3RvX3N0YXRlID09PSAnaGlkZGVuJykgPyAwIDogMSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDEvY29uY2VwdC0xLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmVfMV8gcGF0aCcpO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNsaW5lIHBhdGgnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5zdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10uc3RhdGUgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAnMCwnICtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VG90YWxMZW5ndGgoKSk7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAnMCwnICtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldFRvdGFsTGVuZ3RoKCkpO1xuXG5cbiAgICAgICAgICAgIHBvaXNbJ2NvbnZlbnRpb24tY2VudGVyLW1hcmtlciddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0KCcjZHJvcF9waW4gcGF0aCcpO1xuXG5cbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI2hvbWUgI3RleHRfMl8nKTtcbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXS5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjbWFwICN0ZXh0XzFfLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNsYW5kLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNzdHJlZXQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNtYXAgI2Ryb3BfcGluJyk7XG4gICAgICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlRmlyc3QoJ3Nob3dpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfaGlkZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcobCArIFwiLFwiICsgbCwgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvdygpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLFwiICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDFhICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzdmcsXG4gICAgICAgIHBhdGhzLFxuICAgICAgICBuYW1lZF9wYXRocyA9IHt9LFxuICAgICAgICBuYW1lZF90ZXh0ID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KTtcblxuICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgfTtcbiAgICBcbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FuaW1hdGVGaXJzdCcsICdhbmltYXRlU2Vjb25kJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlRmlyc3QnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlRmlyc3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF90ZXh0WydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDApXG4gICAgICAgICAgICAuZGVsYXkoMjcwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuICAgIH0pO1xuXG4gICAgd2luZG93X3NlbC5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3ZnX2Jib3ggPSBzdmcubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgcGF0aF9iYm94ID0gbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgICAgY3VycmVudF9sZW5ndGggPSAwO1xuXG4gICAgICAgIGlmIChzdmdfYmJveC50b3AgIDwgMCkge1xuICAgICAgICAgICAgY3VycmVudF9sZW5ndGggPVxuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgIC5zY2FsZSh3aW5kb3cuaW5uZXJIZWlnaHQgLSBwYXRoX2Jib3gudG9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICAgY3VycmVudF9sZW5ndGggKyAnLCcgK1xuICAgICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10udG90YWxfbGVuZ3RoKTtcblxuICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAoY3VycmVudF9sZW5ndGgvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG90YWxfbGVuZ3RoKSk7XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDEvY29uY2VwdC0xLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmVfMV8gcGF0aCcpO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNsaW5lIHBhdGgnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcGF0aCBpbiBuYW1lZF9wYXRocykge1xuICAgICAgICAgICAgICAgIHZhciBsID0gbmFtZWRfcGF0aHNbcGF0aF0ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgICAgICAgICBoID0gbmFtZWRfcGF0aHNbcGF0aF0ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1twYXRoXS5zdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbcGF0aF0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzAsJyArIGwgKTtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1twYXRoXS50b3RhbF9sZW5ndGggPSBsO1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW3BhdGhdLnNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgICAgICAgICAgLmRvbWFpbihbMCwgaF0pXG4gICAgICAgICAgICAgICAgICAgIC5yYW5nZShbMCwgbF0pXG4gICAgICAgICAgICAgICAgICAgIC5jbGFtcCh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmFtZWRfdGV4dFsnZmlyc3Qtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjaG9tZSAjdGV4dF8yXycpO1xuICAgICAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI21hcCAjdGV4dF8xXywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjZHJvcF9waW4nKTtcblxuICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI21hcCAjbGFuZCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNzdHJlZXQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB0ZXh0IGluIG5hbWVkX3RleHQpIHtcbiAgICAgICAgICAgICAgICBuYW1lZF90ZXh0W3RleHRdLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZUZpcnN0KCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzdmcsXG4gICAgICAgIHBhdGhzLFxuICAgICAgICBuYW1lZF9wYXRocyA9IHt9LFxuICAgICAgICBuYW1lZF90ZXh0ID0ge30sXG4gICAgICAgIGxvZ29zID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KTtcblxuICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgfTtcbiAgICB2YXIgdHdlZW5fZGFzaF9vcHBvc2l0ZSA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX3Nob3dfcmV2ZXJzZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX2hpZGVfcmV2ZXJzZVxuICAgIH07XG5cbiAgICB3aW5kb3dfc2VsLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFxuICAgIH0pO1xuICAgIFxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYW5pbWF0ZUZpcnN0JywgJ2FuaW1hdGVTZWNvbmQnKTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVGaXJzdCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVGaXJzdCcpO1xuICAgICAgICBcbiAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgICAgIC5kZWxheSgxNzAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgbG9nb3NbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDQwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0sIDMwMDApO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZVNlY29uZCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVTZWNvbmQnKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbicpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hfb3Bwb3NpdGVbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIGxvZ29zWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLW91dCcpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDQwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICBsb2dvc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW4nKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuXG4gICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDE4MDApXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDQwMDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtb3V0JylcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgIG5hbWVkX3RleHRbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxODAwKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWluJylcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG5cblxuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wMi9jb25jZXB0LTIuc3ZnJyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0cykge1xuXG4gICAgICAgICAgICB2YXIgc3ZnX2ZyYWdlbWVudCA9IGQzLnNlbGVjdCgnLmdyaWQnKS5ub2RlKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQocmVzdWx0cy5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICAgICAgICBzdmcgPSBkMy5zZWxlY3QoJy5ncmlkIHN2ZycpO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdmcuc2VsZWN0KCcjbGluZV8xXyBwYXRoJyk7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmUgcGF0aCcpO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICcwLCcgK1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICcwLCcgK1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VG90YWxMZW5ndGgoKSk7XG5cbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI2hvbWUgI3RleHRfMV8nKTtcbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXS5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG4gICAgICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjbWFwICN0ZXh0LCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNsYW5kLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNzdHJlZXQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNtYXAgI2Ryb3BfcGluJyk7XG4gICAgICAgICAgICBuYW1lZF90ZXh0WydzZWNvbmQtc2VjdGlvbiddLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgICAgIGxvZ29zWydmaXJzdC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJyNsb2dvIHRleHQnKTtcbiAgICAgICAgICAgIGxvZ29zWydzZWNvbmQtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjbG9nb18xXyB0ZXh0Jyk7XG5cbiAgICAgICAgICAgIGxvZ29zWydmaXJzdC1zZWN0aW9uJ10uc3R5bGUoJ29wYWNpdHknLCAwKTtcbiAgICAgICAgICAgIGxvZ29zWydzZWNvbmQtc2VjdGlvbiddLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZUZpcnN0KCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGVfcmV2ZXJzZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLDAsXCIgKyBsICsgXCIsXCIgKyBsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiMCxcIiArIGwgKyBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93X3JldmVyc2UoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwgKyBcIjAsXCIgKyBsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiMCwwLFwiICsgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHN2ZyxcbiAgICAgICAgcGF0aHMgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuICAgIHZhciB0d2Vlbl9kYXNoX29wcG9zaXRlID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfc2hvd19yZXZlcnNlLFxuICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfaGlkZV9yZXZlcnNlXG4gICAgfTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgfSk7XG4gICAgXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhbmltYXRlRmlyc3QnLCAnYW5pbWF0ZVNlY29uZCcpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZUZpcnN0JywgZnVuY3Rpb24gKHRyYW5zaXRpb25fdG9fc3RhdGUpIHtcbiAgICAgICAgXG4gICAgICAgIHBhdGhzLmxpbmUuZmlyc3RcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cbiAgICAgICAgcGF0aHMuaGlkZV9zaG93LmZpcnN0LmFsbFxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgICAgIC5kZWxheSgxNzAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgcGF0aHMubG9nby5maXJzdC5hbGxcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCxpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA0MDA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZVNlY29uZCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVTZWNvbmQnKTtcblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5vbignY2xpY2snLCBudWxsKTtcblxuICAgICAgICBwYXRocy5saW5lLmZpcnN0XG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ2QnLFxuICAgICAgICAgICAgICAgICAgICAgICBwYXRoVHdlZW4ocGF0aHMubGluZS5zZWNvbmQuYXR0cignZCcpKSwgNCk7XG5cblxuICAgICAgICBkZWxldGUgcGF0aHMubG9nby5maXJzdFsnYWxsJ107XG4gICAgICAgIGZvciAodmFyIGl0ZW0gaW4gcGF0aHMubG9nby5maXJzdCkge1xuICAgICAgICAgICAgcGF0aHMubG9nby5maXJzdFtpdGVtXVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgICAgICAuYXR0clR3ZWVuKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhzLmxvZ28uZmlyc3RbaXRlbV0uYXR0cigndHJhbnNmb3JtJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRocy5sb2dvLnNlY29uZFtpdGVtXS5hdHRyKCd0cmFuc2Zvcm0nKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wMi9jb25jZXB0LTIuc3ZnJyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0cykge1xuXG4gICAgICAgICAgICB2YXIgc3ZnX2ZyYWdlbWVudCA9IGQzLnNlbGVjdCgnLmdyaWQnKS5ub2RlKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQocmVzdWx0cy5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICAgICAgICBzdmcgPSBkMy5zZWxlY3QoJy5ncmlkIHN2ZycpO1xuXG4gICAgICAgICAgICBwYXRocy5sb2dvID0ge1xuICAgICAgICAgICAgICAgIGZpcnN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHJpc2Q6IHN2Zy5zZWxlY3QoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDEpJyksXG4gICAgICAgICAgICAgICAgICAgIGdyYWQ6IHN2Zy5zZWxlY3QoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDIpJyksXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHN2Zy5zZWxlY3QoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDMpJyksXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IHN2Zy5zZWxlY3QoJyNob21lICNsb2dvICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDQpJyksXG4gICAgICAgICAgICAgICAgICAgIGFsbDogc3ZnLnNlbGVjdEFsbCgnI2hvbWUgI2xvZ28gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMSksJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2hvbWUgI2xvZ28gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMiksJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2hvbWUgI2xvZ28gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMyksJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2hvbWUgI2xvZ28gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCg0KScpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgcmlzZDogc3ZnLnNlbGVjdCgnI21hcCAjbG9nb18xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCgxKScpLFxuICAgICAgICAgICAgICAgICAgICBncmFkOiBzdmcuc2VsZWN0KCcjbWFwICNsb2dvXzFfICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQ6bnRoLWNoaWxkKDIpJyksXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHN2Zy5zZWxlY3QoJyNtYXAgI2xvZ29fMV8gJytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGV4dDpudGgtY2hpbGQoMyknKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogc3ZnLnNlbGVjdCgnI21hcCAjbG9nb18xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0ZXh0Om50aC1jaGlsZCg0KScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIgc2VjdGlvbiBpbiBwYXRocy5sb2dvKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBpbiBwYXRocy5sb2dvW3NlY3Rpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmxvZ29bc2VjdGlvbl1baXRlbV1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIHBhdGhzLmxpbmUgPSB7XG4gICAgICAgICAgICAgICAgZmlyc3Q6IHN2Zy5zZWxlY3QoJyNsaW5lXzFfIHBhdGgnKSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IHN2Zy5zZWxlY3QoJyNsaW5lIHBhdGgnKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIgY3VyIGluIHBhdGhzLmxpbmUpIHtcbiAgICAgICAgICAgICAgICBwYXRocy5saW5lW2N1cl0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgICAgICcwLCcrXG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmxpbmVbY3VyXS5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpKTtcblxuICAgICAgICAgICAgICAgIHBhdGhzLmxpbmVbY3VyXS5zdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgcGF0aHMuaGlkZV9zaG93ID0ge1xuICAgICAgICAgICAgICAgIGZpcnN0OiB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmhlYWQ6IHN2Zy5zZWxlY3QoJyNob21lICN0ZXh0XzFfICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdnOm50aC1jaGlsZCgxKSB0ZXh0JyksXG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IHN2Zy5zZWxlY3QoJyNob21lICN0ZXh0XzFfICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJz4gKjpudGgtY2hpbGQoNiknKSxcbiAgICAgICAgICAgICAgICAgICAgYWxsOiBzdmcuc2VsZWN0QWxsKCcjaG9tZSAjdGV4dF8xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc+ICo6bnRoLWNoaWxkKDYpLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjaG9tZSAjdGV4dF8xXyAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZzpudGgtY2hpbGQoMSkgdGV4dCcpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbG9jX2RhdGU6IHN2Zy5zZWxlY3QoJyN0ZXh0ID4gKjpudGgtY2hpbGQoNiknKSxcbiAgICAgICAgICAgICAgICAgICAgYWxsOiBzdmcuc2VsZWN0KCcjdGV4dCA+ICo6bnRoLWNoaWxkKDYpJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwYXRocy5oaWRlX3Nob3cuZmlyc3QuYWxsLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICBwYXRocy5oaWRlX3Nob3cuc2Vjb25kLmFsbC5zdHlsZSgnb3BhY2l0eScsIDApO1xuXG5cblxuICAgICAgICAgICAgcGF0aHMubWFwID0ge1xuICAgICAgICAgICAgICAgIGRyb3BfcGluOiBzdmcuc2VsZWN0KCcjZHJvcF9waW4nKSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBzdmcuc2VsZWN0QWxsKCcjdGV4dCA+ICo6bnRoLWNoaWxkKDIpLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyN0ZXh0ID4gKjpudGgtY2hpbGQoNCknKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGF0aHMubWFwLmRyb3BfcGluLmF0dHIoJ3RyYW5zZm9ybScsICdzY2FsZSgwKScpO1xuICAgICAgICAgICAgcGF0aHMubWFwLnRleHQuc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlX3JldmVyc2UoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCwwLFwiICsgbCArIFwiLFwiICsgbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjAsXCIgKyBsICsgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvd19yZXZlcnNlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsICsgXCIwLFwiICsgbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjAsMCxcIiArIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXRoVHdlZW4oZDEsIHByZWNpc2lvbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGF0aDAgPSB0aGlzLFxuICAgICAgICAgICAgcGF0aDEgPSBwYXRoMC5jbG9uZU5vZGUoKSxcbiAgICAgICAgICAgIG4wID0gcGF0aDAuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIG4xID0gKHBhdGgxLnNldEF0dHJpYnV0ZShcImRcIiwgZDEpLCBwYXRoMSkuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgXG4gICAgICAgIC8vIFVuaWZvcm0gc2FtcGxpbmcgb2YgZGlzdGFuY2UgYmFzZWQgb24gc3BlY2lmaWVkIHByZWNpc2lvbi5cbiAgICAgICAgdmFyIGRpc3RhbmNlcyA9IFswXSwgaSA9IDAsIGR0ID0gcHJlY2lzaW9uIC8gTWF0aC5tYXgobjAsIG4xKTtcbiAgICAgICAgd2hpbGUgKChpICs9IGR0KSA8IDEpIGRpc3RhbmNlcy5wdXNoKGkpO1xuICAgICAgICBkaXN0YW5jZXMucHVzaCgxKTtcbiAgICAgXG4gICAgICAgIC8vIENvbXB1dGUgcG9pbnQtaW50ZXJwb2xhdG9ycyBhdCBlYWNoIGRpc3RhbmNlLlxuICAgICAgICB2YXIgcG9pbnRzID0gZGlzdGFuY2VzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgdmFyIHAwID0gcGF0aDAuZ2V0UG9pbnRBdExlbmd0aCh0ICogbjApLFxuICAgICAgICAgICAgICBwMSA9IHBhdGgxLmdldFBvaW50QXRMZW5ndGgodCAqIG4xKTtcbiAgICAgICAgICByZXR1cm4gZDMuaW50ZXJwb2xhdGUoW3AwLngsIHAwLnldLCBbcDEueCwgcDEueV0pO1xuICAgICAgICB9KTtcbiAgICAgXG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICAgICAgcmV0dXJuIHQgPCAxID8gXCJNXCIgKyBwb2ludHMubWFwKGZ1bmN0aW9uKHApIHsgcmV0dXJuIHAodCk7IH0pLmpvaW4oXCJMXCIpIDogZDE7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDQgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgZ3JpZF9zZWwsXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zZWwsXG4gICAgICAgIGxvZ29fY29tcG9uZW50cyA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnUklTRCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tcmlzZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGV4dDogJ0dyYWQnLFxuICAgICAgICAgICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWdyYWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRleHQ6ICdTaG93JyxcbiAgICAgICAgICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1zaG93J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZXh0OiAnMjAxNCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tMjAxNCdcbiAgICAgICAgfV0sXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX2xpbmUsXG4gICAgICAgIGxpbmUgPSBkMy5zdmcubGluZSgpO1xuXG4gICAgd2luZG93X3NlbC5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICB1cGRhdGVfbG9nb19saW5lKCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2NvbmNlcHRfMDQnLCB0cnVlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG5cbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGxvZ29fc2VsID0gbG9nb19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnbG9nby1jb21wb25lbnQnKVxuICAgICAgICAgICAgLmRhdGEobG9nb19jb21wb25lbnRzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnbG9nby1jb21wb25lbnQgJyArIGQuY2xzO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQudGV4dDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxvZ29fc3ZnID0gbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLXN2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgbG9nb19saW5lID0gbG9nb19zdmcuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgICAgICAgIC5kYXRhKFtsb2dvX3ZlcnRpY2llcygpXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lJylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGxpbmUpO1xuXG4gICAgICAgIGdyaWRfc2VsID0gYm9keVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cblxuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdzcmMvY29uY2VwdF8wNC9ncmlkLmh0bWwnLCBmdW5jdGlvbiAoaHRtbCkge1xuXG4gICAgICAgICAgICBncmlkX3NlbC5ub2RlKCkuYXBwZW5kQ2hpbGQoaHRtbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB2ZXJ0aWNpZXMgPSBbbG9nb192ZXJ0aWNpZXMoKV07XG4gICAgICAgIGxvZ29fbGluZS5kYXRhKHZlcnRpY2llcyk7XG4gICAgICAgIGxvZ29fbGluZS5hdHRyKCdkJywgbGluZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb192ZXJ0aWNpZXMgKCkge1xuICAgICAgICB2YXIgbG9nb19saW5lX3ZlcnRpY2llcyA9IFtdO1xuICAgICAgICBsb2dvX3NlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0IC0gMTAsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgIFtib3VuZHMucmlnaHQgKyAxMCxcbiAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsb2dvX2xpbmVfdmVydGljaWVzO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgRGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDQgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgZ3JpZF9zZWwsXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zZWwsXG4gICAgICAgIGxvZ29fY29tcG9uZW50cyA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnUklTRCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tcmlzZCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdGV4dDogJ0dyYWQnLFxuICAgICAgICAgICAgY2xzOiAnbG9nby1jb21wb25lbnQtLWdyYWQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRleHQ6ICdTaG93JyxcbiAgICAgICAgICAgIGNsczogJ2xvZ28tY29tcG9uZW50LS1zaG93J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0ZXh0OiAnMjAxNCcsXG4gICAgICAgICAgICBjbHM6ICdsb2dvLWNvbXBvbmVudC0tMjAxNCdcbiAgICAgICAgfV0sXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX2xpbmUsXG4gICAgICAgIGxpbmUgPSBkMy5zdmcubGluZSgpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gRGVwYXJ0bWVudHMoKTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgdXBkYXRlX2xvZ29fbGluZSgpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIHZhciBib2R5ID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjb25jZXB0XzA0IGNvbmNlcHRfMDRhJywgdHJ1ZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1jb250YWluZXInKTtcblxuICAgICAgICBsb2dvX3NlbCA9IGxvZ29fY29udGFpbmVyX3NlbC5zZWxlY3RBbGwoJ2xvZ28tY29tcG9uZW50JylcbiAgICAgICAgICAgIC5kYXRhKGxvZ29fY29tcG9uZW50cylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xvZ28tY29tcG9uZW50ICcgKyBkLmNscztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnRleHQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIGxvZ29fbGluZSA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAgICAgICAuZGF0YShbbG9nb192ZXJ0aWNpZXMoKV0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tbGluZScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKTtcblxuICAgICAgICBncmlkX3NlbCA9IGJvZHlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG5cblxuICAgICAgICBkMy5odG1sKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnc3JjL2NvbmNlcHRfMDRhL2dyaWQuaHRtbCcsIGZ1bmN0aW9uIChodG1sKSB7XG5cbiAgICAgICAgICAgIGdyaWRfc2VsLm5vZGUoKS5hcHBlbmRDaGlsZChodG1sLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgICBkZXBhcnRtZW50c1xuICAgICAgICAgICAgICAgIC53cmFwcGVyKGQzLnNlbGVjdCgnLmRlcGFydG1lbnRzJykpXG4gICAgICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB2ZXJ0aWNpZXMgPSBbbG9nb192ZXJ0aWNpZXMoKV07XG4gICAgICAgIGxvZ29fbGluZS5kYXRhKHZlcnRpY2llcyk7XG4gICAgICAgIGxvZ29fbGluZS5hdHRyKCdkJywgbGluZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb192ZXJ0aWNpZXMgKCkge1xuICAgICAgICB2YXIgbG9nb19saW5lX3ZlcnRpY2llcyA9IFtdO1xuICAgICAgICBsb2dvX3NlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ29fbGluZV92ZXJ0aWNpZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW2JvdW5kcy5sZWZ0IC0gMTAsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigyLzMpKSldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9nb19saW5lX3ZlcnRpY2llcy5wdXNoKFxuICAgICAgICAgICAgICAgIFtib3VuZHMucmlnaHQgKyAxMCxcbiAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMi8zKSkpXSk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsb2dvX2xpbmVfdmVydGljaWVzO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3cmFwcGVyLFxuICAgICAgICBjbHMgPSAnZGVwYXJ0bWVudCc7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBbXG4gICAgICAgICdBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnQ2VyYW1pY3MnLFxuICAgICAgICAnRGlnaXRhbCArIE1lZGlhJyxcbiAgICAgICAgJ0Z1cm5pdHVyZSBEZXNpZ24nLFxuICAgICAgICAnR2xhc3MnLFxuICAgICAgICAnR3JhcGhpYyBEZXNpZ24nLFxuICAgICAgICAnSW5kdXN0cmlhbCBEZXNpZ24nLFxuICAgICAgICAnSW50ZXJpb3IgQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0pld2VscnkgKyBNZXRhbHNtaXRoaW5nJyxcbiAgICAgICAgJ0xhbmRzY2FwZSBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnUGFpbnRpbmcnLFxuICAgICAgICAnUGhvdG9ncmFwaHknLFxuICAgICAgICAnUHJpbnRtYWtpbmcnLFxuICAgICAgICAnU2N1bHB0dXJlJyxcbiAgICAgICAgJ1RleHRpbGVzJ1xuICAgIF07XG5cbiAgICBzZWxmLndyYXBwZXIgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB3cmFwcGVyO1xuICAgICAgICB3cmFwcGVyID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICBzZWxmLmRlcGFydG1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiZGVwYXJ0bWVudHMgaXMgYSBnZXR0ZXJcIjtcbiAgICAgICAgcmV0dXJuIGRlcGFydG1lbnRzO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF3cmFwcGVyKSB0aHJvdyBcInJlcXVpcmVzIGEgd3JhcHBlclwiO1xuXG4gICAgICAgIHdyYXBwZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY2xzKVxuICAgICAgICAgICAgLmRhdGEoZGVwYXJ0bWVudHMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBwcm90b3R5cGVzID0ge1xuICAgIGNvbmNlcHQ6IHtcbiAgICAgICAgJzAwJzogQ29uY2VwdF8wMCxcbiAgICAgICAgJzAxJzogQ29uY2VwdF8wMSxcbiAgICAgICAgJzAxYSc6IENvbmNlcHRfMDFhLFxuICAgICAgICAnMDInOiBDb25jZXB0XzAyLFxuICAgICAgICAnMDMnOiBDb25jZXB0XzAzLFxuICAgICAgICAnMDQnOiBDb25jZXB0XzA0LFxuICAgICAgICAnMDRhJzogQ29uY2VwdF8wNGFcbiAgICB9LFxuICAgIHdvcms6IHtcbiAgICAgICAgJzAxJzogV29ya18wMSxcbiAgICAgICAgJzAxYSc6IFdvcmtfMDFhLFxuICAgICAgICAnMDFiJzogV29ya18wMWIsXG4gICAgICAgICcwMic6IFdvcmtfMDIsXG4gICAgICAgICcwMyc6IFdvcmtfMDMsXG4gICAgICAgICcwNCc6IFdvcmtfMDRcbiAgICB9LFxuICAgIGluZGV4OiB7XG4gICAgICAgICcwMCc6IGZ1bmN0aW9uICgpIHt9XG4gICAgfVxufTtcblxudmFyIHByb3RvdHlwZV90b19sb2FkID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFzaF92YXJzID0gWydpbmRleCcsICcwMCddO1xuXG4gICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcblxuICAgIGlmIChoYXNoKSB7XG4gICAgICAgIGhhc2hfdmFycyA9IGhhc2guc3BsaXQoJyMnKVsxXS5zcGxpdCgnJicpWzBdLnNwbGl0KCc9Jyk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIFsnd29yaycsICcwMSddXG4gICAgcmV0dXJuIGhhc2hfdmFycztcbn0pKCk7XG5cbmV4aGliaXRpb24gPSBwcm90b3R5cGVzW3Byb3RvdHlwZV90b19sb2FkWzBdXVtwcm90b3R5cGVfdG9fbG9hZFsxXV0oKTtcblxud2luZG93LmV4aGliaXRpb24gPSBleGhpYml0aW9uO1xuXG5mdW5jdGlvbiBXb3JrXzAxICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wMS9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIHdvcms7XG59XG5mdW5jdGlvbiBXb3JrXzAxYSAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDFhL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gd29yaztcbn1cbmZ1bmN0aW9uIFdvcmtfMDFiICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wMWIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuZnVuY3Rpb24gV29ya18wMiAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuZnVuY3Rpb24gV29ya18wMyAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDMvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuZnVuY3Rpb24gV29ya18wNCAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDQvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiB3b3JrO1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzAwICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wMC9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAxL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMWEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAxYS9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDIgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAyL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMyAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDMvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzA0ICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNC9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDRhICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wNGEvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufSIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJyAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyc1wiPjwvZGl2PicgK1xuJyAgICA8ZGl2IGNsYXNzPVwid29ya1wiPjwvZGl2PicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrXzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhLFxuICAgICAgICBncmlkX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIGZpbHRlcl9zZWxlY3Rpb24sXG4gICAgICAgIHJpc2RfcHJvZ3JhbXMgPSBbJ0FsbCddLFxuICAgICAgICBpc287XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKTtcbiAgICAgICAgYm9keS5odG1sKGh0bWwpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ3dvcmtfMDEnLCB0cnVlKTtcblxuICAgICAgICBncmlkX3NlbGVjdGlvbiA9IGQzLnNlbGVjdCgnLmdyaWQnKTtcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb24uc2VsZWN0KCcud29yaycpO1xuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0KCcuZmlsdGVycycpO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZW5kZXJfd29yaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0X2FuZF9yZW5kZXJfd29yaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X2FuZF9yZW5kZXJfd29yayAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuICAgICAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUnOiBtZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKS5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICB3b3JrID0gd29ya19jb250YWluZXJfc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgKyBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLndpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLmhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUuc3JjO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgICAgICAgICAgZ3V0dGVyOiAyMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuaXNvID0gaXNvO1xuXG4gICAgICAgIGZpbHRlcl9zZWxlY3Rpb24gPSBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvblxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnZmlsdGVyJylcbiAgICAgICAgICAgIC5kYXRhKHJpc2RfcHJvZ3JhbXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZmlsdGVyJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2dyYW0gPSBkO1xuICAgICAgICAgICAgICAgIGlmIChwcm9ncmFtID09PSAnQWxsJykgcHJvZ3JhbSA9ICcnO1xuICAgICAgICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QoaXRlbUVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChmb3JtYXRfcHJvZ3JhbShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW0pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgICAgICBmb3IodmFyIGosIHgsIGkgPSBvLmxlbmd0aDtcbiAgICAgICAgICAgIGk7XG4gICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgICAgICB4ID0gb1stLWldLCBvW2ldID0gb1tqXSwgb1tqXSA9IHgpO1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRfcHJvZ3JhbShkKSB7XG4gICAgICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrXzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhLFxuICAgICAgICBncmlkX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIGZpbHRlcl9zZWxlY3Rpb24sXG4gICAgICAgIHJpc2RfcHJvZ3JhbXMgPSBbJ0FsbCddLFxuICAgICAgICBpc287XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKTtcbiAgICAgICAgYm9keS5odG1sKGh0bWwpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ3dvcmtfMDFhJywgdHJ1ZSk7XG5cbiAgICAgICAgZ3JpZF9zZWxlY3Rpb24gPSBkMy5zZWxlY3QoJy5ncmlkJyk7XG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uLnNlbGVjdCgnLndvcmsnKTtcbiAgICAgICAgZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvblxuICAgICAgICAgICAgLnNlbGVjdCgnLmZpbHRlcnMnKTtcblxuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldF9hbmRfcmVuZGVyX3dvcmsoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9hbmRfcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICBkMy5qc29uKFwiaHR0cDovL1wiICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaG9zdCArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lICtcbiAgICAgICAgICAgICAgICAnZGF0YS9wcm9qZWN0czIwMTQwNDA4Lmpzb24nLCBmdW5jdGlvbiAod29yaykge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnd29yaycpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cod29yayk7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkX3dvcmsgPSBbXTtcbiAgICAgICAgICAgIHdvcmsuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9kdWxlJzogbWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluZGV4T2YoZC5yaXNkX3Byb2dyYW0pIDwgMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlzZF9wcm9ncmFtcy5wdXNoKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSkucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl93b3JrICgpIHtcbiAgICAgICAgd29yayA9IHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICsgZm9ybWF0X3Byb2dyYW0oZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1vZHVsZS53aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1vZHVsZS5oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5pc28gPSBpc287XG5cbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbiA9IGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdmaWx0ZXInKVxuICAgICAgICAgICAgLmRhdGEocmlzZF9wcm9ncmFtcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmaWx0ZXInKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3JhbSA9IGQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyYW0gPT09ICdBbGwnKSBwcm9ncmFtID0gJyc7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGZvcm1hdF9wcm9ncmFtKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbixcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIGlzbztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wMWInLCB0cnVlKTtcblxuICAgICAgICBncmlkX3NlbGVjdGlvbiA9IGQzLnNlbGVjdCgnLmdyaWQnKTtcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb24uc2VsZWN0KCcud29yaycpO1xuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbiA9IGdyaWRfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0KCcuZmlsdGVycycpO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICByZW5kZXJfd29yaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0X2FuZF9yZW5kZXJfd29yaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X2FuZF9yZW5kZXJfd29yayAoKSB7XG4gICAgICAgIGQzLmpzb24oXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICdkYXRhL3Byb2plY3RzMjAxNDA0MDguanNvbicsIGZ1bmN0aW9uICh3b3JrKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JrJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrKTtcbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRfd29yayA9IFtdO1xuICAgICAgICAgICAgd29yay5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRfd29yay5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUnOiBtZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmlzZF9wcm9ncmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaXNkX3Byb2dyYW1zLnB1c2goZC5yaXNkX3Byb2dyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5kYXRhKHNodWZmbGUoZm9ybWF0dGVkX3dvcmspKS5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX3dvcmsgKCkge1xuICAgICAgICB3b3JrID0gd29ya19jb250YWluZXJfc2VsZWN0aW9uLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3BpZWNlICcgKyBmb3JtYXRfcHJvZ3JhbShkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLndpZHRoLzIgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tb2R1bGUuaGVpZ2h0LzIgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGd1dHRlcjogMjBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcblxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uID0gZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2ZpbHRlcicpXG4gICAgICAgICAgICAuZGF0YShyaXNkX3Byb2dyYW1zKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZpbHRlcicpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmFtID0gZDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3JhbSA9PT0gJ0FsbCcpIHByb2dyYW0gPSAnJztcbiAgICAgICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoZm9ybWF0X3Byb2dyYW0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJyAgICA8ZGl2IGNsYXNzPVwid29ya1wiPjwvZGl2PicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrXzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkYXRhLFxuICAgICAgICBncmlkX3NlbGVjdGlvbixcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX3NlbGVjdGlvbjtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wMicsIHRydWUpO1xuXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZ3JpZCcpO1xuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvbi5zZWxlY3QoJy53b3JrJyk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJlbmRlcl93b3JrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRfYW5kX3JlbmRlcl93b3JrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfYW5kX3JlbmRlcl93b3JrICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG4gICAgICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmlzZF9kZXBhcnRtZW50JzogZC5yaXNkX2RlcGFydG1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZSc6IG1kXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShmb3JtYXR0ZWRfd29yaykucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl93b3JrICgpIHtcbiAgICAgICAgd29yayA9IHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQubW9kdWxlLndpZHRoID4gZC5tb2R1bGUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzEwMHB4JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKGQubW9kdWxlLmhlaWdodC9kLm1vZHVsZS53aWR0aCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQubW9kdWxlLmhlaWdodCA+IGQubW9kdWxlLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzEwMHB4JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoKGQubW9kdWxlLndpZHRoL2QubW9kdWxlLmhlaWdodCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1pbWFnZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndXJsKCcgKyBkLm1vZHVsZS5zcmMgKyAnKSc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGd1dHRlcjogMjBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbixcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIGlzbztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wMycsIHRydWUpO1xuXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZ3JpZCcpO1xuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvbi5zZWxlY3QoJy53b3JrJyk7XG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3QoJy5maWx0ZXJzJyk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJlbmRlcl93b3JrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRfYW5kX3JlbmRlcl93b3JrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfYW5kX3JlbmRlcl93b3JrICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG4gICAgICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZF93b3JrLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21vZHVsZSc6IG1kXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyaXNkX3Byb2dyYW1zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmRleE9mKGQucmlzZF9wcm9ncmFtKSA8IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmRhdGEoc2h1ZmZsZShmb3JtYXR0ZWRfd29yaykpLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfd29yayAoKSB7XG4gICAgICAgIHdvcmsgPSB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24uc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5tb2R1bGUud2lkdGggPiBkLm1vZHVsZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnMTAwcHgnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoZC5tb2R1bGUuaGVpZ2h0L2QubW9kdWxlLndpZHRoKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDApICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5tb2R1bGUuaGVpZ2h0ID4gZC5tb2R1bGUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnMTAwcHgnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoZC5tb2R1bGUud2lkdGgvZC5tb2R1bGUuaGVpZ2h0KSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDApICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWltYWdlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd1cmwoJyArIGQubW9kdWxlLnNyYyArICcpJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubW9kdWxlLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5pc28gPSBpc287XG5cbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbiA9IGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCdmaWx0ZXInKVxuICAgICAgICAgICAgLmRhdGEocmlzZF9wcm9ncmFtcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdmaWx0ZXInKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3JhbSA9IGQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb2dyYW0gPT09ICdBbGwnKSBwcm9ncmFtID0gJyc7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGZvcm1hdF9wcm9ncmFtKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICAgICAgaTtcbiAgICAgICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgIHJldHVybiBvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvcm1hdF9wcm9ncmFtKGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24sXG4gICAgICAgIHdvcmtfc2VsZWN0aW9uLFxuICAgICAgICBmaWx0ZXJfY29udGFpbmVyX3NlbGVjdGlvbixcbiAgICAgICAgZmlsdGVyX3NlbGVjdGlvbixcbiAgICAgICAgcmlzZF9wcm9ncmFtcyA9IFsnQWxsJ10sXG4gICAgICAgIGlzbztcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuICAgICAgICBib2R5Lmh0bWwoaHRtbCk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnd29ya18wNCcsIHRydWUpO1xuXG4gICAgICAgIGdyaWRfc2VsZWN0aW9uID0gZDMuc2VsZWN0KCcuZ3JpZCcpO1xuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24gPSBncmlkX3NlbGVjdGlvbi5zZWxlY3QoJy53b3JrJyk7XG4gICAgICAgIGZpbHRlcl9jb250YWluZXJfc2VsZWN0aW9uID0gZ3JpZF9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3QoJy5maWx0ZXJzJyk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHJlbmRlcl93b3JrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRfYW5kX3JlbmRlcl93b3JrKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGF0YTtcbiAgICAgICAgZGF0YSA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfYW5kX3JlbmRlcl93b3JrICgpIHtcbiAgICAgICAgZDMuanNvbihcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJ2RhdGEvcHJvamVjdHMyMDE0MDQwOC5qc29uJywgZnVuY3Rpb24gKHdvcmspIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3dvcmsnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmspO1xuXG4gICAgICAgICAgICB2YXIgY292ZXJfb3B0aW9ucyA9IFsnMjAyJywgJzQwNCddO1xuICAgICAgICAgICAgdmFyIGNvdmVyX2RpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICAgICAgJ2NvdmVyMTE1Jzoge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTE1LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDkwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY292ZXIyMDInOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTU4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY292ZXIyMzAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMzAsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMTgwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnY292ZXI0MDQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MDQsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzE2XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZF93b3JrID0gW107XG4gICAgICAgICAgICB3b3JrLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgICAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciByYW5kb21fY292ZXJfb3B0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgY292ZXJfb3B0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY292ZXJfb3B0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICAgICAgICAgIHZhciByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjb3Zlcl9kaW1lbnNpb25zW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25dLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvdmVyX2RpbWVuc2lvbnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjb3ZlcicrcmFuZG9tX2NvdmVyX29wdGlvbl0uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBzcmM6IGQuY292ZXJzW3JhbmRvbV9jb3Zlcl9vcHRpb25dLFxuICAgICAgICAgICAgICAgICAgICBjbHNzOiAnY292ZXInK3JhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkX3dvcmsucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICAgICAgICAgJ21vZHVsZXMnOiBtb2R1bGVzX3RvX2luY2x1ZGUsXG4gICAgICAgICAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlclxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJpc2RfcHJvZ3JhbXMuaW5kZXhPZihkLnJpc2RfcHJvZ3JhbSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJpc2RfcHJvZ3JhbXMucHVzaChkLnJpc2RfcHJvZ3JhbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZGF0YShzaHVmZmxlKGZvcm1hdHRlZF93b3JrKSkucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl93b3JrICgpIHtcbiAgICAgICAgd29yayA9IHdvcmtfY29udGFpbmVyX3NlbGVjdGlvbi5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdF9wcm9ncmFtKGQucmlzZF9wcm9ncmFtKSArICcgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLmNsc3M7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLnNyYztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWxlY3Rpb24ubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoOiAyMDIsXG4gICAgICAgICAgICAgICAgICAgIGd1dHRlcjogMjBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LmlzbyA9IGlzbztcblxuICAgICAgICBmaWx0ZXJfc2VsZWN0aW9uID0gZmlsdGVyX2NvbnRhaW5lcl9zZWxlY3Rpb25cbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2ZpbHRlcicpXG4gICAgICAgICAgICAuZGF0YShyaXNkX3Byb2dyYW1zKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZpbHRlcicpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9ncmFtID0gZDtcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3JhbSA9PT0gJ0FsbCcpIHByb2dyYW0gPSAnJztcbiAgICAgICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoZm9ybWF0X3Byb2dyYW0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNodWZmbGUgKG8pIHtcbiAgICAgICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgICAgICBpO1xuICAgICAgICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLFxuICAgICAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICAgICAgcmV0dXJuIG87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9ybWF0X3Byb2dyYW0oZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
