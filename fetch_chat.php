<?php
// Krijg JSON data uit javascript
$data = json_decode(file_get_contents("php://input"), true);

// Haal iets uit de database
$history = []; // History is chat history bestaande uit username en message.

// Return
$response = [
    "success" => true,
    "history" => $history
];

// Stuur terug als JSON
header("Content-Type: application/json");
echo json_encode($response);
?>