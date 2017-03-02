var validationObj = (function($, window, sapient) {

	var validationInstance;

	function createValidtaionInstance() {

		var validate = function() {
			var $input = $(".enquire-form  .group input"),
				$select = $(".enquire-form .group select");


			$(".enquire-form button.submit-btn").removeClass().addClass("cta dark submit-btn")
			
			$(".enquire-form input.brancott-form").on('focus',function() {

				$(this).removeClass("error-border");
				$(this).siblings('label').removeClass("error");
				
				$(this).siblings().find(" .highlight1").css({"left":"50%"},{"width":"0.1%"}).animate({"left":"-0.1%","width":"50.1%"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"0.1%"}).animate({"width":"49.9%"}, "slow");  

			}); 
			
			$(".enquire-form input.brancott-form").on('focusout',function(){

				$(this).siblings().find(" .highlight1").css({"left":"0"},{"width":"50%"}).animate({"left":"50%","width":"0"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"50%"}).animate({"width":"0"}, "slow");  

				if($(this).val().length !== 0) {
					
					$(this).siblings('label').addClass("text-entered");
				}
				else {
					
					$(this).siblings('label').removeClass("text-entered");
				}

			});


			
			/*$(document).ready(function() {
				$(".time-wrapper input").mask('00:00:00');
			});*/

			
			$(".enquire-form .submit-info .submit-btn").click(function() {
				
				$("#errMsg .messages").html("");

				var checked = $('.enquire-form  .subscription-checkbox').is(':checked'),
					inputflag = 0,
					inputarr = [],
					selectflag = 0,
					selectarr = [],
					msgarr = [];

				$.each($input, function(index) {

					if ($($input[index]).val().length == 0) {

						$($(".enquire-form .group label")[index]).addClass("error");
						$($input[index]).addClass("error-border");
						msgarr.push($($(".enquire-form .group label")[index]).html());

					} 
					else {
						
						$($(".enquire-form .group label")[index]).removeClass("error");
						$($input[index]).removeClass("error-border");
					}

					inputarr.push($($input[index]).val().length);

				});


				$.each($select, function(index) {

					if ($select[index].value == "") {
						$($select[index]).addClass("error-border");
						msgarr.push($($(".enquire-form .group select option[value='']")[index]).text());
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
						$("#errMsg .messages").append('<li class="msg">' + msgarr[index] + '</li>');
					});
				}
				else {
					$("#errMsg").css('display', 'none');

				}

				$.each(inputarr, function(index) {

					if (inputarr[index] === 0) {
						inputflag = 0;
						return false;
					}
				})

				$.each(selectarr, function(index) {

					if (selectarr[index] == "") {
						selectflag = 0;
						return false;
					}
				})

				if (!checked) {
					$(".enquire-form input[type=checkbox] + label").addClass("change");
					$(".enquire-form input[type=checkbox] + label").addClass("error");
				} 
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
