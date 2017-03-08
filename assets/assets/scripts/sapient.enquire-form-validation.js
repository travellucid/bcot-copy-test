var validationObj = (function($, window, sapient) {

	var validationInstance;

	function createValidtaionInstance() {

		var validate = function() {
			var $input = $(".enquire-form  .group input").filter('[required]:visible'),
				$select = $(".enquire-form .group select").filter('[required]:visible');	

			$(".enquire-form .submit-info .submit-btn").click(function(event) {
				
				$("#errMsg .messages").html("");

				var checked = $('.enquire-form  .subscription-checkbox').filter('[required]:visible'),
					inputflag = 0,
					inputarr = [],
					selectflag = 0,
					selectarr = [],
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
						event.preventDefault();
						
					}
				})

				$.each(selectarr, function(index) {
					if (selectarr[index] == "") {
						selectflag = 0;
						event.preventDefault();
						
					}
				})

				$.each(checked,function(index) {
					if (!checked.is(':checked')) {	
						console.log($(this));					
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

		selectChange = function() {
			var $select = $(".enquire-form .group select");

			$select.on("change",function(){
				$(this).removeClass("error-border");
				$(this).siblings('label').removeClass("error");
			});

		},

		inputOnFocusOut = function() {
			$(".enquire-form input.brancott-form").on('focusout',function(){

				$(this).siblings().find(" .highlight1").css({"left":"0"},{"width":"50%"}).animate({"left":"50%","width":"0"}, "slow");
				$(this).siblings().find(" .highlight2").css({"width":"50%"}).animate({"width":"0"}, "slow");  

			});
		},

		handleBackEndSucess =function() {
			var successMsg = $(".successfull-msg").find("li");

			if(successMsg.length > 0) {
				var str = successMsg.text()
				$(".successfull-msg").hide();
				$('html, body').animate({
				scrollTop: $("#block-webform_block").offset().top
				}, 1000);

				$(".enquire-form .error-msg").addClass("error").show();
				$(".enquire-form .error-msg").find(".header_e").css("display","none");
				$(".enquire-form ol  ").append("<li class='msg'>"+str+"</li>");
			}
		},

		handleBackEndError = function() {
			var beErrLength= $(".custom-error li").length;
			if(beErrLength > 0){
				var str="";
				$(".custom-error li").each(function(){
				str= str+""+$(this).text();

					$('html, body').animate({
					scrollTop: $("#block-webform_block").offset().top
					}, 1000);

				});

				$(".enquire-form .error-msg").addClass("error").show();
				$(".enquire-form ol  ").append("<li class='msg'>"+str+"</li>");
			}
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
			inputSelect:inputSelect
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