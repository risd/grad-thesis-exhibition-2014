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
},{"./html":6}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
var prototypes = {
    concept: {
        '00': Concept_00,
        '01': Concept_01,
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

function Concept_02 () {
    var concept = require('./concept_02/index.js')().render();
    return concept;
}
},{"./concept_00/index.js":2,"./concept_01/index.js":5,"./concept_02/index.js":7,"./work_01/index.js":11}],10:[function(require,module,exports){
module.exports =
'<div class="grid">' +
'    <div class="work"></div>' +
'</div>';
},{}],11:[function(require,module,exports){
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
},{"../fetch_behance":8,"./html":10,"./work":12}],12:[function(require,module,exports){
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
},{}]},{},[9])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAwL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDAvbWFwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDEvaHRtbC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9jb25jZXB0XzAxL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2NvbmNlcHRfMDIvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvZmV0Y2hfYmVoYW5jZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL2h0bWwuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29ya18wMS9pbmRleC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrXzAxL3dvcmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPVxuJzxkaXYgY2xhc3M9XCJncmlkXCI+JyArXG4nICAgIDxzZWN0aW9uIGlkPVwiYWJvdXRcIiBjbGFzcz1cImFib3V0XCI+JyArXG4nICAgICAgICA8aGdyb3VwIGNsYXNzPVwidGl0bGVcIj4nICtcbicgICAgICAgICAgICA8aDEgY2xhc3M9XCJoZWFkaW5nIHNjaG9vbFwiPlJJU0Q8L2gxPicgK1xuJyAgICAgICAgICAgIDxoMSBjbGFzcz1cImhlYWRpbmcgZXZlbnRcIj5HcmFkIFNob3c8L2gxPicgK1xuJyAgICAgICAgPC9oZ3JvdXA+JyArXG4nICAgICAgICA8aGdyb3VwIGNsYXNzPVwic3VidGl0bGVcIj4nICtcbicgICAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nIHNjaG9vbFwiPlJob2RlIElzbGFuZCBTY2hvb2wgb2YgRGVzaWduPC9oMz4nICtcbicgICAgICAgICAgICA8aDMgY2xhc3M9XCJoZWFkaW5nIGV2ZW50XCI+R3JhZHVhdGUgVGhlc2lzIEV4aGliaXRpb248L2gzPicgK1xuJyAgICAgICAgPC9oZ3JvdXA+JyArXG4nICAgICAgICA8cD5EYS4geiBzaG93LjwvcD4nICtcbicgICAgPC9zZWN0aW9uPicgK1xuJyAgICA8c2VjdGlvbiBpZD1cIndoZXJlXCIgY2xhc3M9XCJ3aGVyZVwiPicgK1xuJyAgICAgICAgPGRpdiBjbGFzcz1cIm1hcFwiPicgK1xuJyAgICAgICAgICAgIDxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHdpZHRoPVwiNTAwcHhcIicgK1xuJyAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiNDA3LjAyM3B4XCIgdmlld0JveD1cIjAgMCA1MDAgNDA3LjAyM1wiIGVuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCA1MDAgNDA3LjAyM1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+JyArXG4nICAgICAgICAgICAgPGRlZnM+JyArXG4nICAgICAgICAgICAgICAgIDxtYXJrZXIgaWQ9XCJtYXJrZXItcG9pXCIgY2xhc3M9XCJtYXJrZXItcG9pXCIgIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBtYXJrZXJXaWR0aD1cIjUwXCIgbWFya2VySGVpZ2h0PVwiNTBcIiBtYXJrZXJVbml0cz1cInVzZXJTcGFjZW9uVXNlXCIgcmVmWD1cIjI1XCIgcmVmWT1cIjI1XCI+JyArXG4nICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCIzMS4zMzgsMTYuODI4IDQ1LjY1NywxMS4zOCA1MCwyNC40NTUgMzUuNDQ2LDI5LjE3NiA0NS40MjMsNDEuMjgzIDM0LjM5LDUwIDI1LDM3LjA0NSAxNS42MTEsNTAgNC41NzgsNDEuMjgzICcgK1xuJyAgICAgICAgICAgICAgICAgICAgICAgIDE0LjU1NCwyOS4xNzYgMCwyNC40NTUgNC4zNDMsMTEuMzggMTguNjYyLDE2LjgyOCAxOC4zMSwwIDMxLjY5MSwwIFwiLz4nICtcbicgICAgICAgICAgICAgICAgPC9tYXJrZXI+JyArXG4nICAgICAgICAgICAgPC9kZWZzPicgK1xuJyAgICAgICAgICAgIDxnIGNsYXNzPVwic3RyZWV0c1wiPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAsODEuNDA0YzAsMCw1MS4zMzQsMi44NCw2OC4zNzIsOC4wNDZzNjIuOTQ3LDE1LjE0Niw2Mi45NDcsMTUuMTQ2JyArXG4nICAgICAgICAgICAgICAgICAgICBzNTEuMTE1LDguNTIsNzkuNTEyLTAuOTQ3YzI4LjM5Ny05LjQ2NSwxMjkuNjgtNTQuOTAyLDEyOS42OC01NC45MDJzMzkuNzU2LTguNTIsNjguNjI2LDcuNTcybDUzLjAwOCw1MS4xMTUnICtcbicgICAgICAgICAgICAgICAgICAgIGMwLDAsMTYuNTY2LDI4Ljg3LDIxLjI5OSw0Mi41OTZjNC43MzIsMTMuNzI1LDExLjgzMiwyNC4zODksMTIuNzc4LDQxLjA2NHMwLDUxLjY5OSwwLDUxLjY5OVM1MDAsMjc0LjUwMiw1MDAsMjgyLjA3NCcgK1xuJyAgICAgICAgICAgICAgICAgICAgcy00LjcyNSwzNi40NDMtNS4xOTgsNDcuMzI4Yy0wLjQ3NCwxMC44ODctMS40Miw0OC4yNzUtMS40Miw0OC4yNzVzMy4zMTMsMjMuNjY4LDMuMzEzLDI5LjM0NlwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xMDcuMTgyLDBMNDEuODY5LDIzOS40OGMwLDAtMjAuMzUyLDY2LjczNC01LjY4LDExNC41MzUnICtcbicgICAgICAgICAgICAgICAgICAgIGMxNC42NzIsNDcuODAzLDIxLjc3MSw1My4wMDgsMjEuNzcxLDUzLjAwOFwiLz4nICtcbicgICAgICAgICAgICAgICAgPHBhdGggZD1cIk0zMS4wNzIsMzA0Ljc2NGw1OS4yNjEtMjUuMzM2bDUwLjY2Ny0yOGw3MC42NjctODQuMDAxYzAsMCw0LjY2Ny0xMC42NjcsMjcuMzMzLTIyJyArXG4nICAgICAgICAgICAgICAgICAgICBzNjMuMzMzLTI4LDYzLjMzMy0yOGw2NS4zMzMtMzEuMzMzbDM0LjM1Ni0zMy4xODJcIi8+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjIxLjY2NywwYzAsMC0zLjMzMyw0MS40MjYtNS4xMTksNTguMDkzczMuNzg2LDM1LjMzMywzLjc4NiwzNS4zMzNzMS4zMzMsMTIuNjY3LDE4LjY2Nyw0MCcgK1xuJyAgICAgICAgICAgICAgICAgICAgYzE3LjMzMywyNy4zMzQsMy4zMzMsMzcuMzM0LDMuMzMzLDM3LjMzNGwtMjIsMjIuNTg0TDE5OSwyMjMuNDI2YzAsMC0yNi42NjcsMzkuMzM0LTI5LjMzMyw0Mi42NjhzLTE1LjMzMywxNC0yOS4zMzMsNi42NjYnICtcbicgICAgICAgICAgICAgICAgICAgIHMtMjIsMC0yMiwwcy03LjMzMyw0LTIyLjY2NywxMC42NjZjLTE1LjMzMyw2LjY2OC0zOS43ODEsMTAuNzI5LTM5Ljc4MSwxMC43MjlcIi8+JyArXG4nICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNjcuNzAyLDE0NC43NThsMTYuMTQ3LDYuNzI0YzAsMCwxNC43OTcsNC4zMzcsMzAuODcsMi4wOTNsNzYuMDI2LTEuNTgybDI1LjgwMiwxLjU4MicgK1xuJyAgICAgICAgICAgICAgICAgICAgbDI0LjcxMi0xLjMyOGMwLDAsNC40NTQtMC4wMzMsOC43NC0yLjc1OGMxLjYwMy0xLjAxOCwzLjc2MSwwLjIwNyw3Ljg0MywxLjczOGwxMy4wMTEsMi45OTJsMzEuMzgxLDguMjMyJyArXG4nICAgICAgICAgICAgICAgICAgICBjMCwwLDEzLjI2NiwxLjI3NiwyMC45MiwxMC45NzFzMzEuMzgxLDMyLjE0NSwzMS4zODEsMzIuMTQ1bDM4LjUyMiw0MC41NjRsMzMuMTY2LDMzLjY3OGwyNS4yNTcsMjIuNzA1bDI1Ljc2OCwyMi45NjEnICtcbicgICAgICAgICAgICAgICAgICAgIGwxNy4xNDcsMTUuNTY0XCIvPicgK1xuJyAgICAgICAgICAgIDwvZz4nICtcbicgICAgICAgICAgICA8ZyBjbGFzcz1cInBvaVwiPicgK1xuJyAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTE5NC45NiwxNjcuODk1XCIvPicgK1xuJyAgICAgICAgICAgIDwvZz4nICtcbicgICAgICAgICAgICA8L3N2Zz4nICtcbicgICAgICAgIDwvZGl2PicgK1xuJyAgICAgICAgPGRpdiBjbGFzcz1cImxvY2F0aW9uLXdyaXR0ZW5cIj4nICtcbicgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnVpbGRpbmdcIj4nICtcbicgICAgICAgICAgICAgICAgPHA+UkkgQ29udmVudGlvbiBDZW50ZXI8L3A+JyArXG4nICAgICAgICAgICAgICAgIDxwPkV4aGliaXQgSGFsbCBBPC9wPicgK1xuJyAgICAgICAgICAgICAgICA8cD5PbmUgU2FiaW4gU3RyZWV0LCBQcm92aWRlbmNlPC9wPicgK1xuJyAgICAgICAgICAgIDwvZGl2PicgK1xuJyAgICAgICAgPC9kaXY+JyArXG4nICAgIDwvc2VjdGlvbj4nICtcbic8L2Rpdj4nOyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyksXG4gICAgU1ZHTWFwID0gcmVxdWlyZSgnLi9tYXAnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNlcHRfMDEgKCkge1xuICAgIHZhciBzZWxmID0ge1xuICAgICAgICBtYXA6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcHV0IHRoZSBkb20gaW5cbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuaHRtbChodG1sKTtcblxuICAgICAgICAvLyBsb2FkIHRoZSBtYXBcbiAgICAgICAgc2VsZi5tYXAgPSBTVkdNYXAucGF0aHMoZDMuc2VsZWN0QWxsKCcuc3RyZWV0cyBwYXRoJykpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTWFwICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBtYXAsXG4gICAgICAgIHBhdGhzX3NlbGVjdGlvbixcbiAgICAgICAgc3RhdGUgPSAnaGlkZGVuJztcblxuICAgIHNlbGYucGF0aHMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwYXRoc19zZWxlY3Rpb247XG4gICAgICAgIHBhdGhzX3NlbGVjdGlvbiA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnN0YXRlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc3RhdGU7XG4gICAgICAgIHN0YXRlID0geDtcbiAgICAgICAgYXBwbHlfc3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGx5X3N0YXRlICgpIHtcbiAgICAgICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfc2hvd1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIiwgdHdlZW5fZGFzaHNbc3RhdGVdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnLS0tLS0tJyk7XG4gICAgY29uc29sZS5sb2coJ1RvZ2dsZSBtYXAgc3RhdGU6Jyk7XG4gICAgY29uc29sZS5sb2coJ2V4aGliaXRpb24ubWFwLnN0YXRlKFwiaGlkZGVuXCIpJyk7XG4gICAgY29uc29sZS5sb2coJ2V4aGliaXRpb24ubWFwLnN0YXRlKFwic2hvd2luZ1wiKScpO1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0nKTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9XG4nPGRpdiBjbGFzcz1cImdyaWRcIj4nICtcbic8L2Rpdj4nOyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc3ZnLFxuICAgICAgICBwYXRocyxcbiAgICAgICAgcG9pcyxcbiAgICAgICAgbmFtZWRfcGF0aHMgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuXG4gICAgd2luZG93X3NlbC5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9pX2Jib3ggPSBwb2lzWydjb252ZW50aW9uLWNlbnRlci1tYXJrZXInXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdmFyIHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93ID1cbiAgICAgICAgICAgIHBvaV9iYm94LnRvcCAtIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID09PSAnaGlkZGVuJykgJlxuICAgICAgICAgICAgKHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93IDwgMCkpIHtcblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhdGUgPT09ICdzaG93aW5nJykgJlxuICAgICAgICAgICAgICAgICAgIChwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA+IDApKSB7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FuaW1hdGVGaXJzdCcsICdhbmltYXRlU2Vjb25kJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlRmlyc3QnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlRmlyc3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVTZWNvbmQnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGQzLmh0bWwoJy4uL3NyYy9jb25jZXB0XzAxL2dyYWRzaG93X3YxXzAyLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgcGF0aHMgPSBzdmcuc2VsZWN0QWxsKCcucGF0aC10by1hbmltYXRlJyk7XG5cbiAgICAgICAgICAgIHBhdGhzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0uc3RhdGUgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGluaXRpYWwgc3Ryb2tlLWRhc2hhcnJheSB0byBoaWRlXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICcwLCcgKyBsKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwb2lzID0gc3ZnLnNlbGVjdEFsbCgnLnBvaScpO1xuXG4gICAgICAgICAgICBwb2lzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgcG9pc1tuYW1lXSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBodG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2VwdF8wMSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc3ZnLFxuICAgICAgICBwYXRocyxcbiAgICAgICAgcG9pcyxcbiAgICAgICAgbmFtZWRfcGF0aHMgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgJ3Nob3dpbmcnOiB0d2Vlbl9kYXNoX3Nob3dcbiAgICB9O1xuXG4gICAgd2luZG93X3NlbC5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9pX2Jib3ggPSBwb2lzWydjb252ZW50aW9uLWNlbnRlci1tYXJrZXInXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgdmFyIHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93ID1cbiAgICAgICAgICAgIHBvaV9iYm94LnRvcCAtIHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID09PSAnaGlkZGVuJykgJlxuICAgICAgICAgICAgKHBvaV9yZWxhdGlvbnNoaXBfdG9fd2luZG93IDwgMCkpIHtcblxuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hbmltYXRlU2Vjb25kKCdzaG93aW5nJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoKG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3RhdGUgPT09ICdzaG93aW5nJykgJlxuICAgICAgICAgICAgICAgICAgIChwb2lfcmVsYXRpb25zaGlwX3RvX3dpbmRvdyA+IDApKSB7XG5cbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYW5pbWF0ZVNlY29uZCgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FuaW1hdGVGaXJzdCcsICdhbmltYXRlU2Vjb25kJyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoLm9uKCdhbmltYXRlRmlyc3QnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlzcGF0Y2hlZCBhbmltYXRlRmlyc3QnKTtcbiAgICAgICAgXG4gICAgICAgIG5hbWVkX3BhdGhzWydmaXJzdC1zZWN0aW9uJ11cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigzMDAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oXCJzdHJva2UtZGFzaGFycmF5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuX2Rhc2hzW3RyYW5zaXRpb25fdG9fc3RhdGVdKTtcblxuICAgICAgICBuYW1lZF9wYXRoc1snZmlyc3Qtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYuZGlzcGF0Y2gub24oJ2FuaW1hdGVTZWNvbmQnLCBmdW5jdGlvbiAodHJhbnNpdGlvbl90b19zdGF0ZSkge1xuICAgICAgICBuYW1lZF9wYXRoc1snc2Vjb25kLXNlY3Rpb24nXVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDMwMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgdHdlZW5fZGFzaHNbdHJhbnNpdGlvbl90b19zdGF0ZV0pO1xuXG4gICAgICAgIG5hbWVkX3BhdGhzWydzZWNvbmQtc2VjdGlvbiddLnN0YXRlID0gdHJhbnNpdGlvbl90b19zdGF0ZTtcbiAgICB9KTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBwdXQgdGhlIGRvbSBpblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgICAgIGQzLmh0bWwoJy4uL3NyYy9jb25jZXB0XzAyL2dyYWRzaG93X3YyXzAxLnN2ZycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcblxuICAgICAgICAgICAgdmFyIHN2Z19mcmFnZW1lbnQgPSBkMy5zZWxlY3QoJy5ncmlkJykubm9kZSgpXG4gICAgICAgICAgICAgICAgLmFwcGVuZENoaWxkKHJlc3VsdHMuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KCcuZ3JpZCBzdmcnKTtcblxuICAgICAgICAgICAgcGF0aHMgPSBzdmcuc2VsZWN0QWxsKCcucGF0aC10by1hbmltYXRlJyk7XG5cbiAgICAgICAgICAgIHBhdGhzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0uc3RhdGUgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gc2V0IGluaXRpYWwgc3Ryb2tlLWRhc2hhcnJheSB0byBoaWRlXG4gICAgICAgICAgICAgICAgbmFtZWRfcGF0aHNbbmFtZV0uYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICcwLCcgKyBsKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwb2lzID0gc3ZnLnNlbGVjdEFsbCgnLnBvaScpO1xuXG4gICAgICAgICAgICBwb2lzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICAgICAgcG9pc1tuYW1lXSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFuaW1hdGVGaXJzdCgnc2hvd2luZycpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9oaWRlKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhsICsgXCIsXCIgKyBsLCBcIjAsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5fZGFzaF9zaG93KCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcIjAsXCIgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRmV0Y2hCZWhhbmNlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB0b19mZXRjaCA9IHtcbiAgICAgICAgICAgIHVzZXJzOiBbJ1phc2hhcnlDYXJvJyxcbiAgICAgICAgICAgICAgICAgICAgJ0pMdW5nJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FuZGllZGlua2luJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NwYXJrMTknXSxcbiAgICAgICAgICAgIHRhZzogJ0ZpbmUgQXJ0cydcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHByb2plY3RzOiBbXVxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2UgPSAnbG9jYWwnLFxuICAgICAgICBzb3VyY2VzID0gWydsb2NhbCcsICdiZWhhbmNlJ10sXG4gICAgICAgIGZldGNoX2Zyb20gPSB7XG4gICAgICAgICAgICBsb2NhbDogaW5pdF9mZXRjaF9sb2NhbCxcbiAgICAgICAgICAgIGJlaGFuY2U6IGluaXRfZmV0Y2hfYmVoYW5jZVxuICAgICAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdmZXRjaGVkJyk7XG5cbiAgICBwdWJsaWNfYXBpX2tleSA9IFwic0dScDg5MXVtZ3d4NElUMzE4ckZjdWVRY2ptcjlidDNcIjtcbiAgICBiZSA9IGJlKHB1YmxpY19hcGlfa2V5KTtcblxuICAgIHNlbGYuc291cmNlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc291cmNlO1xuICAgICAgICBzb3VyY2UgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmV0Y2hfZnJvbVtzb3VyY2VdKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0X2ZldGNoX2JlaGFuY2UgKCkge1xuICAgICAgICBpZiAodG9fZmV0Y2gudXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZmV0Y2hfcHJvamVjdHModG9fZmV0Y2gudXNlcnMubGVuZ3RoLTEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmV0Y2hfcHJvamVjdHMgKHVzZXJfaW5kZXgpIHtcbiAgICAgICAgYmUudXNlclxuICAgICAgICAgICAgLnByb2plY3RzKFxuICAgICAgICAgICAgICAgIHRvX2ZldGNoLnVzZXJzW3VzZXJfaW5kZXhdLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzLmh0dHBfY29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnByb2plY3RzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHByb2plY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2plY3QuZmllbGRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZih0YWdfdG9faW5jbHVkZSkgPiAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgodXNlcl9pbmRleCAtIDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoX3Byb2plY3RzKCh1c2VyX2luZGV4IC0gMSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfcHJvamVjdF9kZXRhaWxzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhLnByb2plY3RzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmV0Y2hfcHJvamVjdF9kZXRhaWxzIChwcm9qZWN0X2luZGV4KSB7XG4gICAgICAgIGJlLnByb2plY3QodXNlcl9kYXRhW3Byb2plY3RfaW5kZXhdLmlkLFxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5odHRwX2NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnByb2plY3RzLmRldGFpbHMgPSByZXN1bHRzLnByb2plY3Q7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKChwcm9qZWN0X2luZGV4IC0xKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoX3Byb2plY3RfZGV0YWlscygocHJvamVjdF9pbmRleCAtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZmV0Y2hlZChkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0X2ZldGNoX2xvY2FsICgpIHtcbiAgICAgICAgZDMuanNvbihcIi4uL2RhdGEvcHJvamVjdHMuanNvblwiLCBmdW5jdGlvbiAocHJvamVjdHMpIHtcbiAgICAgICAgICAgIGRhdGEgPSBwcm9qZWN0cztcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZmV0Y2hlZChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBwcm90b3R5cGVzID0ge1xuICAgIGNvbmNlcHQ6IHtcbiAgICAgICAgJzAwJzogQ29uY2VwdF8wMCxcbiAgICAgICAgJzAxJzogQ29uY2VwdF8wMSxcbiAgICAgICAgJzAyJzogQ29uY2VwdF8wMlxuICAgIH0sXG4gICAgd29yazoge1xuICAgICAgICAnMDEnOiBXb3JrXzAxXG4gICAgfSxcbiAgICBpbmRleDoge1xuICAgICAgICAnMDAnOiBmdW5jdGlvbiAoKSB7fVxuICAgIH1cbn07XG5cbnZhciBwcm90b3R5cGVfdG9fbG9hZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhc2hfdmFycyA9IFsnaW5kZXgnLCAnMDAnXTtcblxuICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbiAgICBpZiAoaGFzaCkge1xuICAgICAgICBoYXNoX3ZhcnMgPSBoYXNoLnNwbGl0KCcjJylbMV0uc3BsaXQoJyYnKVswXS5zcGxpdCgnPScpO1xuICAgIH1cblxuICAgIC8vIHJldHVybiBbJ3dvcmsnLCAnMDEnXVxuICAgIHJldHVybiBoYXNoX3ZhcnM7XG59KSgpO1xuXG5leGhpYml0aW9uID0gcHJvdG90eXBlc1twcm90b3R5cGVfdG9fbG9hZFswXV1bcHJvdG90eXBlX3RvX2xvYWRbMV1dKCk7XG5cbndpbmRvdy5leGhpYml0aW9uID0gZXhoaWJpdGlvbjtcblxuZnVuY3Rpb24gV29ya18wMSAoKSB7XG4gICAgdmFyIHdvcmsgPSByZXF1aXJlKCcuL3dvcmtfMDEvaW5kZXguanMnKSgpO1xuICAgIHJldHVybiB3b3JrO1xufVxuXG5mdW5jdGlvbiBDb25jZXB0XzAwICgpIHtcbiAgICB2YXIgY29uY2VwdCA9IHJlcXVpcmUoJy4vY29uY2VwdF8wMC9pbmRleC5qcycpKCkucmVuZGVyKCk7XG4gICAgcmV0dXJuIGNvbmNlcHQ7XG59XG5cbmZ1bmN0aW9uIENvbmNlcHRfMDEgKCkge1xuICAgIHZhciBjb25jZXB0ID0gcmVxdWlyZSgnLi9jb25jZXB0XzAxL2luZGV4LmpzJykoKS5yZW5kZXIoKTtcbiAgICByZXR1cm4gY29uY2VwdDtcbn1cblxuZnVuY3Rpb24gQ29uY2VwdF8wMiAoKSB7XG4gICAgdmFyIGNvbmNlcHQgPSByZXF1aXJlKCcuL2NvbmNlcHRfMDIvaW5kZXguanMnKSgpLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25jZXB0O1xufSIsIm1vZHVsZS5leHBvcnRzID1cbic8ZGl2IGNsYXNzPVwiZ3JpZFwiPicgK1xuJyAgICA8ZGl2IGNsYXNzPVwid29ya1wiPjwvZGl2PicgK1xuJzwvZGl2Pic7IiwidmFyIGh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrJyksXG4gICAgQmVoYW5jZSA9IHJlcXVpcmUoJy4uL2ZldGNoX2JlaGFuY2UnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmtfMDEgKCkge1xuICAgIHZhciBjb250ZXh0ID0ge307XG5cbiAgICBkMy5zZWxlY3QoJ2JvZHknKS5odG1sKGh0bWwpO1xuXG4gICAgY29udGV4dC53b3JrID0gV29yaygpXG4gICAgICAgICAgICAgICAgICAgIC53cmFwcGVyKGQzLnNlbGVjdCgnLndvcmsnKSk7XG4gICAgY29udGV4dC5iZWhhbmNlID0gQmVoYW5jZS5zb3VyY2UoJ2xvY2FsJyk7XG5cbiAgICBjb250ZXh0LmJlaGFuY2VcbiAgICAgICAgLmRpc3BhdGNoXG4gICAgICAgIC5vbignZmV0Y2hlZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb250ZXh0LndvcmtcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgICAgIC5yZW5kZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICBjb250ZXh0LmJlaGFuY2UuZmV0Y2goKTtcblxuICAgIHJldHVybiBjb250ZXh0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdyYXBwZXIsXG4gICAgICAgIGRhdGE7XG5cbiAgICBzZWxmLndyYXBwZXIgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB3cmFwcGVyO1xuICAgICAgICB3cmFwcGVyID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGF0YSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRhdGE7XG4gICAgICAgIGRhdGEgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcnKTtcbiAgICAgICAgY29uc29sZS5sb2cod3JhcHBlcik7XG4gICAgICAgIGlmICh3cmFwcGVyICYmXG4gICAgICAgICAgICB3cmFwcGVyLm5vZGUoKSkge1xuXG4gICAgICAgICAgICB3cmFwcGVyLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UnKVxuICAgICAgICAgICAgICAgIC5jYWxsKGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkMy5zZWxlY3QodGhpcykuZGF0dW0oKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RhdGEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
