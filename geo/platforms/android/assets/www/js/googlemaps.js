function GoogleMap(lat, lng, canvas){
	var canvas = canvas;
	var id = "1";
 

	this.initialize = function(){
		var map = showMap();
	}

	function loadMarkers(loc_lat, loc_lng){
			var marker2 = new google.maps.Marker({
			position: new google.maps.LatLng(loc_lat, loc_lng),
			map: map,
			title: "Other",
			animation: google.maps.Animation.BOUNCE,
			//icon: 'img/marker3.png',
		});
	}
	

	var showMap = function(){
		//Create map
		var myLatLng = new google.maps.LatLng(lat, lng);

		var mapOptions = {
			center: myLatLng,
			zoom: 10,
			disableDefaultUI: true,
			scrollwheel: false,
		    navigationControl: false,
		    mapTypeControl: false,
		    scaleControl: false,
		    draggable: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	 
		var map = new google.maps.Map(canvas, mapOptions);

		//Create markers
		//var baseUrl = 'http://localhost/foundation/';
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: "Me",
			animation: google.maps.Animation.BOUNCE,
			//icon: 'img/marker3.png',
		});

		$.ajax({
	    	type: "GET",
	    	url: $baseUrl+"getchords.php?id="+id+"&lat="+lat+"&lon="+lng,
		    cache: "false",
		    dataType: "json",
		    success: function(data){
		      if(!(jQuery.isEmptyObject(data))) {
		        $.each(data, function(index, element) {
		          // console.log(element[1].date);
		          for (var key in element) {
		            var obj = element[key];
		            for (var prop in obj) {
		              if((prop == "id") && (obj['id'] == id)) {
		              }else{
		              	function loadMarkers(obj.location_lat, obj.location_lon);
		              }
		            }
		          }
		        });
		      }else{
		        $('.page2-list, .page3-list').append('No sent messages yet.');
		      }
		    },
		    error: function(){
		      $('.page2-list, .page3-list').append('There was an error loading the messages.');
		    }
		  });
		}

		return map;

	}
}



	/*function initialize() {
  var myLatLng = new google.maps.LatLng(53.000980, 6.538572);
  var centerLatLng = new google.maps.LatLng(53.000980, 6.825604);
  
  var mapOptions = {
	scrollwheel: false,
    zoom: 10,
    center: centerLatLng,
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var baseUrl = 'http://localhost/foundation/';
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
	animation: google.maps.Animation.BOUNCE,
	icon: 'img/marker3.png',
  });  
  
  google.maps.event.addDomListener(window, 'resize', function() {
	if(window.innerWidth < 624){
  		map.setCenter(myLatLng);
	}else{
  		map.setCenter(centerLatLng);
	}
    
  });*/
