let key = ""; // De ingevoerde sleutel

function encrypt(message, key) {
    let message_binary = new TextEncoder().encode(message);
    let key_binary = new TextEncoder().encode(key);
    let encrypted = [];

    // Encrypt met XOR
    for (let i = 0; i < message_binary.length; i++) {
        if (i === 0) {
            encrypted.push(message_binary[i]);
        } else {
            encrypted.push(message_binary[i] ^ key_binary[(i - 1) % key_binary.length]);
        }
    }

    // Return encrypted message as hex string
    return encrypted
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

function decrypt(encrypted_hex, key) {
    if (encrypted_hex.length % 2 !== 0) {
        throw new Error("Ongeldige versleutelde hexstring.");
    }
    if (!/^[0-9a-fA-F]*$/.test(encrypted_hex)) {
        throw new Error("Ongeldige versleutelde hexstring.");
    }

    let key_binary = new TextEncoder().encode(key);
    let decrypted = [];

    // Decypher met XOR
    for (let i = 0; i < encrypted_hex.length; i += 2) {
        let byte = parseInt(encrypted_hex.substr(i, 2), 16);
        if (Number.isNaN(byte)) {
            throw new Error("Ongeldige versleutelde hexstring.");
        }

        let messageIndex = i / 2;
        if (messageIndex === 0) {
            decrypted.push(byte);
        } else {
            decrypted.push(byte ^ key_binary[(messageIndex - 1) % key_binary.length]);
        }
    }

    // Terug als string
    return String.fromCharCode(...decrypted);
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
    //     decrypted_message = decrypt(message_split[1], key);
    //     decrypted_username = decrypt(message_split[0], key);
    //     message = decrypted_username + ":" + decrypted_message;
    // }

    // Zet alle messages en usernames in html
    // foreach (message in messages) {
    //     document.getElementById("een_of_andere_div").innerHTML = message + "<br>";
    // }
}

function set_key(){
    key = document.getElementById("key-input").value;
}

function get_username(){
    let username = '';

    // Haal username op uit cookie

    return encrypt(username);
}

function send_message(){
    let username = get_username();
    let message = document.getElementById("chat-input").value;
    let encrypted_message = encrypt(message, key);
    send_chat(username, encrypted_message);
}