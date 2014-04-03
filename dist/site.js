(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Map = require('./map')(),
    Work = require('./work');

exhibition = Exhibition();

window.exhibition = exhibition;

function Exhibition () {
    var context = {};
    context.map = Map.paths(d3.selectAll('.streets path'));
    context.work = Work(context).fetchAndRender();

    return context;
}
},{"./map":2,"./work":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
module.exports = function Work (context) {
    var self = {},
        users_to_include = ['ZasharyCaro'],
        tag_to_include = 'Fine Arts',
        user_data = [],
        project_data = [];

    self.dispatch = d3.dispatch('loadedProjects');

    self.dispatch.on('loadedProjects', render);

    self.fetch = function () {
        self.dispatch.on('loadedProjects', null);
        
        init_fetch();

        return self;
    };

    self.fetchAndRender = function () {
        self.dispatch.on('loadedProjects', render);
        
        init_fetch();
        
        return self;
    };

    function render () {
        console.log('rendering');
    }

    function init_fetch () {
        if (users_to_include.length > 0) {
            if (window.localStorage
                       .getItem('grad-thesis-projects')) {

                data =  JSON.parse(
                    window.localStorage
                        .getItem('grad-thesis-projects'));
                console.log(data);
                self.dispatch.loadedProjects();
            } else {
                fetch_projects(users_to_include.length-1);
            }
        }
    }

    function fetch_user_data (user_index) {
        be.user
            .projects(
                users_to_include[user_index],
                function (results) {
                    if (results.http_code === 200) {
                        results.projects.forEach(
                            function (project) {
                                if (project.fields
                                    .indexOf(tag_to_include) > -1) {

                                    user_data.push(project);
                                }
                            });
                    }
                    if ((user_index - 1) >= 0) {
                        fetch_user_data((user_index - 1));
                    } else {
                        fetch_projects((user_data.length - 1));
                    }
            });
    }

    function fetch_projects (project_index) {
        be.project(user_data[project_index].id,
            function (results) {
                if (results.http_code === 200) {
                    project_data.push(results.project);
                }
                if ((project_index -1) >= 0) {
                    fetch_projects((project_index -1));
                } else {
                    self.dispatch.loadedProjects();

                    if (window.localStorage) {
                        window.localStorage.setItem(
                            'grad-thesis-projects',
                            JSON.stringify(project_data));
                    }
                }
            });
    }

    return self;
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL21hcC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBNYXAgPSByZXF1aXJlKCcuL21hcCcpKCksXG4gICAgV29yayA9IHJlcXVpcmUoJy4vd29yaycpO1xuXG5leGhpYml0aW9uID0gRXhoaWJpdGlvbigpO1xuXG53aW5kb3cuZXhoaWJpdGlvbiA9IGV4aGliaXRpb247XG5cbmZ1bmN0aW9uIEV4aGliaXRpb24gKCkge1xuICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgY29udGV4dC5tYXAgPSBNYXAucGF0aHMoZDMuc2VsZWN0QWxsKCcuc3RyZWV0cyBwYXRoJykpO1xuICAgIGNvbnRleHQud29yayA9IFdvcmsoY29udGV4dCkuZmV0Y2hBbmRSZW5kZXIoKTtcblxuICAgIHJldHVybiBjb250ZXh0O1xufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTWFwICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBtYXAsXG4gICAgICAgIHBhdGhzX3NlbGVjdGlvbixcbiAgICAgICAgc3RhdGUgPSAnaGlkZGVuJztcblxuICAgIHNlbGYucGF0aHMgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwYXRoc19zZWxlY3Rpb247XG4gICAgICAgIHBhdGhzX3NlbGVjdGlvbiA9IHg7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnN0YXRlID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc3RhdGU7XG4gICAgICAgIHN0YXRlID0geDtcbiAgICAgICAgYXBwbHlfc3RhdGUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGx5X3N0YXRlICgpIHtcbiAgICAgICAgdmFyIHR3ZWVuX2Rhc2hzID0ge1xuICAgICAgICAgICAgJ2hpZGRlbic6ICB0d2Vlbl9kYXNoX2hpZGUsXG4gICAgICAgICAgICAnc2hvd2luZyc6IHR3ZWVuX2Rhc2hfc2hvd1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcGF0aHNfc2VsZWN0aW9uXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgICAgICAgLmF0dHJUd2VlbihcInN0cm9rZS1kYXNoYXJyYXlcIiwgdHdlZW5fZGFzaHNbc3RhdGVdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX2hpZGUoKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKGwgKyBcIixcIiArIGwsIFwiMCxcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9kYXNoX3Nob3coKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKFwiMCxcIiArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBXb3JrIChjb250ZXh0KSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgdXNlcnNfdG9faW5jbHVkZSA9IFsnWmFzaGFyeUNhcm8nXSxcbiAgICAgICAgdGFnX3RvX2luY2x1ZGUgPSAnRmluZSBBcnRzJyxcbiAgICAgICAgdXNlcl9kYXRhID0gW10sXG4gICAgICAgIHByb2plY3RfZGF0YSA9IFtdO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdsb2FkZWRQcm9qZWN0cycpO1xuXG4gICAgc2VsZi5kaXNwYXRjaC5vbignbG9hZGVkUHJvamVjdHMnLCByZW5kZXIpO1xuXG4gICAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignbG9hZGVkUHJvamVjdHMnLCBudWxsKTtcbiAgICAgICAgXG4gICAgICAgIGluaXRfZmV0Y2goKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5mZXRjaEFuZFJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5kaXNwYXRjaC5vbignbG9hZGVkUHJvamVjdHMnLCByZW5kZXIpO1xuICAgICAgICBcbiAgICAgICAgaW5pdF9mZXRjaCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0X2ZldGNoICgpIHtcbiAgICAgICAgaWYgKHVzZXJzX3RvX2luY2x1ZGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgLmdldEl0ZW0oJ2dyYWQtdGhlc2lzLXByb2plY3RzJykpIHtcblxuICAgICAgICAgICAgICAgIGRhdGEgPSAgSlNPTi5wYXJzZShcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldEl0ZW0oJ2dyYWQtdGhlc2lzLXByb2plY3RzJykpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2gubG9hZGVkUHJvamVjdHMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmV0Y2hfcHJvamVjdHModXNlcnNfdG9faW5jbHVkZS5sZW5ndGgtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmZXRjaF91c2VyX2RhdGEgKHVzZXJfaW5kZXgpIHtcbiAgICAgICAgYmUudXNlclxuICAgICAgICAgICAgLnByb2plY3RzKFxuICAgICAgICAgICAgICAgIHVzZXJzX3RvX2luY2x1ZGVbdXNlcl9pbmRleF0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMuaHR0cF9jb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHJvamVjdHMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocHJvamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvamVjdC5maWVsZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmRleE9mKHRhZ190b19pbmNsdWRlKSA+IC0xKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfZGF0YS5wdXNoKHByb2plY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCh1c2VyX2luZGV4IC0gMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfdXNlcl9kYXRhKCh1c2VyX2luZGV4IC0gMSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hfcHJvamVjdHMoKHVzZXJfZGF0YS5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZldGNoX3Byb2plY3RzIChwcm9qZWN0X2luZGV4KSB7XG4gICAgICAgIGJlLnByb2plY3QodXNlcl9kYXRhW3Byb2plY3RfaW5kZXhdLmlkLFxuICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0cy5odHRwX2NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0X2RhdGEucHVzaChyZXN1bHRzLnByb2plY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHByb2plY3RfaW5kZXggLTEpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hfcHJvamVjdHMoKHByb2plY3RfaW5kZXggLTEpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmxvYWRlZFByb2plY3RzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZ3JhZC10aGVzaXMtcHJvamVjdHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHByb2plY3RfZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
