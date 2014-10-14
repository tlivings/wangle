'use strict';

var test = require('tape'),
wangle = require('../lib');

test('test', function (t) {

    var router = wangle();

    t.test('add and match', function (t) {
        t.plan(3);

        router.add('/foo/bar', true);

        t.ok(router.match('/foo/bar'), 'match.');
        t.ok(!router.match('/foo/bar/baz'), 'no match.');
        t.ok(!router.match('/foo'), 'no match.');
    });

    t.test('add and match overlap', function (t) {
        t.plan(3);

        router.add('/foo/bar/baz', true);

        t.ok(router.match('/foo/bar'), 'match.');
        t.ok(router.match('/foo/bar/baz'), 'match.');
        t.ok(!router.match('/foo'), 'no match.');
    });

    t.test('add and match with params', function (t) {
        t.plan(6);

        router.add('/params/{bar}', true);
        router.add('/params/{bar}/baz', true);

        router.add('/params2/{id}/baz', true);

        var route = router.match('/params/anything');

        t.ok(route, 'match.');
        t.ok(route.path === '/params/{bar}', 'path is correct.');
        t.ok(route.match === '/params/anything', 'match path is correct.');
        t.ok(router.match('/params2/bar/baz'), 'match.');
        t.ok(router.match('/params2/bar/baz').params[0].value === 'bar', 'bar param mapped.');
        t.ok(!router.match('/params'), 'no match.');
    });

    t.test('optional params', function (t) {
        t.plan(2);

        router.add('/optional/{id?}', true);

        t.ok(router.match('/optional'), 'match.');
        t.ok(router.match('/optional/1'), 'match.');
    });

});
