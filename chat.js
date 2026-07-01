// chat.js

const uid = localStorage.getItem("uid");
const messagesBox = document.getElementById("messages");

// Redirect if not logged in
if (!uid) {
    window.location.href = "index.html";
}

// Send a message
function sendMessage() {

    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if (text === "") return;

    db.collection("messages").add({
        uid: uid,
        text: text,
        time: firebase.firestore.FieldValue.serverTimestamp()
    });

    input.value = "";
}

// Listen for new messages in real time
db.collection("messages")
.orderBy("time")
.onSnapshot((snapshot) => {

    messagesBox.innerHTML = "";

    snapshot.forEach((doc) => {

        const msg = doc.data();

        const div = document.createElement("div");
        div.className = "message";

        if (msg.uid === uid) {
            div.classList.add("my-message");
        } else {
            div.classList.add("other-message");
        }

        div.innerHTML = `
            <p>${msg.text}</p>
        `;

        messagesBox.appendChild(div);
    });

    // Scroll to the latest message
    messagesBox.scrollTop = messagesBox.scrollHeight;
});

// Logout
function logout() {

    auth.signOut().then(() => {

        localStorage.clear();

        window.location.href = "index.html";

    });

}