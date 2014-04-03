var Map = require('./map')();

exhibition = Exhibition();

function Exhibition () {
    var context = {};
    context.map = Map.render();

    return context;
}