/*global document, window, jQuery, $, sapient:true, console */
/*jslint  browser: true, undef: false, white: true, forin: true, unparam: true, strict:false, jquery: true, smarttabs:true */
/*
 * sapient: Core module initialises from here.
 * 
 * Author: Sapient Nitro (2016) (http://www.sapient.com)
 * @version 1.0
 */
if (!$) {
	var $ = jQuery.noConflict();
}
var sapient = sapient || {}; // core sapient

 $(function () {
   var bindDatePicker = function() {
		$(".date").datetimepicker({
    	maxDate:'2020/01/01',
        format:'YYYY-MM-DD',
        startDate: '-2m',
    	endDate: '+2d',
			icons: {
				time: "fa fa-clock-o",
				date: "fa fa-calendar",
				up: "fa fa-arrow-up",
				down: "fa fa-arrow-down"
			}
		}).find('input:first').on("blur",function () {
			// check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
			// update the format if it's yyyy-mm-dd
			var date = parseDate($(this).val());

			if (! isValidDate(date)) {
				//create date based on momentjs (we have that)
				date = moment().format('YYYY-MM-DD');
			}

			$(this).val(date);
		});
		
		$(".fa-clock-o").closest(".picker-switch").hide();
		$(".table-condensed .next").html("");
		$(".table-condensed .prev").html("");

		$(".calender-icon").on('click',function(){
			$("#datepicker").focus();     /*enable bootstarp calendar*/
		});
	}
   var isValidDate = function(value, format) {
		format = format || false;
		// lets parse the date to the best of our knowledge
		if (format) {
			value = parseDate(value);
		}

		var timestamp = Date.parse(value);

		return isNaN(timestamp) == false;
   }
   
   var parseDate = function(value) {
		var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
		if (m)
			value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);

		return value;
   }
   
   bindDatePicker();
 });
var commonObj = (function($, window, sapient) {

    var commonInstance;

    function createInstance() {

        var scrollToNext = function() {
                var hrefLink = $($(".scroll-to")[1]).attr('id');
                $(".scroll-down").attr('href', "#" + hrefLink);
            },

            hideLinkText = function() {
                $("footer section.social-icons nav ul li a").text("")
            },

            toggleAwardsDetails = function() {
                $(".awards-accolades .see-more-btn-wrapper .see-more-btn").click(function() {
                    $(".awards-accolades .list-wrapper .awards-details-wrapper").removeClass("hidden-details-wrapper");
                    $(this).hide();
                });
            },
            
            addBgNoise = function() {

                var section = $("section .views-element-container");
                for (var i = 1; i < section.length; i += 2) {
                    $(section[i]).addClass("background-noise-section");
                }
            };

        return {
            // public + private states and behaviors
            scrollToNext: scrollToNext,
            hideLinkText: hideLinkText,
            toggleAwardsDetails: toggleAwardsDetails,
            addBgNoise: addBgNoise
        };
    }

    return {
        getInstance: function() {
            if (!commonInstance) {
                commonInstance = createInstance();
            }
            return commonInstance;
        }
    };

})(jQuery, window, sapient);

sapient.common = commonObj.getInstance();
sapient.common.hideLinkText();
/*sapient.common.debounce();*/
sapient.common.addBgNoise();
sapient.common.toggleAwardsDetails();


/*$( function() {
    $( "#datepicker" ).datepicker();
  } );*/
var carouselObj = (function($, window, sapient) {

	var carouselInstance;

	function createCarouselInstance() {

		var enableTouchCarousel = function(value) {

				$(value).on("touchstart", function(event) {
			
					var xClick = event.originalEvent.touches[0].pageX;
			
					$(this).one("touchmove", function(event) {
						var xMove = event.originalEvent.touches[0].pageX;
			
						if (Math.floor(xClick - xMove) > 5) {
							$(value).carousel('next');
						}

						else if (Math.floor(xClick - xMove) < -5) {
							$(value).carousel('prev');
						}
					});

					$(value).on("touchend", function() {
						$(this).off("touchmove");
					});

				});
			},

			resize = function() {
				
				$(window).on('resize', function() {
					debounce(sapient.carousel.positionCarousel, 500, "resizing carouselIndicator");
				});

			},

			positionCarousel = function() {
				var	heightArr = [],
					maxHeight,
					interval = setInterval(function() {

					var $heightImg = $($("#carousel-new-story .carousel-inner  picture img")[0]).height();
						
					if ($heightImg > 0 ){
						$("#carousel-new-story .carousel-indicators").css("top", $heightImg - 36 + "px");

						$.each($("#carousel-new-story .carousel-inner .item"), function(index) {
							var $heightCarousal = $($("#carousel-new-story .carousel-inner .item")[index]).height();
								heightArr.push($heightCarousal);
								maxHeight = Math.max.apply(Math, heightArr);
								$("#carousel-new-story .carousel-inner").css("height", maxHeight);
						});

						clearInterval(interval);
					}

				}, 200);					
			},

			toggleCarouselArrow = function(id) {

				$(id).hover(
					function() {

						$(this).find(".carousel-control-wrapper").animate({
							opacity: ["1"]
						}, 500);

					},

					function() {

						$(this).find(".carousel-control-wrapper").animate({
							opacity: ["0"]
						}, 500);

					}
				);
			};

		return {
			// public + private states and behaviors
			enableTouchCarousel: enableTouchCarousel,
			toggleCarouselArrow: toggleCarouselArrow,
			positionCarousel: positionCarousel,
			resize: resize
		};
	}

	return {
		getInstance: function() {
			if (!carouselInstance) {
				carouselInstance = createCarouselInstance();
			}
			return carouselInstance;
		}
	};

})(jQuery, window, sapient);

sapient.carousel = carouselObj.getInstance();

sapient.carousel.enableTouchCarousel("#carousel-our-story");
sapient.carousel.enableTouchCarousel("#carousel-our-wines");
sapient.carousel.enableTouchCarousel("#carousel-new-story");
sapient.carousel.enableTouchCarousel("#product-grid-carousal"); 
sapient.carousel.positionCarousel();
sapient.carousel.resize();

var headerObj = (function($, window, sapient) {

	var headerInstance;

	function createHeaderInstance() {

		var getMenuHeadingVal = function() {
			$windowWidth = $(window).width();
 			var allowSubmit = false;
			$(document).on("click", "#navbar-header .menu > .dropdown" , function(e) {				
				if($windowWidth < 990 && !allowSubmit)  {
					e.preventDefault();
					e.stopPropagation();
					$(this).find(".sub-menu-wrapper .menu-heading span.text").text($(this).children("a").text().trim());	
					allowSubmit= true;
				}
				allowSubmit= false;
			});
			$(document).on("click", "#navbar-header .sub-menu .sub-menu-wrapper .sub-menu-link ", function(e) {
				allowSubmit= true;	
			});
			$(document).on("click", "#navbar-header .menu > .dropdown  .expand-icon ", function(e) {
				$(this).parents(".menu-item").find(".sub-menu-wrapper .menu-heading span.text").text($(this).parents("a").text().trim());
			});
		},

		animateMobileMenu = function() {
			$("#navbar-header .menu .menu-item").on("click", function() {
				
				if (!$(this).parents(".menu").hasClass("menu-open")) {
					$(this).parents(".menu").addClass("menu-open");
				}

				else {
					$(this).parents(".menu").removeClass("menu-open");
				}

			});
		},

	/*	accessibleMenu = function () {
			$(".dropdown a").keydown(function(event) {
				// var self = this;

				var $self= this;
				if (event.which == 32) {
					event.preventDefault();
					if ($self !== this) {
						//console.log("$self"+$self+"  this" + this)
				 		$(this).siblings(".sub-menu").hide();
					}
					else {
						$(this).siblings(".sub-menu").toggle();
					}
					//$(".dropdown a").siblings(".sub-menu").hide();
				}
			});
		},*/

		accessibleMenu = function () {
			$(".dropdown a").keydown(function(event) {
				if (event.which == 32) {
					event.preventDefault();
					$(this).siblings(".sub-menu").toggle();					
				}
			});
		},

		removeMobileLogoText = function() {
			$("#navbar-header .logo a").text("");
		},

		collapseMobileMenu = function() {
			var windowWidth = $(window).width();
			if (windowWidth < 769) {
				$("#navbar-header").removeClass("in").addClass('collapse');
			}
		},

		setMenuBarHeight = function() {
			var windowWidth = $(window).width();

			if (windowWidth > 990) {
				$("#navbar-header .menu-item, #wine-filters .menu-item").hover(
					function() {
						$(this).find(">a").css("color", "#d50032");
						$(this).find(".sub-menu .sub-menu-wrapper").show();
						var subMenuHeight = $(this).find(".sub-menu .sub-menu-wrapper").height();
						$(this).find(".sub-menu ").height(subMenuHeight);
					},
					function() {
						$(this).find(">a").css("color", "white");
						$(this).find(".sub-menu .sub-menu-wrapper").hide();
						$(this).find(".sub-menu ").removeAttr("style");
					}
				);
			}
		},

		toggleGhostMenu = function() {
			$(window).on('scroll', function() {
				if ($(window).scrollTop() !== 0) {
					$("#navbar-header").addClass('semi-solid-menu');
					$("header").addClass("white-background");
				} else {
					if(!$("#navbar-header").hasClass("in")) {
						$("#navbar-header").removeClass('semi-solid-menu');
						$("header").removeClass("white-background");
					}					
				}
			});

			$("header").hover(function() {
					$("#navbar-header").addClass('semi-solid-menu solid-menu');

					$("header").removeClass("white-background");
				},
				function(){
					$("#navbar-header").removeClass('solid-menu');
					if($(window).scrollTop() == 0) {
						$("#navbar-header").removeClass('semi-solid-menu');
					}
				}
			);
		},

		menuMobile = function() {
			var clickDelay = 500,
				clickDelayTimer = null;

			$('.burger-click-region').on('click', function() {

				if ($("#navbar-header").hasClass("in") && $(window).scrollTop() == 0) {
					$("header").removeClass("white-background").css("opacity",.96);
				}
				else {
					$("header").addClass("white-background").css("opacity",1);
					$("#navbar-header .navbar-nav").removeClass("menu-open");
				}
				
				if (clickDelayTimer === null) {

					var $burger = $(this);
					$burger.toggleClass('active');
					$burger.parent().toggleClass('is-open');

					if (!$burger.hasClass('active')) {
						$burger.addClass('closing');
					}

					clickDelayTimer = setTimeout(function() {
						$burger.removeClass('closing');
						clearTimeout(clickDelayTimer);
						clickDelayTimer = null;
					}, clickDelay);
				}
			});
		},
		scrollingSubMenu = function() {
			if( $(window).width() < 991 ) {
				$(".sub-menu-wrapper").each(function(){
					$(this).height( $(window).height() - $("header.navbar").height() ).addClass('scrollItBaby');
				});
			} else {
				$(".sub-menu-wrapper").each(function(){
					$(this).height("").removeClass('scrollItBaby');
				});
			}
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.header.scrollingSubMenu,500,"scroll the subnav");
			});
		};

		return {
			// public + private states and behaviors
			getMenuHeadingVal: getMenuHeadingVal,
			animateMobileMenu: animateMobileMenu,
			removeMobileLogoText: removeMobileLogoText,
			collapseMobileMenu: collapseMobileMenu,
			setMenuBarHeight: setMenuBarHeight,
			toggleGhostMenu: toggleGhostMenu,
			menuMobile: menuMobile,
			accessibleMenu: accessibleMenu,
			scrollingSubMenu: scrollingSubMenu,
			onResize: onResize
		};
	}

	return {
		getInstance: function() {
			if (!headerInstance) {
				headerInstance = createHeaderInstance();
			}
			return headerInstance;
		}
	};

})(jQuery, window, sapient);

sapient.header = headerObj.getInstance();

sapient.header.getMenuHeadingVal();
sapient.header.animateMobileMenu();
sapient.header.removeMobileLogoText();
sapient.header.collapseMobileMenu();
sapient.header.setMenuBarHeight();
sapient.header.accessibleMenu();
sapient.header.toggleGhostMenu();
sapient.header.menuMobile();
sapient.header.scrollingSubMenu();
sapient.header.onResize();
var followUsObj = (function($, window, sapient) {

	var instagramInstance;

	function createInstagramInstance() {

		var setContentWidth = function() {
			if($(window).width() > 1600 ) {
				$("#follow-us #content").width( $(window).width() - ($("#follow-us #gallery").width() + 10) );
			} else {
				$("#follow-us #content").width("");
			}
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.followUs.setContentWidth,100,"resizing instagram content");
			});
		};


		return {
			// public + private states and behaviors
			setContentWidth: setContentWidth,
			onResize: onResize
		};
	}

	return {
		getInstance: function() {
			if (!instagramInstance) {
				instagramInstance = createInstagramInstance();
			}
			return instagramInstance;
		}
	};

})(jQuery, window, sapient);

sapient.followUs = followUsObj.getInstance();

sapient.followUs.setContentWidth();
sapient.followUs.onResize();
var ourWines = (function($, window, sapient) {

	var filterWinesCollection;

	function createFilterWinesCollection() {
		var filterWines = function() {
				var allProductsGrid = $("#response-wrapper").html();
				$(".filter-item").on("click", function(e) {
					e.preventDefault();

					if ($(this).data("categoryFilter") === "all-data") {
						$("#response-wrapper").html(allProductsGrid);
						$(".filter-item").removeClass('active-filter');

					} else {
						var wineCategory = $(this).data("category"),
							wineCategoryFilter = $(this).data("categoryFilter");

							$(".filter-item").removeClass('active-filter');
							$(this).addClass('active-filter');

						$.ajax({
							url: "/search-page?" + wineCategory + "=" + wineCategoryFilter,
							type: "GET",
							success: function(data) {
								$("#response-wrapper").html(data);
							}
						});
					}

					if($(window).width() < 990) {

						$("#close-filters").trigger('click');

						var p = $("#product-grid"),
							offset = p.offset();
						$("body, html").animate({
							scrollTop: offset.top
						}, 'slow');
					}
				});
			},
			mobileFiltersMenu = function() {
				$("#open-filters").on("click", function() {
					$("#mobile-filters").addClass("filters-active");
					$(this).addClass("filters-activated");
					var navTop = $("#mobile-filters h2").outerHeight();
					$("#mobile-filters-scroll-wrapper").css({ "height": $(window).height() - navTop });
				});

				$("#close-filters").on("click", function() {
					$("#mobile-filters").removeClass("filters-active");
					$("a.category").removeClass("iamalive");
					$("ul.nav.categories").css("left", "");
					$("#mobile-filters-scroll-wrapper").removeAttr("style");
					$("#open-filters").removeClass("filters-activated");
				});

				$("a.category").on("click", function(e) {
					e.preventDefault();
					$("a.category").removeClass("iamalive");
					$(this).addClass("iamalive");
					$("ul.nav.categories").animate({
						left: "-100%"
					}, 350, "linear");
				});

				$("a.sub-nav-return").on("click", function(e) {
					e.preventDefault();
					$(this).parent("li").find("iamalive").removeClass("iamalive");
					$("ul.nav.categories").animate({
						left: "0"
					}, 350, "linear");
				});
			};


		return {
			// public + private states and behaviors
			filterWines: filterWines,
			mobileFiltersMenu: mobileFiltersMenu
		};
	}

	return {
		getInstance: function() {
			if (!filterWinesCollection) {
				filterWinesCollection = createFilterWinesCollection();
			}
			return filterWinesCollection;
		}
	};

})(jQuery, window, sapient);

sapient.winesFilter = ourWines.getInstance();

sapient.winesFilter.filterWines();
sapient.winesFilter.mobileFiltersMenu();

var footerObj = (function($, window, sapient) {

	var footerInstance;

	function createFooterInstance() {

		var setFooterDdownPos = function() {
			var windowWidth = $(window).width();
			if (windowWidth > 1200 /*&& windowWidth < 1400*/) {
				var right = (windowWidth - 1170) / 2;
				$("footer .select-wrapper").css('right', right + 'px');
			} /*else if (windowWidth > 1400) {
				var right = (windowWidth - 1400) / 2;
				$("footer .select-wrapper").css('right', right + 15 + 'px');
			}*/
		},

		onResize = function() {
			$(window).on('resize', function () {
				debounce(sapient.footer.setFooterDdownPos,500,"testing debounce");
				/*sapient.footer.setFooterDdownPos();*/
			});
		};


		return {
			// public + private states and behaviors
			setFooterDdownPos: setFooterDdownPos,
			onResize: onResize
		};
	}

	return {
		getInstance: function() {
			if (!footerInstance) {
				footerInstance = createFooterInstance();
			}
			return footerInstance;
		}
	};

})(jQuery, window, sapient);

sapient.footer = footerObj.getInstance();

sapient.footer.setFooterDdownPos();
sapient.footer.onResize();
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
