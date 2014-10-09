'use strict';

function router() {
	return {
		nodes: {},

		insert: function (path, value) {
			var current, elements, element, length, end, param, node;

			current = this;
			elements = path.split('/');

			length = elements.length - 1;

			for (var idx = 0; idx < elements.length; idx++) {
				element = elements[idx];
				end = idx === length;
				node = {
					name: element,
					value: end && value,
					end: end,
					meta: undefined,
					description: path,
					nodes: {}
				};

				if (element[0] === '{') {
					node.meta = element.slice(1, element.length - 1);
				}

				if (node.meta) {
					current = current.nodes.$param = node;
				}
				else {
					current = current.nodes[element] || (current.nodes[element] = node);
				}
			}
		},

		search: function (path) {
			var potential, current, elements, element, params, pc;

			current = this;
			elements = path.split('/');
			pc = 0;
			params = [];

			for (var idx = 0; idx < elements.length; idx++) {
				element = elements[idx];

				if (current) {
					potential = current.nodes[element];
				}
				if (current && !potential) {
					potential = current.nodes.$param;
					if (potential) {
						params[pc++] = {
							key: potential.meta,
							value: element
						};
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
	};
}

module.exports = router;
