'use strict';

var wangle = require('../../lib'),
    hammer = require('hammertime');

var router = wangle();

hammer({
    iterations: 10000,
    before: function (next) {
        router.insert('/hello/{id}/name', true);
        next();
    },
    after: function (results) {
        console.dir(results);
    }
}).time(function () {
    router.search('/hello/1/name');
})
