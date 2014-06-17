
 function loadMarkers(mylat,mylon,callback){
    console.log(mylat);
  $.ajax({
    type: "GET",
    url: $baseUrl+"getchords.php?id="+id+"&lat="+mylat+"&lon="+mylon+"",
    cache: "false",
    dataType: "json",
    success: function(data){  
      if(!(jQuery.isEmptyObject(data))) {
      callback(data);       
      console.log("data"+data.location[1].location_lat);
      }

    }
    ,
    error: function(){
    
    }
  });

}
function loadMap(data, position) {
    
    var isDeviceReady = false;
    document.addEventListener("deviceready", onDeviceReady, false);
    
   
    var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(position.coords.latitude , position.coords.longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var image= "asset/img/images.jpg";
   
    for (i = 0; i < data.location.length; i++) { 
    marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.location[i].location_lat, data.location[i].location_lon),
    map: map
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
    infowindow.setContent(data.location[i].date);
    infowindow.open(map, marker);
    }
    })(marker, i));
    }
    
    
}