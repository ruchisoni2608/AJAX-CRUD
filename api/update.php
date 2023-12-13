<?php


require 'connection.php';


  $id  = $_POST["id"];
  $post = $_POST;


  $sql = "UPDATE users_ajax SET name = '".$post['name']."'
    ,email = '".$post['email']."' ,gender = '".$post['gender']."' ,birthdate = '".$post['birthdate']."' 
    ,country = '".$post['country']."' ,image = '".$post['image']."' ,hobbies = '".$post['hobbies']."' 
    WHERE id = '".$id."'";


  $result = $mysqli->query($sql);


  $sql = "SELECT * FROM users_ajax WHERE id = '".$id."'"; 


  $result = $mysqli->query($sql);


  $data = $result->fetch_assoc();


  echo json_encode($data);


?>
