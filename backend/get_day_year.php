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
$mktime_now = mktime(0, 0, 0, date("m", $now), date("d", $now), date("Y", $now));
$how_much_days = json_decode(file_get_contents('php://input'), true);
$append = "";

if ($how_much_days['how_much_days'] == "day") {
    $append = " WHERE entry >= " . $mktime_now;
}

$array_dates = array();
$select_date = "SELECT * FROM statistics" . $append;
$result = mysqli_query($connection, $select_date);

if (!$result) {
    die('Error in the query: ' . mysqli_error($connection));
}

while ($fetch_assoc = mysqli_fetch_assoc($result)) {
    $take_date = $fetch_assoc['entry'];
    $get_day = date("d", $take_date);
    $get_month = date("m", $take_date);
    $get_year = date("Y", $take_date);

    $formatted_date = $get_day . "/" . $get_month . "/" . $get_year;

    if (!isset($array_dates[$formatted_date])) {
        $array_dates[$formatted_date] = 1;
    } else {
        $array_dates[$formatted_date]++;
    }
}

mysqli_close($connection);

echo json_encode(array("dates" => $array_dates));
?>