'use strict';

var spawn = require('child_process').spawn,
    path = require('path');

var search, match;

console.log('\nurlrouter.match vs paths.search (8 paths registered):');

match = spawn('node', [path.resolve(__dirname, 'match.js')]);

match.stdout.pipe(process.stdout);

match.once('close', function () {
    search = spawn('node', [path.resolve(__dirname, 'search.js')]);

    search.stdout.pipe(process.stdout);

    search.once('close', function () {
        console.log('\n(done)');
        process.exit(0);
    });
});
