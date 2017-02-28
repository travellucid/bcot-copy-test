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
				$("#edit-preferred-date").focus(); 
				if($(".bootstrap-datetimepicker-widget ").css("display") === "block") {
					sapient.datepicker.positionCalender();
				}
			}); 
		
			$(window).on('resize', function() {
					debounce(sapient.datepicker.positionCalender, 50, "changing calenderPostion");
			});
			$(".enquire-form input.brancott-form").on('focus',function() {
				
				$(this).siblings().find(" .highlight1").css({"left":"50%"},{"width":"0.1%"}).animate({"left":"-0.1%","width":"50.1%"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"0.1%"}).animate({"width":"49.9%"}, "slow");  

			}); 
			
			$(".enquire-form input.brancott-form").on('focusout',function(){
			 
			 $(this).siblings().find(" .highlight1").css({"left":"0","width":"50%"}).animate({"left":"50%","width":"0"}, "slow");
			 $(this).siblings().find(" .highlight2").css({"width":"50%"}).animate({"width":"0"}, "slow");  
			});
 
		},

		positionCalender = function() {
			var calPos = $(".calender-icon").offset();
			$(".bootstrap-datetimepicker-widget ").css("left", $(calPos).left);
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
			 positionCalender:positionCalender,
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
