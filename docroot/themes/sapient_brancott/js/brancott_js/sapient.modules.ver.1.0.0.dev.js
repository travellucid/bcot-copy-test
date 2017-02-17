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
			resize = function(){
				$(window).on('resize', function () {
					debounce(sapient.carousel.positionCarouselIndicator,500,"resizing carouselIndicator");
				});
			},
			positionCarouselIndicator = function() {
				//console.log(($("#carousel-new-story .carousel-inner  picture img")[0]).height());
				$("#carousel-new-story .carousel-indicators").css("top",$($("#carousel-new-story .carousel-inner  picture img")[0]).height()-36 + "px");
			},
			setHeight =function() {
				var heightArr = [],
					maxHeight;
				$.each($( "#carousel-new-story .carousel-inner .item" ) , function (index){
				  heightArr.push($($( "#carousel-new-story .carousel-inner .item" )[index]).height()); 
				});
				maxHeight = Math.max.apply(Math,heightArr);
				$( "#carousel-new-story .carousel-inner").css("height",maxHeight);
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
			toggleCarouselArrow: toggleCarouselArrow,
			positionCarouselIndicator:positionCarouselIndicator,
			setHeight:setHeight,
			resize:resize
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
/*not working will pick later*/
setTimeout(function() {
	/*sapient.carousel.positionCarouselIndicator();*/
    sapient.carousel.setHeight();
	$(window).trigger('resize');
}, 1000);
sapient.carousel.resize();
setTimeout(function() {    
	$(window).trigger('resize');
}, 5000);



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
		},
		disableHeroHeightChangeonMobile = function() {
			var windowHeight = $(window).height();
			if (windowWidth > 1200 /*&& windowWidth < 1400*/) {
				var right = (windowWidth - 1170) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
			} /*else if (windowWidth > 1400) {
				var right = (windowWidth - 1400) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
			}*/
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.hero.disableHeroHeightChangeonMobile,500,"testing HeroHeightChangeonMobile");
				/*sapient.footer.setFooterDdownPos();*/
			});
		};

		return {
			// public + private states and behaviors
			getHeightHero: getHeightHero,
			disableHeroHeightChangeonMobile: disableHeroHeightChangeonMobile
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

/*sapient.hero.getHeightHero();*/
var headerObj = (function($, window, sapient) {

	var headerInstance;

	function createHeaderInstance() {

		var getMenuHeadingVal = function() {
			$(document).on("click", ".menu > .menu-item .expand-icon", function(e) {
				console.log($(this).parents("a").text());
				console.log($(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading"));
				$(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading span.text").text($(this).parents("a").text().trim());
			});
		},

		animateMobileMenu = function() {
			$("#navbar-header .menu .menu-item").on("click", function() {
				if (!$(this).parents(".menu").hasClass("menu-open")) { $(this).parents(".menu").addClass("menu-open"); } else {
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

			$("#navbar-header .menu-item").hover(

				function() {
					var subMenuHeight = $(this).find(".sub-menu-wrapper").height();
					if (windowWidth > 991) {
						$(this).find(".sub-menu").height(subMenuHeight);
					}
				},
				function() {
					if (windowWidth > 991) {
						$(this).find(".sub-menu").height(70);
					}

				}
			);
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

					$("header").removeClass("white-background");
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
var footerObj = (function($, window, sapient) {

	var footerInstance;

	function createFooterInstance() {

		var setFooterDdownPos = function() {
			var windowWidth = $(window).width();
			if (windowWidth > 1200 /*&& windowWidth < 1400*/) {
				var right = (windowWidth - 1170) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
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