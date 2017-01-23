var heroObj = (function($, window, sapient) {

	var heroInstance;

	function createHeroInstance() {

		var getHeightHero = function() {
			$('.scroll-down').click(function() {
				var heightHero = $("#hero-component").height();
				$('html, body').animate({
					scrollTop: heightHero
				}, 1000);
			});
		};

		return {
			// public + private states and behaviors
			getHeightHero: getHeightHero
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

sapient.hero.getHeightHero();