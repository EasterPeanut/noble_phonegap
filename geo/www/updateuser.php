<?php include 'connection.php';
$id = $_GET["id"];
$lat = $_GET["lat"];
$lon = $_GET["lon"];
$date = date('Y-m-d H:i:s');
$url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAEYgSXI4I0Z3qQKJyL6OHIgHe1I3A3j04&latlng='.$lat.','.$lon.'&sensor=true';
/*http://localhost/save/noble/updateuser.php?id=1&lat=51.451990&lon=5.480222*/
$json = file_get_contents($url);
$obj = json_decode($json);


$q = mysqli_query($con, "SELECT userid FROM user WHERE userid='$id'");
if( $q && $q->num_rows ){
     $city = $obj->{'results'}[0]->{'address_components'}[4]->{'long_name'};
$street = $obj->{'results'}[0]->{'address_components'}[1]->{'long_name'};
$location_name = $city .", ".$street;
$query = "UPDATE user SET location_lat=$lat, location_lon=$lon, date='".$date."', location_name='$location_name'
WHERE userid='$id'";
echo "update";
	 mysqli_query($con,$query);
} else {
     $city = $obj->{'results'}[0]->{'address_components'}[4]->{'long_name'};
$street = $obj->{'results'}[0]->{'address_components'}[1]->{'long_name'};
$location_name = $city .", ".$street;
echo "INSERT INTO user (userid, location_lon, location_lat, date, location_name)
VALUES ($id, $lon, $lat, $date, '$location_name')";
	 mysqli_query($con,"INSERT INTO user (userid, location_lon, location_lat, date, location_name)
VALUES ('$id', $lon, $lat,'$date', '$location_name')");
	 echo "insert";
}



mysqli_close($con);

?>