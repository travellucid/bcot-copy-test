var commonObj = (function($, window, sapient) {

	var commonInstance;

	function createInstance() {

		var scrollToNext = function() {
				var hrefLink = $($(".scroll-to")[1]).attr('id');
				$(".scroll-down").attr('href', "#" + hrefLink);
			},

			hideLinkText = function() {
				$("footer section.social-icons nav ul li a").text("");

				
			},

			toggleAwardsDetails = function() {
				$(".awards-accolades .see-more-btn-wrapper .see-more-btn").click(function() {
					$(".awards-accolades .list-wrapper .awards-details-wrapper").removeClass("hidden-details-wrapper");
					$(this).hide();
				});
			},
			
			addBgNoise = function() {

				var section = $("section .views-element-container");
				for (var i = 1; i < section.length; i += 2) {
					$(section[i]).addClass("background-noise-section");
				}
			},

			emptyform = function() {
				var cacheChecker = document.getElementById("cacheTest");
				if (cacheChecker) {
					if (cacheChecker.value.length) {
						document.location.reload();
					}
					cacheChecker.value = "cacheTest";
				}
			},

			assignTouchDeviceClass = function(){
				var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
					isAndroid =navigator.userAgent.indexOf('Android') >=0;

				if(isIOS || isAndroid) {
					$("body").addClass('touch-device');
				}
				
			},

			telAppledevices = function() {
				var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
					isAndroid =navigator.userAgent.indexOf('Android') >=0;

				if(isIOS || isAndroid) {
					$("#find-us-component #map-overlay a[href^='tel']").addClass("touchDevices");
				}
			},
			
			posSignup = function() {
				var $main = $("footer").prev();
				if($main.find(".sign-up").next.length === 0 ) {
					$(".sign-up").css("padding",0);
				}
			},

			killHash = function(){
				$("a").each(function(){
					if($(this).attr("href") == "#"){
						$(this).click(function(e){
							e.preventDefault();
						});
					}
				});
			};

		return {
			// public + private states and behaviors
			scrollToNext: scrollToNext,
			hideLinkText: hideLinkText,
			toggleAwardsDetails: toggleAwardsDetails,
			addBgNoise: addBgNoise,
			emptyform:emptyform,
			assignTouchDeviceClass: assignTouchDeviceClass,
			telAppledevices:telAppledevices,
			posSignup:posSignup,
			killHash: killHash
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
sapient.common.toggleAwardsDetails();
sapient.common.assignTouchDeviceClass();
sapient.common.killHash();
sapient.common.emptyform();
sapient.common.telAppledevices();
sapient.common.posSignup();




/*$( function() {
	$( "#datepicker" ).datepicker();
  } );*/