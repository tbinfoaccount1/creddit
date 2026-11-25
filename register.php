<html>
    Fout:
    </html>
<?php
$pdo = require_once __DIR__ . '/database_connect.php';
session_start();

// Krijg register details uit form
if( $_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['new_username'];
    $pass = $_POST['new_password'];
}
else{
    // Stuur terug naar index.html als niet via form
    header("Location: index.html");
    exit();
}
// Check of details al bestaan in database
$statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$statement->bindParam(':username', $user);
$statement->execute();
$user_data = $statement->fetch();

if (!$user_data) {
    // Zo ja, maak account in database
    $pass_hash = password_hash($pass, PASSWORD_DEFAULT);
    $statement = $pdo->prepare("INSERT INTO users (username, password_hash, created_at, social_creddit) VALUES (:username, :password_hash, NOW(), 0)");
    $statement->bindParam(':username', $user);
    $statement->bindParam(':password_hash', $pass_hash);
    $statement->execute();
}
else {
    // Zo nee, stuur terug naar index.html
    header("Location: index.html");
    exit();
}

// Create een session
$_SESSION['username'] = $user;
$_SESSION['social_creddit'] = 0;

// Stuur naar chat.php
header("Location: chat.php");
?>