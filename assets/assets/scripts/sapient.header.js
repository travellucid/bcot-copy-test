var headerObj = (function($, window, sapient) {

	var headerInstance;

	function createHeaderInstance() {

		var getMenuHeadingVal = function() {
			$(document).on("click",".menu > .dropdown .dropdown-toggle", function(e){
				$(".sub-menu-wrapper .menu-heading").text($(this).text());
			});
		};

		var animateMobileMenu = function () {
			$("#navbar-header .menu .dropdown").on("click",function(){
				if(!$(this).parents(".menu").hasClass("menu-open")){$(this).parents(".menu").addClass("menu-open");}
				else {
					$(this).parents(".menu").removeClass("menu-open");	
				}
			});
		}

		var removeMobileLogoText = function () {
			$("#navbar-header .logo a").text("");
		}	

		return {
			// public + private states and behaviors
			getMenuHeadingVal: getMenuHeadingVal,
			animateMobileMenu: animateMobileMenu,
			removeMobileLogoText: removeMobileLogoText
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