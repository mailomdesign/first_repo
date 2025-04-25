<?php
$category = $_GET['category'] ?? '';
$folder = __DIR__ . "/img/$category";

$allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
$images = [];

if (is_dir($folder)) {
    foreach (scandir($folder) as $file) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, $allowedExtensions)) {
            $images[] = "img/$category/$file";
        }
    }
}

header('Content-Type: application/json');
echo json_encode($images);
