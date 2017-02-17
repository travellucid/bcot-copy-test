var followUsObj = (function($, window, sapient) {

	var instagramInstance;

	function createInstagramInstance() {

		var setContentWidth = function() {
			if($(window).width() > 1600 ) {
				$("#follow-us #content").width( $(window).width() - ($("#follow-us #gallery").width() + 10) );
			} else {
				$("#follow-us #content").width("");
			}
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.followUs.setContentWidth,100,"resizing instagram content");
			});
		};


		return {
			// public + private states and behaviors
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

sapient.followUs.setContentWidth();
sapient.followUs.onResize();