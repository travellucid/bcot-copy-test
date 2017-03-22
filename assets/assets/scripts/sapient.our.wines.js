var ourWines = (function($, window, sapient) {

	var filterWinesCollection;

	function createFilterWinesCollection() {
		var filterWines = function() {
				var allProductsGrid = $("#response-wrapper").html(),
					filtersTop = $("#block-Filter_block_our_wines").offset(),
					wineFilter = $(".wine-filters-desktop"),
					localeCode = drupalSettings.path.currentLanguage;

				$(".filter-item").on("click", function(e) {
					e.preventDefault();

					if($(this).hasClass('active-filter')) {
						return;
					}

					if ($(this).data("categoryFilter") === "all-data") {
						$("#response-wrapper").html(allProductsGrid);
						$(".filter-item").removeClass('active-filter');

					} else {
						var wineCategory = $(this).data("category"),
							wineCategoryFilter = $(this).data("categoryFilter");

							$(".filter-item").removeClass('active-filter');
							$(this).addClass('active-filter');

						$.ajax({
							url: "/" + localeCode + "/search-page?" + wineCategory + "=" + wineCategoryFilter,
							type: "GET",
							success: function(data) {
								$("#response-wrapper").html(data);

								//$("#response-wrapper").find("#filter-term").html(wineCategoryFilter);
								
								sapient.common.killHash();
							}
						});
					}

					setTimeout(function(){
						if($(window).width() < 990) {
							$("#close-filters").trigger('click');

							var headerHeight = $("header.navbar").outerHeight(),
								topPos = filtersTop.top - headerHeight;

							$("body, html").animate({
								scrollTop: topPos
							}, "slow");

						} else {
							$(".level-2.list-reset").css({"opacity":0, "left": -9999 });
							var headerHeight = $("header.navbar").outerHeight(),
								topPos = filtersTop.top - headerHeight;

							$("body, html").animate({
								scrollTop: topPos
							}, 'slow');

							$(wineFilter).find("li.hovered").blur().removeClass('hovered');
						}
					},250);
				});
			},

			seeMoreLess = function() {
				$(document).on('click','#product-grid .see-less', function(){
					$(this).hide();
					$(this).siblings().find(".ellipses").show();
					$(this).siblings(".extra-text").hide();
					$(this).siblings(".see-more").show();
				});

				$(document).on('click','#product-grid .see-more', function(){
					$(this).hide();
					$(this).prev().find(".ellipses").hide();
					$(this).prev(".trimmed-text").hide();
					$(this).siblings(".extra-text").css("display","block");
					$(this).siblings(".see-less").show();
				});
			},

			mobileFiltersMenu = function() {
				$("#open-navigation").on("click", function() {
					$("#mobile-navigation").addClass("navigation-active");
					$(this).addClass("navigation-activated");
					var navTop = $("#mobile-navigation h2").outerHeight();
					$("#mobile-navigation-scroll-wrapper").css({ "height": $(window).height() - navTop });
				});

				$("#close-navigation").on("click", function() {
					$("#mobile-navigation").removeClass("navigation-active");
					$(".iamalive").removeClass("iamalive");
					$("ul.nav.categories").css("left", "");
					$("#mobile-navigation-scroll-wrapper").removeAttr("style");
					$("#open-navigation").removeClass("navigation-activated");
				});

				$("#open-filters").on("click", function() {
					$("#mobile-filters").addClass("filters-active");
					$(this).addClass("filters-activated");
					var navTop = $("#mobile-filters h2").outerHeight();
					$("#mobile-filters-scroll-wrapper").css({ "height": $(window).height() - navTop });
				});

				$("#close-filters").on("click", function() {
					$("#mobile-filters").removeClass("filters-active");
					$(".iamalive").removeClass("iamalive");
					$("ul.nav.categories").css("left", "");
					$("#mobile-filters-scroll-wrapper").removeAttr("style");
					$("#open-filters").removeClass("filters-activated");
				});

				$(window).scroll(function(){
					var navTopnavigation = $("#mobile-navigation h2").outerHeight();
					$("#mobile-navigation-scroll-wrapper").css({ "height": $(window).height() - navTopnavigation });
					var navTopfilters = $("#mobile-filters h2").outerHeight();
					$("#mobile-filters-scroll-wrapper").css({ "height": $(window).height() - navTopfilters });
				});

				$("a.category").on("click",function(e){
				  e.preventDefault();
				  $(this).addClass("iamalive");
				  $("ul.nav.categories").animate({
				    left: "-" + $(this).data("level") * 100 + "%"
				  },350, "linear");
				});

				$("a.sub-nav-return").on("click",function(e){
				  e.preventDefault();
					var parentHider = $(this).closest(".sub-categories").prev(".category.iamalive");
				  $("ul.nav.categories").animate({
				    left: "-" + ($(this).data("level") - 1) * 100 + "%"
				  },350, "linear");
					setTimeout(function(){
						$(parentHider).removeClass("iamalive");
						parentHider = null;
					},500);
				});
			},
			closeMobileNavs = function(){
				if($(window).width() > 990) {
					$("#close-navigation").trigger('click');
					$("#close-filters").trigger('click')
				}
			},
			onResize = function() {
				$(window).on('resize', function () {
					debounce(sapient.winesFilter.closeMobileNavs,100,"close Mobile Navs");
				});
			},
			onClickOutside = function() {
				$(document).on('touchend', function(e) {
					if ($(e.target).is('.wine-filters-desktop, .wine-filters-desktop *') ) {

						$(".wine-filters-desktop .visited").css("background-color","#1e7266");
						$(".wine-filters-desktop .hovered").css("background-color","#1e7266");
						$(".hovered >a").css("color","white");
						if ($(e.target.parentElement).hasClass("visited") ){
							$(e.target.parentElement).siblings().removeClass("visited");
							$(e.target.parentElement).find(".level-2.list-reset").css({"opacity":1, "left": 0 });
							$(".wine-filters-desktop .visited").css("background-color","white");
							$(".visited >a").css("color","#d50032");
							$(".wine-filters-desktop .visited ").addClass("hovered").removeClass("visited");
						}
						$(".wine-filters-desktop .visited").removeClass("visited");
						return;
					}

					$(".level-2.list-reset").css({"opacity":0, "left": -9999 });
					$(".wine-filters-desktop .hovered").css("background-color","#1e7266");
					$(".hovered >a").css("color","white");
					$(".wine-filters-desktop .hovered ").removeClass("hovered").addClass("visited");
				});
			}
			;


		return {
			// public + private states and behaviors
			filterWines: filterWines,
			mobileFiltersMenu: mobileFiltersMenu,
			closeMobileNavs: closeMobileNavs,
			onResize: onResize,
			seeMoreLess: seeMoreLess,
			onClickOutside: onClickOutside
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
sapient.winesFilter.onResize();
sapient.winesFilter.seeMoreLess();
sapient.winesFilter.onClickOutside();