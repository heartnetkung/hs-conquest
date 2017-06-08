var protoArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
if (typeof exports === 'undefined')
	var exports = conquest = {};


var buildCache = exports.buildCache = function(table) {
	var cache = {};
	for (var i = 1, ii = table.length; i < ii; i++) {
		var current = table[i];
		for (var j = 1, jj = current.length; j < jj; j++)
			cache[i + '_' + j] = table[i][j];
	}
	return cache;
};


var winrateRecursive = function(cache, deckI, deckJ) {
	if (deckI.length === 0)
		return 1;
	if (deckJ.length === 0)
		return 0;
	var ans = 0;
	for (var i = 0, ii = deckI.length; i < ii; i++) {
		for (var j = 0, jj = deckJ.length; j < jj; j++) {
			var winrate = cache[deckI[i] + '_' + deckJ[j]];
			ans += winrate * winrateRecursive(cache, sliceSplice(deckI, i), deckJ);
			ans += (1 - winrate) * winrateRecursive(cache, deckI, sliceSplice(deckJ, j));
		}
	}
	return ans / (deckI.length * deckJ.length);
};
exports.winrateRecursive = winrateRecursive;


var sliceSplice = function(array, i, len) {
	var temp = array.slice(0, len);
	temp.splice(i, 1);
	return temp;
};


var calculateAll = function(table, isBan) {
	var cache = buildCache(table);
	var ans = {};
	if (isBan) {
		ans.banTable = calculateBan(table, cache);
	} else {
		var len = table.length - 1;
		ans.winrate = winrateRecursive(cache, protoArray.slice(0, len), protoArray.slice(0, len));
		ans.firstPickTable = calculateFirstPick(table, cache);
	}
	return ans;
};
exports.calculateAll = calculateAll;


var calculateBan = function(table, cache) {
	var ans = [table[0]];
	var len = table.length - 1;
	for (var i = 0; i < len; i++) {
		var current = [];
		ans.push(current);
		current.push(table[i + 1][0]);
		for (var j = 0; j < len; j++) {
			current.push(winrateRecursive(cache, sliceSplice(protoArray, i, len),
				sliceSplice(protoArray, j, len)));
		}
	}
	return ans;
};


var calculateFirstPick = function(table, cache) {
	var ans = [table[0]];
	var len = table.length - 1;
	var proto2 = protoArray.slice(0, len);

	for (var i = 0; i < len; i++) {
		var current = [];
		ans.push(current);
		current.push(table[i + 1][0]);
		for (var j = 0; j < len; j++) {
			var ifWin = winrateRecursive(cache, sliceSplice(proto2, i), proto2);
			var ifLose = winrateRecursive(cache, proto2, sliceSplice(proto2, j));
			var winrate = cache[(i + 1) + '_' + (j + 1)];
			current.push(winrate * ifWin + (1 - winrate) * ifLose);
		}
	}
	return ans;
};
