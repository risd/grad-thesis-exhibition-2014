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