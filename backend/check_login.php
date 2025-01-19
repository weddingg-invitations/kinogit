<?php
function check_login(){
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
    $cookie_information = "select * from users where id='" . addslashes($_COOKIE['user_id']) . "' limit 1";
    $cookie_query = mysqli_query($connection, $cookie_information);
    $number_rows_of_cookie_query = mysqli_num_rows($cookie_query);
    $fetch_assoc = mysqli_fetch_assoc($cookie_query);
}
if (!isset($_COOKIE['user_id']) || $_COOKIE['user_id_check'] != sha1($fetch_assoc['password']) || $number_rows_of_cookie_query == 0) {
    return "{'user_check':'false'}";
} else {
    return json_encode($fetch_assoc);
}
}
check_login();
// stuguma usery login exaca te che / ete login exaca veradarcnuma useri tvyalnery

?>