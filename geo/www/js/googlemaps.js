
 function loadMarkers(mylat,mylon,callback){
  $.ajax({
    type: "GET",
    url: $baseUrl+"getchords.php?id="+id+"&lat="+mylat+"&lon="+mylon+"",
    cache: "false",
    dataType: "json",
    success: function(data){  
      if(!(jQuery.isEmptyObject(data))) {
   
   callback(data);       
      }
       


    }
    ,
    error: function(){
    
    }
  });

}
 
function GoogleMap(lat, lng, canvas, myPoints) {
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
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(canvas, myOptions);

        setMarkers(map, myPoints);
        


        
        
        
        function setMarkers(map, markers) {



        for (var i = 0; i < markers.location.length; i++) {
        	console.log("aantal"+ i);
            var sites = markers.location[i];
   			
            var siteLatLng = new google.maps.LatLng(sites.location_lat,sites.location_lon);
            var marker = new google.maps.Marker({
                position: siteLatLng,
                map: map
            });
            
			


            
        }

return marker;
        // Set all markers in the myPoints variable
          
    }
}
}

