$(window).load(function(){

var locations = [
    ['IFPB','765 Av. Primeiro de Maio, João Pessoa'],
    ['TCE', 'Rua Professor Geraldo Von Sohsten, 147,Jaguaribe,João Pessoa'],
    ];

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: new google.maps.LatLng(-7.134685, -34.873030),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var geocoder = new google.maps.Geocoder();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      geocodeAddress(locations[i]);
    }

function geocodeAddress(location) {
  geocoder.geocode( { 'address': location[1]}, function(results, status) {
  //alert(status);
    if (status == google.maps.GeocoderStatus.OK) {

      //alert(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      createMarker(results[0].geometry.location,location[0]+"<br>"+location[1]);
    }
    else
    {
      alert("some problem in geocode" + status);
    }
  }); 
}

function createMarker(latlng,html){
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  }); 

  google.maps.event.addListener(marker, 'mouseover', function() { 
    infowindow.setContent(html);
    infowindow.open(map, marker);
  });
        
  google.maps.event.addListener(marker, 'mouseout', function() { 
    infowindow.close();
  });
}


});
