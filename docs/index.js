angular
	.module('app', [])
	.controller('ctrl', ['$scope', function($scope) {
		var N_ROWS = 5;

		var index = 0;
		$scope.random = function() {
			index = index % 16 + 1;
			return Math.round(Math.abs(Math.sin(index * 42) * 100)) / 100;
		};

		var slice2d = function(wr) {
			var ans = [];
			for (var i = 0, ii = wr.length; i < ii; i++)
				ans.push(wr[i].slice(0));
			return ans;
		};

		$scope.wr = [
			[''],
			[],
			[],
			[],
			[]
		];
		var initialWr = slice2d($scope.wr);

		$scope.cellChange = function() {
			var ans = slice2d($scope.wr);
			for (var i = 1, ii = ans.length; i < ii; i++) {
				var row = ans[i];
				for (var j = 1, jj = row.length; j < jj; j++) {
					var cell = row[j] = parseFloat(row[j]);
					if (isNaN(cell))
						return $scope.output1 = null;
				}
			}
			$scope.output1 = conquest.calculateAll(ans, true).banTable;
		};

		$scope.excelChange = function() {
			var rows = ('x' + $scope.wrExcel).split(/ *\n */);
			if (rows.length !== N_ROWS) {
				$scope.wr = initialWr;
				return $scope.cellChange();
			}
			var ans = slice2d($scope.wr);
			for (var i = 0, ii = rows.length; i < ii; i++) {
				ans[i] = rows[i].trim().split(/ *\t */).slice(0, N_ROWS);
				if (rows.length !== N_ROWS) {
					$scope.wr = initialWr;
					return $scope.cellChange();
				}
			}
			ans[0][0] = '';
			$scope.wr = ans;
			$scope.cellChange();
		};

		$scope.selectChange = function() {
			var wr = $scope.wr;
			var yourDecks = [wr[1][0], wr[2][0], wr[3][0], wr[4][0]];
			var oppoDecks = [wr[0][1], wr[0][2], wr[0][3], wr[0][4]];
			$scope.banX = yourDecks.indexOf($scope.yourBan) + 1 || -1;
			$scope.banY = oppoDecks.indexOf($scope.oppoBan) + 1 || -1;

			if ($scope.output1 === null || $scope.yourBan === undefined || $scope.oppoBan === undefined)
				return $scope.output2 = null;

			var ans = slice2d(wr);
			ans.splice($scope.banX, 1);
			for (var i = 0, ii = ans.length; i < ii; i++)
				ans[i].splice($scope.banY, 1);
			$scope.output2 = conquest.calculateAll(ans, false);
		};

		$scope.round = function(a) {
			if (typeof a !== 'number')
				return a;
			return Math.round(a * 10000) / 10000
		};
	}]);


(function BrowserCheck() {
	if (navigator.appName == 'Microsoft Internet Explorer') {;
	} else if (navigator.appName ==
		"Netscape") {
		if (navigator.appVersion.indexOf('Trident') === -1) return;
	} else
		return;
	alert('Internet Explorer and Edge makes developers\' lives hard. Don\'t use it.');
	throw '';
})()
