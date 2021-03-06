var carouselObj = (function($, window, sapient) {

	var carouselInstance;

	function createCarouselInstance() {

		var enableTouchCarousel = function(value) {

			if($(value).find(".item").length > 1 ) {

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
			} else {
				$(value).find(".carousel-control-wrapper").remove();
			}
		},

			hideCarouselCtrl = function(id) {
				if($(id).find(".carousel-indicators li").length === 1){
					$(id).find(".carousel-control-wrapper,.carousel-indicators").css("visibility","hidden");
				}								
			},

			togggleCarouselView = function(id) {
				
				if($(window).width() < 690) {
					sapient.carousel.enableTouchCarousel("#product-grid-carousal");
					$(id).addClass("slide");
				}
				
				else {
					$(id).removeClass("slide");
				}
			},

			findCarousalItems = function (id) {
				// body...
				$(id).find(".carousel-inner .item").each(function(){
					//console.log($(this).find("video").siblings().find("img").attr("src"));
					var gifLength = $(this).find("video").siblings(".fallback-gif").length,
						fallBackImgLength = $(this).find("video").siblings(".fallback-image").length,
						videoLength = $(this).find("video").length,
						isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
						isAndroid =navigator.userAgent.indexOf('Android') >=0;
						/*console.log("gifLength "+gifLength+" fallBackImgLength "+fallBackImgLength + "  videoLength "+videoLength+" isIOS "+isIOS +" isAndroid "+isAndroid);*/
						if(isIOS || isAndroid) {
							$(this).find("video").hide();
							$(this).find(".fallback-gif").show();
							$(this).find(".fallback-image").hide();
						}

						else {
							if(videoLength === 0 && gifLength > 0) {
								//console.log("show gif");
								$(this).find("video").hide();
								$(this).find(".fallback-gif").show();
								$(this).find(".fallback-image").hide();
							}
							
							else if (videoLength === 0 && gifLength === 0) {
								//console.log("show fallback img");

								$(this).find("video").hide();							
								$(this).find(".fallback-gif").hide();
								$(this).find(".fallback-image").show();
							}

							else {
								//console.log("show video");
								$(this).find("video").show();							
								$(this).find(".fallback-gif").hide();
								$(this).find(".fallback-image").hide();
							}
						}
						
				});
			},

			disableArrowsControlsSmallDevices = function() {
				/*if (navigator.userAgent.indexOf('Android') >=0) {
					$(".carousel-inner video").attr("controls","");
				}*/
				var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
					isAndroid =navigator.userAgent.indexOf('Android') >=0;
					
				if(isIOS || isAndroid || $(window).width() < 1025) {
					$(".carousel-control-wrapper .prev-carousal").css("left",0);
					$(".carousel-control-wrapper .next-carousal").css("right",0);
				}
				else {
					$(".carousel-control-wrapper").show();
				}
			},

			onResize = function() {
				
				$(window).on('resize', function() {
					sapient.carousel.togggleCarouselView("#product-grid-carousal");
					debounce(sapient.carousel.positionCarousel, 500, "resizing carouselIndicator");
					debounce(sapient.carousel.positionCarouselControl, 500, "resizing carouselControl");
					//debounce(sapient.carousel.disableArrowsControlsSmallDevices, 500, "resizing disableArrowsControlsSmallDevices");
					debounce(sapient.carousel.disableArrowsControlsSmallDevices, 500, "resizing disableArrowsControlsSmallDevices");
				});

			},
			positionCarouselControl = function() {
				var interval = setInterval(function() {
					var $heightImg = $($("#carousel-new-story .carousel-inner  picture img")[0]).height();

					if ($heightImg > 0 ){
						$("#carousel-new-story .carousel-control-wrapper .prev-carousal").css("top",$heightImg/2);
						$("#carousel-new-story .carousel-control-wrapper .next-carousal").css("top",$heightImg/2);
					}

				}, 200);
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
								if(this.currentTime >= Math.floor(vid.get(0).duration)) {
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
			positionCarouselControl:positionCarouselControl,
			playPauseVideo: playPauseVideo,
			bindSlideEvent: bindSlideEvent,
			disableArrowsControlsSmallDevices: disableArrowsControlsSmallDevices,
			findCarousalItems: findCarousalItems,
			togggleCarouselView: togggleCarouselView,
			hideCarouselCtrl: hideCarouselCtrl
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

sapient.carousel.bindSlideEvent("#carousel-our-story");
sapient.carousel.bindSlideEvent("#carousel-our-wines");
sapient.carousel.bindSlideEvent("#carousel-new-story");
sapient.carousel.positionCarousel();
sapient.carousel.positionCarouselControl();
sapient.carousel.onResize();
sapient.carousel.togggleCarouselView("#product-grid-carousal");
sapient.carousel.onScroll();
sapient.carousel.playPauseVideo();
sapient.carousel.disableArrowsControlsSmallDevices();
sapient.carousel.findCarousalItems("#carousel-our-story");
sapient.carousel.findCarousalItems("#carousel-new-story");

sapient.carousel.hideCarouselCtrl("#carousel-our-wines");
sapient.carousel.hideCarouselCtrl("#carousel-new-story");
sapient.carousel.hideCarouselCtrl("#carousel-our-story");