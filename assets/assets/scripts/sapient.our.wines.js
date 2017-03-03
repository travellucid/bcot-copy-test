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
								sapient.common.killHash();
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
			};


		return {
			// public + private states and behaviors
			filterWines: filterWines,
			mobileFiltersMenu: mobileFiltersMenu,
			closeMobileNavs: closeMobileNavs,
			onResize: onResize
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