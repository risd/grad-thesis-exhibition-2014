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