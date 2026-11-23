<html>
    <head>
        <title>Creddit</title>
    </head>
    <body>
        <h1>Creddit</h1>
        <p>Welkom bij Creddit!</p>
        <div id="chat-container">
            <div id="chat-history">
<!-- Hier de chat history, bestaat uit username en message-->
            </div>
            <button id="refresh-button" onclick="update_chat_history()">Refresh</button>
            <input type="text" id="chat-input" placeholder="Typ een bericht...">
            <button id="send-button" onclick="send_message()">Stuur</button>
        </div>
        <div id="key-container">
            <h2>Versleuteling</h2>
            <p>Hier kun je de sleutel invoeren om de chat te ontcijferen.</p>
            <input type="text" id="key-input" placeholder="Typ de sleutel...">
            <button id="key-button" onclick="set_key()">Ontcijferen</button>
        </div>
    <script src="script.js"></script>
    </body>
</html>

<?php
// Check cookie en redirect naar index.html als niet klopt met database
$something = [];
if(!($something)) {
    header("Location: index.html");
    exit();
}
?>