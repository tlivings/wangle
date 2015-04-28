'use strict';

var CreateRouter = require('urlrouter/lib/utils').createRouter;
var Hammer = require('hammertime');

var routes = [
    CreateRouter('/foo/:id/baz'),
    CreateRouter('/foo/:id/baz/ball'),
    CreateRouter('/foobar/:id'),
    CreateRouter('/foobar/:id/baz'),
    CreateRouter('/hello/world'),
    CreateRouter('/hello/world/:id'),
    CreateRouter('/goodbye/world'),
    CreateRouter('/goodbye/world/:id')
];

Hammer({
    iterations: 10000,
    after: function (results) {
        console.log('\t1. urlrouter.match: %d operations/second. (%dms)', results.ops, ((results.time / 1000) / results.iterations).toFixed(5));
    }
}).time(function () {
    for (var i = 0; i < routes.length; i++) {
        routes[i].match('/foo/bar/baz');
    }
});
