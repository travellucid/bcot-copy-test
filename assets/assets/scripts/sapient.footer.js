var footerObj = (function($, window, sapient) {

	var footerInstance;

	function createFooterInstance() {

		var setFooterDdownPos = function() {
			var windowWidth = $(window).width();
			if (windowWidth > 1200 /*&& windowWidth < 1400*/) {
				var right = (windowWidth - 1170) / 2;
				$("footer .select-wrapper").css('right', right + 'px');
			} /*else if (windowWidth > 1400) {
				var right = (windowWidth - 1400) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
			}*/
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.footer.setFooterDdownPos,500,"testing debounce");
				/*sapient.footer.setFooterDdownPos();*/
			});
		},

		regionSelector = function(name) {
			$(document).on('click','footer .region-text', function() {
				console.log("region-text");
				document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				location.reload();
			});
		};


		return {
			// public + private states and behaviors
			setFooterDdownPos: setFooterDdownPos,
			onResize: onResize,
			regionSelector: regionSelector
		};
	}

	return {
		getInstance: function() {
			if (!footerInstance) {
				footerInstance = createFooterInstance();
			}
			return footerInstance;
		}
	};

})(jQuery, window, sapient);

sapient.footer = footerObj.getInstance();

/*sapient.footer.setFooterDdownPos();
sapient.footer.onResize();*/
sapient.footer.regionSelector("age_checked");