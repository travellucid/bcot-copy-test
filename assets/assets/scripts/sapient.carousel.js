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
						} else if (Math.floor(xClick - xMove) < -5) {
							$(value).carousel('prev');
						}
					});

					$(value).on("touchend", function() {
						$(this).off("touchmove");
					});
				});
			},
			resize = function(){
				$(window).on('resize', function () {
					debounce(sapient.carousel.positionCarouselIndicator,500,"resizing carouselIndicator");
				});
			},
			positionCarouselIndicator = function() {
				console.log($($("#carousel-new-story .carousel-inner  picture img")[0]).height());
				$("#carousel-new-story .carousel-indicators").css("top",$($("#carousel-new-story .carousel-inner  picture img")[0]).height()-20 + "px");
			},
			toggleCarouselArrow = function(id) {
				$(id).hover(
					function() {
						$(this).find(".carousel-control-wrapper").animate({
							opacity: ["1"]
						}, 500)
					},
					function() {
						$(this).find(".carousel-control-wrapper").animate({
							opacity: ["0"]
						}, 500)
					}
				);
			};

		return {
			// public + private states and behaviors
			enableTouchCarousel: enableTouchCarousel,
			toggleCarouselArrow: toggleCarouselArrow,
			positionCarouselIndicator:positionCarouselIndicator,
			resize:resize
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
/*
sapient.carousel.toggleCarouselArrow("#carousel-our-story");
sapient.carousel.toggleCarouselArrow("#carousel-our-wines");*/