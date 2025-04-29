<?php
$category = $_GET['category'] ?? '';
$dir = "img/$category";
$images = [];

if (is_dir($dir)) {
    $files = scandir($dir);
    foreach ($files as $file) {
        if (preg_match('/\.(jpg|jpeg|png|webp)$/i', $file)) {
            $images[] = "$dir/$file";
        }
    }
}

header('Content-Type: application/json');
echo json_encode($images);
