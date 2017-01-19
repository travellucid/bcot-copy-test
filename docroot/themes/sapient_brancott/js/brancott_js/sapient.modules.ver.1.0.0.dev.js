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

var $ = jQuery.noConflict();
var sapient = sapient || {}; // core sapient

(function ($, window, sapient) {
	sapient.initComplete = false;
	sapient.init = function () {
		sapient.setFooterDdownPos();
		sapient.scrollToNext();
		sapient.hideLinkText();
		sapient.enableTouchCarousel("#carousel-our-story");
		sapient.enableTouchCarousel("#carousel-our-wines");
		sapient.toggleCarouselArrow("#carousel-our-story");
		sapient.toggleCarouselArrow("#carousel-our-wines");
	};

	sapient.scrollToNext = function() {
		var hrefLink = $($(".scroll-to")[1]).attr('id');
		$(".scroll-down").attr('href', "#" +hrefLink);			
	};

	sapient.getHeightHero = function() {
		$('.scroll-down').click(function() {
			var heightHero = $("#hero-component").height();
			$('html, body').animate({
				scrollTop: heightHero
			}, 1000);
		});	
	}

	sapient.enableTouchCarousel = function(value) {
		$(value).on("touchstart", function(event){
			var xClick = event.originalEvent.touches[0].pageX;
			$(this).one("touchmove", function(event){
				var xMove = event.originalEvent.touches[0].pageX;
				if( Math.floor(xClick - xMove) > 5 ){
					$(value).carousel('next');
				}
				else if( Math.floor(xClick - xMove) < -5 ){
					$(value).carousel('prev');
				}
			});

			$(value).on("touchend", function(){
				$(this).off("touchmove");
			});
		});
	}

	sapient.hideLinkText = function() {
		$("footer section.social-icons nav ul li a").text("")
	}

	sapient.setFooterDdownPos = function() {
		var windowWidth = $(window).width();
		if (windowWidth > 1200 && windowWidth < 1400) {
			var right = (windowWidth - 1170)/2;
			$("footer .select-wrapper").css('right' , right+15+'px');
		}
		else if (windowWidth > 1400)  {
			var right = (windowWidth - 1400)/2;
			$("footer .select-wrapper").css('right' , right+15+'px');
		}
	}

	sapient.toggleCarouselArrow = function(id) {
		$(id).hover(
			function() {
				$(this).find(".carousel-control-wrapper").animate({
					opacity:["1"]
				},500)
			}, function() {
				$(this).find(".carousel-control-wrapper").animate({
					opacity:["0"]
				},500)
			}
		);
	}
		

	$(window).resize( function() {
		sapient.setFooterDdownPos();
	});

	$(document).ready(function () {
		if (sapient.common) {
		   
			sapient.initComplete = true;
		}
		sapient.init();	
		sapient.getHeightHero();
	});

}(jQuery, window, sapient));
/*global document, window, jQuery, $, sapient:true, console */
/*jslint  browser: true, undef: false, white: true, forin: true, unparam: true, strict:false, jquery: true, smarttabs:true */
/*
 * tagHeuer: Re-usable utility functions
 * 
 * Author: Sapient Nitro (2014) (http://www.sapient.com)
 * @version 1.0
 */
 var $ = jQuery.noConflict();
(function ($, window) {
	sapient.menuheader = {
		is_iPad: navigator.userAgent.match(/iPad/i) != null,
		init: function () {
			
			this.toggleMenu();
			$(window).on("resize", $.debounce(250, function () {
				navbarHeight = $header.outerHeight(true);
				windowHeight = $(window).height() - navbarHeight;
				sapient.header.disableNoneMobile();
				sapient.header.setSubMenuHeight($nav, windowHeight);
				if ($(window).width() !== storedWidth) {
					sapient.header.resizeMenu($header, $nav, $subnav, $menuIcon);
					sapient.header.menuTabletDefault($headerNav, windowHeight);
					storedWidth = $(window).width();
				}
			}));
			
			$(window).on("scroll", function () {
				
			});
			
		
		},
		toggleMenu: function() {
			

			$("#block-sapient-brancott-main-menu ul.navbar-nav> li.dropdown >a").on('click',function(e){e.preventDefault();$(this).toggleClass("fuck")})
		}
	};
}(jQuery, window));