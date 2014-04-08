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
                '/src/concept_01/concept-1.svg',
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
},{"./html":6}],8:[function(require,module,exports){
module.exports=require(4)
},{}],9:[function(require,module,exports){
var html = require('./html');

module.exports = function concept_01 () {
    var self = {},
        svg,
        paths,
        pois,
        named_paths = {},
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

        named_paths['first-section'].state = transition_to_state;
    });

    self.dispatch.on('animateSecond', function (transition_to_state) {
        named_paths['second-section']
            .transition()
            .duration(3000)
            .ease('cubic-inout')
            .attrTween("stroke-dasharray",
                       tween_dashs[transition_to_state]);

        named_paths['second-section'].state = transition_to_state;
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html("http://" +
                window.location.host +
                window.location.pathname +
                '/src/concept_02/gradshow_v2_01.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            paths = svg.selectAll('.path-to-animate');

            paths.each(function () {
                var name = d3.select(this).attr('id');
                named_paths[name] = d3.select(this);
                named_paths[name].state = 'hidden';

                var l = this.getTotalLength();

                // set initial stroke-dasharray to hide
                named_paths[name].attr('stroke-dasharray', '0,' + l);
            });

            pois = svg.selectAll('.poi');

            pois.each(function () {
                var name = d3.select(this).attr('id');
                pois[name] = d3.select(this);
            });

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
},{"./html":8}],10:[function(require,module,exports){
module.exports = function FetchBehance () {
    var self = {},
        to_fetch = {
            users: ['ZasharyCaro',
                    'JLung',
                    'andiedinkin',
                    'spark19'],
            tag: 'Fine Arts'
        },
        data = {
            projects: []
        },
        source = 'local',
        sources = ['local', 'behance'],
        fetch_from = {
            local: init_fetch_local,
            behance: init_fetch_behance
        };

    self.dispatch = d3.dispatch('fetched');

    public_api_key = "sGRp891umgwx4IT318rFcueQcjmr9bt3";
    be = be(public_api_key);

    self.source = function (x) {
        if (!arguments.length) return source;
        source = x;
        return self;
    };

    self.fetch = function () {
        fetch_from[source]();
        return self;
    };

    self.data = function () {
        return data;
    };

    function init_fetch_behance () {
        if (to_fetch.users.length > 0) {
            fetch_projects(to_fetch.users.length-1);
        }
    }

    function fetch_projects (user_index) {
        be.user
            .projects(
                to_fetch.users[user_index],
                function (results) {
                    if (results.http_code === 200) {
                        results.projects.forEach(
                            function (project) {
                                if (project.fields
                                    .indexOf(tag_to_include) > -1) {

                                    data.projects.push(project);
                                }
                            });
                    }

                    if ((user_index - 1) >= 0) {
                        fetch_projects((user_index - 1));
                    } else {
                        fetch_project_details(
                            (data.projects.length - 1));
                    }
            });
    }

    function fetch_project_details (project_index) {
        be.project(user_data[project_index].id,
            function (results) {
                if (results.http_code === 200) {
                    data.projects.details = results.project;
                }

                if ((project_index -1) >= 0) {
                    fetch_project_details((project_index -1));
                } else {
                    self.dispatch.fetched(data);
                }
            });
    }

    function init_fetch_local () {
        d3.json("../data/projects.json", function (projects) {
            data = projects;
            self.dispatch.fetched(data);
        });
    }

    return self;
};
},{}],11:[function(require,module,exports){
var prototypes = {
    concept: {
        '00': Concept_00,
        '01': Concept_01,
        '01a': Concept_01a,
        '02': Concept_02
    },
    work: {
        '01': Work_01
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
    var work = require('./work_01/index.js')();
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
},{"./concept_00/index.js":2,"./concept_01/index.js":5,"./concept_01a/index.js":7,"./concept_02/index.js":9,"./work_01/index.js":13}],12:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <div class="work"></div>' +
'</div>';
},{}],13:[function(require,module,exports){
var html = require('./html'),
    Work = require('./work'),
    Behance = require('../fetch_behance')();

module.exports = function work_01 () {
    var context = {};

    d3.select('body').html(html);

    context.work = Work()
                    .wrapper(d3.select('.work'));
    context.behance = Behance.source('local');

    context.behance
        .dispatch
        .on('fetched', function (data) {
            context.work
                .data(data)
                .render();
        });

    context.behance.fetch();

    return context;
};
},{"../fetch_behance":10,"./html":12,"./work":14}],14:[function(require,module,exports){
module.exports = function Work () {
    var self = {},
        wrapper,
        data;

    self.wrapper = function (x) {
        if (!arguments.length) return wrapper;
        wrapper = x;
        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    self.render = function () {
        console.log('rendering');
        console.log(wrapper);
        if (wrapper &&
            wrapper.node()) {

            wrapper.selectAll('.piece')
                .data(data)
                .enter()
                .append('div')
                .attr('class', 'piece')
                .call(function (sel) {
                    var data = d3.select(this).datum();
                    console.log('data');
                    console.log(data);
                });
        }
    };

    return self;
};
},{}]},{},[11])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAwL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvbWFwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDEvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAxL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDFhL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDIvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvZmV0Y2hfYmVoYW5jZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL2h0bWwuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29ya18wMS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL3dvcmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPVxuJzxkaXYgY2xhc3M9XCJncmlkXCI+JyArXG4nICAgIDxzZWN0aW9uIGlkPVwiYWJvdXRcIiBjbGFzcz1cImFib3V0XCI+JyArXG4nICAgICAgICA8aGdyb3VwIGNsYXNzPVwidGl0bGVcIj4nICtcbicgICAgICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nIHNjaG9vbFwiPlJJU0Q8L2gxPicgK1xuJyAgICAgICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmcgZXZlbnRcIj5HcmFkIFNob3c8L2gxPicgK1xuJyAgICAgICAgPC9oZ3JvdXA+JyArXG4nICAgICAgICA8aGdyb3VwIGNsYXNzPVwic3VidGl0bGVcIj4nICtcbicgICAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nIHNjaG9vbFwiPlJob2RlIElzbGFuZCBTY2hvb2wgb2YgRGVzaWduPC9oMz4nICtcbicgICAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nIGV2ZW50XCI+R3JhZHVhdGUgVGhlc2lzIEV4aGliaXRpb248L2gzPicgK1xuJyAgICAgICAgPC9oZ3JvdXA+JyArXG4nICAgICAgICA8cD5EYS4geiBzaG93LjwvcD4nICtcbicgICAgPC9zZWN0aW9uPicgK1xuJyAgICA8c2VjdGlvbiBpZD1cIndoZXJlXCIgY2xhc3M9XCJ3aGVyZVwiPicgK1xuJyAgICAgICAgPGRpdiBjbGFzcz1cIm1hcFwiPicgK1xuJyAgICAgICAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHdpZHRoPVwiNTAwcHhcIicgK1xuJyAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiNDA3LjAyM3B4XCIgdmlld0JveD1cIjAgMCA1MDAgNDA3LjAyM1wiIGVuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCA1MDAgNDA3LjAyM1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+JyArXG4nICAgICAgICAgICAgPGRlZnM+JyArXG4nICAgICAgICAgICAgICAgIDxtYXJrZXIgaWQ9XCJtYXJrZXItcG9pXCIgY2xhc3M9XCJtYXJrZXItcG9pXCIgIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBtYXJrZXJXaWR0aD1cIjUwXCIgbWFya2VySGVpZ2h0PVwiNTBcIiBtYXJrZXJVbml0cz1cInVzZXJTcGFjZW9uVXNlXCIgcmVmWD1cIjI1XCIgcmVmWT1cIjI1XCI+JyArXG4nICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCIzMS4zMzgsMTYuODI4IDQ1LjY1NywxMS4zOCA1MCwyNC40NTUgMzUuNDQ2LDI5LjE3NiA0NS40MjMsNDEuMjgzIDM0LjM5LDUwIDI1LDM3LjA0NSAxNS42MTEsNTAgNC41NzgsNDEuMjgzICcgK1xuJyAgICAgICAgICAgICAgICAgICAgICAgIDE0LjU1NCwyOS4xNzYgMCwyNC40NTUgNC4zNDMsMTEuMzggMTguNjYyLDE2LjgyOCAxOC4zMSwwIDMxLjY5MSwwIFwiLz4nICtcbicgICAgICAgICAgICAgICAgPC9tYXJrZXI+JyArXG4nICAgICAgICAgICAgPC9kZWZzPicgK1xuJyAgICAgICAgICAgIDxnIGNsYXNzPVwic3RyZWV0c1wiPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAsODEuNDA0YzAsMCw1MS4zMzQsMi44NCw2OC4zNzIsOC4wNDZzNjIuOTQ3LDE1LjE0Niw2Mi45NDcsMTUuMTQ2JyArXG4nICAgICAgICAgICAgICAgICAgICBzNTEuMTE1LDguNTIsNzkuNTEyLTAuOTQ3YzI4LjM5Ny05LjQ2NSwxMjkuNjgtNTQuOTAyLDEyOS42OC01NC45MDJzMzkuNzU2LTguNTIsNjguNjI2LDcuNTcybDUzLjAwOCw1MS4xMTUnICtcbicgICAgICAgICAgICAgICAgICAgIGMwLDAsMTYuNTY2LDI4Ljg3LDIxLjI5OSw0Mi41OTZjNC43MzIsMTMuNzI1LDExLjgzMiwyNC4zODksMTIuNzc4LDQxLjA2NHMwLDUxLjY5OSwwLDUxLjY5OVM1MDAsMjc0LjUwMiw1MDAsMjgyLjA3NCcgK1xuJyAgICAgICAgICAgICAgICAgICAgcy00LjcyNSwzNi40NDMtNS4xOTgsNDcuMzI4Yy0wLjQ3NCwxMC44ODctMS40Miw0OC4yNzUtMS40Miw0OC4yNzVzMy4zMTMsMjMuNjY4LDMuMzEzLDI5LjM0NlwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDcuMTgyLDBMNDEuODY5LDIzOS40OGMwLDAtMjAuMzUyLDY2LjczNC01LjY4LDExNC41MzUnICtcbicgICAgICAgICAgICAgICAgICAgIGMxNC42NzIsNDcuODAzLDIxLjc3MSw1My4wMDgsMjEuNzcxLDUzLjAwOFwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zMS4wNzIsMzA0Ljc2NGw1OS4yNjEtMjUuMzM2bDUwLjY2Ny0yOGw3MC42NjctODQuMDAxYzAsMCw0LjY2Ny0xMC42NjcsMjcuMzMzLTIyJyArXG4nICAgICAgICAgICAgICAgICAgICBzNjMuMzMzLTI4LDYzLjMzMy0yOGw2NS4zMzMtMzEuMzMzbDM0LjM1Ni0zMy4xODJcIi8+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjIxLjY2NywwYzAsMC0zLjMzMyw0MS40MjYtNS4xMTksNTguMDkzczMuNzg2LDM1LjMzMywzLjc4NiwzNS4zMzNzMS4zMzMsMTIuNjY3LDE4LjY2Nyw0MCcgK1xuJyAgICAgICAgICAgICAgICAgICAgYzE3LjMzMywyNy4zMzQsMy4zMzMsMzcuMzM0LDMuMzMzLDM3LjMzNGwtMjIsMjIuNTg0TDE5OSwyMjMuNDI2YzAsMC0yNi42NjcsMzkuMzM0LTI5LjMzMyw0Mi42NjhzLTE1LjMzMywxNC0yOS4zMzMsNi42NjYnICtcbicgICAgICAgICAgICAgICAgICAgIHMtMjIsMC0yMiwwcy03LjMzMyw0LTIyLjY2NywxMC42NjZjLTE1LjMzMyw2LjY2OC0zOS43ODEsMTAuNzI5LTM5Ljc4MSwxMC43MjlcIi8+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNjcuNzAyLDE0NC43NThsMTYuMTQ3LDYuNzI0YzAsMCwxNC43OTcsNC4zMzcsMzAuODcsMi4wOTNsNzYuMDI2LTEuNTgybDI1LjgwMiwxLjU4MicgK1xuJyAgICAgICAgICAgICAgICAgICAgbDI0LjcxMi0xLjMyOGMwLDAsNC40NTQtMC4wMzMsOC43NC0yLjc1OGMxLjYwMy0xLjAxOCwzLjc2MSwwLjIwNyw3Ljg0MywxLjczOGwxMy4wMTEsMi45OTJsMzEuMzgxLDguMjMyJyArXG4nICAgICAgICAgICAgICAgICAgICBjMCwwLDEzLjI2NiwxLjI3NiwyMC45MiwxMC45NzFzMzEuMzgxLDMyLjE0NSwzMS4zODEsMzIuMTQ1bDM4LjUyMiw0MC41NjRsMzMuMTY2LDMzLjY3OGwyNS4yNTcsMjIuNzA1bDI1Ljc2OCwyMi45NjEnICtcbicgICAgICAgICAgICAgICAgICAgIGwxNy4xNDcsMTUuNTY0XCIvPicgK1xuJyAgICAgICAgICAgIDwvZz4nICtcbicgICAgICAgICAgICA8ZyBjbGFzcz1cInBvaVwiPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE5NC45NiwxNjcuODk1XCIvPicgK1xuJyAgICAgICAgICAgIDwvZz4nICtcbicgICAgICAgICAgICA8L3N2Zz4nICtcbicgICAgICAgIDwvZGl2PicgK1xuJyAgICAgICAgPGRpdiBjbGFzcz1cImxvY2F0aW9uLXdyaXR0ZW5cIj4nICtcbicgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnVpbGRpbmdcIj4nICtcbicgICAgICAgICAgICAgICAgPHA+UkkgQ29udmVudGlvbiBDZW50ZXI8L3A+JyArXG4nICAgICAgICAgICAgICAgIDxwPkV4aGliaXQgSGFsbCBBPC9wPicgK1xuJyAgICAgICAgICAgICAgICA8cD5PbmUgU2FiaW4gU3RyZWV0LCBQcm92aWRlbmNlPC9wPicgK1xuJyAgICAgICAgICAgIDwvZGl2PicgK1xuJyAgICAgICAgPC9kaXY+JyArXG4nICAgIDwvc2VjdGlvbj4nICtcbic8L2Rpdj4nOyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyksXG4gICAgU1ZHTWFwID0gcmVxdWlyZSgnLi9tYXAnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge1xuICAgICAgICBtYXA6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICAvLyBsb2FkIHRoZSBtYXBcbiAgICAgICAgc2VsZi5tYXAgPSBTVkdNYXAucGF0aHMoZDMuc2VsZWN0QWxsKCcuc3RyZWV0cyBwYXRoJykpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTWFwICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBtYXAsXG4gICAgICAgIHBhdGhzX3NlbGVjdGlvbixcbiAgICAgICAgc3RhdGUgPSAnaGlkZGVuJztcblxuICAgIHNlbGYucGF0aHMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwYXRoc19zZWxlY3Rpb247XG4gICAgICAgIHBhdGhzX3NlbGVjdGlvbiA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnN0YXRlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc3RhdGU7XG4gICAgICAgIHN0YXRlID0geDtcbiAgICAgICAgYXBwbHlfc3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGx5X3N0YXRlICgpIHtcbiAgICAgICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfc2hvd1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIiwgdHdlZW5fZGFzaHNbc3RhdGVdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnLS0tLS0tJyk7XG4gICAgY29uc29sZS5sb2coJ1RvZ2dsZSBtYXAgc3RhdGU6Jyk7XG4gICAgY29uc29sZS5sb2coJ2V4aGliaXRpb24ubWFwLnN0YXRlKFwiaGlkZGVuXCIpJyk7XG4gICAgY29uc29sZS5sb2coJ2V4aGliaXRpb24ubWFwLnN0YXRlKFwic2hvd2luZ1wiKScpO1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0nKTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9XG4nPGRpdiBjbGFzcz1cImdyaWRcIj4nICtcbic8L2Rpdj4nOyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc3ZnLFxuICAgICAgICBwYXRocyxcbiAgICAgICAgcG9pcyA9IHt9LFxuICAgICAgICBuYW1lZF9wYXRocyA9IHt9LFxuICAgICAgICBuYW1lZF90ZXh0ID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KTtcblxuICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgfTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBvaV9iYm94ID0gcG9pc1snY29udmVudGlvbi1jZW50ZXItbWFya2VyJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHZhciBwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA9XG4gICAgICAgICAgICBwb2lfYmJveC50b3AgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgaWYgKChuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9PT0gJ2hpZGRlbicpICZcbiAgICAgICAgICAgIChwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA8IDApKSB7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnc2hvd2luZycpO1xuICAgICAgICB9IGVsc2UgaWYgKChuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXRlID09PSAnc2hvd2luZycpICZcbiAgICAgICAgICAgICAgICAgICAocG9pX3JlbGF0aW9uc2hpcF90b193aW5kb3cgPiAwKSkge1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVTZWNvbmQoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhbmltYXRlRmlyc3QnLCAnYW5pbWF0ZVNlY29uZCcpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZUZpcnN0JywgZnVuY3Rpb24gKHRyYW5zaXRpb25fdG9fc3RhdGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rpc3BhdGNoZWQgYW5pbWF0ZUZpcnN0Jyk7XG4gICAgICAgIFxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMzAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cbiAgICAgICAgbmFtZWRfdGV4dFsnZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwKVxuICAgICAgICAgICAgLmRlbGF5KDI3MDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVTZWNvbmQnLFxuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHRyYW5zaXRpb25fdG9fc3RhdGUpIHtcbiAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9IHRyYW5zaXRpb25fdG9fc3RhdGU7XG5cbiAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgICAgIC5kZWxheSgyNzAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JyxcbiAgICAgICAgICAgICAgICAodHJhbnNpdGlvbl90b19zdGF0ZSA9PT0gJ2hpZGRlbicpID8gMCA6IDEpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmh0bWwoaHRtbCk7XG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJy9zcmMvY29uY2VwdF8wMS9jb25jZXB0LTEuc3ZnJyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0cykge1xuXG4gICAgICAgICAgICB2YXIgc3ZnX2ZyYWdlbWVudCA9IGQzLnNlbGVjdCgnLmdyaWQnKS5ub2RlKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQocmVzdWx0cy5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICAgICAgICBzdmcgPSBkMy5zZWxlY3QoJy5ncmlkIHN2ZycpO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0KCcjbGluZV8xXyBwYXRoJyk7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmUgcGF0aCcpO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICcwLCcgK1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpKTtcbiAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLFxuICAgICAgICAgICAgICAgICcwLCcgK1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0VG90YWxMZW5ndGgoKSk7XG5cblxuICAgICAgICAgICAgcG9pc1snY29udmVudGlvbi1jZW50ZXItbWFya2VyJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNkcm9wX3BpbiBwYXRoJyk7XG5cblxuICAgICAgICAgICAgbmFtZWRfdGV4dFsnZmlyc3Qtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjaG9tZSAjdGV4dF8yXycpO1xuICAgICAgICAgICAgbmFtZWRfdGV4dFsnZmlyc3Qtc2VjdGlvbiddLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ3NlY29uZC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJyNtYXAgI3RleHRfMV8sICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNtYXAgI2xhbmQsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNtYXAgI3N0cmVldCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjZHJvcF9waW4nKTtcbiAgICAgICAgICAgIG5hbWVkX3RleHRbJ3NlY29uZC1zZWN0aW9uJ10uc3R5bGUoJ29wYWNpdHknLCAwKTtcblxuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMWEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHN2ZyxcbiAgICAgICAgcGF0aHMsXG4gICAgICAgIG5hbWVkX3BhdGhzID0ge30sXG4gICAgICAgIG5hbWVkX3RleHQgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuICAgIFxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYW5pbWF0ZUZpcnN0JywgJ2FuaW1hdGVTZWNvbmQnKTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVGaXJzdCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVGaXJzdCcpO1xuICAgICAgICBcbiAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3RleHRbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMClcbiAgICAgICAgICAgIC5kZWxheSgyNzAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5zdGF0ZSA9IHRyYW5zaXRpb25fdG9fc3RhdGU7XG4gICAgfSk7XG5cbiAgICB3aW5kb3dfc2VsLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdmdfYmJveCA9IHN2Zy5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICBwYXRoX2Jib3ggPSBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgICBjdXJyZW50X2xlbmd0aCA9IDA7XG5cbiAgICAgICAgaWYgKHN2Z19iYm94LnRvcCAgPCAwKSB7XG4gICAgICAgICAgICBjdXJyZW50X2xlbmd0aCA9XG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgICAgICAgICAgLnNjYWxlKHdpbmRvdy5pbm5lckhlaWdodCAtIHBhdGhfYmJveC50b3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10udHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgICBjdXJyZW50X2xlbmd0aCArICcsJyArXG4gICAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS50b3RhbF9sZW5ndGgpO1xuXG4gICAgICAgIG5hbWVkX3RleHRbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIChjdXJyZW50X2xlbmd0aC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50b3RhbF9sZW5ndGgpKTtcbiAgICB9KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGQzLmh0bWwoXCJodHRwOi8vXCIgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgK1xuICAgICAgICAgICAgICAgICcvc3JjL2NvbmNlcHRfMDEvY29uY2VwdC0xLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdCgnI2xpbmVfMV8gcGF0aCcpO1xuICAgICAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10gPVxuICAgICAgICAgICAgICAgIHN2Zy5zZWxlY3QoJyNsaW5lIHBhdGgnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcGF0aCBpbiBuYW1lZF9wYXRocykge1xuICAgICAgICAgICAgICAgIHZhciBsID0gbmFtZWRfcGF0aHNbcGF0aF0ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgICAgICAgICBoID0gbmFtZWRfcGF0aHNbcGF0aF0ubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1twYXRoXS5zdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbcGF0aF0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzAsJyArIGwgKTtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1twYXRoXS50b3RhbF9sZW5ndGggPSBsO1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW3BhdGhdLnNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgICAgICAgICAgLmRvbWFpbihbMCwgaF0pXG4gICAgICAgICAgICAgICAgICAgIC5yYW5nZShbMCwgbF0pXG4gICAgICAgICAgICAgICAgICAgIC5jbGFtcCh0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmFtZWRfdGV4dFsnZmlyc3Qtc2VjdGlvbiddID1cbiAgICAgICAgICAgICAgICBzdmcuc2VsZWN0QWxsKCcjaG9tZSAjdGV4dF8yXycpO1xuICAgICAgICAgICAgbmFtZWRfdGV4dFsnc2Vjb25kLXNlY3Rpb24nXSA9XG4gICAgICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI21hcCAjdGV4dF8xXywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI21hcCAjZHJvcF9waW4nKTtcblxuICAgICAgICAgICAgc3ZnLnNlbGVjdEFsbCgnI21hcCAjbGFuZCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICcjbWFwICNzdHJlZXQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciB0ZXh0IGluIG5hbWVkX3RleHQpIHtcbiAgICAgICAgICAgICAgICBuYW1lZF90ZXh0W3RleHRdLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZUZpcnN0KCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzdmcsXG4gICAgICAgIHBhdGhzLFxuICAgICAgICBwb2lzLFxuICAgICAgICBuYW1lZF9wYXRocyA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyk7XG5cbiAgICB2YXIgdHdlZW5fZGFzaHMgPSB7XG4gICAgICAgICdoaWRkZW4nOiAgdHdlZW5fZGFzaF9oaWRlLFxuICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfc2hvd1xuICAgIH07XG5cbiAgICB3aW5kb3dfc2VsLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwb2lfYmJveCA9IHBvaXNbJ2NvbnZlbnRpb24tY2VudGVyLW1hcmtlciddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB2YXIgcG9pX3JlbGF0aW9uc2hpcF90b193aW5kb3cgPVxuICAgICAgICAgICAgcG9pX2Jib3gudG9wIC0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGlmICgobmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10uc3RhdGUgPT09ICdoaWRkZW4nKSAmXG4gICAgICAgICAgICAocG9pX3JlbGF0aW9uc2hpcF90b193aW5kb3cgPCAwKSkge1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVTZWNvbmQoJ3Nob3dpbmcnKTtcbiAgICAgICAgfSBlbHNlIGlmICgobmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdGF0ZSA9PT0gJ3Nob3dpbmcnKSAmXG4gICAgICAgICAgICAgICAgICAgKHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93ID4gMCkpIHtcblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYW5pbWF0ZUZpcnN0JywgJ2FuaW1hdGVTZWNvbmQnKTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVGaXJzdCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVGaXJzdCcpO1xuICAgICAgICBcbiAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZVNlY29uZCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMzAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cbiAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuICAgIH0pO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmh0bWwoaHRtbCk7XG5cbiAgICAgICAgZDMuaHRtbChcImh0dHA6Ly9cIiArXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3QgK1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSArXG4gICAgICAgICAgICAgICAgJy9zcmMvY29uY2VwdF8wMi9ncmFkc2hvd192Ml8wMS5zdmcnLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG5cbiAgICAgICAgICAgIHZhciBzdmdfZnJhZ2VtZW50ID0gZDMuc2VsZWN0KCcuZ3JpZCcpLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChyZXN1bHRzLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgICAgICAgIHN2ZyA9IGQzLnNlbGVjdCgnLmdyaWQgc3ZnJyk7XG5cbiAgICAgICAgICAgIHBhdGhzID0gc3ZnLnNlbGVjdEFsbCgnLnBhdGgtdG8tYW5pbWF0ZScpO1xuXG4gICAgICAgICAgICBwYXRocy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW25hbWVdID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW25hbWVdLnN0YXRlID0gJ2hpZGRlbic7XG5cbiAgICAgICAgICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNldCBpbml0aWFsIHN0cm9rZS1kYXNoYXJyYXkgdG8gaGlkZVxuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW25hbWVdLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCAnMCwnICsgbCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcG9pcyA9IHN2Zy5zZWxlY3RBbGwoJy5wb2knKTtcblxuICAgICAgICAgICAgcG9pcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgICAgIHBvaXNbbmFtZV0gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlRmlyc3QoJ3Nob3dpbmcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfaGlkZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcobCArIFwiLFwiICsgbCwgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvdygpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLFwiICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEZldGNoQmVoYW5jZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgdG9fZmV0Y2ggPSB7XG4gICAgICAgICAgICB1c2VyczogWydaYXNoYXJ5Q2FybycsXG4gICAgICAgICAgICAgICAgICAgICdKTHVuZycsXG4gICAgICAgICAgICAgICAgICAgICdhbmRpZWRpbmtpbicsXG4gICAgICAgICAgICAgICAgICAgICdzcGFyazE5J10sXG4gICAgICAgICAgICB0YWc6ICdGaW5lIEFydHMnXG4gICAgICAgIH0sXG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBwcm9qZWN0czogW11cbiAgICAgICAgfSxcbiAgICAgICAgc291cmNlID0gJ2xvY2FsJyxcbiAgICAgICAgc291cmNlcyA9IFsnbG9jYWwnLCAnYmVoYW5jZSddLFxuICAgICAgICBmZXRjaF9mcm9tID0ge1xuICAgICAgICAgICAgbG9jYWw6IGluaXRfZmV0Y2hfbG9jYWwsXG4gICAgICAgICAgICBiZWhhbmNlOiBpbml0X2ZldGNoX2JlaGFuY2VcbiAgICAgICAgfTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnZmV0Y2hlZCcpO1xuXG4gICAgcHVibGljX2FwaV9rZXkgPSBcInNHUnA4OTF1bWd3eDRJVDMxOHJGY3VlUWNqbXI5YnQzXCI7XG4gICAgYmUgPSBiZShwdWJsaWNfYXBpX2tleSk7XG5cbiAgICBzZWxmLnNvdXJjZSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNvdXJjZTtcbiAgICAgICAgc291cmNlID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZldGNoX2Zyb21bc291cmNlXSgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdF9mZXRjaF9iZWhhbmNlICgpIHtcbiAgICAgICAgaWYgKHRvX2ZldGNoLnVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZldGNoX3Byb2plY3RzKHRvX2ZldGNoLnVzZXJzLmxlbmd0aC0xKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZldGNoX3Byb2plY3RzICh1c2VyX2luZGV4KSB7XG4gICAgICAgIGJlLnVzZXJcbiAgICAgICAgICAgIC5wcm9qZWN0cyhcbiAgICAgICAgICAgICAgICB0b19mZXRjaC51c2Vyc1t1c2VyX2luZGV4XSxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5odHRwX2NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wcm9qZWN0cy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChwcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0LmZpZWxkc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluZGV4T2YodGFnX3RvX2luY2x1ZGUpID4gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoKHVzZXJfaW5kZXggLSAxKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaF9wcm9qZWN0cygodXNlcl9pbmRleCAtIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoX3Byb2plY3RfZGV0YWlscyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGF0YS5wcm9qZWN0cy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZldGNoX3Byb2plY3RfZGV0YWlscyAocHJvamVjdF9pbmRleCkge1xuICAgICAgICBiZS5wcm9qZWN0KHVzZXJfZGF0YVtwcm9qZWN0X2luZGV4XS5pZCxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMuaHR0cF9jb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wcm9qZWN0cy5kZXRhaWxzID0gcmVzdWx0cy5wcm9qZWN0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgocHJvamVjdF9pbmRleCAtMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaF9wcm9qZWN0X2RldGFpbHMoKHByb2plY3RfaW5kZXggLTEpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmZldGNoZWQoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdF9mZXRjaF9sb2NhbCAoKSB7XG4gICAgICAgIGQzLmpzb24oXCIuLi9kYXRhL3Byb2plY3RzLmpzb25cIiwgZnVuY3Rpb24gKHByb2plY3RzKSB7XG4gICAgICAgICAgICBkYXRhID0gcHJvamVjdHM7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmZldGNoZWQoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgcHJvdG90eXBlcyA9IHtcbiAgICBjb25jZXB0OiB7XG4gICAgICAgICcwMCc6IENvbmNlcHRfMDAsXG4gICAgICAgICcwMSc6IENvbmNlcHRfMDEsXG4gICAgICAgICcwMWEnOiBDb25jZXB0XzAxYSxcbiAgICAgICAgJzAyJzogQ29uY2VwdF8wMlxuICAgIH0sXG4gICAgd29yazoge1xuICAgICAgICAnMDEnOiBXb3JrXzAxXG4gICAgfSxcbiAgICBpbmRleDoge1xuICAgICAgICAnMDAnOiBmdW5jdGlvbiAoKSB7fVxuICAgIH1cbn07XG5cbnZhciBwcm90b3R5cGVfdG9fbG9hZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhc2hfdmFycyA9IFsnaW5kZXgnLCAnMDAnXTtcblxuICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbiAgICBpZiAoaGFzaCkge1xuICAgICAgICBoYXNoX3ZhcnMgPSBoYXNoLnNwbGl0KCcjJylbMV0uc3BsaXQoJyYnKVswXS5zcGxpdCgnPScpO1xuICAgIH1cblxuICAgIC8vIHJldHVybiBbJ3dvcmsnLCAnMDEnXVxuICAgIHJldHVybiBoYXNoX3ZhcnM7XG59KSgpO1xuXG5leGhpYml0aW9uID0gcHJvdG90eXBlc1twcm90b3R5cGVfdG9fbG9hZFswXV1bcHJvdG90eXBlX3RvX2xvYWRbMV1dKCk7XG5cbndpbmRvdy5leGhpYml0aW9uID0gZXhoaWJpdGlvbjtcblxuZnVuY3Rpb24gV29ya18wMSAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDEvaW5kZXguanMnKSgpO1xuICAgIHJldHVybiB3b3JrO1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzAwICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wMC9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAxL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMWEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAxYS9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDIgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAyL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9XG4nPGRpdiBjbGFzcz1cImdyaWRcIj4nICtcbicgICAgPGRpdiBjbGFzcz1cIndvcmtcIj48L2Rpdj4nICtcbic8L2Rpdj4nOyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpLFxuICAgIEJlaGFuY2UgPSByZXF1aXJlKCcuLi9mZXRjaF9iZWhhbmNlJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrXzAxICgpIHtcbiAgICB2YXIgY29udGV4dCA9IHt9O1xuXG4gICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgIGNvbnRleHQud29yayA9IFdvcmsoKVxuICAgICAgICAgICAgICAgICAgICAud3JhcHBlcihkMy5zZWxlY3QoJy53b3JrJykpO1xuICAgIGNvbnRleHQuYmVoYW5jZSA9IEJlaGFuY2Uuc291cmNlKCdsb2NhbCcpO1xuXG4gICAgY29udGV4dC5iZWhhbmNlXG4gICAgICAgIC5kaXNwYXRjaFxuICAgICAgICAub24oJ2ZldGNoZWQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29udGV4dC53b3JrXG4gICAgICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgICAgICAucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgY29udGV4dC5iZWhhbmNlLmZldGNoKCk7XG5cbiAgICByZXR1cm4gY29udGV4dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBXb3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3cmFwcGVyLFxuICAgICAgICBkYXRhO1xuXG4gICAgc2VsZi53cmFwcGVyID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gd3JhcHBlcjtcbiAgICAgICAgd3JhcHBlciA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyaW5nJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHdyYXBwZXIpO1xuICAgICAgICBpZiAod3JhcHBlciAmJlxuICAgICAgICAgICAgd3JhcHBlci5ub2RlKCkpIHtcblxuICAgICAgICAgICAgd3JhcHBlci5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgICAgICAuY2FsbChmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZDMuc2VsZWN0KHRoaXMpLmRhdHVtKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiXX0=
