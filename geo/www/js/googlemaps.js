 var myPoints = [];
 function loadMarkers(mylat,mylon,callback){
  $.ajax({
    type: "GET",
    url: $baseUrl+"getchords.php?id="+id+"&lat="+mylat+"&lon="+mylon+"",
    cache: "false",
    dataType: "json",
    success: function(data){  
      if(!(jQuery.isEmptyObject(data))) {
        $.each(data, function(index, element) {
          // console.log(element[1].date);
          for (var key in element) {
            var obj = element[key];
    
          myPoints.push(obj);
          }
        });
        callback();  
      }


    }
    ,
    error: function(){
    
    }
  });

}
 
function GoogleMap(lat, lng, canvas) {
 	var canvas = canvas;
	var id = "1";
	var markers = new Array();
	var baseUrl = 'http://pienvandalen.nl/';
 	this.initialize = function(){
		var map = showMap();
	}
 	var showMap = function(){
        var myOptions = {
            center: new google.maps.LatLng(lat,lng),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(canvas, myOptions);

        setMarkers(map, myPoints);
        


        
        
        
        function setMarkers(map, markers) {

        for (var i = 0; i < markers.length; i++) {
            var sites = markers[i];
            console.log(sites);
            var siteLatLng = new google.maps.LatLng(sites.location_lat,sites.location_lon);
            var marker = new google.maps.Marker({
                position: siteLatLng,
                map: map
            });
			var infowindow  = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'mousedown, click, ', function() {
       		 window.location.href = baseUrl+"messageform.php?id="+sites.userid+"";
    		});


            return marker;
        }

        // Set all markers in the myPoints variable
          
    }
}
}

