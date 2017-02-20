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
					debounce(sapient.carousel.positionCarouselIndicator, 500, "resizing carouselIndicator");
				});

			},

			positionCarouselIndicator = function() {
				var	heightArr = [],
					maxHeight,
					interval = setInterval(function() {

					var $heightImg = $($("#carousel-new-story .carousel-inner  picture img")[0]).height();
						
					if ($heightImg > 0 ){
						console.log(">0");
						$("#carousel-new-story .carousel-indicators").css("top", $heightImg - 36 + "px");

						$.each($("#carousel-new-story .carousel-inner .item"), function(index) {
							var $heightCarousal = $($("#carousel-new-story .carousel-inner .item")[index]).height();
								heightArr.push($heightCarousal);
								maxHeight = Math.max.apply(Math, heightArr);
								console.log("maxHeight "+maxHeight);
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
			positionCarouselIndicator: positionCarouselIndicator,
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
sapient.carousel.positionCarouselIndicator();
sapient.carousel.resize();

/*not working will pick later*/
/*setTimeout(function() {
	sapient.carousel.positionCarouselIndicator();
	sapient.carousel.setHeight();
	$(window).trigger('resize');
}, 1000);*/



/*setInterval(function(){
	if($($( "#carousel-new-story .carousel-inner .item" )[0]).height()==0){
		sapient.carousel.positionCarouselIndicator();		
	}
	else {
		clearInterval();
	}
}, 1000);*/
/*(function() {
	console.log("fu");
	if ($($("#carousel-new-story .carousel-inner  picture img")[0]).height() === 0) {

		interval = setInterval(function() {
			$(window).trigger('resize');
			console.log($($("#carousel-new-story .carousel-inner .item")[0]).height() + ":fsd");
			sapient.carousel.positionCarouselIndicator();
		}, 200);

		setTimeout(function() {
			clearInterval(interval);
		}, 6000);
	} else {
		console.log($($("#carousel-new-story .carousel-inner  picture img")[0]).height() + "else");
		clearInterval(interval);
		sapient.carousel.positionCarouselIndicator();
	}


})()*/


/*
*/

/*setTimeout(function() {    
	$(window).trigger('resize');
}, 5000);*/
