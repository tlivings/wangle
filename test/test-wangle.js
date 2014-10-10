'use strict';

var test = require('tape'),
wangle = require('../lib');

test('test', function (t) {

    var router = wangle();

    t.test('insert and search', function (t) {
        t.plan(3);

        router.insert('/foo/bar', true);

        t.ok(router.search('/foo/bar'), 'match.');
        t.ok(!router.search('/foo/bar/baz'), 'no match.');
        t.ok(!router.search('/foo'), 'no match.');
    });

    t.test('insert and search overlap', function (t) {
        t.plan(3);

        router.insert('/foo/bar/baz', true);

        t.ok(router.search('/foo/bar'), 'match.');
        t.ok(router.search('/foo/bar/baz'), 'match.');
        t.ok(!router.search('/foo'), 'no match.');
    });

    t.test('insert and search with params', function (t) {
        t.plan(6);

        router.insert('/params/{bar}', true);
        router.insert('/params/{bar}/baz', true);

        router.insert('/params2/{id}/baz', true);

        var route = router.search('/params/anything');

        t.ok(route, 'match.');
        t.ok(route.path === '/params/{bar}', 'path is correct.');
        t.ok(route.match === '/params/anything', 'match path is correct.');
        t.ok(router.search('/params2/bar/baz'), 'match.');
        t.ok(router.search('/params2/bar/baz').params[0].value === 'bar', 'bar param mapped.');
        t.ok(!router.search('/params'), 'no match.');
    });

});
