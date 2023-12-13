<?php
require 'connection.php';


 $id  = $_POST["id"];


 $sql = "DELETE FROM users_ajax WHERE id = '".$id."'";


 $result = $mysqli->query($sql);


 echo json_encode([$id]);


?>
