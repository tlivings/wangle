'use strict';

var wangle = require('../../lib'),
    hammer = require('hammertime');

var router = wangle();

router.insert('/foo/{id}/baz', true);

hammer({
    iterations: 10000,
    after: function (results) {
        console.dir(results);
    }
}).time(function () {
    router.search('/foo/bar/baz');
})
