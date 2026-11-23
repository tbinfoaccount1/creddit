let key = ""; // De ingevoerde sleutel

function encrypt(message,key){
    // Message en key naar binary
    let message_binary = new TextEncoder().encode(message);
    let key_binary = new TextEncoder().encode(key);
    // Voer encryptie uit (XOR)
    let encrypted = [];
    for(let i = 0; i < message_binary.length; i++){
        encrypted.push(message_binary[i] ^ key_binary[i % key_binary.length]);
    }
    // encrypted naar ascii string
    encrypted_message = String.fromCharCode.apply(null, encrypted);
    return encrypted_message;
}

function decrypt(message,key){
    // Message en key naar binary
    let message_binary = new TextEncoder().encode(message);
    let key_binary = new TextEncoder().encode(key);
    // Voer decryptie uit (XOR)
    let decrypted = [];
    for(let i = 0; i < message_binary.length; i++){
        decrypted.push(message_binary[i] ^ key_binary[i % key_binary.length]);
    }
    // decrypted naar ascii string
    decrypted_message = String.fromCharCode.apply(null, decrypted);
    return decrypted_message;
}

function send_chat(username, message_to_send) {
    fetch("send_chat.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username,
            message: message_to_send
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function fetch_chat(){
    fetch("fetch_chat.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            hier_moet_iets_staan_volgens_mij_dus_stuur_maar_null: null
        })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function update_chat_history() {
    let messages = [];

    fetch_chat().then(data => {
        // Haal encrypted messages op uit php
        messages = data.history;
        }
    );
    // Parse messages hier

    // Decrypt de messages
    // foreach (message in messages) {
    //     message_split = message.split(":");
    //     decrypt(message_split[1], key);
    //     message = message_split[0] + ":" + decrypted_message;
    // }

    // Zet alle messages in html
    // foreach (message in messages) {
    //     document.getElementById("een_of_andere_div").innerHTML = message + "<br>";
    // }
}

function set_key(){
    key = document.getElementById("key_input").value;
}

function send_message(){
    let username = document.getElementById("username_input").value;
    let message = document.getElementById("message_input").value;
    let encrypted_message = encrypt(message, key);
    send_chat(username, encrypted_message);
}