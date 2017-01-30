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

var sapient = sapient || {}; 
var commonObj = (function($, window, sapient) {

	var commonInstance;

	function createInstance() {

		var	scrollToNext = function() {
			var hrefLink = $($(".scroll-to")[1]).attr('id');
			$(".scroll-down").attr('href', "#" + hrefLink);
		},

		hideLinkText = function() {
			$("footer section.social-icons nav ul li a").text("")
		};

		return {
			// public + private states and behaviors
			scrollToNext: scrollToNext,
			hideLinkText: hideLinkText
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

sapient.common.scrollToNext();
sapient.common.hideLinkText();
var carouselObj = (function($, window, sapient) {

	var carouselInstance;

	function createCarouselInstance() {

		var enableTouchCarousel = function(value) {
			$(value).on("touchstart", function(event) {
				var xClick = event.originalEvent.touches[0].pageX;
				$(this).one("touchmove", function(event) {
					var xMove = event.originalEvent.touches[0].pageX;
					if (Math.floor(xClick - xMove) > 5) {
						$(value).carousel('next');
					} else if (Math.floor(xClick - xMove) < -5) {
						$(value).carousel('prev');
					}
				});

				$(value).on("touchend", function() {
					$(this).off("touchmove");
				});
			});
		},

		toggleCarouselArrow = function(id) {
			$(id).hover(
				function() {
					$(this).find(".carousel-control-wrapper").animate({
						opacity: ["1"]
					}, 500)
				},
				function() {
					$(this).find(".carousel-control-wrapper").animate({
						opacity: ["0"]
					}, 500)
				}
			);
		};

		return {
			// public + private states and behaviors
			enableTouchCarousel: enableTouchCarousel,
			toggleCarouselArrow: toggleCarouselArrow
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
sapient.carousel.enableTouchCarousel("#carousel-our-wines");/*
sapient.carousel.toggleCarouselArrow("#carousel-our-story");
sapient.carousel.toggleCarouselArrow("#carousel-our-wines");*/

var clickDelay      = 500,
    clickDelayTimer = null;

$('.burger-click-region').on('click', function () {
  
  if(clickDelayTimer === null) {
  
    var $burger = $(this);
    $burger.toggleClass('active');
    $burger.parent().toggleClass('is-open');

    if(!$burger.hasClass('active')) {
      $burger.addClass('closing');
    }

    clickDelayTimer = setTimeout(function () {
      $burger.removeClass('closing');
      clearTimeout(clickDelayTimer);
      clickDelayTimer = null;
    }, clickDelay);
  }
});

var heroObj = (function($, window, sapient) {

	var heroInstance;

	function createHeroInstance() {

		var getHeightHero = function() {
			$('.scroll-down').click(function() {
				var heightHero = $("#hero-component").height();
				$('html, body').animate({
					scrollTop: heightHero
				}, 1000);
			});
		};

		return {
			// public + private states and behaviors
			getHeightHero: getHeightHero
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

sapient.hero.getHeightHero();
var headerObj = (function($, window, sapient) {

	var headerInstance;

	function createHeaderInstance() {

		var getMenuHeadingVal = function() {
			$(document).on("click",".menu > .menu-item .expand-icon", function(e){
				console.log($(this).parents("a").text());
				console.log($(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading"));
				$(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading span.text").text($(this).parents("a").text());
			});
		};

		var animateMobileMenu = function () {
			$("#navbar-header .menu .menu-item").on("click",function(){
				if(!$(this).parents(".menu").hasClass("menu-open")){$(this).parents(".menu").addClass("menu-open");}
				else {
					$(this).parents(".menu").removeClass("menu-open");	
				}
			});
		}

		var removeMobileLogoText = function () {
			$("#navbar-header .logo a").text("");
		}

		var collapseMobileMenu = function() {
			var windowWidth = $(window).width();
			if(windowWidth < 691) {
				$("#navbar-header").removeClass("in").addClass('collapse');	
			}
		}

		var setMenuBarHeight = function() {
			var windowWidth = $(window).width();

			/*$("#navbar-header .menu-item").on("click", function() {
				var subMenuHeight = $(this).find(".sub-menu-wrapper").height();
				if(windowWidth > 991) {
					$(this).find(".sub-menu").height(subMenuHeight);
				}
			});
*/
			$("#navbar-header .menu-item").hover(

				function() {
					var subMenuHeight = $(this).find(".sub-menu-wrapper").height();
					if(windowWidth > 991) {
						$(this).find(".sub-menu").height(subMenuHeight);
					}
				},
				function() {
					if(windowWidth > 991) {
						$(this).find(".sub-menu").height(70);
					}
					
				}
			);
		}

		return {
			// public + private states and behaviors
			getMenuHeadingVal: getMenuHeadingVal,
			animateMobileMenu: animateMobileMenu,
			removeMobileLogoText: removeMobileLogoText,
			collapseMobileMenu: collapseMobileMenu,
			setMenuBarHeight: setMenuBarHeight
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
var footerObj = (function($, window, sapient) {

	var footerInstance;

	function createFooterInstance() {

		var setFooterDdownPos = function() {
			var windowWidth = $(window).width();
			if (windowWidth > 1200 && windowWidth < 1400) {
				var right = (windowWidth - 1170) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
			} else if (windowWidth > 1400) {
				var right = (windowWidth - 1400) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
			}
		},

		onResize = function() {
			$(window).on('resize', function () {
				sapient.footer.setFooterDdownPos();
			});
		};


		return {
			// public + private states and behaviors
			setFooterDdownPos: setFooterDdownPos,
			onResize: onResize
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

sapient.footer.setFooterDdownPos();
sapient.footer.onResize();