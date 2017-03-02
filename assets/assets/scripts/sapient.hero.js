var heroObj = (function($, window, sapient) {

	var heroInstance;

	function createHeroInstance() {

		var setLocalTime = function() {
			var time = new Date(),
			hours = time.getHours()-12,
			mins = time.getMinutes(),
			secs = time.getSeconds(),
			dateTimeHeading = $("#hero-component date-time");
			if(dateTimeHeading.length > 0) {
				$("#hero-component date-time").text(time);				
			}
		};


		return {
			setLocalTime: setLocalTime
		};
	}

	return {
		getInstance: function() {
			if (!heroInstance) {
				heroInstance = createHeroInstance();
			}
			return heroInstance;
		}
	};

})(jQuery, window, sapient);

sapient.hero = heroObj.getInstance();

sapient.hero.setLocalTime();