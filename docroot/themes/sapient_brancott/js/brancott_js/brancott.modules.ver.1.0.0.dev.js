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
	alert("noConflict");
}
var $ = jQuery.noConflict();
var sapient = sapient || {}; // core sapient
(function ($, window, sapient) {
	sapient.initComplete = false;
	sapient.init = function () {
		sapient.common.init();
		
	};
	
	$(document).ready(function () {
		if (sapient.common) {
		    sapient.init();
			sapient.initComplete = true;
		}
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
 alert("noconslasas");
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