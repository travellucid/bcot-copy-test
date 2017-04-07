var heroObj = (function($, window, sapient) {

	var heroInstance;

	function createHeroInstance() {

		var setLocalTime = function(offset) {
				var d = new Date(),
				utc = d.getTime() + (d.getTimezoneOffset() * 60000),
				time = new Date(utc + (3600000*offset)),
				m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"),
				curr_year = time.getFullYear(),
				curr_month = time.getMonth(),
				curr_date = time.getDate(),
				hours = time.getHours()/*-12*/,
				mins = time.getMinutes(),
				timeStr = "";

			if(mins < 10){
				mins="0" + mins;
			}

			if((hours-12) < 0) {
					amPm = "am";
					console.log(hours);
				}
				
			else {
				amPm = "pm";
				hours-=12;
			}
				
			timeStr = curr_date  + " " + m_names[curr_month] + " " + curr_year + " / " + hours + ":" +mins +""+ amPm;

			var	dateTimeHeading = $("#hero-component .date-time");

			if(dateTimeHeading.length > 0) {
				$("#hero-component .date-time").text( timeStr);				
			}

		};

		return {
			setLocalTime: setLocalTime
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
$(document).ready(function(){
	var dstFlag = $("#node_translation_languages").data("isDst");
	if(dstFlag == 0){
		sapient.hero.setLocalTime("+12");
	}
	else if(dstFlag == 1){
		sapient.hero.setLocalTime("+13");	
	}
	alert(dstFlag);	
});