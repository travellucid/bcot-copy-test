var datePickerObj = (function($, window, sapient) {

	var datetimepickerInstance;
	function createDatePickerInstance() {
		var bindDatePicker = function() {
			$(".enquire-form .date-wrapper .date").datetimepicker({
				maxDate:'2020/01/01',
				format:'DD-MM-YYYY'
			}).find('input:first').on("blur",function () {
	
				// check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
				// update the format if it's yyyy-mm-dd
				var date = sapient.datepicker.parseDate($(this).val());
			
				if (! sapient.datepicker.isValidDate(date)) {
					//create date based on momentjs (we have that)
					date = moment().format('YYYY-MM-DD');
				}

				$(this).val(date);
			});
			
			/*$(".enquire-form .date-wrapper .date")*/
			$(".fa-clock-o").closest(".picker-switch").hide();
			$(".table-condensed .next").html("");
			$(".table-condensed .prev").html("");
			$(".enquire-form .date-wrapper input").attr('readonly','readonly');

			$(".date-wrapper .calender-icon").on('click',function(){
				$("#edit-preferred-date").focus(); 
				sapient.datepicker.positionCalender();
				
			}); 

		
			$(window).on('resize', function() {
				debounce(sapient.datepicker.positionCalender, 50, "changing calenderPostion");
			});
			

			$(".enquire-form .date-wrapper .date").on("change", function() {
				var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"],
					weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				 	val = $(this).val().split("-"),
				 	getDay,
				 	newDate;

				val[1] = monthArray[val[1] -1];
				getDay = weekArray[new Date($(this).val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getDay()];
				val.unshift(getDay)
				newDate = val.join(" ");
				$(".date-overlay").text(newDate);
				//$("#edit-preferred-date").val(newDate);
				$(" .bootstrap-datetimepicker-widget").hide();
			});
 
		},

		positionCalender = function() {
			var iconPos = $(".calender-icon").offset();
			
			if($(".bootstrap-datetimepicker-widget ").is(":visible") === true) {

				$(this).blur();

				if($windowWidth > 1281) {
					$(".bootstrap-datetimepicker-widget ").css("left", iconPos.left );
				}
			}
		},

		isValidDate = function(value, format) {
			console.log()
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
