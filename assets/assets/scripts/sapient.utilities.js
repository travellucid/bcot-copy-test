/*global document, window, jQuery, $, sapient:true, console */
/*jslint  browser: true, undef: false, white: true, forin: true, unparam: true, strict:false, jquery: true, smarttabs:true */

/*
 * sapient: Re-usable utility functions
 * 
 * Author: Sapient Nitro (2016) (http://www.sapient.com)
 * @version 1.0
 */

(function($, window) {
	sapient.utilities = {
		getUrlParameter: function(sParam){
			if(window.location.search !== ''){
				var sPageURL = window.location.search.substring(1);
				var sURLVariables = sPageURL.split('&');
				for (var i = 0; i < sURLVariables.length; i++) {
				var sParameterName = sURLVariables[i].split('=');
					if (sParameterName[0] === sParam) {
						return sParameterName[1];
					}
				}
			} else {
				return "";
			}
		},
		readPriceFromCookie: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},
		getHostName: function(url) {
			if (url) {
				var part = url.split("/");
				if (part && part.length > 2) {
					return part[2];
				}
			}
			return "";
		}
	};
}(jQuery, window));

var cacheChecker = document.getElementById("cacheTest");
if(cacheChecker) {
	if(cacheChecker.value.length) {
		document.location.reload(true);
	}
	cacheChecker.value = "cacheTest";
}