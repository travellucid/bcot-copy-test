var followUsObj = (function($, window, sapient) {

	var instagramInstance;

	function createInstagramInstance() {

		var setInstagramDimensions = function() {
			var windowWidth = $(window).width();
			if (windowWidth > 1600) {
				$(".follow-us-text .text-wrapper").height("auto");
			}
			if (windowWidth > 979 && windowWidth < 1600) {
				var heightImages = $(".inner-wrapper .image-link").height();
				$(".follow-us-text .text-wrapper").height(heightImages);

				$(".follow-us-text .text-wrapper").height("auto");
			}
			else if (windowWidth > 767  && windowWidth < 979) {
				var heightImages = $(".inner-wrapper .image-link").height();
				$(".follow-us-text .text-wrapper").height(heightImages*2);
				$(".follow-us-text .text-wrapper").width(100+'%');
			}
			else {
				$(".follow-us-text .text-wrapper").height(320);
			}
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.footer.setInstagramDimensions,500,"resizing instagram");
				/*sapient.footer.setFooterDdownPos();*/
			});
		};


		return {
			// public + private states and behaviors
			setInstagramDimensions: setInstagramDimensions,
			onResize: onResize
		};
	}

	return {
		getInstance: function() {
			if (!instagramInstance) {
				instagramInstance = createInstagramInstance();
			}
			return instagramInstance;
		}
	};

})(jQuery, window, sapient);

sapient.footer = followUsObj.getInstance();

/*sapient.footer.setInstagramDimensions();
sapient.footer.onResize();*/