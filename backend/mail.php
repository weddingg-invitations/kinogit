<?php
    $host = $_SERVER['HTTP_HOST'];

	$all = json_decode(file_get_contents('php://input'), true);
    $to=$all['mail'];
    $randomNum=$all['randomNum'];

$subject = "KinoGit";
$message = '

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Восстановление пароля - KinoGit</title>
</head>
<body
    style="font-family: \'Tsukimi Rounded\', sans-serif; margin: 0; padding: 0; background-color: #1e1e1e; color: #ffffff;">
    <div class="container" style="width: 96%; margin: 0 auto; padding: 30px;">
        <table
            style="width: 80%; margin: auto; border-collapse: collapse; margin-top: 20px; background-color: #1e1e1e;">
            <tr>
                <th colspan="2" style="background-color: #1e1e1e; color: #ffffff;">
                    <h1 style="font-size: 30px; font-weight: 800; color: #ffffff;">
                        <a href="http://'.$host.'" style="text-decoration: none; color: #ffffff;">
                            Kino<span style="color: #FFB700;">Git</span>
                        </a>
                    </h1>
                </th>
            </tr>
            <tr>
                <td colspan="2">
                    <h2 style="color:#ffffff; margin-bottom: 20px;">Восстановление пароля</h2>
                    <p style="color:#ffffff;">Приветствуем!</p>
                    <p style="color:#ffffff;">Вы получили это письмо, так как запросили восстановление пароля на сайте
                        <a href="http://'.$host.'" style="text-decoration: none; color: #ffffff;">
                            Kino<span style="color: #FFB700;">Git</span>
                        </a>.<br>
                        Для продолжения процесса восстановления пароля, пожалуйста, скопируйте код ниже и вставьте в нужное поле на сайте:
                    </p>
                    <div
                        style="text-align: center; width: 70px; display: block; background-color: #ffaa00; color: #ffffff; border: none; outline: none; font-size: 17px; cursor: pointer; margin: 20px auto; padding: 6px 15px;">
                        <span>'.$randomNum.'</span>
                    </div>
                    <p style="color:#ffffff;">Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.</p>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <p>&copy;
                        <a href="http://'.$host.'" style="text-decoration: none; color: #ffffff;">
                            Kino<span style="color: #FFB700;">Git</span>
                        </a>. Все права защищены.
                    </p>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
';
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <KinoGitofficiall@gmail.com>';
mail($to, $subject, $message, $headers);
echo json_encode(array("success"=>"ok"));
?>