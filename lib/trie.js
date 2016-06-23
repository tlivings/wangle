'use strict';

const trie = function () {
    const root = {
        nodes: {}
    };

    const insert = function (path, value) {
        const length = path.length - 1;
        let current = root;
        let idx = 0;
        let last = 0;

        while (idx <= length) {
            let c = path[idx++];
            const end = idx >= length + 1;
            const node = {
                parent: current,
                name: c,
                value: end ? value : undefined,
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

                if (node.meta[node.meta.length - 1] === '?') {
                    node.meta =  node.meta.slice(0, node.meta.length - 1);
                    current.parent.end = true;
                }

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

    const search = function (path) {
        const length = path.length - 1;
        const params = [];
        let current = root;
        let param = '';

        for (let idx = 0; idx <= length; idx++) {
            const c = path[idx];
            let potential = current.nodes[c];

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
            current.params = params;
            return current;
        }

        return undefined;
    }

    return {
        insert: insert,
        search: search
    };
}

module.exports = trie;
