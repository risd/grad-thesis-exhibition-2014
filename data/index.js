#!/usr/bin/env node

var fs = require('fs'),
    to_fetch = require('./to_fetch'),
    work = require('./data')();

// DOES NOT WORK,
// because behance's javascript
// api wrapper does not suppoert
// node. looks for jquery or document
// to create an XHR object.
work.toFetch(to_fetch)
    .fetch()
    .dispatch.on('dataFetched', function (error, data) {
        if (error) to_write = { 'error': 'danger.'};
        to_write = data;

        writeData(to_write);
    });


function writeData (data) {
    console.log('writing data');
    console.log(data);
    fs.writeFileSync('users.json',
                     JSON.stringify(data.users),
                     function (error, results) {
                        if (error) {
                            console.log('error');
                            throw error;
                        }

                        console.log('Saved users.json');
                     });

    fs.writeFileSync('projects.json',
                     JSON.stringify(data.projects),
                     function (error, results) {
                        if (error) {
                            console.log('error');
                            throw error;
                        }

                        console.log('Saved projects.json');
                     });
}