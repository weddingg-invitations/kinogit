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
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
    exit();
}
	$all = json_decode(file_get_contents('php://input'), true);
    $password1=$all['password'];
    $mail=$all['mail'];
    $update_password="update users set password='".sha1($password1)."' where email='".$mail."'";
    mysqli_query($connection,$update_password);
    echo json_encode(array("reseted"=>"ok"))
?>