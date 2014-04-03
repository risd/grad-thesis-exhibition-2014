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