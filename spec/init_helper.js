global.describeIt = function(name, func) {
	describe(name, function() {
		it('', func);
	});
};