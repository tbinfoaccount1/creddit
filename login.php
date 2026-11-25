<html>
    Fout:
    </html>
<?php
$pdo = require_once __DIR__ . '/database_connect.php';
session_start();

// Krijg login details uit form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
}
else{
    // Stuur terug naar index.html als niet via form
    header("Location: index.html");
    exit();
}

// Check login details in database
$statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$statement->execute(['username' => $user]);
$user_data = $statement->fetch();

// Check of username en wachtwoord kloppen met database
if ($user_data && password_verify($_POST['password'], $user_data['password_hash'])) {
    // Maak session
    $_SESSION['username'] = $user;
    $_SESSION['social_creddit'] = $user_data['social_creddit'];
} else {
    // Stuur terug naar index.html als login mislukt
    header("Location: index.html");
    exit();
}

// Stuur naar chat.php
header("Location: chat.php");
?>