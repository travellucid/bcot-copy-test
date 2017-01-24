var headerObj = (function($, window, sapient) {

	var headerInstance;

	function createHeaderInstance() {

		var getMenuHeadingVal = function() {
			$(document).on("click",".menu > .menu-item .expand-icon", function(e){
				$(this).find(".sub-menu-wrapper .menu-heading").text($(this).parents(".dropdown-toggle").text());
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

		return {
			// public + private states and behaviors
			getMenuHeadingVal: getMenuHeadingVal,
			animateMobileMenu: animateMobileMenu,
			removeMobileLogoText: removeMobileLogoText,
			collapseMobileMenu: collapseMobileMenu
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