<?php
// This is a simplified version. Implement actual security measures for production use.
$uniqueId = json_decode(file_get_contents('php://input'), true)['uniqueId'];
$sentMessages = json_decode(file_get_contents('sent_messages.json'), true);

$valid = false;
$server = '';

foreach ($sentMessages as $message) {
    if ($message['unique_id'] === $uniqueId && time() - strtotime($message['timestamp']) <= 600) {
        $valid = true;
        $server = $message['server'];
        break;
    }
}

echo json_encode(['valid' => $valid, 'server' => $server]);
?>
