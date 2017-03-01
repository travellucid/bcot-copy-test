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

			enableVidControlsAndroid = function() {
				if (navigator.userAgent.indexOf('Android') >=0) {
					$(".carousel-inner video").attr("controls","");
				}
			},

			onResize = function() {
				
				$(window).on('resize', function() {
					debounce(sapient.carousel.positionCarousel, 500, "resizing carouselIndicator");
				});

			},

			playPauseVideo = function() {	
					var vid = $(".carousel-inner video"),
						vidPos = vid.offset();

					if(vid.length === 0) {
						$(this).siblings().find(".fallback-image").show();
						return false;
					}

					if($(window).scrollTop() > (vidPos.top - vid.height()) && $(window).scrollTop() < (vidPos.top + vid.height())){
						if(!vid.parents(".item").hasClass("active")){
							vid.get(0).pause();
							return false;
						}

						vid.get(0).play();
						vid.on("timeupdate", function () {
							if(this.currentTime >= vid.get(0).duration) {
								this.currentTime = 0.0;
							}
						});
						/*else {
							vid.get(0).pause();
						}*/
					}
					else{
						vid.get(0).pause();
					}	
			},

			bindSlideEvent = function(id) {
				$(id).on('slid.bs.carousel', function (e) {
					sapient.carousel.playPauseVideo();
				});
			},

			onScroll = function() {
				$(window).scroll(function(){
					debounce(sapient.carousel.playPauseVideo, 200, "playPauseVideo on scroll");
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
			onResize: onResize,
			onScroll: onScroll,
			playPauseVideo: playPauseVideo,
			bindSlideEvent: bindSlideEvent,
			enableVidControlsAndroid: enableVidControlsAndroid
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

sapient.carousel.bindSlideEvent("#carousel-our-story");
sapient.carousel.bindSlideEvent("#carousel-our-wines");
sapient.carousel.bindSlideEvent("#carousel-new-story");
sapient.carousel.positionCarousel();
sapient.carousel.onResize();

sapient.carousel.onScroll();
sapient.carousel.playPauseVideo();
sapient.carousel.enableVidControlsAndroid();