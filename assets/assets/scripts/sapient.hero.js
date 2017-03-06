var heroObj = (function($, window, sapient) {

	var heroInstance;

	function createHeroInstance() {

		var setLocalTime = function(offset) {
				var d = new Date(),
				utc = d.getTime() + (d.getTimezoneOffset() * 60000),
				nd = new Date(utc + (3600000*offset)),
				m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"),
				time = nd,
				curr_year = time.getFullYear(),
				curr_month = time.getMonth(),
				curr_date = time.getDate(),
				hours = time.getHours()-12,
				mins = time.getMinutes(),
				timeStr = "";

			if(mins < 10){
				mins="0" + mins;
			}

			if(hours < 12) {
					amPm = "pm";
				}
				
			else {
				amPm = "am";
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

sapient.hero.setLocalTime("+13");