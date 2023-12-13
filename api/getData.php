<?php
require 'connection.php';
echo "rtr";
exit;


$sqlTotal = "SELECT * FROM  users_ajax ";
$sql = "SELECT * FROM  users_ajax  Order By id desc ";

$result = $mysqli->query($sql);


while ($row = $result->fetch_assoc()) {


  $json[] = $row;
}


$data['data'] = $json;


$result =  mysqli_query($mysqli, $sqlTotal);


$data['total'] = mysqli_num_rows($result);


echo json_encode($data);
