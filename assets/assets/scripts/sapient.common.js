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

			setTimeLineEmptySpan = function() {
				$("#timeline-component span.line-bg").each(function(){
					if($(this).text() == ""){
						$(this).css("top","19px");
					}
				});
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
				$("#tasting-notes-component").closest("section.views-element-container").addClass("background-noise-section");
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
				
				if($main.find(".sign-up").parent().next().length === 0) {
					$main.find(".sign-up").parent().css("padding",0);
				}
				else if($main.find(".sign-up").parent().next().hasClass("background-noise-section")) {
					$main.find(".sign-up").parent().addClass("background-noise-section");
				}
			},

			posFilters = function() {
				$($("section.padding-class")[$("section.padding-class").length-1]).find("#product-grid .category-wrapper")
				var $filter = $($("section.padding-class")[$("section.padding-class").length-1]);
				

				if($filter.find("#product-grid .category-wrapper").length > 0) {
					$filter.css("padding",0);
				}
			},

			instaGrain = function() {
				var $instaComp = $(".block-views-blocksocial-feed-instagram-component-social-feed-instagram-component");

				if($instaComp.next().hasClass("background-noise-section")) {
					$instaComp.addClass("background-noise-section");
				}
			},

			awardsGrain = function() {
				var $awardsGrain = $(".block-views-blockwines-hero-component-awards-and-accolades");
				if(!($awardsGrain.next().hasClass("background-noise-section"))) {
					$awardsGrain.css("padding",0);
				}
			},

			heroGrain = function() {
				var $heroComponent = $(".block-views-blockhomepage-components-hero-component");
				if(($heroComponent.length>0) && $heroComponent.next().hasClass("background-noise-section")) {
					$heroComponent.addClass("background-noise-section");
				}
				else if($heroComponent.length>0) {
					$heroComponent.css("padding-bottom",0);

				}
			},

			posForm = function() {
				var $form = $("form").parent();

				if($form.prev().hasClass("background-noise-section") && !($form.hasClass("background-noise-section"))) {
					$form.css("padding-top", 100 + "px");
				}
			},
			
			closeCookie = function() {					
				$(document).on("click",".cookie-notification-wrapper .close-btn", function() {
						$(".cookie-notification-wrapper").hide();
						$(".cookie-notification-wrapper .agree-button").trigger( "click" );
					});

			},

			killHash = function() {
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
			instaGrain:instaGrain,
			posForm:posForm,
			posFilters:posFilters,
			awardsGrain:awardsGrain,
			killHash: killHash,
			heroGrain: heroGrain,
			closeCookie:closeCookie,
			setTimeLineEmptySpan: setTimeLineEmptySpan
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
sapient.common.instaGrain();
sapient.common.posForm();
sapient.common.awardsGrain();
sapient.common.posFilters();
sapient.common.heroGrain();
sapient.common.setTimeLineEmptySpan();
sapient.common.closeCookie();

/*$( function() {
	$( "#datepicker" ).datepicker();
  } );*/