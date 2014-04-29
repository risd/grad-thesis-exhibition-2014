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