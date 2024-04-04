localStorage.profile = null;
localStorage.username = null;

const socket = new WebSocket("ws://localhost:8080");
console.log(socket)

// Recieves messages from the server
socket.onmessage = function(event) {
    let msg = JSON.parse(event.data);
    switch(msg.type) {
        case "passwordRequest":
            confirmPassword(msg.password);
            break;
    }
}


// Sends data to server
function sendDataToServer(requestType, username) {
    socket.send(JSON.stringify({type: requestType, username: username}));
}


// Requests server to verify login information
function submitUserLogin() {
    let username = document.getElementById("usernameTextBox").value;

    sendDataToServer(requestType = "passwordRequest", username = username);
}


// Checks to see if password recieved from server matches the inputted password
function confirmPassword(realPassword) {
    let password = document.getElementById("passwordTextBox").value;

    if (password == realPassword) {
        successfulLogin();
    } else {
        failedLogin();
    }
}


// Runs if user successfully logs in
function successfulLogin() {
    let username = document.getElementById("usernameTextBox").value;
    localStorage.username = username;
    window.location.href = "..\\homePage\\index.html";
}

// Runs is user enters incorrect password
function failedLogin() {
    document.getElementById("passwordTextBox").value = "";
    document.getElementById("failedLoginMessage").innerHTML = "You have entered an incorrect password or username";
}










socket.onopen = function(event) {
    socket.send(JSON.stringify({type: "testFunction", text: "Hello!"}))
}

let form=document.getElementById("pass");
function submitForm(event){
   event.preventDefault();
}
form.addEventListener('submit', submitForm);