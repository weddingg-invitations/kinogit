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
$select_users = "select * from users";
$select_users = mysqli_query($connection, $select_users);
echo json_encode(mysqli_fetch_all($select_users, MYSQLI_NUM), 256);
?>