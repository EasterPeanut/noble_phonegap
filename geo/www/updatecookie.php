<?php include 'connection.php';
$id = $_GET["id"];
$received = $_GET["received"];
$sent = $_GET["sent"];
$marker = $_GET["marker"];


$q = mysqli_query($con, "SELECT id FROM cookie WHERE id='$id'");
if( $q && $q->num_rows ){
    
$query = "UPDATE cookie SET id=$id, received=$received, sent=$sent, marker=$marker
WHERE id=$id";
echo "update";
	 mysqli_query($con,$query);
} else {

	 mysqli_query($con,"INSERT INTO cookie (id, received, sent, marker)
VALUES ($id, $received, $sent, $marker)");
	 echo "insert";
}



mysqli_close($con);

?>