'use strict';

var wangle = require('../../lib'),
    hammer = require('hammertime');

var router = wangle();

router.add('/foo/{id}/baz', true);
router.add('/foo/{id}/baz/ball', true);
router.add('/foobar/{id}/baz', true);
router.add('/foobar/{id}/baz', true);
router.add('/hello/world', true);
router.add('/hello/world/{id}', true);
router.add('/goodbye/world', true);
router.add('/hello/world/{id}', true);

console.log(router.match('/foo/bar/baz'));

hammer({
    iterations: 10000,
    after: function (results) {
        console.dir(results);
    }
}).time(function () {
    router.match('/foo/bar/baz');
});
