<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "mail.om.design@gmail.com"; // ← сюда придёт письмо
    $subject = $_POST['subject'];
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    $body = "Имя: $name\nТелефон: $phone\nСообщение:\n$message";

    $headers = "From: site@yourdomain.com\r\n";
    $headers .= "Reply-To: $phone\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение успешно отправлено.";
    } else {
        echo "Ошибка при отправке.";
    }
}
?>
