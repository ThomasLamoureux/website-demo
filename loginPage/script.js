localStorage.profile = null;

const socket = new WebSocket("ws://localhost:8080");
console.log(socket)


socket.onmessage = function(event) {
    let msg = JSON.parse(event.data);
    console.log(msg)
    switch(msg.type) {
        case "passwordRequest":
            confirmPassword(msg.password);
            console.log("password")
            break;
    }
}


function submitUserLogin() {
    let username = document.getElementById("usernameTextBox").value;
    //let password = document.getElementById("passwordTextBox").value;

    socket.send(JSON.stringify({type: "passwordRequest", username: username}));

    return false;
}

function confirmPassword(realPassword) {
    let password = document.getElementById("passwordTextBox").value;

    if (password == realPassword) {
        successfulLogin();
    } else {
        failedLogin();
    }
}


async function waitForResponse() {
    return socket.on("message", ws, event => {
        var msg = JSON.parse(event.data);
        if (msg.event = "password") {
            console.log(msg.text);
            return msg.text
        }
    })
}




function successfulLogin() {
    let username = document.getElementById("usernameTextBox").value;
    localStorage.profile = username;
    window.location.href = "..\\homePage\\index.html"

    socket.send(JSON.stringify({type: "successfulLogin", text: username}));
}

function failedLogin() {
    document.getElementById("passwordTextBox").value = "";
}


socket.onopen = function(event) {
    console.log("eeee")
    socket.send(JSON.stringify({type: "testFunction", text: "Hello!"}))
}


let form=document.getElementById("pass");
function submitForm(event){
   event.preventDefault();
}
form.addEventListener('submit', submitForm);

/*window.onload = function() {
    // Get a reference to the HTML element with id "demo"
    var demoElement = document.getElementById("demo");

    // Change the text content of the "demo" element
    demoElement.textContent = "Hello, localhost!";
}*/