var validationObj = (function($, window, sapient) {

	var validationInstance;

	function createValidtaionInstance() {

		var validate = function() {
			var $input = $(".enquire-form form .group input"),
				$select = $(".enquire-form form .group select");


			$(".fa-clock-o").closest(".picker-switch").hide();
			$(".table-condensed .next").html("");
			$(".table-condensed .prev").html("");
			
			$input.focusout(function(){
				//console.log($(this).siblings('label'));
				if($(this).val().length !== 0) {
					
					$(this).siblings('label').addClass("text-entered");
				}
				else {
					
					$(this).siblings('label').removeClass("text-entered");
				}
			});
			
			$(".enquire-form .submit-info .submit-btn").click(function() {
				
				$("#errMsg .messages").html("");

				var checked = $('#check').is(':checked'),
					inputflag = 0,
					inputarr = [],
					selectflag = 0,
					selectarr = [],
					msgarr = [];

				$.each($input, function(index) {

					if ($($input[index]).val().length == 0) {

						$($(".enquire-form form .group label")[index]).addClass("error");
						$($input[index]).addClass("error-border");
						msgarr.push($($(".enquire-form form .group label")[index]).html());

					} 
					else {
						
						$($(".enquire-form form .group label")[index]).removeClass("error");
						$($input[index]).removeClass("error-border");
					}

					inputarr.push($($input[index]).val().length);

				});

				$.each($select, function(index) {

					if ($select[index].value == "") {
						$($select[index]).addClass("error-border");
						msgarr.push($($(".enquire-form form .group select option[value='']")[index]).text());
					} 

					else {
						$($select[index]).removeClass("error-border");
					}

					selectarr.push($select[index].value);
				});

				if (msgarr.length !== 0) {

					$("#errMsg").addClass("error");
					$("#errMsg").css('display', 'block');

					$.each(msgarr, function(index) {
						$("#errMsg .messages").append('<span class="msg">' + msgarr[index] + '</span>');
					});
				}

				$.each(inputarr, function(index) {

					if (inputarr[index] === 0) {
						inputflag = 0;
						//console.log("false input")
						return false;
					}
				})

				$.each(selectarr, function(index) {

					if (selectarr[index] == "") {
						selectflag = 0;
						//console.log("false select")
						return false;
					}
				})

				if (!checked) {
					//console.log("return false")
					return false;
				} 
				//console.log("submit")
				return true;			
			});
		};

		return {
			// public + private states and behaviors
			validate: validate
		};
	}

	return {
		getInstance: function() {
			if (!validationInstance) {
				validationInstance = createValidtaionInstance();
			}
			return validationInstance;
		}
	};


})(jQuery, window, sapient);

sapient.validation = validationObj.getInstance();
sapient.validation.validate();
