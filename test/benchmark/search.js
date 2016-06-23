'use strict';

var Router = require('../../lib');
var Hammer = require('hammertime');

var router = Router();

router.add('/foo/{id}/baz', true);
router.add('/foo/{id}/baz/ball', true);
router.add('/foobar/{id}/baz', true);
router.add('/foobar/{id}/baz', true);
router.add('/hello/world', true);
router.add('/hello/world/{id}', true);
router.add('/goodbye/world', true);
router.add('/goodbye/world/{id}', true);
router.add('/bar/baz/{id}', true);
router.add('/bar/baz/{id}/bang', true);

Hammer({
    iterations: 10000,
    after: function (results) {
        console.log('\t2. paths.search: %d operations/second. (%dms)', results.ops, ((results.time / 1000) / results.iterations).toFixed(5));
    }
}).time(function () {
    router.match('/bar/baz/123/bang');
});
