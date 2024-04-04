const WebSocket = require("ws");
const socket = new WebSocket.Server({port: 8080});


function passwordRequest(ws, user) {
    let data = getDatabase();

    let userData = data.users[user];
    let userPassword = userData.password;

    ws.send(JSON.stringify({type: "passwordRequest", password: userPassword}));
}


function userProfileRequest(ws, user) {
    let data = getDatabase();
    
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

        try {
            switch(msg.type) {
                case "passwordRequest":
                    passwordRequest(ws, msg.username);
                    break;
                case "userProfileRequest":
                    userProfileRequest(ws, msg.username);
                    break;
            }
        } catch (err){
            console.log(err)
        }
    })
})



















function getDatabase() {
    let data = 
    {
        "users": {
            "Chunky": {
                "password": "lukeIsVerySmelly",
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
            },
            "hackstetson2017": {
                "password": "johnbstetson",
                "userProfile": {
                    "fullName": "Daniel Plante",
                    "creditCard": "3003-1944-1230-8080",
                    "birthDate": "03-06-1944",
                    "phoneNumber": "386-822-7553",
                    "email": "dplante@stetson.edu",
                }
            },
            "Lalley": {
                "password": "whatifweusedreversegrip",
                "userProfile": {
                    "fullName": "Luke Alley",
                    "creditCard": "my credit score is so bad they took my credit card",
                    "birthDate": "06-08-2004",
                    "phoneNumber": "700-120-4343",
                    "email": "lalley@stetson.edu",
                }
            },
            "Aristotle": {
                "password": "illegalactivities",
                "userProfile": {
                    "fullName": "Max Conrad",
                    "creditCard": "5000-4000-3000-2000",
                    "birthDate": "02-02-2002",
                    "phoneNumber": "212-666-0901",
                    "email": "mconrad1@stetson.edu",
                }
            },
            "cosplayer": {
                "password": "whyishelikethis",
                "userProfile": {
                    "fullName": "Len Lopez",
                    "creditCard": "2100-3192-1240-5420",
                    "birthDate": "05-03-2005",
                    "phoneNumber": "100-525-1298",
                    "email": "hllopez@stetson.edu",
                }
            }
        }
    }

    return data;
}