var map;
 var markersArray = [];
 function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}
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

}function initialize(position) {
     var isDeviceReady = false;
    document.addEventListener("deviceready", onDeviceReady, false);
    
   
    map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 12,
    center: new google.maps.LatLng(position.coords.latitude , position.coords.longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}
function loadMap(data,position) {
    
   

    var infowindow = new google.maps.InfoWindow();
    var marker, i;
     var image = {
  url: "img/user_circle.png",
  size: new google.maps.Size(32, 32),
  origin: new google.maps.Point(0, 0),
  scaledSize: new google.maps.Size(32, 32)
};
   
    for (i = 0; i < data.location.length; i++) { 
        if(!(data.location[i].userid == id)) {
    marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.location[i].location_lat, data.location[i].location_lon),
    map: map,
    icon: image
    });
    markersArray.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {lat, lng, id_to
    infowindow.setContent("<a href='#page4' class='sendmessagemarker' onclick='setMessageToUser("+position.coords.latitude+","+ position.coords.longitude+","+ data.location[i].userid+");'><img src='../img/speech_bubbles.png' alt='send message' height='32' width='32'/>Send message</a>");
    infowindow.open(map, marker);
    }
    })(marker, i));
    } else {
        var image2 = {
  url: "img/you-icon.png",
  size: new google.maps.Size(57, 73),
  origin: new google.maps.Point(0, 0),
  scaledSize: new google.maps.Size(57, 73)
};
        marker = new google.maps.Marker({
    position: new google.maps.LatLng(data.location[i].location_lat, data.location[i].location_lon),
    map: map,
    icon: image2,
    });
        markersArray.push(marker);
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    
    })(marker, i));
    }
    }
    
    
}