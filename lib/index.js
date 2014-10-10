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
            end = idx >= length + 1;
            node = {
                name: c,
                value: end && value,
                end: end,
                meta: undefined,
                description: path,
                nodes: {}
            };

            if (c === '{') {
                last = idx;
                while (c !== '}') {
                    c = path[idx++];
                }
                if (current.nodes.$) {
                    current = current.nodes.$;
                    continue;
                }
                node.name = '$';
                node.meta = path.slice(last, idx - 1);
                node.end = (idx >= length + 1);
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
        var current, length, params, param;

        current = root;
        length = path.length - 1;
        params = [];
        param = '';

        for (var idx = 0, c, potential; idx <= length; idx++) {
            c = path[idx];

            potential = current.nodes[c];

            if (potential) {
                current = potential;
                continue;
            }

            potential = current.nodes.$;

            if (!potential) {
                return undefined;
            }

            while (path[idx] !== '/' && idx <= length) {
                param += path[idx];
                idx++;
            }

            params[params.length] = {
                key: potential.meta,
                value: param
            };

            param = '';
            idx--;

            current = potential;
        }

        if (current.end) {
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
