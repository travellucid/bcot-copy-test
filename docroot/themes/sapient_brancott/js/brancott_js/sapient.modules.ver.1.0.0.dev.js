/*global document, window, jQuery, $, sapient:true, console */
/*jslint  browser: true, undef: false, white: true, forin: true, unparam: true, strict:false, jquery: true, smarttabs:true */
/*
 * sapient: Core module initialises from here.
 * 
 * Author: Sapient Nitro (2016) (http://www.sapient.com)
 * @version 1.0
 */
if (!$) {
	var $ = jQuery.noConflict();
}
var sapient = sapient || {}; // core sapient
$(document).ready(function() {
  // Setup the a11y nav
	$('.nav').setup_navigation();
  
  // RWD Nav Pattern
  $('body').addClass('js');
});
var keyCodeMap = {
        48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", 59:";",
        65:"a", 66:"b", 67:"c", 68:"d", 69:"e", 70:"f", 71:"g", 72:"h", 73:"i", 74:"j", 75:"k", 76:"l",
        77:"m", 78:"n", 79:"o", 80:"p", 81:"q", 82:"r", 83:"s", 84:"t", 85:"u", 86:"v", 87:"w", 88:"x", 89:"y", 90:"z",
        96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9"
}

$.fn.setup_navigation = function(settings) {

	settings = jQuery.extend({
		menuHoverClass: 'show-menu',
	}, settings);
	
	// Add ARIA role to menubar and menu items
	$(this).attr('role', 'menubar').find('li').attr('role', 'menuitem');
	
	var top_level_links = $(this).find('> li > a');

	// Added by Terrill: (removed temporarily: doesn't fix the JAWS problem after all)
	// Add tabindex="0" to all top-level links 
	// Without at least one of these, JAWS doesn't read widget as a menu, despite all the other ARIA
	//$(top_level_links).attr('tabindex','0');
	
	// Set tabIndex to -1 so that top_level_links can't receive focus until menu is open
	$(top_level_links).next('ul')
		.attr('data-test','true')
		.attr({ 'aria-hidden': 'true', 'role': 'menu' })
		.find('a')
		.attr('tabIndex',-1);
	
	// Adding aria-haspopup for appropriate items
	$(top_level_links).each(function(){
		if($(this).next('ul').length > 0)
			$(this).parent('li').attr('aria-haspopup', 'true');
	});

	$(top_level_links).parent("li").hover(
		function(){
			$(this).addClass('hovered');
	},
		function(){
			$(this).removeClass('hovered');
	});

	$(top_level_links).hover(function(){
		$(".level-2.list-reset").removeAttr("style");
		$(this).parent("li").addClass('hovered');
		$(this).closest('ul') 
			.attr('aria-hidden', 'false')
			.find('.'+settings.menuHoverClass)
			.attr('aria-hidden', 'true')
			.removeClass(settings.menuHoverClass)
			.find('a')
			.attr('tabIndex',-1);
		$(this).next('ul')
			.attr('aria-hidden', 'false')
			.addClass(settings.menuHoverClass)
			.find('a').attr('tabIndex',0);
	},
	function(){
		$(this).next('ul')
			.attr('aria-hidden', 'true')
			.removeClass(settings.menuHoverClass)
			.find('a').attr('tabIndex',0);
	});

  $(top_level_links).focus(function(){
  	$(".level-2.list-reset").removeAttr("style");
		$(this).closest('ul')
			.find('.'+settings.menuHoverClass)
			.attr('aria-hidden', 'true')
			.removeClass(settings.menuHoverClass)
			.find('a')
			.attr('tabIndex',-1);
		
    $(this).next('ul')
			.attr('aria-hidden', 'false')
			.addClass(settings.menuHoverClass)
			.find('a').attr('tabIndex',0);
	});
	
	// Bind arrow keys for navigation
	$(top_level_links).keydown(function(e){
		if(e.keyCode == 37) {
			e.preventDefault();
			// This is the first item
			if($(this).parent('li').prev('li').length == 0) {
				$(this).parents('ul').find('> li').last().find('a').first().focus();
			} else {
				$(this).parent('li').prev('li').find('a').first().focus();
			}
		} else if(e.keyCode == 38) {
			e.preventDefault();
			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
					.last().focus();
			}
		} else if(e.keyCode == 39) {
			e.preventDefault();
			// This is the last item
			if($(this).parent('li').next('li').length == 0) {
				$(this).parents('ul').find('> li').first().find('a').first().focus();
			} else {
				$(this).parent('li').next('li').find('a').first().focus();
			}
		} else if(e.keyCode == 40) {
			e.preventDefault();
			if($(this).parent('li').find('ul').length > 0) {
				$(this).parent('li').find('ul')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
					.first().focus();
			}
		} else if(e.keyCode == 13 || e.keyCode == 32) {
			// If submenu is hidden, open it
			//e.preventDefault();
			$(this).parent('li').find('ul[aria-hidden=true]')
					.attr('aria-hidden', 'false')
					.addClass(settings.menuHoverClass)
					.find('a').attr('tabIndex',0)
					.first().focus();
		} else if(e.keyCode == 27) {
			e.preventDefault();
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
				.attr('tabIndex',-1);
		} else {
			$(this).parent('li').find('ul[aria-hidden=false] a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
					$(this).focus();
					return false;
				}
			});
		}
	});
	
	
	var links = $(top_level_links).parent('li').find('ul').find('a');
	$(links).keydown(function(e){
		if(e.keyCode == 38) {
			e.preventDefault();
			// This is the first item
			if($(this).parent('li').prev('li').length == 0) {
				$(this).parents('ul').parents('li').find('a').first().focus();
			} else {
				$(this).parent('li').prev('li').find('a').first().focus();
			}
		} else if(e.keyCode == 40) {
			e.preventDefault();
			if($(this).parent('li').next('li').length == 0) {
				$(this).parents('ul').parents('li').find('a').first().focus();
			} else {
				$(this).parent('li').next('li').find('a').first().focus();
			}
		} else if(e.keyCode == 27 || e.keyCode == 37) {
			e.preventDefault();
			$(this)
				.parents('ul').first()
					.prev('a').focus()
					.parents('ul').first().find('.'+settings.menuHoverClass)
					.attr('aria-hidden', 'true')
					.removeClass(settings.menuHoverClass)
					.find('a')
					.attr('tabIndex',-1);
		} else if(e.keyCode == 32) {
			e.preventDefault();
			window.location = $(this).attr('href');
		} else {
			var found = false;
			$(this).parent('li').nextAll('li').find('a').each(function(){
				if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
					$(this).focus();
					found = true;
					return false;
				}
			});
			
			if(!found) {
				$(this).parent('li').prevAll('li').find('a').each(function(){
					if($(this).text().substring(0,1).toLowerCase() == keyCodeMap[e.keyCode]) {
						$(this).focus();
						return false;
					}
				});
			}
		}
	});

		
	// Hide menu if click or focus occurs outside of navigation
	$(this).find('a').last().keydown(function(e){ 
		if(e.keyCode == 9) {
			// If the user tabs out of the navigation hide all menus
			$('.'+settings.menuHoverClass)
				.attr('aria-hidden', 'true')
				.removeClass(settings.menuHoverClass)
				.find('a')
					.attr('tabIndex',-1);
		}
	});

  $(document).click(function(){ $('.'+settings.menuHoverClass).attr('aria-hidden', 'true').removeClass(settings.menuHoverClass).find('a').attr('tabIndex',-1); });
	
	$(this).click(function(e){
		e.stopPropagation();
	});
}
var datePickerObj = (function($, window, sapient) {

	var datetimepickerInstance;
	function createDatePickerInstance() {
		var bindDatePicker = function() {
			$(".enquire-form .date-wrapper .date").datetimepicker({
				maxDate:'2020/01/01',
				format:'DD-MM-YYYY'
			}).find('input:first').on("blur",function () {
	
				// check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
				// update the format if it's yyyy-mm-dd
				var date = sapient.datepicker.parseDate($(this).val());
			
				if (! sapient.datepicker.isValidDate(date)) {
					//create date based on momentjs (we have that)
					date = moment().format('YYYY-MM-DD');
				}

				$(this).val(date);
			});
			
			/*$(".enquire-form .date-wrapper .date")*/
			$(".fa-clock-o").closest(".picker-switch").hide();
			$(".table-condensed .next").html("");
			$(".table-condensed .prev").html("");
			$(".enquire-form .date-wrapper input").attr('readonly','readonly');

			$(".date-wrapper .calender-icon").on('click',function(){
				$(".date-wrapper input").focus(); 
				sapient.datepicker.positionCalender();
				
			}); 

			$(".date-wrapper input").on('focus', function(){
				sapient.datepicker.positionCalender();
			});

			$(".date-overlay").on('click', function(){
				$(".date-wrapper input").focus();
			});


			$(window).on('resize', function() {
				debounce(sapient.datepicker.positionCalender, 50, "changing calenderPostion");
			});
			

			$(".enquire-form .date-wrapper .date").on("change", function() {
				var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"],
					weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				 	val = $(this).val().split("-"),
				 	getDay,
				 	newDate;

				val[1] = monthArray[val[1] -1];
				getDay = weekArray[new Date($(this).val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getDay()];
				val.unshift(getDay)
				newDate = val.join(" ");
				$(".date-overlay").text(newDate);
				//$("#edit-preferred-date").val(newDate);
				$(" .bootstrap-datetimepicker-widget").hide();
			});
 
		},

		positionCalender = function() {
			var iconPos = $(".calender-icon").offset();
			
			if($(".bootstrap-datetimepicker-widget ").is(":visible") === true) {

				$(this).blur();

				if($windowWidth > 1281) {
					$(".bootstrap-datetimepicker-widget ").css("left", iconPos.left );
				}
			}
		},

		isValidDate = function(value, format) {
			console.log()
			format = format || false;
			// lets parse the date to the best of our knowledge
			if (format) {
				value = sapient.datepicker.parseDate(value);
			}

			var timestamp = Date.parse(value);

			return isNaN(timestamp) == false;
		},
   
		parseDate = function(value) {
			var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
			if (m)
				value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

			return value;
		};

		 return {
			 // public + private states and behaviors
			bindDatePicker: bindDatePicker,
			positionCalender:positionCalender,
			isValidDate:isValidDate,
			parseDate:parseDate

		 };
	}

	return {
		getInstance: function() {
			if (!datetimepickerInstance) {
				datetimepickerInstance = createDatePickerInstance();
			}
			return datetimepickerInstance;
		}
	};

})(jQuery, window, sapient);


sapient.datepicker = datePickerObj.getInstance();
sapient.datepicker.bindDatePicker();

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
						if((subPath[1] == '') || (subPath[1] != 'en-gb' && subPath[1] != 'en-us' && subPath[1] != 'en-ca' && subPath[1] != 'en-au' && subPath[1] != 'en-nz' && subPath[1] != 'en' )){
							urlFinal = 'en';
						}
						val=value.toLowerCase().split("%");

						if(val[0] == 'nz' || val[0] == 'au' || val[0] == 'ca' || val[0] == 'uk' || val[0] == 'us' ){
							cookieFinal = val[0];
						}
						else{
							if(val[0] != '' && val[0] =='false'){
								cookieFinal = urlFinal;
							}
							if(val[0] != '' && val[0] !='false'){
								cookieFinal = 'en';
							}
						}
						//alert(cookieFinal);
						//alert(urlFinal);
						if(cookieFinal != urlFinal){
							//alert('inside if');
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
var carouselObj = (function($, window, sapient) {

	var carouselInstance;

	function createCarouselInstance() {

		var enableTouchCarousel = function(value) {

			if($(value).find(".item").length > 1 ) {

				$(value).on("touchstart", function(event) {
			
					var xClick = event.originalEvent.touches[0].pageX;
			
					$(this).one("touchmove", function(event) {
						var xMove = event.originalEvent.touches[0].pageX;
			
						if (Math.floor(xClick - xMove) > 5) {
							$(value).carousel('next');
						}

						else if (Math.floor(xClick - xMove) < -5) {
							$(value).carousel('prev');
						}
					});

					$(value).on("touchend", function() {
						$(this).off("touchmove");
					});

				});
			} else {
				$(value).find(".carousel-control-wrapper").remove();
			}
		},

			hideCarouselCtrl = function(id) {
				if($(id).find(".carousel-indicators li").length === 1){
					$(id).find(".carousel-control-wrapper,.carousel-indicators").css("visibility","hidden");
				}								
			},

			togggleCarouselView = function(id) {
				
				if($(window).width() < 690) {
					sapient.carousel.enableTouchCarousel("#product-grid-carousal");
					$(id).addClass("slide");
				}
				
				else {
					$(id).removeClass("slide");
				}
			},

			findCarousalItems = function (id) {
				// body...
				$(id).find(".carousel-inner .item").each(function(){
					//console.log($(this).find("video").siblings().find("img").attr("src"));
					var gifLength = $(this).find("video").siblings(".fallback-gif").length,
						fallBackImgLength = $(this).find("video").siblings(".fallback-image").length,
						videoLength = $(this).find("video").length,
						isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
						isAndroid =navigator.userAgent.indexOf('Android') >=0;
						/*console.log("gifLength "+gifLength+" fallBackImgLength "+fallBackImgLength + "  videoLength "+videoLength+" isIOS "+isIOS +" isAndroid "+isAndroid);*/
						if(isIOS || isAndroid) {
							$(this).find("video").hide();
							$(this).find(".fallback-gif").show();
							$(this).find(".fallback-image").hide();
						}

						else {
							if(videoLength === 0 && gifLength > 0) {
								//console.log("show gif");
								$(this).find("video").hide();
								$(this).find(".fallback-gif").show();
								$(this).find(".fallback-image").hide();
							}
							
							else if (videoLength === 0 && gifLength === 0) {
								//console.log("show fallback img");

								$(this).find("video").hide();							
								$(this).find(".fallback-gif").hide();
								$(this).find(".fallback-image").show();
							}

							else {
								//console.log("show video");
								$(this).find("video").show();							
								$(this).find(".fallback-gif").hide();
								$(this).find(".fallback-image").hide();
							}
						}
						
				});
			},

			disableArrowsControlsSmallDevices = function() {
				/*if (navigator.userAgent.indexOf('Android') >=0) {
					$(".carousel-inner video").attr("controls","");
				}*/
				var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
					isAndroid =navigator.userAgent.indexOf('Android') >=0;
					
				if(isIOS || isAndroid || $(window).width() < 1025) {
					$(".carousel-control-wrapper .prev-carousal").css("left",0);
					$(".carousel-control-wrapper .next-carousal").css("right",0);
				}
				else {
					$(".carousel-control-wrapper").show();
				}
			},

			onResize = function() {
				
				$(window).on('resize', function() {
					sapient.carousel.togggleCarouselView("#product-grid-carousal");
					debounce(sapient.carousel.positionCarousel, 500, "resizing carouselIndicator");
					debounce(sapient.carousel.positionCarouselControl, 500, "resizing carouselControl");
					//debounce(sapient.carousel.disableArrowsControlsSmallDevices, 500, "resizing disableArrowsControlsSmallDevices");
					debounce(sapient.carousel.disableArrowsControlsSmallDevices, 500, "resizing disableArrowsControlsSmallDevices");
				});

			},
			positionCarouselControl = function() {
				var interval = setInterval(function() {
					var $heightImg = $($("#carousel-new-story .carousel-inner  picture img")[0]).height();

					if ($heightImg > 0 ){
						$("#carousel-new-story .carousel-control-wrapper .prev-carousal").css("top",$heightImg/2);
						$("#carousel-new-story .carousel-control-wrapper .next-carousal").css("top",$heightImg/2);
					}

				}, 200);
			},

			playPauseVideo = function() {
		
					var vid = $(".carousel-inner video"),
						vidPos = vid.offset();

					if(vid.length === 0) {
						$(this).siblings().find(".fallback-image").show();
						return false;
					}
					
					if($(window).scrollTop() > (vidPos.top - vid.height()) && $(window).scrollTop() < (vidPos.top + vid.height())){
							if(!vid.parents(".item").hasClass("active")){
								vid.get(0).pause();
								return false;
							}

							vid.get(0).play();
							vid.on("timeupdate", function () {
								if(this.currentTime >= Math.floor(vid.get(0).duration)) {
									this.currentTime = 0.0;
								}
							});
							/*else {
								vid.get(0).pause();
							}*/
						}
						else{
							vid.get(0).pause();
						}	
				
					
			},

			bindSlideEvent = function(id) {
				$(id).on('slid.bs.carousel', function (e) {
					sapient.carousel.playPauseVideo();
				});
			},

			onScroll = function() {
				$(window).scroll(function(){
					debounce(sapient.carousel.playPauseVideo, 200, "playPauseVideo on scroll");
				});	
			},

			positionCarousel = function() {
				var	heightArr = [],
					maxHeight,
					interval = setInterval(function() {

					var $heightImg = $($("#carousel-new-story .carousel-inner  picture img")[0]).height();
						
					if ($heightImg > 0 ){
						$("#carousel-new-story .carousel-indicators").css("top", $heightImg - 36 + "px");

						$.each($("#carousel-new-story .carousel-inner .item"), function(index) {
							var $heightCarousal = $($("#carousel-new-story .carousel-inner .item")[index]).height();
								heightArr.push($heightCarousal);
								maxHeight = Math.max.apply(Math, heightArr);
								$("#carousel-new-story .carousel-inner").css("height", maxHeight);
						});

						clearInterval(interval);
					}

				}, 200);					
			},

			toggleCarouselArrow = function(id) {

				$(id).hover(
					function() {

						$(this).find(".carousel-control-wrapper").animate({
							opacity: ["1"]
						}, 500);

					},

					function() {

						$(this).find(".carousel-control-wrapper").animate({
							opacity: ["0"]
						}, 500);

					}
				);
			};

		return {
			// public + private states and behaviors
			enableTouchCarousel: enableTouchCarousel,
			toggleCarouselArrow: toggleCarouselArrow,
			positionCarousel: positionCarousel,
			onResize: onResize,
			onScroll: onScroll,
			positionCarouselControl:positionCarouselControl,
			playPauseVideo: playPauseVideo,
			bindSlideEvent: bindSlideEvent,
			disableArrowsControlsSmallDevices: disableArrowsControlsSmallDevices,
			findCarousalItems: findCarousalItems,
			togggleCarouselView: togggleCarouselView,
			hideCarouselCtrl: hideCarouselCtrl
		};
	}

	return {
		getInstance: function() {
			if (!carouselInstance) {
				carouselInstance = createCarouselInstance();
			}
			return carouselInstance;
		}
	};

})(jQuery, window, sapient);

sapient.carousel = carouselObj.getInstance();

sapient.carousel.enableTouchCarousel("#carousel-our-story");
sapient.carousel.enableTouchCarousel("#carousel-our-wines");
sapient.carousel.enableTouchCarousel("#carousel-new-story");

sapient.carousel.bindSlideEvent("#carousel-our-story");
sapient.carousel.bindSlideEvent("#carousel-our-wines");
sapient.carousel.bindSlideEvent("#carousel-new-story");
sapient.carousel.positionCarousel();
sapient.carousel.positionCarouselControl();
sapient.carousel.onResize();
sapient.carousel.togggleCarouselView("#product-grid-carousal");
sapient.carousel.onScroll();
sapient.carousel.playPauseVideo();
sapient.carousel.disableArrowsControlsSmallDevices();
sapient.carousel.findCarousalItems("#carousel-our-story");
sapient.carousel.findCarousalItems("#carousel-new-story");

sapient.carousel.hideCarouselCtrl("#carousel-our-wines");
sapient.carousel.hideCarouselCtrl("#carousel-new-story");
sapient.carousel.hideCarouselCtrl("#carousel-our-story");
var heroObj = (function($, window, sapient) {

	var heroInstance;

	function createHeroInstance() {

		var setLocalTime = function(offset) {
				var d = new Date(),
				utc = d.getTime() + (d.getTimezoneOffset() * 60000),
				time = new Date(utc + (3600000*offset)),
				m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"),
				curr_year = time.getFullYear(),
				curr_month = time.getMonth(),
				curr_date = time.getDate(),
				hours = time.getHours()/*-12*/,
				mins = time.getMinutes(),
				timeStr = "";

			if(mins < 10){
				mins="0" + mins;
			}

			if((hours-12) < 0) {
					amPm = "am";
					console.log(hours);
				}
				
			else {
				amPm = "pm";
				hours-=12;
			}
				
			timeStr = curr_date  + " " + m_names[curr_month] + " " + curr_year + " / " + hours + ":" +mins +""+ amPm;

			var	dateTimeHeading = $("#hero-component .date-time");

			if(dateTimeHeading.length > 0) {
				$("#hero-component .date-time").text( timeStr);				
			}

		};

		return {
			setLocalTime: setLocalTime
		};
	}

	return {
		getInstance: function() {
			if (!heroInstance) {
				heroInstance = createHeroInstance();
			}
			return heroInstance;
		}
	};

})(jQuery, window, sapient);

sapient.hero = heroObj.getInstance();
$(document).ready(function(){

var timezones= ['Pacific/Auckland']


$(timezones).each(function(i,zone){
    var samleDte =  moment();
    if( samleDte.tz(zone).isDST() ){
	    sapient.hero.setLocalTime("+12");
    }
    else{
	   sapient.hero.setLocalTime("+12");	
    }
});



});
var headerObj = (function($, window, sapient) {

	var headerInstance;

	function createHeaderInstance() {

		var getMenuHeadingVal = function() {
			$windowWidth = $(window).width();
 			var allowSubmit = false;
			$(document).on("click", "#navbar-header .menu > .dropdown" , function(e) {				
				if($windowWidth < 990 && !allowSubmit)  {
					e.preventDefault();
					e.stopPropagation();
					$(this).find(".sub-menu-wrapper .menu-heading span.text").text($(this).children("a").text().trim());	
					allowSubmit= true;
				}
				allowSubmit= false;
			});
			$(document).on("click", "#navbar-header .sub-menu .sub-menu-wrapper .sub-menu-link ", function(e) {
				allowSubmit= true;	
			});
			$(document).on("click", "#navbar-header .menu > .dropdown  .expand-icon ", function(e) {
				$(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading span.text").text($(this).parents("a").text().trim());
			});
		},

		animateMobileMenu = function() {
			$("#navbar-header .menu .menu-item").on("click", function() {
				
				if (!$(this).parents(".menu").hasClass("menu-open")) {
					$(this).parents(".menu").addClass("menu-open");
				}

				else {
					$(this).parents(".menu").removeClass("menu-open");
				}

			});
		},

	/*	accessibleMenu = function () {
			$(".dropdown a").keydown(function(event) {
				// var self = this;

				var $self= this;
				if (event.which == 32) {
					event.preventDefault();
					if ($self !== this) {
						//console.log("$self"+$self+"  this" + this)
				 		$(this).siblings(".sub-menu").hide();
					}
					else {
						$(this).siblings(".sub-menu").toggle();
					}
					//$(".dropdown a").siblings(".sub-menu").hide();
				}
			});
		},*/

		accessibleMenu = function () {
			$(".dropdown a").keydown(function(event) {
				if (event.which == 32) {
					event.preventDefault();
					$(this).siblings(".sub-menu").toggle();					
				}
			});
		},

		removeMobileLogoText = function() {
			$("#navbar-header .logo a").text("");
		},

		collapseMobileMenu = function() {
			var windowWidth = $(window).width();
			if (windowWidth < 769) {
				$("#navbar-header").removeClass("in").addClass('collapse');
			}
		},

		setMenuBarHeight = function() {
			var windowWidth = $(window).width();

			if (windowWidth > 990) {
				$("#navbar-header .menu-item, #wine-filters .menu-item").hover(
					function() {
						$(this).find(">a").css("color", "#d50032");
						$(this).find(".sub-menu .sub-menu-wrapper").show();
						var subMenuHeight = $(this).find(".sub-menu .sub-menu-wrapper").height();
						$(this).find(".sub-menu ").height(subMenuHeight);
					},
					function() {
						$(this).find(">a").css("color", "white");
						$(this).find(".sub-menu .sub-menu-wrapper").hide();
						$(this).find(".sub-menu ").removeAttr("style");
					}
				);
			}
		},

		toggleGhostMenu = function() {
			$(window).on('scroll', function() {
				if ($(window).scrollTop() !== 0) {
					$("#navbar-header").addClass('semi-solid-menu');
					$("header").addClass("white-background");
				} else {
					if(!$("#navbar-header").hasClass("in")) {
						$("#navbar-header").removeClass('semi-solid-menu');
						$("header").removeClass("white-background");
					}					
				}
			});

			$("header").hover(function() {
					$("#navbar-header").addClass('semi-solid-menu solid-menu');

					//$("header").removeClass("white-background");
				},
				function(){
					$("#navbar-header").removeClass('solid-menu');
					if($(window).scrollTop() == 0) {
						$("#navbar-header").removeClass('semi-solid-menu');
					}
				}
			);
		},

		menuMobile = function() {
			var clickDelay = 500,
				clickDelayTimer = null;

			$('.burger-click-region').on('click', function() {

				if ($("#navbar-header").hasClass("in") && $(window).scrollTop() == 0) {
					$("header").removeClass("white-background").css("opacity",.96);
				}
				else {
					$("header").addClass("white-background").css("opacity",1);
					$("#navbar-header .navbar-nav").removeClass("menu-open");
				}
				
				if (clickDelayTimer === null) {

					var $burger = $(this);
					$burger.toggleClass('active');
					$burger.parent().toggleClass('is-open');

					if (!$burger.hasClass('active')) {
						$burger.addClass('closing');
					}

					clickDelayTimer = setTimeout(function() {
						$burger.removeClass('closing');
						clearTimeout(clickDelayTimer);
						clickDelayTimer = null;
					}, clickDelay);
				}
			});
		},
		scrollingSubMenu = function() {
			if( $(window).width() < 991 ) {
				$(".sub-menu-wrapper").each(function(){
					$(this).height( $(window).height() - $("header.navbar").height() ).addClass('scrollItBaby');
				});
			} else {
				$(".sub-menu-wrapper").each(function(){
					$(this).height("").removeClass('scrollItBaby');
				});
			}
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.header.scrollingSubMenu,500,"scroll the subnav");
			});
		};

		return {
			// public + private states and behaviors
			getMenuHeadingVal: getMenuHeadingVal,
			animateMobileMenu: animateMobileMenu,
			removeMobileLogoText: removeMobileLogoText,
			collapseMobileMenu: collapseMobileMenu,
			setMenuBarHeight: setMenuBarHeight,
			toggleGhostMenu: toggleGhostMenu,
			menuMobile: menuMobile,
			accessibleMenu: accessibleMenu,
			scrollingSubMenu: scrollingSubMenu,
			onResize: onResize
		};
	}

	return {
		getInstance: function() {
			if (!headerInstance) {
				headerInstance = createHeaderInstance();
			}
			return headerInstance;
		}
	};

})(jQuery, window, sapient);

sapient.header = headerObj.getInstance();

sapient.header.getMenuHeadingVal();
sapient.header.animateMobileMenu();
sapient.header.removeMobileLogoText();
sapient.header.collapseMobileMenu();
sapient.header.setMenuBarHeight();
sapient.header.accessibleMenu();
sapient.header.toggleGhostMenu();
sapient.header.menuMobile();
sapient.header.scrollingSubMenu();
sapient.header.onResize();
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
var ourWines = (function($, window, sapient) {

	var filterWinesCollection;

	function createFilterWinesCollection() {
		var filterWines = function() {
				var allProductsGrid = $("#response-wrapper").html(),
					filtersTop = $("#block-Filter_block_our_wines").offset(),
					wineFilter = $(".wine-filters-desktop"),
					localeCode = drupalSettings.path.currentLanguage;

				$(".filter-item").on("click", function(e) {
					e.preventDefault();

					if($(this).hasClass('active-filter')) {
						return;
					}

					if ($(this).data("categoryFilter") === "all-data") {
						$("#response-wrapper").html(allProductsGrid);
						$(".filter-item").removeClass('active-filter');

					} else {
						var wineCategory = $(this).data("category"),
							wineCategoryFilter = $(this).data("categoryFilter");

							$(".filter-item").removeClass('active-filter');
							$(this).addClass('active-filter');

						$.ajax({
							url: "/" + localeCode + "/search-page?" + wineCategory + "=" + wineCategoryFilter,
							type: "GET",
							success: function(data) {
								$("#response-wrapper").html(data);

								//$("#response-wrapper").find("#filter-term").html(wineCategoryFilter);
								
								sapient.common.killHash();
							}
						});
					}

					setTimeout(function(){
						if($(window).width() < 990) {
							$("#close-filters").trigger('click');

							var headerHeight = $("header.navbar").outerHeight(),
								topPos = filtersTop.top - headerHeight;

							$("body, html").animate({
								scrollTop: topPos
							}, "slow");

						} else {
							$(".level-2.list-reset").css({"opacity":0, "left": -9999 });
							var headerHeight = $("header.navbar").outerHeight(),
								topPos = filtersTop.top - headerHeight;

							$("body, html").animate({
								scrollTop: topPos
							}, 'slow');

							$(wineFilter).find("li.hovered").blur().removeClass('hovered');
						}
					},250);
				});
			},

			seeMoreLess = function() {
				$(document).on('click','#product-grid .see-less', function(){
					$(this).hide();
					$(this).siblings().find(".ellipses").show();
					$(this).siblings(".extra-text").hide();
					$(this).siblings(".see-more").show();
				});

				$(document).on('click','#product-grid .see-more', function(){
					$(this).hide();
					$(this).prev().find(".ellipses").hide();
					$(this).prev(".trimmed-text").hide();
					$(this).siblings(".extra-text").css("display","block");
					$(this).siblings(".see-less").show();
				});
			},

			mobileFiltersMenu = function() {
				$("#open-navigation").on("click", function() {
					$("#mobile-navigation").addClass("navigation-active");
					$(this).addClass("navigation-activated");
					var navTop = $("#mobile-navigation h2").outerHeight();
					$("#mobile-navigation-scroll-wrapper").css({ "height": $(window).height() - navTop });
				});

				$("#close-navigation").on("click", function() {
					$("#mobile-navigation").removeClass("navigation-active");
					$(".iamalive").removeClass("iamalive");
					$("ul.nav.categories").css("left", "");
					$("#mobile-navigation-scroll-wrapper").removeAttr("style");
					$("#open-navigation").removeClass("navigation-activated");
				});

				$("#open-filters").on("click", function() {
					$("#mobile-filters").addClass("filters-active");
					$(this).addClass("filters-activated");
					var navTop = $("#mobile-filters h2").outerHeight();
					$("#mobile-filters-scroll-wrapper").css({ "height": $(window).height() - navTop });
				});

				$("#close-filters").on("click", function() {
					$("#mobile-filters").removeClass("filters-active");
					$(".iamalive").removeClass("iamalive");
					$("ul.nav.categories").css("left", "");
					$("#mobile-filters-scroll-wrapper").removeAttr("style");
					$("#open-filters").removeClass("filters-activated");
				});

				$(window).scroll(function(){
					var navTopnavigation = $("#mobile-navigation h2").outerHeight();
					$("#mobile-navigation-scroll-wrapper").css({ "height": $(window).height() - navTopnavigation });
					var navTopfilters = $("#mobile-filters h2").outerHeight();
					$("#mobile-filters-scroll-wrapper").css({ "height": $(window).height() - navTopfilters });
				});

				$("a.category").on("click",function(e){
				  e.preventDefault();
				  $(this).addClass("iamalive");
				  $("ul.nav.categories").animate({
				    left: "-" + $(this).data("level") * 100 + "%"
				  },350, "linear");
				});

				$("a.sub-nav-return").on("click",function(e){
				  e.preventDefault();
					var parentHider = $(this).closest(".sub-categories").prev(".category.iamalive");
				  $("ul.nav.categories").animate({
				    left: "-" + ($(this).data("level") - 1) * 100 + "%"
				  },350, "linear");
					setTimeout(function(){
						$(parentHider).removeClass("iamalive");
						parentHider = null;
					},500);
				});
			},
			closeMobileNavs = function(){
				if($(window).width() > 990) {
					$("#close-navigation").trigger('click');
					$("#close-filters").trigger('click')
				}
			},
			onResize = function() {
				$(window).on('resize', function () {
					debounce(sapient.winesFilter.closeMobileNavs,100,"close Mobile Navs");
				});
			},
			onClickOutside = function() {
				
				$(document).on('touchend', function(e) {

					if ($(e.target).is('.wine-filters-desktop, .wine-filters-desktop *') ) {

						$(".wine-filters-desktop .visited").css("background-color","#1e7266");
						$(".wine-filters-desktop .hovered").css("background-color","#1e7266");
						$(".hovered >a").css("color","white");
						if ($(e.target.parentElement).hasClass("visited") ){
							$(e.target.parentElement).siblings().removeClass("visited");
							$(e.target.parentElement).find(".level-2.list-reset").css({"opacity":1, "left": 0 });
							$(".wine-filters-desktop .visited").css("background-color","white");
							$(".visited >a").css("color","#d50032");
							$(".wine-filters-desktop .visited ").addClass("hovered").removeClass("visited");
						}
						$(".wine-filters-desktop .visited").removeClass("visited");
						return;
					}
					$(".level-2.list-reset").css({"opacity":0, "left": -9999 });
					$(".wine-filters-desktop .hovered").css("background-color","#1e7266");
					$(".wine-filters-desktop .hovered >a").css("color","white");
					$(".wine-filters-desktop .hovered ").removeClass("hovered").addClass("visited");
				});
			}
			;


		return {
			// public + private states and behaviors
			filterWines: filterWines,
			mobileFiltersMenu: mobileFiltersMenu,
			closeMobileNavs: closeMobileNavs,
			onResize: onResize,
			seeMoreLess: seeMoreLess,
			onClickOutside: onClickOutside
		};
	}

	return {
		getInstance: function() {
			if (!filterWinesCollection) {
				filterWinesCollection = createFilterWinesCollection();
			}
			return filterWinesCollection;
		}
	};

})(jQuery, window, sapient);

sapient.winesFilter = ourWines.getInstance();

sapient.winesFilter.filterWines();
sapient.winesFilter.mobileFiltersMenu();
sapient.winesFilter.onResize();
sapient.winesFilter.seeMoreLess();
sapient.winesFilter.onClickOutside();
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
				document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				location.reload(true);
			});
		},

		setEqualMargin = function() {
			$("footer .region-footer a.external").closest("li").css("margin-right",48);
		};


		return {
			// public + private states and behaviors
			setFooterDdownPos: setFooterDdownPos,
			onResize: onResize,
			regionSelector: regionSelector,
			setEqualMargin: setEqualMargin
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
sapient.footer.setEqualMargin();
var validationObj = (function($, window, sapient) {

	var validationInstance;

	function createValidtaionInstance() {

		var validate = function() {

			

			$(document).on("click", ".enquire-form .submit-info .submit-btn",function(event) {
				
				$("#statusMsg .messages").html("");

				var inputarr = [],
					selectarr = [],
					textareaarr = [],
					msgarr = [],
					$checked = $('.enquire-form  .subscription-checkbox').filter('[required]:visible'),
					textarea =$('.enquire-form .other-information textarea').filter('[required]:visible'),
					$email = $('.enquire-form input[type = email]'),
					$input = $(".enquire-form  .group input").filter('[required]'),
					$select = $(".enquire-form .group select").filter('[required]'),
					$alphaNumeric = $(".enquire-form .group .alpha-numeric").filter('[required]'),
					$numericOnly = $(".enquire-form .group .numeric-only").filter('[required]'),
					$alphaOnly = $(".enquire-form .group .alpha-only").filter('[required]'),
					
					filterEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					filterAlphaNumeric = /^[a-z0-9]+$/i,
					filterAlphaOnly = /^[A-Za-z-'\s]*$/,
					filterNumericOnly = /^\d+$/;	
				


				$.each($input, function(index) {

					if ($($input[index]).val().length == 0) {

						$($input[index]).siblings("label").addClass("error");
						$($input[index]).addClass("error-border");
						msgarr.push($($input[index]).siblings("label").text());

					} 
					else {
						
						$($(".enquire-form .group label")[index]).removeClass("error");
						$($input[index]).removeClass("error-border");
					}

					inputarr.push($($input[index]).val().length);

				});

				$.each($select, function(index) {
					if ($select[index].value == "") {
						$($select[index]).siblings("label").addClass("error");
						$($select[index]).addClass("error-border");
						msgarr.push($($select[index]).siblings("label").text());
					} 

					else {
						$($select[index]).removeClass("error-border");
					}
					selectarr.push($select[index].value);

				});

				$.each(textarea, function(index) {
					if(($(textarea[index]).html())== "") {
						$(textarea[index]).siblings("label").addClass("error");
						$(textarea[index]).addClass("error-border");
						msgarr.push($(textarea[index]).siblings("label").text());

					}

					textareaarr.push($(textarea[index]).value);
				});
				

				
				
			/*	if($alphaNumeric.val().length !== 0) {
					
					if (filterAlphaNumeric.test($alphaNumeric.val())) {
						$alphaNumeric.siblings("label").removeClass("error");
						$alphaNumeric.removeClass("error-border");
					}
					else {
						msgarr.push($alphaNumeric.data("err"));
						$alphaNumeric.siblings("label").addClass("error");
						$alphaNumeric.addClass("error-border");
						event.preventDefault();					
					}
				}
*/
					$.each($alphaNumeric, function(index) {
					
						if($($alphaNumeric[index]).val().length !== 0) {
							
							if (filterAlphaNumeric.test($($alphaNumeric[index]).val())) {
								$alphaNumeric[index].siblings("label").removeClass("error");
								$alphaNumeric[index].removeClass("error-border");
							}
							else {
								msgarr.push($("#node_translation_languages").data("alphaNumericErr")+" - "+$($alphaNumeric[index]).siblings("label").text());

								$($alphaNumeric[index]).siblings("label").addClass("error");
								$($alphaNumeric[index]).addClass("error-border");
								event.preventDefault();					
							}

						}
					});
					$.each($alphaOnly, function(index) {
					
						if($($alphaOnly[index]).val().length !== 0) {
							
							if (filterAlphaOnly.test($($alphaOnly[index]).val())) {
								$($alphaOnly[index]).siblings("label").removeClass("error");
								$($alphaOnly[index]).removeClass("error-border");
							}
							else {
								msgarr.push($("#node_translation_languages").data("alphaOnlyErr")+" - "+$($alphaOnly[index]).siblings("label").text());
								$($alphaOnly[index]).siblings("label").addClass("error");
								$($alphaOnly[index]).addClass("error-border");
								event.preventDefault();					
							}

						}
					});
				

				$.each($numericOnly, function(index) {
					
					if($($numericOnly[index]).val().length !== 0) {
						
						if (filterNumericOnly.test($($numericOnly[index]).val())) {
							$($numericOnly[index]).siblings("label").removeClass("error");
							$($numericOnly[index]).removeClass("error-border");
						}
						else {/*
							msgarr.push($($numericOnly[index]).data("err"));*/

							msgarr.push($("#node_translation_languages").data("numericErr")+" - "+$($numericOnly[index]).siblings("label").text());
							$($numericOnly[index]).siblings("label").addClass("error");
							$($numericOnly[index]).addClass("error-border");
							event.preventDefault();					
						}
					}
				});
				
				$.each($email, function(index) {
					
					if($($email[index]).val().length !== 0) {
						
						if (filterEmail.test($($email[index]).val())) {
							$($email[index]).siblings("label").removeClass("error");
							$($email[index]).removeClass("error-border");
						}
						else {
							msgarr.push($("#node_translation_languages").data("emailErr")+" - "+$($email[index]).siblings("label").text());
							$($email[index]).siblings("label").addClass("error");
							$($email[index]).addClass("error-border");
							event.preventDefault();					
						}
					}
				});

				if (msgarr.length !== 0) {

					$(".enquire-form #statusMsg ol").addClass("error");
					$(".enquire-form #statusMsg").css('display', 'block');

					$.each(msgarr, function(index) {
						$("#statusMsg .messages").append('<li class="msg">' + msgarr[index] + '</li>');
					});

				}
				else {

					$("#statusMsg").css('display', 'none');

				}


				$.each(inputarr, function(index) {

					if (inputarr[index] === 0) {
						event.preventDefault();
						
					}
				})

				$.each(selectarr, function(index) {
					if (selectarr[index] == "") {
						event.preventDefault();
						
					}
				})

				$.each(textareaarr, function(index) {
					if (textareaarr[index] == "") {
						event.preventDefault();
						
					}
				})

				$.each($checked,function(index) {
					if (!($($checked[index]).is(':checked'))) {						
						$($checked[index]).siblings("label").addClass("change");
						$($checked[index]).siblings("label").addClass("error");
						event.preventDefault();	
					} 
					else {

						$($checked[index]).siblings("label").removeClass("change");
						$($checked[index]).siblings("label").removeClass("error");

					}		
				})
				if(!(event.isDefaultPrevented())) { 
					sapient.validation.showLoaderOnSubmit();
				}	
			});
		},
		
		inputSelect = function() {
			var $input = $(".enquire-form  .group input").filter('[required]:visible');

			$input.each(function() {
				if($(this).val().length !== 0) {
					
					$(this).siblings('label').addClass("text-entered");
				}
				else {
					
					$(this).siblings('label').removeClass("text-entered");
				}
				
			})	
		},

		addCheckboxVal = function() {
			var $anchorBlock = $(".help-block");
			var	interval = setInterval(function() {
				var $checkedNtRequired = $('.enquire-form  .subscription-checkbox');
				if($checkedNtRequired.length > 0) {
					var $checkedNtRequired = $('.enquire-form  .subscription-checkbox');
					$.each($checkedNtRequired,function(index){
						var labelText = $($checkedNtRequired[index]).siblings("label").html(),
							dataArrText= $($checkedNtRequired[index]).siblings("label").attr('data-original-title');
						if(dataArrText){
							$($checkedNtRequired[index]).siblings("label").html(labelText + " " + dataArrText)
						}
						else { 
							var anchorBlockText = $($checkedNtRequired[index]).parent().find(".help-block").html();
							if(anchorBlockText){
								$($checkedNtRequired[index]).siblings("label").html(labelText + " " + anchorBlockText)
								$($checkedNtRequired[index]).parent().find(".help-block").hide();
							}
							
						}
					})
					clearInterval(interval);
				}	
			}, 200);		
		},

		resetForm = function() {
			$(document).ready(function () {
				for (i = 0; i < document.forms.length; i++) {
					document.forms[i].reset();
				}
			});
		},

		submitBtnClass = function() {

			$(".enquire-form button.submit-btn").removeClass().addClass("cta dark submit-btn")
			$(".enquire-form .other-information textarea").removeClass().addClass("detail-info header_e");	
		},

		inputOnFocus = function() {
			
			$(".enquire-form input.brancott-form").on('focus',function() {
				
				$(this).removeClass("error-border");
				$(this).siblings('label').removeClass("error");
				
				$(this).siblings().find(" .highlight1").css({"left":"50%"},{"width":"0.1%"}).animate({"left":"-0.1%","width":"50.1%"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"0.1%"}).animate({"width":"49.9%"}, "slow");  

			}); 

			
		},

		textareaOnFocus = function() {
			
			$(".enquire-form  .other-information textarea").on('focus', function() {

				$(this).siblings().find(" .highlight1").css({"left":"50%"},{"width":"0%"}).animate({"left":"0%","width":"50%"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"0%"}).animate({"width":"50%"}, "slow"); 
			})
		},

		inputOnFocusOut = function() {
			$(".enquire-form input.brancott-form").on('focusout',function(){
				$(this).siblings().find(" .highlight1").css({"left":"0"},{"width":"50%"}).animate({"left":"50%","width":"0"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"50%"}).animate({"width":"0"}, "slow");  

				if($(this).val().length !== 0) {
					
					$(this).siblings('label').addClass("text-entered");
				}
				else {
					
					$(this).siblings('label').removeClass("text-entered");
				}
			});
		},

		textareaOnFocusOut = function() {
			
			$(".enquire-form  .other-information textarea").on('focusout',function(){
				$(this).siblings().find(" .highlight1").css({"left":"0"},{"width":"50%"}).animate({"left":"50%","width":"0"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"50%"}).animate({"width":"0"}, "slow");  
				
				if($(this).val().length !== 0) {
					
					$(this).siblings('label').addClass("text-area-entered");
				}
				else {
					
					$(this).siblings('label').removeClass("text-area-entered");
				}
			});
		},

		
		selectChange = function() {
			var $select = $(".enquire-form .group select");

			$select.on("change",function(){
				$(this).removeClass("error-border");
				$(this).siblings('label').removeClass("error");

				if($(this).val() == "") {
					$(this).siblings('label').removeClass("text-entered");
				}
				else{
					$(this).siblings('label').addClass("text-entered");
				}
			});

		},
		handleBackEndSucess =function() {
			var successMsg = $(".successfull-msg");
			
			if(successMsg.length > 0) {
				var str = successMsg.text()
				$(".successfull-msg").hide();
				$('html, body').animate({
				scrollTop: $("#block-webform_block").offset().top
				}, 1000);

				$(".enquire-form").hide();
				$(".form-heading .form-info").hide();
				$(".enquire-form .status-msg .error").hide();
				successMsg.addClass("success-msg").show().insertAfter($(".form-heading"));
			}
		},
		
		countrySelector = function() {
			$(document).on('change','.newsletter-form .country-primary select',function() {
				var str= $(this).val().toLowerCase(),
				$selector = $("."+str);
				$(".newsletter-form .country-secondary").hide().find("select,input,textarea").removeAttr("required");
				
				if(str === "gb" || str === "nz" || str === "fr" || str === "al" || str === "dz" || str === "ao" ||str === "at") {
					$selector.show();
					$selector.find("label").removeClass("form-required");
				}	
				else{
					$selector.find("label").addClass("form-required");
					$selector.show().find("select,input,textarea").attr("required",true);
				}
			});
		},

		handleBackEndError = function() {
			var beErrLength= $(".custom-error li").length,
				$input = $(".enquire-form  .group input");
			
			if(beErrLength > 0){
				var str="";
				sapient.validation.countrySelector();
				$("#edit-country").trigger("change");
				//sapient.common.setCountryNewsLetter();
				$(".enquire-form button.submit-btn").removeClass().addClass("cta dark submit-btn");
				
				$(".custom-error li").each(function(){
					str= $(this).text();

					$('html, body').animate({
					scrollTop: $("#block-webform_block").offset().top
					}, 1000);

					$(".enquire-form .status-msg").show();
					$(".enquire-form ol  ").append("<li class='msg error'>"+str+"</li>");

				});
				
				var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"],
					weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
					val = $(".enquire-form .date-wrapper #edit-preferred-date").val(),
					getDay,
					newDate;
				if(val) {
					val=val.split("-")
					val[1] = monthArray[val[1] -1];
					getDay = weekArray[new Date($(".enquire-form .date-wrapper #edit-preferred-date").val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getDay()];
					val.unshift(getDay)
					newDate = val.join(" ");
					$(".date-overlay").text(newDate);
				}


			}
			else {
				sapient.common.setCountryNewsLetter();
			}

			$.each($input,function(index) {
				if($($input[index]).hasClass("error")) {
					
					$($input[index]).siblings("label").addClass("error");
					$($input[index]).addClass("error-border");
				}
				else {

					$($input[index]).siblings("label").removeClass("error");
					$($input[index]).removeClass("error-border");
				}
			});

		},
		loader =function() {
			$(".enquire-form .submit-info .loader-wrapper").hide();
			var dot = $(".enquire-form .submit-info .loader-wrapper .dot"),
				interval = setInterval(function() {
			    setTimeout(function(){ 
			      $(dot[0]).removeClass("hide-dot").addClass("show-dot");
			    }, 1200/3);

			    setTimeout(function(){ 
			      $(dot[1]).removeClass("hide-dot").addClass("show-dot");
			    }, 2240/3);

			    setTimeout(function(){ 
			      $(dot[2]).removeClass("hide-dot").addClass("show-dot");
			    }, 1200);

			    $.each(dot,function(index){
			      $(dot[index]).removeClass("show-dot").addClass("hide-dot")
			    })
			}, 1400); 
		},
		showLoaderOnSubmit = function () {
			var interval = setInterval(function() {
				if(!(window.location.pathname.indexOf("token") != -1)){
					$(".enquire-form .submit-info .loader-wrapper").show();
					$(".enquire-form .submit-info .submit-btn").hide();
				}
				else{
					clearInterval(interval)
				}
			},200);	
		};

		return {
			// public + private states and behaviors
			validate: validate,
			handleBackEndSucess: handleBackEndSucess,
			inputOnFocus: inputOnFocus,
			inputOnFocusOut: inputOnFocusOut,
			selectChange: selectChange,
			submitBtnClass: submitBtnClass,
			handleBackEndError:  handleBackEndError,
			inputSelect: inputSelect,
			textareaOnFocus: textareaOnFocus,
			textareaOnFocusOut: textareaOnFocusOut,
			resetForm: resetForm,
			addCheckboxVal:addCheckboxVal,
			countrySelector: countrySelector,
			showLoaderOnSubmit:showLoaderOnSubmit,
			loader:loader
		};
	}

	return {
		getInstance: function() {
			if (!validationInstance) {
				validationInstance = createValidtaionInstance();
			}
			return validationInstance;
		}
	};


})(jQuery, window, sapient);

sapient.validation = validationObj.getInstance();
sapient.validation.validate();
sapient.validation.handleBackEndError();
sapient.validation.handleBackEndSucess();
sapient.validation.inputOnFocus();
sapient.validation.inputOnFocusOut();
sapient.validation.textareaOnFocus();
sapient.validation.textareaOnFocusOut();
sapient.validation.selectChange();
sapient.validation.submitBtnClass();
sapient.validation.countrySelector();
sapient.validation.inputSelect();
sapient.validation.resetForm();
sapient.validation.addCheckboxVal();
sapient.validation.loader();
$(document).ready(function() {  
	/*sapient.common.setCountryNewsLetter();*/
});