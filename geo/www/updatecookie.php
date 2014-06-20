<?php include 'connection.php';
$id = $_GET["id"];
$received = $_GET["received"];
$sent = $_GET["sent"];
$marker = $_GET["marker"];
$lat = $_GET["lat"];
$lng = $_GET["lng"];


$q = mysqli_query($con, "SELECT id FROM cookie WHERE id='$id'");
if( $q && $q->num_rows ){
    
$query = "UPDATE cookie SET id='$id', received=$received, sent=$sent, marker=$marker, location_lon='$lng' , location_lat='$lat'
WHERE id='$id'";
echo $query;
	 mysqli_query($con,$query);
} else {

	 mysqli_query($con,"INSERT INTO cookie (id, received, sent, marker, location_lon, location_lat)
VALUES ('$id', $received, $sent, $marker, $lng, $lat)");
	 echo "insert";
}



mysqli_close($con);

?>