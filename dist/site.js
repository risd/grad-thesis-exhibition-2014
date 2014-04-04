(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
var SVGMap = require('./map')(),
    Behance = require('./fetch_behance')(),
    Work = require('./work');

exhibition = Exhibition();

window.exhibition = exhibition;

function Exhibition () {
    var context = {};
    context.map = SVGMap.paths(d3.selectAll('.streets path'));
    context.work = Work(context)
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
}
},{"./fetch_behance":1,"./map":3,"./work":4}],3:[function(require,module,exports){
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

    return self;
};
},{}],4:[function(require,module,exports){
module.exports = function Work (context) {
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
},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2ZldGNoX2JlaGFuY2UuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbWFwLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRmV0Y2hCZWhhbmNlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB0b19mZXRjaCA9IHtcbiAgICAgICAgICAgIHVzZXJzOiBbJ1phc2hhcnlDYXJvJyxcbiAgICAgICAgICAgICAgICAgICAgJ0pMdW5nJyxcbiAgICAgICAgICAgICAgICAgICAgJ2FuZGllZGlua2luJyxcbiAgICAgICAgICAgICAgICAgICAgJ3NwYXJrMTknXSxcbiAgICAgICAgICAgIHRhZzogJ0ZpbmUgQXJ0cydcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHByb2plY3RzOiBbXVxuICAgICAgICB9LFxuICAgICAgICBzb3VyY2UgPSAnbG9jYWwnLFxuICAgICAgICBzb3VyY2VzID0gWydsb2NhbCcsICdiZWhhbmNlJ10sXG4gICAgICAgIGZldGNoX2Zyb20gPSB7XG4gICAgICAgICAgICBsb2NhbDogaW5pdF9mZXRjaF9sb2NhbCxcbiAgICAgICAgICAgIGJlaGFuY2U6IGluaXRfZmV0Y2hfYmVoYW5jZVxuICAgICAgICB9O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdmZXRjaGVkJyk7XG5cbiAgICBwdWJsaWNfYXBpX2tleSA9IFwic0dScDg5MXVtZ3d4NElUMzE4ckZjdWVRY2ptcjlidDNcIjtcbiAgICBiZSA9IGJlKHB1YmxpY19hcGlfa2V5KTtcblxuICAgIHNlbGYuc291cmNlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc291cmNlO1xuICAgICAgICBzb3VyY2UgPSB4O1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmV0Y2hfZnJvbVtzb3VyY2VdKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0X2ZldGNoX2JlaGFuY2UgKCkge1xuICAgICAgICBpZiAodG9fZmV0Y2gudXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZmV0Y2hfcHJvamVjdHModG9fZmV0Y2gudXNlcnMubGVuZ3RoLTEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmV0Y2hfcHJvamVjdHMgKHVzZXJfaW5kZXgpIHtcbiAgICAgICAgYmUudXNlclxuICAgICAgICAgICAgLnByb2plY3RzKFxuICAgICAgICAgICAgICAgIHRvX2ZldGNoLnVzZXJzW3VzZXJfaW5kZXhdLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzLmh0dHBfY29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnByb2plY3RzLmZvckVhY2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHByb2plY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb2plY3QuZmllbGRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZih0YWdfdG9faW5jbHVkZSkgPiAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICgodXNlcl9pbmRleCAtIDEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoX3Byb2plY3RzKCh1c2VyX2luZGV4IC0gMSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfcHJvamVjdF9kZXRhaWxzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhLnByb2plY3RzLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmV0Y2hfcHJvamVjdF9kZXRhaWxzIChwcm9qZWN0X2luZGV4KSB7XG4gICAgICAgIGJlLnByb2plY3QodXNlcl9kYXRhW3Byb2plY3RfaW5kZXhdLmlkLFxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5odHRwX2NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnByb2plY3RzLmRldGFpbHMgPSByZXN1bHRzLnByb2plY3Q7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKChwcm9qZWN0X2luZGV4IC0xKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoX3Byb2plY3RfZGV0YWlscygocHJvamVjdF9pbmRleCAtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZmV0Y2hlZChkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0X2ZldGNoX2xvY2FsICgpIHtcbiAgICAgICAgZDMuanNvbihcIi4uL2RhdGEvcHJvamVjdHMuanNvblwiLCBmdW5jdGlvbiAocHJvamVjdHMpIHtcbiAgICAgICAgICAgIGRhdGEgPSBwcm9qZWN0cztcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZmV0Y2hlZChkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBTVkdNYXAgPSByZXF1aXJlKCcuL21hcCcpKCksXG4gICAgQmVoYW5jZSA9IHJlcXVpcmUoJy4vZmV0Y2hfYmVoYW5jZScpKCksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpO1xuXG5leGhpYml0aW9uID0gRXhoaWJpdGlvbigpO1xuXG53aW5kb3cuZXhoaWJpdGlvbiA9IGV4aGliaXRpb247XG5cbmZ1bmN0aW9uIEV4aGliaXRpb24gKCkge1xuICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgY29udGV4dC5tYXAgPSBTVkdNYXAucGF0aHMoZDMuc2VsZWN0QWxsKCcuc3RyZWV0cyBwYXRoJykpO1xuICAgIGNvbnRleHQud29yayA9IFdvcmsoY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgLndyYXBwZXIoZDMuc2VsZWN0KCcud29yaycpKTtcbiAgICBjb250ZXh0LmJlaGFuY2UgPSBCZWhhbmNlLnNvdXJjZSgnbG9jYWwnKTtcblxuICAgIGNvbnRleHQuYmVoYW5jZVxuICAgICAgICAuZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdmZXRjaGVkJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnRleHQud29ya1xuICAgICAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAgICAgLnJlbmRlcigpO1xuICAgICAgICB9KTtcblxuICAgIGNvbnRleHQuYmVoYW5jZS5mZXRjaCgpO1xuXG4gICAgcmV0dXJuIGNvbnRleHQ7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBNYXAgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIG1hcCxcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uLFxuICAgICAgICBzdGF0ZSA9ICdoaWRkZW4nO1xuXG4gICAgc2VsZi5wYXRocyA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHBhdGhzX3NlbGVjdGlvbjtcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhdGUgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzdGF0ZTtcbiAgICAgICAgc3RhdGUgPSB4O1xuICAgICAgICBhcHBseV9zdGF0ZSgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwbHlfc3RhdGUgKCkge1xuICAgICAgICB2YXIgdHdlZW5fZGFzaHMgPSB7XG4gICAgICAgICAgICAnaGlkZGVuJzogIHR3ZWVuX2Rhc2hfaGlkZSxcbiAgICAgICAgICAgICdzaG93aW5nJzogdHdlZW5fZGFzaF9zaG93XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBwYXRoc19zZWxlY3Rpb25cbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKFwic3Ryb2tlLWRhc2hhcnJheVwiLCB0d2Vlbl9kYXNoc1tzdGF0ZV0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfaGlkZSgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcobCArIFwiLFwiICsgbCwgXCIwLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2Rhc2hfc2hvdygpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXCIwLFwiICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFdvcmsgKGNvbnRleHQpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3cmFwcGVyLFxuICAgICAgICBkYXRhO1xuXG4gICAgc2VsZi53cmFwcGVyID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gd3JhcHBlcjtcbiAgICAgICAgd3JhcHBlciA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRhdGEgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkYXRhO1xuICAgICAgICBkYXRhID0geDtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncmVuZGVyaW5nJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHdyYXBwZXIpO1xuICAgICAgICBpZiAod3JhcHBlciAmJlxuICAgICAgICAgICAgd3JhcHBlci5ub2RlKCkpIHtcblxuICAgICAgICAgICAgd3JhcHBlci5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgICAgICAuY2FsbChmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZDMuc2VsZWN0KHRoaXMpLmRhdHVtKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkYXRhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiXX0=
