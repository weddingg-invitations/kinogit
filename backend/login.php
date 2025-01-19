<?php
// $servername = "localhost"; // or the IP address of your MySQL server
// $username = "KinoGit_1_KinoGit"; // your MySQL username
// $password1 = "KinoGit7695!"; // your MySQL password
// $database = "KinoGit_1_ru"; // the name of your MySQL database

$servername = "localhost";
$username = "root";
$password1 = "";
$database = "karapetyan";

$host = $_SERVER['HTTP_HOST'];

$get_input = json_decode(file_get_contents('php://input'), true);
$login = addslashes($get_input['loginEmail']);
$password = addslashes($get_input['loginPassword']);
if (!$get_input['keepMe'])
	$keep_me = 1;
else $keep_me=60;

$connection = mysqli_connect($servername, $username, $password1, $database);
if (mysqli_connect_errno()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
	exit();
}

$sql_login = "select * from users where email='" . $login . "' and password='" . sha1($password) . "' limit 1";
$sql_login = mysqli_query($connection, $sql_login);
$sql_login_checking = mysqli_num_rows($sql_login);

if ($sql_login_checking == 1) {
	$assoc = mysqli_fetch_assoc($sql_login);
	setcookie('user_id', "", time() - 1000);
	setcookie('user_id', "", time() - 1000, "/", $host);
	setcookie('user_id_check', "", time() - 1000);
	setcookie('user_id_check', "", time() - 1000, "/", $host);
	setcookie('user_id', $assoc['id'], time() + (60 * 60 * 24 * $keep_me), "/", $host, false, true);
	setcookie('user_id_check', sha1($assoc['password']), time() + (60 * 60 * 24 * $keep_me), "/", $host, false, true);
	echo json_encode("login_ok");
	exit;
}
else
echo json_encode('incorret_login');
// userin logina anum 
?>