module.exports = function data () {
    var self = {};

    self.dispatch = d3.dispatch('data');

    return self;
};