var validationObj = (function($, window, sapient) {

	var validationInstance;

	function createValidtaionInstance() {

		var validate = function() {

			

			$(document).on("click", ".enquire-form .submit-info .submit-btn",function(event) {
				
				$("#statusMsg .messages").html("");

				var inputarr = [],
					selectarr = [],
					textareaarr = [],
					msgarr = [],
					$checked = $('.enquire-form  .subscription-checkbox').filter('[required]:visible'),
					textarea =$('.enquire-form .other-information textarea').filter('[required]:visible'),
					$email = $('.enquire-form input[type = email]'),
					$input = $(".enquire-form  .group input").filter('[required]'),
					$select = $(".enquire-form .group select").filter('[required]'),
					$alphaNumeric = $(".enquire-form .group .alpha-numeric").filter('[required]'),
					$numericOnly = $(".enquire-form .group .numeric-only").filter('[required]'),
					$alphaOnly = $(".enquire-form .group .alpha-only").filter('[required]'),
					
					filterEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					filterAlphaNumeric = /^[a-z0-9]+$/i,
					filterAlphaOnly = /^[A-Za-z-'\s]*$/,
					filterNumericOnly = /^\d+$/;	
				


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
				

				
				
			/*	if($alphaNumeric.val().length !== 0) {
					
					if (filterAlphaNumeric.test($alphaNumeric.val())) {
						$alphaNumeric.siblings("label").removeClass("error");
						$alphaNumeric.removeClass("error-border");
					}
					else {
						msgarr.push($alphaNumeric.data("err"));
						$alphaNumeric.siblings("label").addClass("error");
						$alphaNumeric.addClass("error-border");
						event.preventDefault();					
					}
				}
*/
					$.each($alphaNumeric, function(index) {
					
						if($($alphaNumeric[index]).val().length !== 0) {
							
							if (filterAlphaNumeric.test($($alphaNumeric[index]).val())) {
								$alphaNumeric[index].siblings("label").removeClass("error");
								$alphaNumeric[index].removeClass("error-border");
							}
							else {
								msgarr.push($("#node_translation_languages").data("alphaNumericErr")+" - "+$($alphaNumeric[index]).siblings("label").text());

								$($alphaNumeric[index]).siblings("label").addClass("error");
								$($alphaNumeric[index]).addClass("error-border");
								event.preventDefault();					
							}

						}
					});
					$.each($alphaOnly, function(index) {
					
						if($($alphaOnly[index]).val().length !== 0) {
							
							if (filterAlphaOnly.test($($alphaOnly[index]).val())) {
								$($alphaOnly[index]).siblings("label").removeClass("error");
								$($alphaOnly[index]).removeClass("error-border");
							}
							else {
								msgarr.push($("#node_translation_languages").data("alphaOnlyErr")+" - "+$($alphaOnly[index]).siblings("label").text());
								$($alphaOnly[index]).siblings("label").addClass("error");
								$($alphaOnly[index]).addClass("error-border");
								event.preventDefault();					
							}

						}
					});
				

				$.each($numericOnly, function(index) {
					
					if($($numericOnly[index]).val().length !== 0) {
						
						if (filterNumericOnly.test($($numericOnly[index]).val())) {
							$($numericOnly[index]).siblings("label").removeClass("error");
							$($numericOnly[index]).removeClass("error-border");
						}
						else {/*
							msgarr.push($($numericOnly[index]).data("err"));*/

							msgarr.push($("#node_translation_languages").data("numericErr")+" - "+$($numericOnly[index]).siblings("label").text());
							$($numericOnly[index]).siblings("label").addClass("error");
							$($numericOnly[index]).addClass("error-border");
							event.preventDefault();					
						}
					}
				});
				
				$.each($email, function(index) {
					
					if($($email[index]).val().length !== 0) {
						
						if (filterEmail.test($($email[index]).val())) {
							$($email[index]).siblings("label").removeClass("error");
							$($email[index]).removeClass("error-border");
						}
						else {
							msgarr.push($("#node_translation_languages").data("emailErr")+" - "+$($email[index]).siblings("label").text());
							$($email[index]).siblings("label").addClass("error");
							$($email[index]).addClass("error-border");
							event.preventDefault();					
						}
					}
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

				$.each($checked,function(index) {
					if (!($($checked[index]).is(':checked'))) {						
						$($checked[index]).siblings("label").addClass("change");
						$($checked[index]).siblings("label").addClass("error");
						event.preventDefault();	
					} 
					else {

						$($checked[index]).siblings("label").removeClass("change");
						$($checked[index]).siblings("label").removeClass("error");

					}		
				})
				if(!(event.isDefaultPrevented())) { 
					sapient.validation.showLoaderOnSubmit();
				}	
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

		addCheckboxVal = function() {
			var $anchorBlock = $(".help-block");
			var	interval = setInterval(function() {
				var $checkedNtRequired = $('.enquire-form  .subscription-checkbox');
				if($checkedNtRequired.length > 0) {
					var $checkedNtRequired = $('.enquire-form  .subscription-checkbox');
					$.each($checkedNtRequired,function(index){
						var labelText = $($checkedNtRequired[index]).siblings("label").html(),
							dataArrText= $($checkedNtRequired[index]).siblings("label").attr('data-original-title');
						if(dataArrText){
							$($checkedNtRequired[index]).siblings("label").html(labelText + " " + dataArrText)
						}
						else { 
							var anchorBlockText = $($checkedNtRequired[index]).parent().find(".help-block").html();
							if(anchorBlockText){
								$($checkedNtRequired[index]).siblings("label").html(labelText + " " + anchorBlockText)
								$($checkedNtRequired[index]).parent().find(".help-block").hide();
							}
							
						}
					})
					clearInterval(interval);
				}	
			}, 200);		
		},

		resetForm = function() {
			$(document).ready(function () {
				for (i = 0; i < document.forms.length; i++) {
					document.forms[i].reset();
				}
			});
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

		textareaOnFocus = function() {
			
			$(".enquire-form  .other-information textarea").on('focus', function() {

				$(this).siblings().find(" .highlight1").css({"left":"50%"},{"width":"0%"}).animate({"left":"0%","width":"50%"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"0%"}).animate({"width":"50%"}, "slow"); 
			})
		},

		inputOnFocusOut = function() {
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
		},

		textareaOnFocusOut = function() {
			
			$(".enquire-form  .other-information textarea").on('focusout',function(){
				$(this).siblings().find(" .highlight1").css({"left":"0"},{"width":"50%"}).animate({"left":"50%","width":"0"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"50%"}).animate({"width":"0"}, "slow");  
				
				if($(this).val().length !== 0) {
					
					$(this).siblings('label').addClass("text-area-entered");
				}
				else {
					
					$(this).siblings('label').removeClass("text-area-entered");
				}
			});
		},

		
		selectChange = function() {
			var $select = $(".enquire-form .group select");

			$select.on("change",function(){
				$(this).removeClass("error-border");
				$(this).siblings('label').removeClass("error");

				if($(this).val() == "") {
					$(this).siblings('label').removeClass("text-entered");
				}
				else{
					$(this).siblings('label').addClass("text-entered");
				}
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
		
		countrySelector = function() {
			$(document).on('change','.newsletter-form .country-primary select',function() {
				var str= $(this).val().toLowerCase(),
				$selector = $("."+str);
				$(".newsletter-form .country-secondary").hide().find("select,input,textarea").removeAttr("required");
				
				if(str === "gb" || str === "nz" || str === "fr" || str === "al" || str === "dz" || str === "ao" ||str === "at") {
					$selector.show();
					$selector.find("label").removeClass("form-required");
				}	
				else{
					$selector.find("label").addClass("form-required");
					$selector.show().find("select,input,textarea").attr("required",true);
				}
			});
		},

		handleBackEndError = function() {
			var beErrLength= $(".custom-error li").length,
				$input = $(".enquire-form  .group input");
			
			if(beErrLength > 0){
				var str="";
				sapient.validation.countrySelector();
				$("#edit-country").trigger("change");
				//sapient.common.setCountryNewsLetter();
				$(".enquire-form button.submit-btn").removeClass().addClass("cta dark submit-btn");
				
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
					val = $(".enquire-form .date-wrapper #edit-preferred-date").val(),
					getDay,
					newDate;
				if(val) {
					val=val.split("-")
					val[1] = monthArray[val[1] -1];
					getDay = weekArray[new Date($(".enquire-form .date-wrapper #edit-preferred-date").val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getDay()];
					val.unshift(getDay)
					newDate = val.join(" ");
					$(".date-overlay").text(newDate);
				}


			}
			else {
				sapient.common.setCountryNewsLetter();
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

		},
		loader =function() {
			$(".enquire-form .submit-info .loader-wrapper").hide();
			var dot = $(".enquire-form .submit-info .loader-wrapper .dot"),
				interval = setInterval(function() {
			    setTimeout(function(){ 
			      $(dot[0]).removeClass("hide-dot").addClass("show-dot");
			    }, 1200/3);

			    setTimeout(function(){ 
			      $(dot[1]).removeClass("hide-dot").addClass("show-dot");
			    }, 2240/3);

			    setTimeout(function(){ 
			      $(dot[2]).removeClass("hide-dot").addClass("show-dot");
			    }, 1200);

			    $.each(dot,function(index){
			      $(dot[index]).removeClass("show-dot").addClass("hide-dot")
			    })
			}, 1400); 
		},
		showLoaderOnSubmit = function () {
			var interval = setInterval(function() {
				if(!(window.location.pathname.indexOf("token") != -1)){
					$(".enquire-form .submit-info .loader-wrapper").show();
					$(".enquire-form .submit-info .submit-btn").hide();
				}
				else{
					clearInterval(interval)
				}
			},200);	
		};

		return {
			// public + private states and behaviors
			validate: validate,
			handleBackEndSucess: handleBackEndSucess,
			inputOnFocus: inputOnFocus,
			inputOnFocusOut: inputOnFocusOut,
			selectChange: selectChange,
			submitBtnClass: submitBtnClass,
			handleBackEndError:  handleBackEndError,
			inputSelect: inputSelect,
			textareaOnFocus: textareaOnFocus,
			textareaOnFocusOut: textareaOnFocusOut,
			resetForm: resetForm,
			addCheckboxVal:addCheckboxVal,
			countrySelector: countrySelector,
			showLoaderOnSubmit:showLoaderOnSubmit,
			loader:loader
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
sapient.validation.textareaOnFocus();
sapient.validation.textareaOnFocusOut();
sapient.validation.selectChange();
sapient.validation.submitBtnClass();
sapient.validation.countrySelector();
sapient.validation.inputSelect();
sapient.validation.resetForm();
sapient.validation.addCheckboxVal();
sapient.validation.loader();
$(document).ready(function() {  
	/*sapient.common.setCountryNewsLetter();*/
});