'use strict';

var createRouter = require('urlrouter/lib/utils').createRouter,
    hammer = require('hammertime');

var routes = [
    createRouter('/foo/:id/baz'),
    createRouter('/foo/:id/baz/ball'),
    createRouter('/foobar/:id'),
    createRouter('/foobar/:id/baz'),
    createRouter('/hello/world'),
    createRouter('/hello/world/:id'),
    createRouter('/goodbye/world'),
    createRouter('/goodbye/world/:id')
];

hammer({
    iterations: 10000,
    after: function (results) {
        console.log('\t1. urlrouter.match: %d operations/second. (%dms)', results.ops, ((results.time / 1000) / results.iterations).toFixed(5));
    }
}).time(function () {
    for (var i = 0; i < routes.length; i++) {
        routes[i].match('/foo/bar/baz');
    }
});
