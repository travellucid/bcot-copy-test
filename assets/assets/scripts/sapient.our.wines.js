var ourWines = (function($, window, sapient) {

	var filterWinesCollection;

	function createFilterWinesCollection() {
		var filterWines = function() {
				var allProductsGrid = $("#response-wrapper").html();
				$(".filter-item").on("click", function(e) {
					e.preventDefault();

					if ($(this).data("categoryFilter") === "all-data") {

						$("#response-wrapper").html(allProductsGrid);

					} else {

						var wineCategory = $(this).data("category"),
							wineCategoryFilter = $(this).data("categoryFilter");

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
