'use strict';

var paths = require('./paths');

function router() {
    var tree = paths();

    return {
        add: function (path, handler) {
            tree.insert(normalizePath(path), handler);
        },
        match: function (path) {
            return tree.search(normalizePath(path));
        }
    };
}

function normalizePath(path) {
    var length = path.length - 1;

    if (path[0] !== '/') {
        path = '/' + path;
    }
    if (path[length] === '/') {
        path = path.slice(0, length);
    }

    return path;
}

module.exports = router;
