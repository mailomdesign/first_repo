<?php
// Разрешённые категории
$allowedCategories = ['print', 'branding', 'outdoor', 'web', 'present'];

// Получаем категорию из запроса
$category = $_GET['category'] ?? '';

// Проверяем: если не входит в список разрешённых — выход
if (!in_array($category, $allowedCategories)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid category']);
  exit;
}

// Формируем безопасный путь
$dir = __DIR__ . "/img/$category";

// Проверяем существование папки
if (!is_dir($dir)) {
  http_response_code(404);
  echo json_encode(['error' => 'Directory not found']);
  exit;
}

// Сканируем файлы и фильтруем по расширению
$files = scandir($dir);
$images = [];

foreach ($files as $file) {
  $path = "$dir/$file";
  if (is_file($path) && preg_match('/\.(jpg|jpeg|png|webp)$/i', $file)) {
    $images[] = "img/$category/$file";
  }
}

// Заголовок и вывод
header('Content-Type: application/json');
echo json_encode($images);
