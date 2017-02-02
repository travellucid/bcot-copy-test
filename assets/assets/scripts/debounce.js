'use strict';
var debounce = (function() {
	var timers = {};

	return function(callback, ms, uniqueId) {
		if(!uniqueId) {
			uniqueId = "someUniqueId";
		}
		clearTimeout(timers[uniqueId]);

		timers[uniqueId] = setTimeout(callback,ms);
	}
})();