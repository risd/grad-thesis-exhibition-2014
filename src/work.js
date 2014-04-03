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