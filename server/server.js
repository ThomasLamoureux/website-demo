const WebSocket = require("ws");
const socket = new WebSocket.Server({port: 8080});


function passwordRequest(ws, user) {
    let data = getData();

    let userData = data.users[user];
    let userPassword = userData.password;

    ws.send(JSON.stringify({type: "passwordRequest", password: userPassword}));
}


function userProfileRequest(ws, user) {
    let data = getData();
    
    let userData = data.users[user];
    console.log(user)
    console.log(data)
    console.log(userData)
    let userProfile = userData.userProfile;

    ws.send(JSON.stringify({type: "profileData", profile: userProfile}))
}


socket.on("connection", ws => {
    console.log("connected")

    ws.on("message", event => {
        let msg = JSON.parse(event);
        console.log("hi")
        try {
            switch(msg.type) {
                case "passwordRequest":
                    passwordRequest(ws, msg.username);
                    break;
                case "userProfileRequest":
                    userProfileRequest(ws, msg.username);
                    break;
                case "successfulLogin":

            }
        } catch (err){
            console.log(err)
        }
    })
})

/*socket.onmessage = function(event) {
    var msg = JSON.parse(event.data);
    switch(msg.type) {
      case "passwordRequest":
        ws.send(JSON.stringify({event: "password", text: "tea"}));
        console.log(msg.text);
        ws.send()
        break;
    }
};*/











function getData() {
    let data = 
    {
        "users": {
            "Chunky": {
                "password": "lukeSmellsLikeSh#t",
                "userProfile": {
                    "fullName": "Thomas Lamoureux",
                    "creditCard": "8008-9990-5425-1234",
                    "birthDate": "06-27-2005",
                    "phoneNumber": "386-999-1234",
                    "email": "tlamoureux@stetson.edu",
                }
            },
            "kanakara": {
                "password": "sussybaka",
                "userProfile": {
                    "fullName": "Bridget Wexler",
                    "creditCard": "7007-4444-1643-9999",
                    "birthDate": "12-15-2004",
                    "phoneNumber": "387-009-9999",
                    "email": "bwexler@stetson.edu",
                }
            }
        }
    }

    return data;
}