<?php
// Krijg JSON data uit javascript
$data = json_decode(file_get_contents("php://input"), true);

// Vars uit json
$name = $data["name"];
$message = $data["message"];

// Username validation met cookie

// Stuur naar database

// Return
$response = [
    "success" => true,
    "history" => $history
];

// Stuur terug als JSON
header("Content-Type: application/json");
echo json_encode($response);
?>