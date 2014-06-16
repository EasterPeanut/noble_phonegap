<?php include 'connection.php';
header('Access-Control-Allow-Origin: *');

$id = $_GET["id"];
$my_lat = $_GET["lat"];
$my_lon = $_GET["lon"];
$arr = array();


//getchords.php?id=1&lat=51.451988&lon=5.480222 //

 //echo "SELECT * FROM message WHERE id_to = $id OR id_from = $id";
$rs = mysqli_query($con,"SELECT *, ( 3959 * acos( cos( radians($my_lat) ) * cos( radians( user.location_lat ) ) * cos( radians( user.location_lon ) - radians( $my_lon) ) + sin( radians($my_lat) ) * sin( radians( user.location_lat ) ) ) ) 
AS distance FROM user HAVING distance < 20 ORDER BY distance LIMIT 100 ;");
 
while($obj = mysqli_fetch_object($rs)) {
$arr[] = $obj;
}
echo json_encode(array("location"=>$arr));
/*
//The json object is :
{"members":[{"id":"1","title":"Mr","firstname":"Peter","surname":"Ventouris"},{"id":"2","title":"Mr","firstname":"David","surname":"Dabel"},{"id":"3","title":"Mr","firstname":"John","surname":"Merkel"},{"id":"4","title":"Mr","firstname":"James","surname":"Eltons"}]}
*/

?>