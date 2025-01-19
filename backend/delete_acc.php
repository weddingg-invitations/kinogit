<?php
$get_submit=$_POST['delete_acc'];

$servername = "localhost"; // or the IP address of your MySQL server
$username = "root"; // your MySQL username
$password1 = ""; // your MySQL password1
$database = "karapetyan"; // the name of your MySQL database

$host = $_SERVER['HTTP_HOST'];
// Create connection
$connection = mysqli_connect($servername, $username, $password1, $database);

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
    exit();
}
if (isset($_COOKIE['user_id'])) {
    $cookie_information = "select * from users where id='" . mysqli_real_escape_string($connection,$_COOKIE['user_id']) . "' limit 1";
    $cookie_query = mysqli_query($connection, $cookie_information);
    $number_rows_of_cookie_query = mysqli_num_rows($cookie_query);
    $fetch_assoc = mysqli_fetch_assoc($cookie_query);
    if ($_COOKIE['user_id_check'] != sha1($fetch_assoc['password']) || $number_rows_of_cookie_query == 0) {
        exit();
    }
    $delete_account="delete from users where id='".mysqli_real_escape_string($connection,$_COOKIE['user_id'])."'";
    $delete_account=mysqli_query($connection,$delete_account);
    header("Location: http://".$host."/index.html");
}
?>