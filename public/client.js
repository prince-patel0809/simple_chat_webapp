const socket = io()

let name;
let inputbaar = document.getElementById("inputbaar")
let messageArea = document.getElementById("chat-body")
const sendBtn = document.getElementById("sendBtn")

do {
    name = prompt("Please Enter your name");
} while (!name);

inputbaar.addEventListener("keyup", (e) => {
    if (e.key === 'Enter') {
        // sendMessage(e.target.value);
        sendBtn.click()
    }
})

sendBtn.addEventListener("click", () => sendMessage(inputbaar.value))



function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // append
    appendMessage(msg, 'user-message')

    // send to server
    socket.emit("message", msg)
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add("message", type)

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
    inputbaar.value = ''
    scrollToBottom();
}

// receive msg

socket.on("message", (msg) => {
    appendMessage(msg, "bot-message")
    scrollToBottom();

})

// scroll at new msg

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}