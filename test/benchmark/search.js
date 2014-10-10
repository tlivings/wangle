'use strict';

var paths = require('../../lib/paths'),
    hammer = require('hammertime');

var router = paths();

router.insert('/foo/{id}/baz', true);
router.insert('/foo/{id}/baz/ball', true);
router.insert('/foobar/{id}/baz', true);
router.insert('/foobar/{id}/baz', true);
router.insert('/hello/world', true);
router.insert('/hello/world/{id}', true);
router.insert('/goodbye/world', true);
router.insert('/hello/world/{id}', true);

hammer({
    iterations: 10000,
    after: function (results) {
        console.log('\t2. paths.search: %d operations/second. (%dms)', results.ops, (results.time / 1000) / results.iterations);
    }
}).time(function () {
    router.search('/foo/bar/baz');
});
