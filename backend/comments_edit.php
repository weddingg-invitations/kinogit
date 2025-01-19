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
  $get = json_decode(file_get_contents('php://input'), true);
  $comment_id=$get['comment_id'];
  $input_value=$get['input_value'];

$edit_comment="update comments set comment='$input_value' where id='$comment_id'";
// // echo $edit_comment;
$edit_comment=mysqli_query($connection,$edit_comment);

echo json_encode($input_value);
?>