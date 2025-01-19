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
$get_datas = "select * from users where id='" . (isset($_COOKIE['user_id']) ? mysqli_real_escape_string ($connection,$_COOKIE['user_id']) : "") . "'";
$get_datas = mysqli_query($connection, $get_datas);
$num_rows = mysqli_num_rows($get_datas);
$fetch_assocc = mysqli_fetch_assoc($get_datas);
if ($num_rows != 0) {
	$array_data = array("name" => $fetch_assocc['username'], "surname" => $fetch_assocc['lastname'], "email" => $fetch_assocc['email'], "age" => $fetch_assocc['age'],"user_id"=>$_COOKIE['user_id']);
	echo json_encode($array_data, 256);
} else {
	$array_data = array("user" => "not registered");
	echo json_encode($array_data, 256);
}
// veradarcnuma name lastname email age
?>