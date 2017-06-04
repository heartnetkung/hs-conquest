var conquest = require('../conquest');

describeIt('buildCache', function() {
	// var table = [
	// 	['  ', 'j1', 'j2', 'j3', 'j4'],
	// 	['i1', 1, 0, 0.5, 0.5],
	// 	['i2', 0.5, 0.5, 0.5, 0.5],
	// 	['i3', 0.5, 0.5, 0.5, 0.5],
	// 	['i4', 0.5, 0.5, 0.5, 0.5]
	// ];
	var table = [
		['  ', 'j1', 'j2', 'j3'],
		['i1', 1, 0, 0.5],
		['i2', 0.5, 0.5, 0.5],
		['i3', 0.5, 0.5, 0.5]
	];
	var cache = conquest.buildCache(table);
	//console.log(cache);
	//console.log(conquest.winrateRecursive(cache, [1, 2, 3], [1, 2, 3]));
	console.log(conquest.calculateAll(table, true));
	console.log(conquest.calculateAll(table, false));
});
