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