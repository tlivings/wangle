'use strict';

function router() {
    return node(undefined, undefined, true);
}

function node(name, value, end, meta) {
    return {
        name: name,
        value: value,
        end: end,
        wildcard: !!meta,
        meta: meta,
        description: undefined,
        nodes: {},

        insert: function (path, value) {
            var current, elements;

            current = this;
            elements = path.split('/');

            elements.forEach(function (element, idx) {
                var end, p, n;

                end = idx === elements.length - 1;
                p = param(element);
                n = node(element, end && value, end, p);

                if (p) {
                    current = current.nodes.$param || (current.nodes.$param = n);
                    return;
                }

                current = current.nodes[element] || (current.nodes[element] = n);
            });

            current.description = path;
        },

        search: function (path) {
            var current, elements, params;

            current = this;
            elements = path.split('/');
            params = {};

            elements.forEach(function (element, idx) {
                current = current && (current.nodes[element] || current.nodes.$param);
                if (current && current.wildcard) {
                    params[current.meta] = element;
                }
            });

            return current && current.end ? route(path, current, params) : undefined;
        }
    };
}

function param(element) {
    if (element[0] === '{' && element[element.length - 1] === '}') {
        return element.slice(1, element.length - 1);
    }
    return undefined;
}

function route(path, node, params) {
    return {
        path: node.description,
        match: path,
        handler: node.value,
        params: params || {}
    };
}

module.exports = router;
