<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$file = '../cases.json';

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Пустые данные']);
    exit;
}

if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

$cases = json_decode(file_get_contents($file), true);
$cases[] = $data;

file_put_contents($file, json_encode($cases, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo json_encode(['success' => true]);
?>
