<?php include 'connection.php';
$id = $_GET["id"];
$lat = $_GET["lat"];
$lon = $_GET["lon"];
$date = date('Y-m-d H:i:s');
$url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='.$lat.','.$lon.'&sensor=true';

/*http://localhost/save/noble/updateuser.php?id=1&lat=51.451990&lon=5.480222*/
$json = file_get_contents($url);
$obj = json_decode($json);

$city = $obj->{'results'}[0]->{'address_components'}[4]->{'long_name'};
$street = $obj->{'results'}[0]->{'address_components'}[1]->{'long_name'};
$location_name = $city .", ".$street;
$query = "UPDATE user SET location_lat=$lat, location_lon=$lon, date='".$date."', location_name='$location_name'
WHERE userid=$id";

	 mysqli_query($con,$query);
	 mysqli_close($con);

?>