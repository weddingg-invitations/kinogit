<?php
    $host = $_SERVER['HTTP_HOST'];
function create_random_string($string_length = 32){
    $string_numbers = array_merge(range('a', 'z'), range('A', 'Z'));
    $txt = "";
    for ($i = 0; $i < $string_length; $i++) {
        $txt .= $string_numbers[array_rand($string_numbers)];
    }
    return $txt;
}
function guest() {
    // $servername = "localhost"; // or the IP address of your MySQL server
    // $username = "KinoGit_1_KinoGit"; // your MySQL username
    // $password1 = "KinoGit7695!"; // your MySQL password1
    // $database = "KinoGit_1_ru"; // the name of your MySQL database

    $servername = "localhost";
    $username = "root";
    $password1 = "";
    $database = "karapetyan";

    $connection = mysqli_connect($servername, $username, $password1, $database);
    $create_random_string = create_random_string();
    if (!isset($_COOKIE['guest_token'])) {
        $sql = "insert into guests (token,last_entry) values('" . $create_random_string . "','" . time() . "')";
        $sql = mysqli_query($connection, $sql);
        $insert_into = "insert into statistics (token,entry) values('" . $create_random_string . "','" . time() . "')";
        $insert_into = mysqli_query($connection, $insert_into);
        setcookie('guest_token', "", time() - 1000);
        setcookie('guest_token', "", time() - 1000, "/", $host);
        setcookie('guest_token', $create_random_string, time() + (60 * 60 * 24 * 30 * 12), "/", $host, false, true);
        echo json_encode(array("ok" => true));
    } else {
        $take_entry = "select * from guests where token='" . mysqli_real_escape_string($connection, $_COOKIE['guest_token']) . "'";
        $take_entry = mysqli_query($connection, $take_entry);
        $rows_entry = mysqli_num_rows($take_entry);
        $fetch_entry = mysqli_fetch_assoc($take_entry);
        if ($rows_entry != 0) {
            $update_entry = "update guests set last_entry='" . time() . "' where token='" . mysqli_real_escape_string($connection, $_COOKIE['guest_token']) . "'";
            $update_entry = mysqli_query($connection, $update_entry);
            $today = mktime(0, 0, 0, date("m", time()), date("d", time()), date("Y", time()));
            if ($fetch_entry['last_entry'] < $today) {
                $insert_into = "insert into statistics (token,entry) values('" . mysqli_real_escape_string($connection, $_COOKIE['guest_token']) . "','" . time() . "')";
                $insert_into = mysqli_query($connection, $insert_into);
                echo json_encode(array("ok" => "ok"));
            }
        }
    }
}
guest();
?>