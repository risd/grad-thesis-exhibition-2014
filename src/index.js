var prototypes = {
    concept: {
        '00': Concept_00,
        '01': Concept_01,
        '01a': Concept_01a,
        '02': Concept_02,
        '03': Concept_03,
        '04': Concept_04
    },
    work: {
        '01': Work_01,
        '01a': Work_01a,
        '01b': Work_01b,
        '02': Work_02,
        '03': Work_03,
        '04': Work_04
    },
    index: {
        '00': function () {}
    }
};

var prototype_to_load = (function () {
    var hash_vars = ['index', '00'];

    var hash = window.location.hash;

    if (hash) {
        hash_vars = hash.split('#')[1].split('&')[0].split('=');
    }

    // return ['work', '01']
    return hash_vars;
})();

exhibition = prototypes[prototype_to_load[0]][prototype_to_load[1]]();

window.exhibition = exhibition;

function Work_01 () {
    var work = require('./work_01/index.js')().render();
    return work;
}
function Work_01a () {
    var work = require('./work_01a/index.js')().render();
    return work;
}
function Work_01b () {
    var work = require('./work_01b/index.js')().render();
    return work;
}
function Work_02 () {
    var work = require('./work_02/index.js')().render();
    return work;
}
function Work_03 () {
    var work = require('./work_03/index.js')().render();
    return work;
}
function Work_04 () {
    var work = require('./work_04/index.js')().render();
    return work;
}

function Concept_00 () {
    var concept = require('./concept_00/index.js')().render();
    return concept;
}

function Concept_01 () {
    var concept = require('./concept_01/index.js')().render();
    return concept;
}

function Concept_01a () {
    var concept = require('./concept_01a/index.js')().render();
    return concept;
}

function Concept_02 () {
    var concept = require('./concept_02/index.js')().render();
    return concept;
}

function Concept_03 () {
    var concept = require('./concept_03/index.js')().render();
    return concept;
}

function Concept_04 () {
    var concept = require('./concept_04/index.js')().render();
    return concept;
}