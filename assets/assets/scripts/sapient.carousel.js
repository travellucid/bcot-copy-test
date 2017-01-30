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
			toggleCarouselArrow: toggleCarouselArrow
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
sapient.carousel.enableTouchCarousel("#carousel-our-wines");/*
sapient.carousel.toggleCarouselArrow("#carousel-our-story");
sapient.carousel.toggleCarouselArrow("#carousel-our-wines");*/

var clickDelay      = 500,
    clickDelayTimer = null;

$('.burger-click-region').on('click', function () {
  
  if(clickDelayTimer === null) {
  
    var $burger = $(this);
    $burger.toggleClass('active');
    $burger.parent().toggleClass('is-open');

    if(!$burger.hasClass('active')) {
      $burger.addClass('closing');
    }

    clickDelayTimer = setTimeout(function () {
      $burger.removeClass('closing');
      clearTimeout(clickDelayTimer);
      clickDelayTimer = null;
    }, clickDelay);
  }
});
