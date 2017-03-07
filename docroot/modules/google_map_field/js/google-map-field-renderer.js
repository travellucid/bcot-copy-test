
var google_map_field_map;
(function ($, Drupal) {

  Drupal.behaviors.google_map_field_renderer = {
    attach: function (context) {

      $('.google-map-field .map-container').each(function (index, item) {

        // Get the settings for the map from the Drupal.settings object.
        var lat = $(this).attr('data-lat'),
            lon = $(this).attr('data-lon'),
            label = $(this).attr('data-label'),
            zoom = parseInt($(this).attr('data-zoom')),
            right_bound = $('.map_bound').attr('data-right-bound'),
            left_bound = $('.map_bound').attr('data-left-bound'),        
            // Create the map coords and map options.
           latlng = new google.maps.LatLng(lat, lon),mapOptions = {
              zoom: zoom,
              center: latlng,
              //streetViewControl: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              disableDefaultUI: true,
              scrollwheel: false,
              zoomControl: true,
              panControl: false,
              draggable: true
              //navigationControl: false,
              //mapTypeControl: false,
              //scaleControl: false,
            };
            console.log(left_bound);
            google_map_field_map = new google.maps.Map(this, mapOptions);
            var left=left_bound.split(","),
                right=right_bound.split(",");
            leftboundsX=parseFloat(left[0]),
            leftboundsY=parseFloat(left[1]),
            rightboundsX=parseFloat(right[0]),
            rightboundsY=parseFloat(right[1]);
            
            google_map_field_map.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(leftboundsX,leftboundsY), new google.maps.LatLng(rightboundsX,rightboundsY)));
       // google.maps.event.trigger(google_map_field_map, 'resize');
        google_map_field_map.panBy(-150, 0);
        
        // Drop a marker at the specified position.
        marker = new google.maps.Marker({
          map: google_map_field_map,
          position: latlng,
          animation: google.maps.Animation.DROP,
          optimized: false,
          //label: label,
          /*label: {
           text: label,
           color: "#eb3a44",
           fontSize: "12px",
           //fontWeight: "bold"
           }*/

        });

      });

    }
  }

})(jQuery, Drupal);

$(window).resize(function(){
 debounce(fitBoundsMap,500,"testing map resize");
});

var fitBoundsMap=function(){
  console.log("resize");
  google_map_field_map.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(-41.4813,173.6561), 
                                                       new google.maps.LatLng(-41.6421,174.0578)));
  google_map_field_map.panBy(-150, 0);
}