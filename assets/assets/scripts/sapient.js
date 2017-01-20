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
(function ($, window, sapient) {
	sapient.initComplete = false;
	sapient.init = function () {
		sapient.common.init();
		
	};
	
	$(document).ready(function () {
		if (sapient.common) {
		   
			sapient.initComplete = true;
		}
	sapient.init();	
	sapient.getHeightHero();
	});
}(jQuery, window, sapient));