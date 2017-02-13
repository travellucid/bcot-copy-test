var followUsObj = (function($, window, sapient) {

	var instagramInstance;

	function createInstagramInstance() {

		var setInstagramDimensions = function() {
			var instaGallery = $("#follow-us #gallery").innerHeight();
			if($(window).width() < 768 ) {
				$("#follow-us #content").innerHeight(instaGallery);
			}
			else {
				$("#follow-us #content").innerHeight('auto');
			}
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.followUs.setInstagramDimensions,500,"resizing instagram");
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

sapient.followUs = followUsObj.getInstance();

sapient.followUs.setInstagramDimensions();
sapient.followUs.onResize();