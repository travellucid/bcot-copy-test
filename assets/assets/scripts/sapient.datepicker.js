var datePickerObj = (function($, window, sapient) {

	var datetimepickerInstance;
	function createDatePickerInstance() {
		var bindDatePicker = function() {
			$(".date").datetimepicker({
				maxDate:'2020/01/01',
				format:'DD-MM-YYYY'
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
			
			$(".fa-clock-o").closest(".picker-switch").hide();
			$(".table-condensed .next").html("");
			$(".table-condensed .prev").html("");

			$(".calender-icon").on('click',function(){
				$("#edit-preferred-date").focus(); 
				sapient.datepicker.positionCalender();
				
			}); 
		
			$(window).on('resize', function() {
				debounce(sapient.datepicker.positionCalender, 50, "changing calenderPostion");
			});
			

			$(".enquire-form .date-wrapper .date").on("change", function() {
				$(" .bootstrap-datetimepicker-widget").hide();
			});

 
		},

		positionCalender = function() {
			var iconPos = $(".calender-icon").offset();
			
			if($(".bootstrap-datetimepicker-widget ").css("display") === "block") {

				$(this).blur();

				if($windowWidth > 1281) {
					$(".bootstrap-datetimepicker-widget ").css("left", iconPos.left );
				}
			}
			
			/*else if (($(".bootstrap-datetimepicker-widget ").css("display") === "block")) {
				
				$(".bootstrap-datetimepicker-widget ").css("left",$(".calender-icon").offset().left - 250);
			}*/
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
