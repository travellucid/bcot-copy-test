var validationObj = (function($, window, sapient) {

	var validationInstance;

	function createValidtaionInstance() {

		var validate = function() {

			var $input = $(".enquire-form  .group input").filter('[required]:visible'),
				$select = $(".enquire-form .group select").filter('[required]:visible');	

			$(".enquire-form .submit-info .submit-btn").click(function(event) {
				
				$("#statusMsg .messages").html("");

				var checked = $('.enquire-form  .subscription-checkbox').filter('[required]:visible'),
					textarea =$('.enquire-form .other-information textarea').filter('[required]:visible'),
					inputarr = [],
					selectarr = [],
					textareaarr = [],
					msgarr = [];

				$.each($input, function(index) {

					if ($($input[index]).val().length == 0) {

						$($input[index]).siblings("label").addClass("error");
						$($input[index]).addClass("error-border");
						msgarr.push($($input[index]).siblings("label").text());

					} 
					else {
						
						$($(".enquire-form .group label")[index]).removeClass("error");
						$($input[index]).removeClass("error-border");
					}

					inputarr.push($($input[index]).val().length);

				});

				$.each($select, function(index) {
					if ($select[index].value == "") {
						$($select[index]).siblings("label").addClass("error");
						$($select[index]).addClass("error-border");
						msgarr.push($($select[index]).siblings("label").text());
					} 

					else {
						$($select[index]).removeClass("error-border");
					}
					selectarr.push($select[index].value);

				});

				$.each(textarea, function(index) {
					if(($(textarea[index]).html())== "") {
						$(textarea[index]).siblings("label").addClass("error");
						$(textarea[index]).addClass("error-border");
						msgarr.push($(textarea[index]).siblings("label").text());

					}

					textareaarr.push($(textarea[index]).value);
				});
				
				if (msgarr.length !== 0) {

					$(".enquire-form #statusMsg ol").addClass("error");
					$(".enquire-form #statusMsg").css('display', 'block');

					$.each(msgarr, function(index) {
						$("#statusMsg .messages").append('<li class="msg">' + msgarr[index] + '</li>');
					});

				}
				else {

					$("#statusMsg").css('display', 'none');

				}

				$.each(inputarr, function(index) {

					if (inputarr[index] === 0) {
						event.preventDefault();
						
					}
				})

				$.each(selectarr, function(index) {
					if (selectarr[index] == "") {
						event.preventDefault();
						
					}
				})

				$.each(textareaarr, function(index) {
					if (textareaarr[index] == "") {
						event.preventDefault();
						
					}
				})

				$.each(checked,function(index) {
					if (!checked.is(':checked')) {						
						$(this).siblings("label").addClass("change");
						$(this).siblings("label").addClass("error");
						event.preventDefault();	
					} 
					else {

						$(this).siblings("label").removeClass("change");
						$(this).siblings("label").removeClass("error");

					}		
				})	
			});
		},
		
		inputSelect = function() {
			var $input = $(".enquire-form  .group input").filter('[required]:visible');

			$input.each(function() {

				if($(this).val().length !== 0) {
					
					$(this).siblings('label').addClass("text-entered");
				}
				else {
					
					$(this).siblings('label').removeClass("text-entered");
				}
			})	
		},

		resetForm = function() {
			$(document).ready(function () {
				for (i = 0; i < document.forms.length; i++) {
			        document.forms[i].reset();
			    }
			});
		},

		selectInMac = function() {

			var $select = $(".enquire-form .group select"),
				mac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
			
			if(mac) {
				$.each($select,function() {
					$(this).addClass("mac-specific");
				})
		  	}
		},

		submitBtnClass = function() {

			$(".enquire-form button.submit-btn").removeClass().addClass("cta dark submit-btn")
			$(".enquire-form .other-information textarea").removeClass().addClass("detail-info header_e");	
		},

		inputOnFocus = function() {
			
			$(".enquire-form input.brancott-form").on('focus',function() {
				
				$(this).removeClass("error-border");
				$(this).siblings('label').removeClass("error");
				
				$(this).siblings().find(" .highlight1").css({"left":"50%"},{"width":"0.1%"}).animate({"left":"-0.1%","width":"50.1%"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"0.1%"}).animate({"width":"49.9%"}, "slow");  

			}); 
		},

		inputOnFocusOut = function() {
			$(".enquire-form input.brancott-form").on('focusout',function(){

				$(this).siblings().find(" .highlight1").css({"left":"0"},{"width":"50%"}).animate({"left":"50%","width":"0"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"50%"}).animate({"width":"0"}, "slow");  

			});
		},
		
		selectChange = function() {
			var $select = $(".enquire-form .group select");

			$select.on("change",function(){
				$(this).removeClass("error-border");
				$(this).siblings('label').removeClass("error");
			});

		},

		handleBackEndSucess =function() {
			var successMsg = $(".successfull-msg");
			
			if(successMsg.length > 0) {
				var str = successMsg.text()
				$(".successfull-msg").hide();
				$('html, body').animate({
				scrollTop: $("#block-webform_block").offset().top
				}, 1000);

				$(".enquire-form").hide();
				$(".form-heading .form-info").hide();
				$(".enquire-form .status-msg .error").hide();
				successMsg.addClass("success-msg").show().insertAfter($(".form-heading"));
			}
		},

		handleBackEndError = function() {
			var beErrLength= $(".custom-error li").length,
				$input = $(".enquire-form  .group input");
			
			if(beErrLength > 0){
				var str="";
				
				$(".custom-error li").each(function(){
					str= $(this).text();

					$('html, body').animate({
					scrollTop: $("#block-webform_block").offset().top
					}, 1000);

					$(".enquire-form .status-msg").show();
					$(".enquire-form ol  ").append("<li class='msg error'>"+str+"</li>");

				});
				
				var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"],
					weekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				 	val = $(".enquire-form .date-wrapper #edit-preferred-date").val().split("-"),
				 	getDay,
				 	newDate;

				val[1] = monthArray[val[1] -1];
				getDay = weekArray[new Date($(".enquire-form .date-wrapper #edit-preferred-date").val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getDay()];
				val.unshift(getDay)
				newDate = val.join(" ");
				$(".date-overlay").text(newDate);
			}

			$.each($input,function(index) {
				if($($input[index]).hasClass("error")) {
					
					$($input[index]).siblings("label").addClass("error");
					$($input[index]).addClass("error-border");
				}
				else {

					$($input[index]).siblings("label").removeClass("error");
					$($input[index]).removeClass("error-border");
				}
			});

		};

		return {
			// public + private states and behaviors
			validate: validate,
			handleBackEndSucess:handleBackEndSucess,
			inputOnFocus:inputOnFocus,
			inputOnFocusOut:inputOnFocusOut,
			selectChange:selectChange,
			submitBtnClass:submitBtnClass,
			handleBackEndError: handleBackEndError,
			selectInMac:selectInMac,
			inputSelect:inputSelect,
			resetForm:resetForm
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
sapient.validation.handleBackEndError();
sapient.validation.handleBackEndSucess();
sapient.validation.inputOnFocus();
sapient.validation.inputOnFocusOut();
sapient.validation.selectChange();
sapient.validation.submitBtnClass();
sapient.validation.selectInMac();
sapient.validation.inputSelect();
sapient.validation.resetForm();