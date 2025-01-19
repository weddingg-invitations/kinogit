<?php
$host = $_SERVER['HTTP_HOST'];

if (isset($_POST['submit'])) {
    setcookie('user_id', "", time() - 1000, "/", $host);
    setcookie('user_id', "", time() - 1000);
    setcookie('user_id_check', "", time() - 1000, "/", $host);
    setcookie('user_id_check', "", time() - 1000);
    header("Location: http://".$host."/index.html");
    exit;
}
header("Location: http://".$host."/index.html");
// login exacin hanuma
?>