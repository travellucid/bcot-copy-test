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

		setContentWidth = function() {
			$("#follow-us #content").width( $(window).width() - ($("#follow-us #gallery").width() + 10) );
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.followUs.setInstagramDimensions,500,"resizing instagram");
				debounce(sapient.followUs.setContentWidth,100,"resizing instagram content");
			});
		};


		return {
			// public + private states and behaviors
			setInstagramDimensions: setInstagramDimensions,
			setContentWidth: setContentWidth,
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
sapient.followUs.setContentWidth();
sapient.followUs.onResize();