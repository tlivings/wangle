'use strict';

var Trie = require('./trie');

const router = function () {
    const tree = Trie();

    return {
        add: function (path, handler) {
            tree.insert(normalizePath(path), handler);
        },
        match: function (path) {
            const match = tree.search(normalizePath(path));

            if (match) {
                return {
                    path: match.description,
                    match: path,
                    handler: match.value,
                    params: match.params
                };
            }
        }
    };
}

const normalizePath = function (path) {
    const length = path.length - 1;

    if (path[0] !== '/') {
        path = '/' + path;
    }
    if (path[length] === '/') {
        path = path.slice(0, length);
    }

    return path;
}

module.exports = router;
