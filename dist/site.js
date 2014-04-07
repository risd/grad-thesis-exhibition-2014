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

    self.dispatch.on('animateSecond',
                     function (transition_to_state) {
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

        d3.html('../src/concept_01/gradshow_v1_02.svg',
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
},{"./html":4}],6:[function(require,module,exports){
module.exports=require(4)
},{}],7:[function(require,module,exports){
var html = require('./html');

module.exports = function concept_01a () {
    var self = {},
        svg,
        paths,
        named_paths = {},
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
    });

    self.render = function () {
        // put the dom in
        d3.select('body').html(html);

        d3.html('../src/concept_01/gradshow_v1_02.svg',
                function (results) {

            var svg_fragement = d3.select('.grid').node()
                .appendChild(results.cloneNode(true));

            svg = d3.select('.grid svg');

            paths = svg.selectAll('.path-to-animate');

            paths.each(function () {
                var name = d3.select(this).attr('id');
                named_paths[name] = d3.select(this);
                named_paths[name].state = 'hidden';

                var l = this.getTotalLength(),
                    h = this.getBoundingClientRect().height;

                // set initial stroke-dasharray to hide
                named_paths[name].attr('stroke-dasharray', '0,' + l);
                named_paths[name].total_length = l;
                named_paths[name].scale = d3.scale.linear()
                    .domain([0, h])
                    .range([0, l])
                    .clamp(true);
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

        d3.html('../src/concept_02/gradshow_v2_01.svg',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAwL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvbWFwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDEvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAxL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDFhL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDIvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvZmV0Y2hfYmVoYW5jZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL2h0bWwuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29ya18wMS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL3dvcmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJyAgICA8c2VjdGlvbiBpZD1cImFib3V0XCIgY2xhc3M9XCJhYm91dFwiPicgK1xuJyAgICAgICAgPGhncm91cCBjbGFzcz1cInRpdGxlXCI+JyArXG4nICAgICAgICAgICAgPGgxIGNsYXNzPVwiaGVhZGluZyBzY2hvb2xcIj5SSVNEPC9oMT4nICtcbicgICAgICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nIGV2ZW50XCI+R3JhZCBTaG93PC9oMT4nICtcbicgICAgICAgIDwvaGdyb3VwPicgK1xuJyAgICAgICAgPGhncm91cCBjbGFzcz1cInN1YnRpdGxlXCI+JyArXG4nICAgICAgICAgICAgPGgzIGNsYXNzPVwiaGVhZGluZyBzY2hvb2xcIj5SaG9kZSBJc2xhbmQgU2Nob29sIG9mIERlc2lnbjwvaDM+JyArXG4nICAgICAgICAgICAgPGgzIGNsYXNzPVwiaGVhZGluZyBldmVudFwiPkdyYWR1YXRlIFRoZXNpcyBFeGhpYml0aW9uPC9oMz4nICtcbicgICAgICAgIDwvaGdyb3VwPicgK1xuJyAgICAgICAgPHA+RGEuIHogc2hvdy48L3A+JyArXG4nICAgIDwvc2VjdGlvbj4nICtcbicgICAgPHNlY3Rpb24gaWQ9XCJ3aGVyZVwiIGNsYXNzPVwid2hlcmVcIj4nICtcbicgICAgICAgIDxkaXYgY2xhc3M9XCJtYXBcIj4nICtcbicgICAgICAgICAgICA8c3ZnIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjUwMHB4XCInICtcbicgICAgICAgICAgICAgICAgIGhlaWdodD1cIjQwNy4wMjNweFwiIHZpZXdCb3g9XCIwIDAgNTAwIDQwNy4wMjNcIiBlbmFibGUtYmFja2dyb3VuZD1cIm5ldyAwIDAgNTAwIDQwNy4wMjNcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPicgK1xuJyAgICAgICAgICAgIDxkZWZzPicgK1xuJyAgICAgICAgICAgICAgICA8bWFya2VyIGlkPVwibWFya2VyLXBvaVwiIGNsYXNzPVwibWFya2VyLXBvaVwiICB2aWV3Qm94PVwiMCAwIDUwIDUwXCIgbWFya2VyV2lkdGg9XCI1MFwiIG1hcmtlckhlaWdodD1cIjUwXCIgbWFya2VyVW5pdHM9XCJ1c2VyU3BhY2VvblVzZVwiIHJlZlg9XCIyNVwiIHJlZlk9XCIyNVwiPicgK1xuJyAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMzEuMzM4LDE2LjgyOCA0NS42NTcsMTEuMzggNTAsMjQuNDU1IDM1LjQ0NiwyOS4xNzYgNDUuNDIzLDQxLjI4MyAzNC4zOSw1MCAyNSwzNy4wNDUgMTUuNjExLDUwIDQuNTc4LDQxLjI4MyAnICtcbicgICAgICAgICAgICAgICAgICAgICAgICAxNC41NTQsMjkuMTc2IDAsMjQuNDU1IDQuMzQzLDExLjM4IDE4LjY2MiwxNi44MjggMTguMzEsMCAzMS42OTEsMCBcIi8+JyArXG4nICAgICAgICAgICAgICAgIDwvbWFya2VyPicgK1xuJyAgICAgICAgICAgIDwvZGVmcz4nICtcbicgICAgICAgICAgICA8ZyBjbGFzcz1cInN0cmVldHNcIj4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0wLDgxLjQwNGMwLDAsNTEuMzM0LDIuODQsNjguMzcyLDguMDQ2czYyLjk0NywxNS4xNDYsNjIuOTQ3LDE1LjE0NicgK1xuJyAgICAgICAgICAgICAgICAgICAgczUxLjExNSw4LjUyLDc5LjUxMi0wLjk0N2MyOC4zOTctOS40NjUsMTI5LjY4LTU0LjkwMiwxMjkuNjgtNTQuOTAyczM5Ljc1Ni04LjUyLDY4LjYyNiw3LjU3Mmw1My4wMDgsNTEuMTE1JyArXG4nICAgICAgICAgICAgICAgICAgICBjMCwwLDE2LjU2NiwyOC44NywyMS4yOTksNDIuNTk2YzQuNzMyLDEzLjcyNSwxMS44MzIsMjQuMzg5LDEyLjc3OCw0MS4wNjRzMCw1MS42OTksMCw1MS42OTlTNTAwLDI3NC41MDIsNTAwLDI4Mi4wNzQnICtcbicgICAgICAgICAgICAgICAgICAgIHMtNC43MjUsMzYuNDQzLTUuMTk4LDQ3LjMyOGMtMC40NzQsMTAuODg3LTEuNDIsNDguMjc1LTEuNDIsNDguMjc1czMuMzEzLDIzLjY2OCwzLjMxMywyOS4zNDZcIi8+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTA3LjE4MiwwTDQxLjg2OSwyMzkuNDhjMCwwLTIwLjM1Miw2Ni43MzQtNS42OCwxMTQuNTM1JyArXG4nICAgICAgICAgICAgICAgICAgICBjMTQuNjcyLDQ3LjgwMywyMS43NzEsNTMuMDA4LDIxLjc3MSw1My4wMDhcIi8+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzEuMDcyLDMwNC43NjRsNTkuMjYxLTI1LjMzNmw1MC42NjctMjhsNzAuNjY3LTg0LjAwMWMwLDAsNC42NjctMTAuNjY3LDI3LjMzMy0yMicgK1xuJyAgICAgICAgICAgICAgICAgICAgczYzLjMzMy0yOCw2My4zMzMtMjhsNjUuMzMzLTMxLjMzM2wzNC4zNTYtMzMuMTgyXCIvPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIyMS42NjcsMGMwLDAtMy4zMzMsNDEuNDI2LTUuMTE5LDU4LjA5M3MzLjc4NiwzNS4zMzMsMy43ODYsMzUuMzMzczEuMzMzLDEyLjY2NywxOC42NjcsNDAnICtcbicgICAgICAgICAgICAgICAgICAgIGMxNy4zMzMsMjcuMzM0LDMuMzMzLDM3LjMzNCwzLjMzMywzNy4zMzRsLTIyLDIyLjU4NEwxOTksMjIzLjQyNmMwLDAtMjYuNjY3LDM5LjMzNC0yOS4zMzMsNDIuNjY4cy0xNS4zMzMsMTQtMjkuMzMzLDYuNjY2JyArXG4nICAgICAgICAgICAgICAgICAgICBzLTIyLDAtMjIsMHMtNy4zMzMsNC0yMi42NjcsMTAuNjY2Yy0xNS4zMzMsNi42NjgtMzkuNzgxLDEwLjcyOS0zOS43ODEsMTAuNzI5XCIvPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTY3LjcwMiwxNDQuNzU4bDE2LjE0Nyw2LjcyNGMwLDAsMTQuNzk3LDQuMzM3LDMwLjg3LDIuMDkzbDc2LjAyNi0xLjU4MmwyNS44MDIsMS41ODInICtcbicgICAgICAgICAgICAgICAgICAgIGwyNC43MTItMS4zMjhjMCwwLDQuNDU0LTAuMDMzLDguNzQtMi43NThjMS42MDMtMS4wMTgsMy43NjEsMC4yMDcsNy44NDMsMS43MzhsMTMuMDExLDIuOTkybDMxLjM4MSw4LjIzMicgK1xuJyAgICAgICAgICAgICAgICAgICAgYzAsMCwxMy4yNjYsMS4yNzYsMjAuOTIsMTAuOTcxczMxLjM4MSwzMi4xNDUsMzEuMzgxLDMyLjE0NWwzOC41MjIsNDAuNTY0bDMzLjE2NiwzMy42NzhsMjUuMjU3LDIyLjcwNWwyNS43NjgsMjIuOTYxJyArXG4nICAgICAgICAgICAgICAgICAgICBsMTcuMTQ3LDE1LjU2NFwiLz4nICtcbicgICAgICAgICAgICA8L2c+JyArXG4nICAgICAgICAgICAgPGcgY2xhc3M9XCJwb2lcIj4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xOTQuOTYsMTY3Ljg5NVwiLz4nICtcbicgICAgICAgICAgICA8L2c+JyArXG4nICAgICAgICAgICAgPC9zdmc+JyArXG4nICAgICAgICA8L2Rpdj4nICtcbicgICAgICAgIDxkaXYgY2xhc3M9XCJsb2NhdGlvbi13cml0dGVuXCI+JyArXG4nICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1aWxkaW5nXCI+JyArXG4nICAgICAgICAgICAgICAgIDxwPlJJIENvbnZlbnRpb24gQ2VudGVyPC9wPicgK1xuJyAgICAgICAgICAgICAgICA8cD5FeGhpYml0IEhhbGwgQTwvcD4nICtcbicgICAgICAgICAgICAgICAgPHA+T25lIFNhYmluIFN0cmVldCwgUHJvdmlkZW5jZTwvcD4nICtcbicgICAgICAgICAgICA8L2Rpdj4nICtcbicgICAgICAgIDwvZGl2PicgK1xuJyAgICA8L3NlY3Rpb24+JyArXG4nPC9kaXY+JzsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpLFxuICAgIFNWR01hcCA9IHJlcXVpcmUoJy4vbWFwJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxICgpIHtcbiAgICB2YXIgc2VsZiA9IHtcbiAgICAgICAgbWFwOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmh0bWwoaHRtbCk7XG5cbiAgICAgICAgLy8gbG9hZCB0aGUgbWFwXG4gICAgICAgIHNlbGYubWFwID0gU1ZHTWFwLnBhdGhzKGQzLnNlbGVjdEFsbCgnLnN0cmVldHMgcGF0aCcpKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE1hcCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgbWFwLFxuICAgICAgICBwYXRoc19zZWxlY3Rpb24sXG4gICAgICAgIHN0YXRlID0gJ2hpZGRlbic7XG5cbiAgICBzZWxmLnBhdGhzID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcGF0aHNfc2VsZWN0aW9uO1xuICAgICAgICBwYXRoc19zZWxlY3Rpb24gPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zdGF0ZSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHN0YXRlO1xuICAgICAgICBzdGF0ZSA9IHg7XG4gICAgICAgIGFwcGx5X3N0YXRlKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBseV9zdGF0ZSAoKSB7XG4gICAgICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgICAgICdoaWRkZW4nOiAgdHdlZW5fZGFzaF9oaWRlLFxuICAgICAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHBhdGhzX3NlbGVjdGlvblxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsIHR3ZWVuX2Rhc2hzW3N0YXRlXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJy0tLS0tLScpO1xuICAgIGNvbnNvbGUubG9nKCdUb2dnbGUgbWFwIHN0YXRlOicpO1xuICAgIGNvbnNvbGUubG9nKCdleGhpYml0aW9uLm1hcC5zdGF0ZShcImhpZGRlblwiKScpO1xuICAgIGNvbnNvbGUubG9nKCdleGhpYml0aW9uLm1hcC5zdGF0ZShcInNob3dpbmdcIiknKTtcbiAgICBjb25zb2xlLmxvZygnLS0tLS0tJyk7XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPVxuJzxkaXYgY2xhc3M9XCJncmlkXCI+JyArXG4nPC9kaXY+JzsiLCJ2YXIgaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHN2ZyxcbiAgICAgICAgcGF0aHMsXG4gICAgICAgIHBvaXMsXG4gICAgICAgIG5hbWVkX3BhdGhzID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KTtcblxuICAgIHZhciB0d2Vlbl9kYXNocyA9IHtcbiAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgfTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBvaV9iYm94ID0gcG9pc1snY29udmVudGlvbi1jZW50ZXItbWFya2VyJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHZhciBwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA9XG4gICAgICAgICAgICBwb2lfYmJveC50b3AgLSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgaWYgKChuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS5zdGF0ZSA9PT0gJ2hpZGRlbicpICZcbiAgICAgICAgICAgIChwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA8IDApKSB7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnc2hvd2luZycpO1xuICAgICAgICB9IGVsc2UgaWYgKChuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXRlID09PSAnc2hvd2luZycpICZcbiAgICAgICAgICAgICAgICAgICAocG9pX3JlbGF0aW9uc2hpcF90b193aW5kb3cgPiAwKSkge1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVTZWNvbmQoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhbmltYXRlRmlyc3QnLCAnYW5pbWF0ZVNlY29uZCcpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZUZpcnN0JywgZnVuY3Rpb24gKHRyYW5zaXRpb25fdG9fc3RhdGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rpc3BhdGNoZWQgYW5pbWF0ZUZpcnN0Jyk7XG4gICAgICAgIFxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMzAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cbiAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXS5zdGF0ZSA9IHRyYW5zaXRpb25fdG9fc3RhdGU7XG4gICAgfSk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlU2Vjb25kJyxcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMzAwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLFxuICAgICAgICAgICAgICAgICAgICAgICB0d2Vlbl9kYXNoc1t0cmFuc2l0aW9uX3RvX3N0YXRlXSk7XG5cbiAgICAgICAgbmFtZWRfcGF0aHNbJ3NlY29uZC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuICAgIH0pO1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHB1dCB0aGUgZG9tIGluXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmh0bWwoaHRtbCk7XG5cbiAgICAgICAgZDMuaHRtbCgnLi4vc3JjL2NvbmNlcHRfMDEvZ3JhZHNob3dfdjFfMDIuc3ZnJyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzdWx0cykge1xuXG4gICAgICAgICAgICB2YXIgc3ZnX2ZyYWdlbWVudCA9IGQzLnNlbGVjdCgnLmdyaWQnKS5ub2RlKClcbiAgICAgICAgICAgICAgICAuYXBwZW5kQ2hpbGQocmVzdWx0cy5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgICAgICAgICBzdmcgPSBkMy5zZWxlY3QoJy5ncmlkIHN2ZycpO1xuXG4gICAgICAgICAgICBwYXRocyA9IHN2Zy5zZWxlY3RBbGwoJy5wYXRoLXRvLWFuaW1hdGUnKTtcblxuICAgICAgICAgICAgcGF0aHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBkMy5zZWxlY3QodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1tuYW1lXSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1tuYW1lXS5zdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBzZXQgaW5pdGlhbCBzdHJva2UtZGFzaGFycmF5IHRvIGhpZGVcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1tuYW1lXS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgJzAsJyArIGwpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBvaXMgPSBzdmcuc2VsZWN0QWxsKCcucG9pJyk7XG5cbiAgICAgICAgICAgIHBvaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBkMy5zZWxlY3QodGhpcykuYXR0cignaWQnKTtcbiAgICAgICAgICAgICAgICBwb2lzW25hbWVdID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZUZpcnN0KCdzaG93aW5nJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jZXB0XzAxYSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc3ZnLFxuICAgICAgICBwYXRocyxcbiAgICAgICAgbmFtZWRfcGF0aHMgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuICAgIFxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYW5pbWF0ZUZpcnN0JywgJ2FuaW1hdGVTZWNvbmQnKTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVGaXJzdCcsIGZ1bmN0aW9uICh0cmFuc2l0aW9uX3RvX3N0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaGVkIGFuaW1hdGVGaXJzdCcpO1xuICAgICAgICBcbiAgICAgICAgbmFtZWRfcGF0aHNbJ2ZpcnN0LXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ10uc3RhdGUgPSB0cmFuc2l0aW9uX3RvX3N0YXRlO1xuICAgIH0pO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignYW5pbWF0ZVNlY29uZCcsXG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHdpbmRvd19zZWwub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN2Z19iYm94ID0gc3ZnLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgIHBhdGhfYmJveCA9IG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICAgIGN1cnJlbnRfbGVuZ3RoID0gMDtcblxuICAgICAgICBpZiAoc3ZnX2Jib3gudG9wICA8IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnRfbGVuZ3RoID1cbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgICAgICAgICAuc2NhbGUod2luZG93LmlubmVySGVpZ2h0IC0gcGF0aF9iYm94LnRvcCk7XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5hdHRyKCdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRfbGVuZ3RoICsgJywnICtcbiAgICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnRvdGFsX2xlbmd0aCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICBkMy5odG1sKCcuLi9zcmMvY29uY2VwdF8wMS9ncmFkc2hvd192MV8wMi5zdmcnLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG5cbiAgICAgICAgICAgIHZhciBzdmdfZnJhZ2VtZW50ID0gZDMuc2VsZWN0KCcuZ3JpZCcpLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChyZXN1bHRzLmNsb25lTm9kZSh0cnVlKSk7XG5cbiAgICAgICAgICAgIHN2ZyA9IGQzLnNlbGVjdCgnLmdyaWQgc3ZnJyk7XG5cbiAgICAgICAgICAgIHBhdGhzID0gc3ZnLnNlbGVjdEFsbCgnLnBhdGgtdG8tYW5pbWF0ZScpO1xuXG4gICAgICAgICAgICBwYXRocy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW25hbWVdID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW25hbWVdLnN0YXRlID0gJ2hpZGRlbic7XG5cbiAgICAgICAgICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgICAgICAgICAgaCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGluaXRpYWwgc3Ryb2tlLWRhc2hhcnJheSB0byBoaWRlXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICcwLCcgKyBsKTtcbiAgICAgICAgICAgICAgICBuYW1lZF9wYXRoc1tuYW1lXS50b3RhbF9sZW5ndGggPSBsO1xuICAgICAgICAgICAgICAgIG5hbWVkX3BhdGhzW25hbWVdLnNjYWxlID0gZDMuc2NhbGUubGluZWFyKClcbiAgICAgICAgICAgICAgICAgICAgLmRvbWFpbihbMCwgaF0pXG4gICAgICAgICAgICAgICAgICAgIC5yYW5nZShbMCwgbF0pXG4gICAgICAgICAgICAgICAgICAgIC5jbGFtcCh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc3ZnLFxuICAgICAgICBwYXRocyxcbiAgICAgICAgcG9pcyxcbiAgICAgICAgbmFtZWRfcGF0aHMgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuXG4gICAgd2luZG93X3NlbC5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9pX2Jib3ggPSBwb2lzWydjb252ZW50aW9uLWNlbnRlci1tYXJrZXInXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdmFyIHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93ID1cbiAgICAgICAgICAgIHBvaV9iYm94LnRvcCAtIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID09PSAnaGlkZGVuJykgJlxuICAgICAgICAgICAgKHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93IDwgMCkpIHtcblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhdGUgPT09ICdzaG93aW5nJykgJlxuICAgICAgICAgICAgICAgICAgIChwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA+IDApKSB7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FuaW1hdGVGaXJzdCcsICdhbmltYXRlU2Vjb25kJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlRmlyc3QnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlRmlyc3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVTZWNvbmQnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGQzLmh0bWwoJy4uL3NyYy9jb25jZXB0XzAyL2dyYWRzaG93X3YyXzAxLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgcGF0aHMgPSBzdmcuc2VsZWN0QWxsKCcucGF0aC10by1hbmltYXRlJyk7XG5cbiAgICAgICAgICAgIHBhdGhzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0uc3RhdGUgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGluaXRpYWwgc3Ryb2tlLWRhc2hhcnJheSB0byBoaWRlXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICcwLCcgKyBsKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwb2lzID0gc3ZnLnNlbGVjdEFsbCgnLnBvaScpO1xuXG4gICAgICAgICAgICBwb2lzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgcG9pc1tuYW1lXSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRmV0Y2hCZWhhbmNlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB0b19mZXRjaCA9IHtcbiAgICAgICAgICAgIHVzZXJzOiBbJ1phc2hhcnlDYXJvJyxcbiAgICAgICAgICAgICAgICAgICAgJ0pMdW5nJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FuZGllZGlua2luJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NwYXJrMTknXSxcbiAgICAgICAgICAgIHRhZzogJ0ZpbmUgQXJ0cydcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHByb2plY3RzOiBbXVxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2UgPSAnbG9jYWwnLFxuICAgICAgICBzb3VyY2VzID0gWydsb2NhbCcsICdiZWhhbmNlJ10sXG4gICAgICAgIGZldGNoX2Zyb20gPSB7XG4gICAgICAgICAgICBsb2NhbDogaW5pdF9mZXRjaF9sb2NhbCxcbiAgICAgICAgICAgIGJlaGFuY2U6IGluaXRfZmV0Y2hfYmVoYW5jZVxuICAgICAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdmZXRjaGVkJyk7XG5cbiAgICBwdWJsaWNfYXBpX2tleSA9IFwic0dScDg5MXVtZ3d4NElUMzE4ckZjdWVRY2ptcjlidDNcIjtcbiAgICBiZSA9IGJlKHB1YmxpY19hcGlfa2V5KTtcblxuICAgIHNlbGYuc291cmNlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc291cmNlO1xuICAgICAgICBzb3VyY2UgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmV0Y2hfZnJvbVtzb3VyY2VdKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0X2ZldGNoX2JlaGFuY2UgKCkge1xuICAgICAgICBpZiAodG9fZmV0Y2gudXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZmV0Y2hfcHJvamVjdHModG9fZmV0Y2gudXNlcnMubGVuZ3RoLTEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmV0Y2hfcHJvamVjdHMgKHVzZXJfaW5kZXgpIHtcbiAgICAgICAgYmUudXNlclxuICAgICAgICAgICAgLnByb2plY3RzKFxuICAgICAgICAgICAgICAgIHRvX2ZldGNoLnVzZXJzW3VzZXJfaW5kZXhdLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzLmh0dHBfY29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnByb2plY3RzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHByb2plY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2plY3QuZmllbGRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZih0YWdfdG9faW5jbHVkZSkgPiAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgodXNlcl9pbmRleCAtIDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoX3Byb2plY3RzKCh1c2VyX2luZGV4IC0gMSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfcHJvamVjdF9kZXRhaWxzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhLnByb2plY3RzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmV0Y2hfcHJvamVjdF9kZXRhaWxzIChwcm9qZWN0X2luZGV4KSB7XG4gICAgICAgIGJlLnByb2plY3QodXNlcl9kYXRhW3Byb2plY3RfaW5kZXhdLmlkLFxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5odHRwX2NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnByb2plY3RzLmRldGFpbHMgPSByZXN1bHRzLnByb2plY3Q7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKChwcm9qZWN0X2luZGV4IC0xKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoX3Byb2plY3RfZGV0YWlscygocHJvamVjdF9pbmRleCAtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZmV0Y2hlZChkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0X2ZldGNoX2xvY2FsICgpIHtcbiAgICAgICAgZDMuanNvbihcIi4uL2RhdGEvcHJvamVjdHMuanNvblwiLCBmdW5jdGlvbiAocHJvamVjdHMpIHtcbiAgICAgICAgICAgIGRhdGEgPSBwcm9qZWN0cztcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZmV0Y2hlZChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBwcm90b3R5cGVzID0ge1xuICAgIGNvbmNlcHQ6IHtcbiAgICAgICAgJzAwJzogQ29uY2VwdF8wMCxcbiAgICAgICAgJzAxJzogQ29uY2VwdF8wMSxcbiAgICAgICAgJzAxYSc6IENvbmNlcHRfMDFhLFxuICAgICAgICAnMDInOiBDb25jZXB0XzAyXG4gICAgfSxcbiAgICB3b3JrOiB7XG4gICAgICAgICcwMSc6IFdvcmtfMDFcbiAgICB9LFxuICAgIGluZGV4OiB7XG4gICAgICAgICcwMCc6IGZ1bmN0aW9uICgpIHt9XG4gICAgfVxufTtcblxudmFyIHByb3RvdHlwZV90b19sb2FkID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFzaF92YXJzID0gWydpbmRleCcsICcwMCddO1xuXG4gICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcblxuICAgIGlmIChoYXNoKSB7XG4gICAgICAgIGhhc2hfdmFycyA9IGhhc2guc3BsaXQoJyMnKVsxXS5zcGxpdCgnJicpWzBdLnNwbGl0KCc9Jyk7XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIFsnd29yaycsICcwMSddXG4gICAgcmV0dXJuIGhhc2hfdmFycztcbn0pKCk7XG5cbmV4aGliaXRpb24gPSBwcm90b3R5cGVzW3Byb3RvdHlwZV90b19sb2FkWzBdXVtwcm90b3R5cGVfdG9fbG9hZFsxXV0oKTtcblxud2luZG93LmV4aGliaXRpb24gPSBleGhpYml0aW9uO1xuXG5mdW5jdGlvbiBXb3JrXzAxICgpIHtcbiAgICB2YXIgd29yayA9IHJlcXVpcmUoJy4vd29ya18wMS9pbmRleC5qcycpKCk7XG4gICAgcmV0dXJuIHdvcms7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDAgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAwL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDEvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzAxYSAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDFhL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMiAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufSIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJyAgICA8ZGl2IGNsYXNzPVwid29ya1wiPjwvZGl2PicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrJyksXG4gICAgQmVoYW5jZSA9IHJlcXVpcmUoJy4uL2ZldGNoX2JlaGFuY2UnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBjb250ZXh0ID0ge307XG5cbiAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgY29udGV4dC53b3JrID0gV29yaygpXG4gICAgICAgICAgICAgICAgICAgIC53cmFwcGVyKGQzLnNlbGVjdCgnLndvcmsnKSk7XG4gICAgY29udGV4dC5iZWhhbmNlID0gQmVoYW5jZS5zb3VyY2UoJ2xvY2FsJyk7XG5cbiAgICBjb250ZXh0LmJlaGFuY2VcbiAgICAgICAgLmRpc3BhdGNoXG4gICAgICAgIC5vbignZmV0Y2hlZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb250ZXh0LndvcmtcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICBjb250ZXh0LmJlaGFuY2UuZmV0Y2goKTtcblxuICAgIHJldHVybiBjb250ZXh0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdyYXBwZXIsXG4gICAgICAgIGRhdGE7XG5cbiAgICBzZWxmLndyYXBwZXIgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB3cmFwcGVyO1xuICAgICAgICB3cmFwcGVyID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcnKTtcbiAgICAgICAgY29uc29sZS5sb2cod3JhcHBlcik7XG4gICAgICAgIGlmICh3cmFwcGVyICYmXG4gICAgICAgICAgICB3cmFwcGVyLm5vZGUoKSkge1xuXG4gICAgICAgICAgICB3cmFwcGVyLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UnKVxuICAgICAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkMy5zZWxlY3QodGhpcykuZGF0dW0oKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
