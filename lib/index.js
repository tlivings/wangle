'use strict';

function router() {

	var root = {
		nodes: {},
		insert: insert,
		search: search
	};

	function insert(path, value) {
		var current, elements, element, length, end, param, node;

		current = root;
		elements = path.split('/');
		length = elements.length - 1;

		for (var idx = 0; idx < elements.length; idx++) {
			element = elements[idx];
			end = idx == length;
			node = {
				name: element,
				value: end && value,
				end: end,
				meta: undefined,
				description: path,
				nodes: {}
			};

			if (element[0] == '{') {
				node.meta = element.slice(1, element.length - 1);
				current = current.nodes.$param = node;
				continue;
			}
			if (current.nodes[element]) {
				current = current.nodes[element];
				continue;
			}

			current = current.nodes[element] = node;
		}
	}

	function search(path) {
		var current, potential, elements, element, params, pcount;

		current = root;
		elements = path.split('/');
		pcount = 0;
		params = [];

		for (var idx = 0; idx < elements.length; idx++) {
			element = elements[idx];

			if (current) {
				potential = current.nodes[element];
			}
			if (current && !potential) {
				potential = current.nodes.$param;
				if (potential) {
					params[pcount++] = {
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

	return root;
}

function split(str) {
	var arr = [];
	var last = 0;
	var count = 0;

	for (var i = 0; i < str.length; i++) {
		if (str[i] == '/') {
			arr[count++] = str.slice(last + 1, i);
			last = i;
		}
	}

	arr[count] = str.slice(last + 1, i);

	return arr;
}

module.exports = router;
