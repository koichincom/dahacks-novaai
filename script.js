function startChat() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "flex";
}

function stopChat() {
    document.getElementById("welcome-screen").style.display = "flex";
    document.getElementById("chat-screen").style.display = "none";
}
