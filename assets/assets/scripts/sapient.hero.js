var heroObj = (function($, window, sapient) {

	var heroInstance;

	function createHeroInstance() {

		var setLocalTime = function() {
			var time = new Date(),
			hours = time.getHours()-12,
			mins = time.getMinutes(),
			secs = time.getSeconds(),
			dateTimeHeading = $("#hero-component date-time");
			if(dateTimeHeading.length > 0) {
				$("#hero-component date-time").text(time);				
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

sapient.hero.setLocalTime();