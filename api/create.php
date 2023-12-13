<?php


require 'connection.php';


  $post = $_POST;


  $sql = "INSERT INTO users_ajax (name,email,gender,birthdate,country,image,hobbies) 


	VALUES ('".$post['name']."','".$post['email']."','".$post['gender']."','".$post['birthdate']."','".$post['country']."','".$post['image']."','".$post['hobbies']."')";


  $result = $mysqli->query($sql);


  $sql = "SELECT * FROM users_ajax Order by id desc LIMIT 1"; 


  $result = $mysqli->query($sql);


  $data = $result->fetch_assoc();


echo json_encode($data);


?>
