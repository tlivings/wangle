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
            var current, elements, element, length, end, p, n;

            current = this;
            elements = path.split('/');

			length = elements.length - 1;

			for (var idx = 0; idx < elements.length; idx++) {
				element = elements[idx];
				end = idx === length;
				p = param(element);
				n = node(element, end && value, end, p);

				if (p) {
					current = current.nodes.$param = n;
				}
				else {
					current = current.nodes[element] || (current.nodes[element] = n);
				}
			}

            current.description = path;
        },

        search: function (path) {
            var potential, current, elements, params;

            current = this;
            elements = path.split('/');
            params = {};

			for (var idx = 0; idx < elements.length; idx++) {
				if (current) {
					potential = current.nodes[elements[idx]];
				}
				if (!potential) {
					potential = current.nodes.$param;
					if (potential) {
						params[potential.meta] = elements[idx];
					}
				}
				current = potential;
			}

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
