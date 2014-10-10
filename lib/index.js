'use strict';

function router() {

    var root = {
        nodes: {},
        insert: insert,
        search: search
    };

    function insert(path, value) {
        var current, c, idx, last, length, end, node;

        current = root;
        length = path.length - 1;
        idx = 0;
        last = 0;

        while (idx <= length) {
            c = path[idx++];
            end = idx == length + 1;
            node = {
                name: c,
                value: end && value,
                end: end,
                meta: undefined,
                description: path,
                nodes: {}
            };

            if (c == '{') {
                node.name = '$';
                last = idx;
                while (c !== '}') {
                    c = path[idx++];
                }
                node.meta = path.slice(last, idx - 1);
                node.end = true;
                current = current.nodes.$ = node;
                continue;
            }
            if (current.nodes[c]) {
                current = current.nodes[c];
                continue;
            }

            current = current.nodes[c] = node;
        }
    }

    function search(path) {
        var current, length, params;

        current = root;
        length = path.length - 1;
        params = [];

        for (var idx = 0, pcount = 0, c, potential, last; idx <= length; idx++) {
            c = path[idx];

            if (current) {
                potential = current.nodes[c];

                if (!potential) {
                    potential = current.nodes.$;

                    if (potential) {
                        last = idx;
                        while (c != '/' && idx <= length) {
                            c = path[++idx];
                        }
                        params[pcount++] = {
                            key: potential.meta,
                            value: path.slice(last, idx)
                        };
                        idx--;
                    }
                }
            }

            current = potential;
        }

        if (current && current.end) {
            return {
                path: current.description,
                match: path,
                handler: current.value,
                params: params
            };
        }

        return undefined;
    }

    return root;
}

module.exports = router;
