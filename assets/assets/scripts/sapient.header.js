var headerObj = (function($, window, sapient) {

	var headerInstance;

	function createHeaderInstance() {

		var getMenuHeadingVal = function() {
			$(document).on("click",".menu > .dropdown .dropdown-toggle", function(e){
				$(".sub-menu-wrapper .menu-heading").text($(this).text());
			});
		};

		return {
			// public + private states and behaviors
			getMenuHeadingVal: getMenuHeadingVal
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
