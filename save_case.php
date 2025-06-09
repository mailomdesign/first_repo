<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $tag = $_POST['tag'];
    $site = $_POST['site'];

    // Загрузка изображения
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir);
    $imageName = basename($_FILES['image']['name']);
    $imagePath = $uploadDir . time() . "_" . $imageName;
    move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);

    // Данные кейса
    $newCase = [
        'title' => $title,
        'description' => $description,
        'tag' => $tag,
        'site' => $site,
        'image' => $imagePath
    ];

    // Загрузка существующего массива
    $jsonFile = 'cases.json';
    $cases = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];

    $cases[] = $newCase;
    file_put_contents($jsonFile, json_encode($cases, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

    header("Location: admin.html?success=1");
    exit;
}
?>
