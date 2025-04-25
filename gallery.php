<?php
$category = $_GET['category'];
$dir = __DIR__ . "/img/$category";
$images = [];

if (is_dir($dir)) {
    foreach (scandir($dir) as $file) {
        if (preg_match('/\.(jpg|jpeg|png|webp)$/i', $file)) {
            $images[] = "img/$category/$file";
        }
    }
}

header('Content-Type: application/json');
echo json_encode($images);
