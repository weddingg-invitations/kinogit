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
if (isset($_COOKIE['user_id'])) {
    $get_select = "select user_id,move_id from bookmark where user_id='" . addslashes($_COOKIE['user_id']) . "'";
    $get_select = mysqli_query($connection, $get_select);
    $number_rows = mysqli_num_rows($get_select);

    if ($number_rows == 0) {
        echo json_encode(array("return" => false));
    } else {
        $fetch_all = mysqli_fetch_all($get_select, MYSQLI_NUM);
        echo json_encode($fetch_all, 265);
    }
} else
    echo json_encode(array("registred" => true));
// stanumenq zakladkeqy tvayl useri id
?>