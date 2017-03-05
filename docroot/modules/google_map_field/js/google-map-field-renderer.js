
var google_map_field_map;

(function ($, Drupal) {

  Drupal.behaviors.google_map_field_renderer = {
    attach: function (context) {

      $('.google-map-field .map-container').each(function (index, item) {

        // Get the settings for the map from the Drupal.settings object.
        var lat = $(this).attr('data-lat');
        var lon = $(this).attr('data-lon');
        var label = $(this).attr('data-label');
        var zoom = parseInt($(this).attr('data-zoom'));

        // Create the map coords and map options.
        var latlng = new google.maps.LatLng(lat, lon);
        var mapOptions = {
          zoom: zoom,
          center: latlng,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          //scrollwheel: false,
          //navigationControl: false,
          //mapTypeControl: false,
          //scaleControl: false,
          //draggable: true,
        };
        google_map_field_map = new google.maps.Map(this, mapOptions);

        google.maps.event.trigger(google_map_field_map, 'resize')
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
