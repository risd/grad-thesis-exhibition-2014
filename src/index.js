var Map = require('./map')();

exhibition = Exhibition();

window.exhibition = exhibition;

function Exhibition () {
    var context = {};
    context.map = Map.paths(d3.selectAll('.streets path'));

    return context;
}