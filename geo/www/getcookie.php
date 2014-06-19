<?php include 'connection.php';
header('Access-Control-Allow-Origin: *');

$id = $_GET["id"];


//getchords.php?id=1&lat=51.451988&lon=5.480222 //

 //echo "SELECT * FROM message WHERE id_to = $id OR id_from = $id";
$rs = mysqli_query($con,"SELECT * FROM cookie WHERE id = $id");
 
while($obj = mysqli_fetch_object($rs)) {
$arr[] = $obj;
}
echo $_GET['jsoncallback'].json_encode(array("cookie"=>$arr));
/*
//The json object is :
{"members":[{"id":"1","title":"Mr","firstname":"Peter","surname":"Ventouris"},{"id":"2","title":"Mr","firstname":"David","surname":"Dabel"},{"id":"3","title":"Mr","firstname":"John","surname":"Merkel"},{"id":"4","title":"Mr","firstname":"James","surname":"Eltons"}]}
*/

?>