'use strict';

var createRouter = require('urlrouter/lib/utils').createRouter,
    hammer = require('hammertime');

var router = createRouter('/foo/:id/baz');

console.log(router.match('/foo/bar/baz'));

hammer({
    iterations: 10000,
    after: function (results) {
        console.dir(results);
    }
}).time(function () {
    router.match('/foo/bar/baz');
})
