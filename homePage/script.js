const socket = new WebSocket("ws://localhost:8080");

socket.onmessage = function(event) {
    let msg = JSON.parse(event.data);
    console.log(msg)
    switch(msg.type) {
        case "profileData":
            setProfile(msg.profile)
            break;
    }
}


socket.onopen = function(event) {
    requestProfile(localStorage.username)
}



function setProfile(profile) {
    document.getElementById("profileUserText").innerHTML = localStorage.username + "'s profile"
    document.getElementById("profileName").innerHTML = "Name: " + profile.fullName;
    document.getElementById("birthDate").innerHTML = "DoB: " + profile.birthDate;
    document.getElementById("phoneNumber").innerHTML = "Phone: " + profile.phoneNumber;
    document.getElementById("email").innerHTML = "Email: " + profile.email;
    document.getElementById("paymentMethod").innerHTML = "Card: " + profile.creditCard;
}


function requestProfile() {
    let username = localStorage.username
    socket.send(JSON.stringify({type: "userProfileRequest", username: username}));
}
