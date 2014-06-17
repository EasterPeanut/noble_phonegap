
 function loadMarkers(mylat,mylon,callback){
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
function loadMap(data) {
    $(function(){
    getGeolocation();
    });
    var isDeviceReady = false;
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() 
    {
    isDeviceReady = true;
    }
    function getGeolocation()
    {
    navigator.geolocation.getCurrentPosition(onGetGeolocationSuccess, onGetGeolocationError);
    }
    function onGetGeolocationSuccess(position)
    {
    /*html = "Latitude: " + position.coords.latitude + "<br />" +
    "Longitude: " + position.coords.longitude + "<br />" +
    "Altitude: " + position.coords.altitude + "<br />" + 
    "Accuracy: " + position.coords.accuracy + "<br />" + 
    "Altitude Accuracy: " + position.coords.altitudeAccuracy + "<br />" + 
    "Heading: " + position.coords.heading + "<br />" + 
    "Speed: " + position.coords.speed + "<br />" + 
    "Timestamp: " + new Date(position.timestamp) + "<br />"; 
    $("#dGeolocation").html(html);
    */

   
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
    function onGetGeolocationError(error)
    {
    html = "Error code: " + error.code + "<br />" + 
    "Error message: " + error.message + "<br />";
    $("#dGeolocation").html(html);
    }
}