var heroObj = (function($, window, sapient) {

	var heroInstance;

	function createHeroInstance() {

		var setLocalTime = function(offset) {
				var d = new Date(),    
				// convert to msec
				// add local time zone offset 
				// get UTC time in msec
				utc = d.getTime() + (d.getTimezoneOffset() * 60000),

				// create new Date object for different city
				// using supplied offset
				nd = new Date(utc + (3600000*offset));

				// return time as a string
		/*		return  nd.toLocaleString();
			var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"),
				time = new Date(),
				curr_year = time.getFullYear(),
				curr_month = time.getMonth(),
				curr_date = time.getDate(),
				hours = time.getHours()-12,
				mins = time.getMinutes(),
				timeStr = "";
				
				if(hours < 12) {
					amPm = "pm";
				}
				else {
					amPm = "am";
				}
				timeStr = curr_date  + " " + m_names[curr_month] + " " + curr_year + " / " + hours + ":" +mins +""+ amPm;
*/
				var	dateTimeHeading = $("#hero-component .date-time");
				if(dateTimeHeading.length > 0) {
					$("#hero-component .date-time").text( nd.toLocaleString());				
				}
		};
/*function updateTime(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    if(hours > 11){
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    document.getElementById('time_span').innerHTML = t_str;
}
setInterval(updateTime, 1000);
*/
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