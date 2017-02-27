var datePickerObj = (function($, window, sapient) {

 	var datetimepickerInstance;
	function createDatePickerInstance() {
		var bindDatePicker = function() {
			$(".date").datetimepicker({
	    		maxDate:'2020/01/01',
	        	format:'YYYY-MM-DD'
	        }).find('input:first').on("blur",function () {
				// check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
				// update the format if it's yyyy-mm-dd
				var date = sapient.datepicker.parseDate($(this).val());

				if (! sapient.datepicker.sValidDate(date)) {
					//create date based on momentjs (we have that)
					date = moment().format('YYYY-MM-DD');
				}

				$(this).val(date);
			});
			
			
			$(".calender-icon").on('click',function(){
				$("#datepicker").focus(); 
				if($(".bootstrap-datetimepicker-widget ").css("display") === "block") {
					$(".bootstrap-datetimepicker-widget ").css("left",$(".calender-icon").offset().left);
				}
			}); 
		

			$(".enquire-form :text").on('focus',function() {
				$(this).siblings(".highlight1").css({"left":"50%"},{"width":"0"}).animate({"left":"0%","width":"50%"}, "slow");
				$(this).siblings(".highlight2").css({"width":"0"}).animate({"width":"50%"}, "slow");  

			}); 
			
			$(".enquire-form :text").focusout(function(){
			  $(this).siblings(".wrapper .highlight1").css({"left":"0"},{"width":"50%"}).animate({"left":"50%","width":"0"}, "slow");
			  $(this).siblings(".wrapper .highlight2").css({"width":"50%"}).animate({"width":"0"}, "slow");  
			});
 
		},

	   	isValidDate = function(value, format) {
			format = format || false;
			// lets parse the date to the best of our knowledge
			if (format) {
				value = sapient.datepicker.parseDate(value);
			}

			var timestamp = Date.parse(value);

			return isNaN(timestamp) == false;
	   	},
   
	   	parseDate = function(value) {
			var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
			if (m)
				value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

			return value;
	   	};

		 return {
			 // public + private states and behaviors
			 bindDatePicker: bindDatePicker,
			 isValidDate:isValidDate,
			 parseDate:parseDate

		 };
	}

	return {
		getInstance: function() {
			if (!datetimepickerInstance) {
				datetimepickerInstance = createDatePickerInstance();
			}
			return datetimepickerInstance;
		}
	};

})(jQuery, window, sapient);


sapient.datepicker = datePickerObj.getInstance();
sapient.datepicker.bindDatePicker();
