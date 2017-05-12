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
			setScrollTopAgeGate= function() {
				$(".age-gate .form-row .js-country-select").on("touchend",function(){
					setTimeout(function(){$(".age-gate__content").focus().scrollTop(400);},500);
				});
			},

			toggleAwardsDetails = function() {
				$(".awards-accolades .see-more-btn-wrapper .see-more-btn").click(function() {
					$(".awards-accolades .list-wrapper .awards-details-wrapper").removeClass("hidden-details-wrapper");
					$(this).hide();
				});
			},
			
			addBgNoise = function() {

				var section = $("section.views-element-container");
				for (var i = 1; i < section.length; i += 2) {
					$(section[i]).addClass("background-noise-section");
				}
				$("#tasting-notes-component").closest("section.views-element-container").addClass("background-noise-section");
			},

			emptyform = function() {
				var cacheChecker = document.getElementById("cacheTest");
				/*if (cacheChecker) {
					if (cacheChecker.value.length) {
						document.location.reload();
					}
					cacheChecker.value = "cacheTest";
				}*/
			},

			assignTouchDeviceClass = function(){
				var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
					isAndroid =navigator.userAgent.indexOf('Android') >=0;

				if(isIOS || isAndroid) {
					$("body").addClass('touch-device');
					$(document).on("touchend",".age-gate .form-row .js-country-select", function(){
						//setTimeout(function(){$(".age-gate__content").focus().scrollTop(400);},100);
					});
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
				/*else {
					$instaComp.removeClass("background-noise-section");
				}*/
			},

			awardsGrain = function() {
				var $awardsGrain = $(".block-views-blockwines-hero-component-awards-and-accolades");
				if(($awardsGrain.next().hasClass("background-noise-section"))) {
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

			onResize = function() {	
				$(window).on('resize', function() {
					debounce(sapient.common.posFindUs, 500, "changing SignUpPosition");		
				});

			},
			posFindUs = function() {
				var $findUs = $("#find-us-component");

				if($findUs.prev().hasClass("background-noise-section") && ($(window).width() < 980)) {

					$findUs.css("padding-top", 100 + "px");
				}
				else {

					$findUs.css("padding-top", 0);
				}
			},

			posForm = function() {
				var $form = $("form").parent();

				if($form.prev().hasClass("background-noise-section") && !($form.hasClass("background-noise-section"))) {
					$form.css("padding-top", 100 + "px");
				}
				else if($form.hasClass("background-noise-section") && !($form.prev().hasClass("background-noise-section"))) {
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
			},

			getCookie =function (cname) {
				var name = cname + "=";
				var decodedCookie = decodeURIComponent(document.cookie);
				var ca = decodedCookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) == 0) {
						return c.substring(name.length, c.length);
					}
				}
				return "";
			},

			setCountryNewsLetter = function() {
				var cookieVal=sapient.common.getCookie("age_checked");/*
				var cookieVal = $.cookie("age_checked");*/
				
				var country = cookieVal.substr(0,2).toLowerCase();

				if(country !=='ca' && country !=='gb' && country !=='us' && country !=='au'  && country !=='nz') {
					country = 'gbl';
				}

				$("#edit-country").val(country);
				$("#edit-country").trigger("change");

				
			},

			directToErrorPage =  function() {
				/*if((document.title.toLowerCase().indexOf("404") != -1)  && ($(".block-views-blockerror-page-404 .form-group").text().length < 15)) {
					location.href="/404";
				}*/
			},
			
			readCookieByName = function(name) {
				var nameEQ = name + "=",
					ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			},

			callAgeGate = function() {
				setTimeout(function(){ 
					var value = sapient.common.readCookieByName('age_checked'),
					pathname = window.location.pathname,
					subPath,
					x,
					urlFinal,
					cookieFinal,
					val; 
					subPath = pathname.split('/');
					if(value != null) {
						if(subPath[1] == 'en-gb'){
							urlFinal = 'uk';
						}
						if(subPath[1] == 'en-us'){
							urlFinal = 'us';
						}
						if(subPath[1] == 'en-ca'){
							urlFinal = 'ca';
						}
						if(subPath[1] == 'en-au'){
							urlFinal = 'au';
						}
						if(subPath[1] == 'en-nz'){
							urlFinal = 'nz';
						}
						if(subPath[1] == 'en'){
							urlFinal = 'en';
						}
						if(subPath[1] == ''){
							urlFinal = 'en';
						}
						val=value.toLowerCase().split("%");

						if(val[0] == 'nz' || val[0] == 'au' || val[0] == 'ca' || val[0] == 'uk' || val[0] == 'us' ){
							cookieFinal = val[0];
						}
						else{
							if(cookieFinal != ''){
								cookieFinal = 'en';
							}
						}
						if(cookieFinal != urlFinal){
							document.cookie = "age_checked"+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
							location.reload(true);
						}
					} 
				}, 2000);
				
			},

			ageGateSetFocusTextBox= function() {
				$(document).on("change",".age-gate  .date-control #year", function() {
					if($(".age-gate  .date-control #month").css("width")!='0px') {
						//alert("ag");
					var inpYear = document.getElementById('year');
						inpYear.onkeypress = function() {
							if( inpYear.value.length >=3){
								$(".age-gate  .date-control #year").next().focus();
							}
						}
					}});

					$(document).on("change",".age-gate  .date-control #month", function() {
						var inpMon = document.getElementById('month');
						inpMon.onkeypress = function() {
							if(inpMon.value.length >=1){
								$(".age-gate  .date-control #month").next().focus();
							}
						}
						
					});		
					$(document).on("change",".age-gate  .date-control #day", function() {
						var inpDay = document.getElementById('day');
						inpDay.onkeypress = function() {
							if(inpDay.value.length >=1){
								$(".age-gate  .date-control #day").blur();
							}
						}
						
					});					
			}

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
			posFindUs:posFindUs,
			onResize:onResize,
			setTimeLineEmptySpan: setTimeLineEmptySpan,
			setCountryNewsLetter: setCountryNewsLetter,
			getCookie: getCookie,
			directToErrorPage:directToErrorPage,
			readCookieByName:readCookieByName,
			callAgeGate:callAgeGate,
			ageGateSetFocusTextBox: ageGateSetFocusTextBox
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
sapient.common.onResize();
sapient.common.posFindUs();
sapient.common.callAgeGate();
sapient.common.directToErrorPage();

$(document).ready(function() {  
	//sapient.common.ageGateSetFocusTextBox();
});