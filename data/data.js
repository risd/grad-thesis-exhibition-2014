var queue = require('queue-async'),
    be = require('./be')("sGRp891umgwx4IT318rFcueQcjmr9bt3"),
    dispatch = require('d3').dispatch;

module.exports = function fetch () {
    var self = {},
        to_fetch,
        data = {
            projects: [],
            users: []
        },
        q = {
          users: queue(1),
          projects: queue(1)
        };

    // emits 'dataFetched', for when
    // the data has been fetched
    self.dispatch = dispatch('dataFetched');

    self.toFetch = function (x) {
        if (!arguments.length) return to_fetch;
        to_fetch = x;
        return self;
    };

    self.data = function (x) {
        if (!arguments.length) return data;
        data = x;
        return self;
    };

    self.fetch = function () {
        fetch_users();
        return self;
    };

    function fetch_users () {
        console.log('fetching users');
        to_fetch.users.forEach(function (d, i) {
            console.log(d);
            q.users.defer(be.user.projects, d, function (results) {
                if (results.http_code === 200) {
                    results.projects.forEach(function (project) {
                        if (project.fields.indexOf(to_fetch.tag)) {
                            data.users.push(project);
                        }
                    });
                }
            });
        });

        q.users.awaitAll(function(error, results) {
            fetch_projects();
        });
    }

    function fetch_projects () {
        console.log('fetching projects');
        data.users.forEach(function (d, i) {
            console.log(d);
            q.projects.defer(be.project, d.id, function (results) {
                if (results.http_code === 200) {
                    data.projects.push(results.project);
                }
            });
        });

        q.projects.awaitAll(function (error, results) {
            self.dispatch('dataFetched', error, data);
        });
    }

    return self;
};