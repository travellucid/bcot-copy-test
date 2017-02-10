var followUsObj = (function($, window, sapient) {

	var instagramInstance;

	function createInstagramInstance() {

		var setInstagramDimensions = function() {
			var instaGallery = $("#follow-us #gallery").height();
			if($(window).width() < 768 ) {
				$("#follow-us #content").innerHeight(instaGallery);
			}
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.footer.setInstagramDimensions,500,"resizing instagram");
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

sapient.footer.setInstagramDimensions();
sapient.footer.onResize();