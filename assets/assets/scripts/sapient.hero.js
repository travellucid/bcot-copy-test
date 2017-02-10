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
		},
		disableHeroHeightChangeonMobile = function() {
			var windowHeight = $(window).height();
			if (windowWidth > 1200 /*&& windowWidth < 1400*/) {
				var right = (windowWidth - 1170) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
			} /*else if (windowWidth > 1400) {
				var right = (windowWidth - 1400) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
			}*/
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.hero.disableHeroHeightChangeonMobile,500,"testing HeroHeightChangeonMobile");
				/*sapient.footer.setFooterDdownPos();*/
			});
		};

		return {
			// public + private states and behaviors
			getHeightHero: getHeightHero,
			disableHeroHeightChangeonMobile: disableHeroHeightChangeonMobile
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

/*sapient.hero.getHeightHero();*/