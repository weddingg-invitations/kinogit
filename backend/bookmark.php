<?php
// $servername = "localhost"; // or the IP address of your MySQL server
// $username = "KinoGit_1_KinoGit"; // your MySQL username
// $password1 = "KinoGit7695!"; // your MySQL password1
// $database = "KinoGit_1_ru"; // the name of your MySQL database

$servername = "localhost"; // or the IP address of your MySQL server
$username = "root"; // your MySQL username
$password1 = ""; // your MySQL password1
$database = "karapetyan"; // the name of your MySQL database

// Create connection
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

    if (!isset($_COOKIE['user_id']) || $_COOKIE['user_id_check'] != sha1($fetch_assoc['password']) || $number_rows_of_cookie_query == 0) {
        exit();
    }
    $get_id = json_decode(file_get_contents('php://input'), true);
    $connection = mysqli_connect($servername, $username, $password1, $database);
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error() . ". Try to connect again";
        exit();
    }
    $sql_select = "select * from bookmark where user_id='" . addslashes($_COOKIE['user_id']) . "' and move_id='$get_id'";
    $result_select = mysqli_query($connection, $sql_select);

    if ($get_id == "clearAll") {
        $delete_all = "delete from bookmark where user_id='" . addslashes($_COOKIE['user_id']) . "'";
        $delete_all = mysqli_query($connection, $delete_all);
        echo json_encode($delete_all);
        exit();
    }
    if (mysqli_num_rows($result_select) == 0) {
        $insert_into = "insert into bookmark (user_id,move_id) values('" . addslashes($_COOKIE['user_id']) . "','" . $get_id . "')";
        mysqli_query($connection, $insert_into);
        echo json_encode(array("change" => "ok", "registered" => true));
    } else {
        $delete = "delete from bookmark where user_id='" . addslashes($_COOKIE['user_id']) . "' and move_id='" . $get_id . "'";
        mysqli_query($connection, $delete);
        echo json_encode(array("change" => "deleted", "registered" => true));
    }

} else {
    echo json_encode(array("registered" => false));
    exit();
}

// avelacnuma mek aydi kam jnjuma mek id
?>