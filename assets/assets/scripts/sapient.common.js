var commonObj = (function($, window, sapient) {

	var commonInstance;

	function createInstance() {

		var	scrollToNext = function() {
			var hrefLink = $($(".scroll-to")[1]).attr('id');
			$(".scroll-down").attr('href', "#" + hrefLink);
		},

		hideLinkText = function() {
			$("footer section.social-icons nav ul li a").text("")
		},
		addBgNoise = function() {
			var section=$("section .views-element-container");
			for (var i=1;i<section.length;i+=2) {
				$(section[i]).addClass("background-noise-section");
			}
		};

		return {
			// public + private states and behaviors
			scrollToNext: scrollToNext,
			hideLinkText: hideLinkText,
			addBgNoise: addBgNoise
		};
	}

	return {
		getInstance: function() {
			if (!commonInstance) {
				commonInstance = createInstance();
			}
			return commonInstance;
		}
	};

})(jQuery, window, sapient);

sapient.common = commonObj.getInstance();
sapient.common.hideLinkText();
/*sapient.common.debounce();*/
sapient.common.addBgNoise();