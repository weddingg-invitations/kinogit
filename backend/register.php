<?php
$searchQuery = $_SERVER['REQUEST_URI'];

$parsedUrl = parse_url($searchQuery);

$host = $_SERVER['HTTP_HOST'];

$get_input = json_decode(file_get_contents('php://input'), true);

$regName = addslashes($get_input['regName']);
$regLname = addslashes($get_input['regLname']);
$regAge = addslashes($get_input['regAge']);
$regEmail = addslashes($get_input['regEmail']);
$regPassword = addslashes($get_input['regPassword']);
$gender = addslashes($get_input['gender']);

// $servername = "localhost"; // or the IP address of your MySQL server
// $username = "KinoGit_1_KinoGit"; // your MySQL username
// $password1 = "KinoGit7695!"; // your MySQL password1
// $database = "KinoGit_1_ru"; // the name of your MySQL database

$servername = "localhost";
$username = "root";
$password1 = "";
$database = "karapetyan";

$connection = mysqli_connect($servername, $username, $password1, $database);
$e_mail_checking = "select email from users where email='$regEmail' limit 1";
$query_mail_checking = mysqli_query($connection, $e_mail_checking);
$query_mail_checking = mysqli_num_rows($query_mail_checking);
if ($query_mail_checking == 0) {
    $insert_into = "insert into users  (username,lastname,email,password,age,gender)  values ('$regName','$regLname','$regEmail','" . sha1($regPassword) . "','$regAge','$gender')";
    $query_insert_into = mysqli_query($connection, $insert_into);
    $last_inserted_id = mysqli_insert_id($connection);
    if (!file_exists("users"))
        mkdir("users");
    if (!file_exists("users/" . $last_inserted_id))
        mkdir("users/" . $last_inserted_id);
    setcookie('user_id', $last_inserted_id, time() + (60 * 60 * 24), "/", $host, false, true);
    setcookie('user_id_check', sha1(sha1($regPassword)), time() + (60 * 60 * 24), "/", $host, false, true);
    echo json_encode("register_ok");

} else
echo json_encode("email_match");
?>