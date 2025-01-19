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
$now = time();
$select_online = "select * from guests where last_entry>=" . ($now - 3);
$select_online = mysqli_query($connection, $select_online);
echo json_encode(array("online" => mysqli_num_rows($select_online)));
?>