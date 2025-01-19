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
  $timee=$get_id['timee'];

$set_comment="insert into comments (user_id,movie_id,comment,name,time) values('$set_user_id','$set_movie_id','$user_text','$name','$timee')";
// // echo $set_comment;
$set_comment=mysqli_query($connection,$set_comment);
$last_inserted_id=mysqli_insert_id($connection);
$select_comment="select id from comments where id='$last_inserted_id'";
$select_comment=mysqli_query($connection,$select_comment);
$fetch_assoc=mysqli_fetch_assoc($select_comment);
echo json_encode($fetch_assoc);

?>