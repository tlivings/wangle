'use strict';

var test = require('tape'),
    wangle = require('../lib');

test('test', function (t) {

    var router = wangle();

    t.test('insert', function (t) {
        t.plan(4);

        router.insert('/foo/bar', function () {});

        t.ok(router.nodes[''], 'root has child.');
        t.ok(router.nodes[''].nodes.foo, 'index has foo child.');
        t.ok(router.nodes[''].nodes.foo.nodes.bar, 'foo has bar child.');
        t.ok(router.nodes[''].nodes.foo.nodes.bar.end, 'bar is end.');
    });

    t.test('search', function (t) {
        t.plan(3);

        t.ok(router.search('/foo/bar'), 'match.');
        t.ok(!router.search('/foo/bar/baz'), 'no match.');
        t.ok(!router.search('/foo'), 'no match.');
    });

    t.test('insert with param', function (t) {
        t.plan(4);

        router.insert('/params/{bar}', function () {});

        t.ok(router.nodes[''], 'root has child.');
        t.ok(router.nodes[''].nodes.params, 'index has params child.');
        t.ok(router.nodes[''].nodes.params.nodes.$param, 'params has $param child.');
        t.ok(router.nodes[''].nodes.params.nodes.$param.meta === 'bar', '$param meta is \'bar\'.');
    });

    t.test('insert with nested param', function (t) {
        t.plan(5);

        router.insert('/params2/{id}/baz', function () {});

        t.ok(router.nodes[''], 'root has child.');
        t.ok(router.nodes[''].nodes.params2, 'index has params child.');
        t.ok(router.nodes[''].nodes.params2.nodes.$param, 'params has $param child.');
        t.ok(router.nodes[''].nodes.params2.nodes.$param.meta === 'id', '$param meta is \'id\'.');
        t.ok(router.nodes[''].nodes.params2.nodes.$param.nodes.baz, '\'id\' param node has baz node.');
    });

    t.test('search params', function (t) {
        t.plan(6);

        var route = router.search('/params/anything');

        t.ok(route, 'match.');
        t.ok(route.path === '/params/{bar}', 'path is correct.');
        t.ok(route.match === '/params/anything', 'match path is correct.');
        t.ok(router.search('/params2/bar/baz'), 'match.');
        t.ok(router.search('/params2/bar/baz').params.id === 'bar', 'bar param mapped.');
        t.ok(!router.search('/params'), 'no match.');
    });

});
