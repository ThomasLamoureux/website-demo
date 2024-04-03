document.getElementById("profileUserText").innerHTML = localStorage.profile + "'s profile";
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
    document.getElementById("profileName").innerHTML = profile.fullName;
    document.getElementById("birthDate").innerHTML = profile.birthDate;
    document.getElementById("phoneNumber").innerHTML = profile.phoneNumber;
    document.getElementById("email").innerHTML = profile.email;
    document.getElementById("paymentMethod").innerHTML = profile.creditCard;
}


function requestProfile() {
    localStorage.username = "Chunky"
    let username = localStorage.username
    socket.send(JSON.stringify({type: "userProfileRequest", username: username}));
}
