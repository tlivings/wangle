'use strict';

var Spawn = require('child_process').spawn;
var Path = require('path');

var search, match;

console.log('\nurlrouter.match vs paths.search (10 paths registered):');

match = Spawn('node', [Path.resolve(__dirname, 'match.js')]);

match.stdout.pipe(process.stdout);

match.once('close', function () {
    search = Spawn('node', [Path.resolve(__dirname, 'search.js')]);

    search.stdout.pipe(process.stdout);

    search.once('close', function () {
        console.log('\n(done)');
        process.exit(0);
    });
});
