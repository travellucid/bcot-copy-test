var ourWines = (function($, window, sapient) {

	var filterWinesCollection;

	function createFilterWinesCollection() {
		var filterWines = function() {
			var allProductsGrid = $("#response-wrapper").html();
			$(".filter-item").on("click",function(e){
				e.preventDefault();

				if($(this).data("categoryFilter") === "all-data") {

					$("#response-wrapper").html(allProductsGrid);

				} else {

					var wineCategory = $(this).data("category"),
						wineCategoryFilter = $(this).data("categoryFilter");

					$.ajax({
						url: "/search-page?" + wineCategory +"=" + wineCategoryFilter,
						type: "GET",
						success: function (data) {
							$("#response-wrapper").html(data);
						}
					});
				}
			});
		};


		return {
			// public + private states and behaviors
			filterWines: filterWines
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