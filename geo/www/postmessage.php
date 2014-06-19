<?php include 'connection.php';
$id_from = $_POST["id"];
$lat = $_POST["lat"];
$lon = $_POST["lng"];
$date = date('Y-m-d H:i:s');
$message = $_POST["message"];
$id_to = $_POST["id_to"];
$url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='.$lat.','.$lon.'&sensor=true';
$json = file_get_contents($url);
$obj = json_decode($json);
$city = $obj->{'results'}[0]->{'address_components'}[4]->{'long_name'};
$street = $obj->{'results'}[0]->{'address_components'}[1]->{'long_name'};
$location_name = $city .", ".$street;
echo "INSERT INTO message (id_to, location_lon, location_lat, message, date, id_from, location_name)
VALUES ($id_to, $lon, $lat, '".$message."', '".$date."',$id_from, '$location_name')";
/* postmessage.php?id=1&lat=51.451990&lon=5.480222&message=Pien%20laat%20eens%20een%20keer%20je%20voeten%20zien&id_to=2*/
	 mysqli_query($con,"INSERT INTO message (id_to, location_lon, location_lat, message, date, id_from, location_name)
VALUES ($id_to, $lon, $lat, '".$message."', '".$date."',$id_from, '$location_name')");
	 mysqli_close($con);

?>