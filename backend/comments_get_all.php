<?php
  // $servername = "localhost"; // or the IP address of your MySQL server
  // $username = "KinoGit_1_KinoGit"; // your MySQL username
  // $password1 = "KinoGit7695!"; // your MySQL password1
  // $database = "KinoGit_1_ru"; // the name of your MySQL database

  $servername = "localhost";
  $username = "root";
  $password1 = "";
  $database = "karapetyan";
  
  $connection = mysqli_connect($servername, $username, $password1, $database);
  $get_id = json_decode(file_get_contents('php://input'), true);
  $name=$get_id['name'];
  $set_user_id=$get_id['user_id'];
  $set_movie_id=$get_id['movie_id'];
  $user_text=$get_id['user_text'];
$select_comment="select * from comments where movie_id='$set_movie_id'";
$select_comment=mysqli_query($connection,$select_comment);
$mysqli_all=mysqli_fetch_all($select_comment,MYSQLI_ASSOC);
echo json_encode($mysqli_all);
?>