firebase.auth().onAuthStateChanged(function (user) {
    database.ref("userlist/" + user.uid).update({
        "userName": user.displayName,
        "email": user.email
    });
    if (user) { 
        //var lastLogin, playerInfo, playerID, emailInfo, playerPetInfo, inventoryInfo, taskListInfo;
        console.log("login check");
        checkNewUser();
    }
    else {
        console.log("login error please log in again");
    }
});

// Test Data
let petNum = 1;

// var parameters, check;
function checkNewUser() {
    var user = firebase.auth().currentUser; 
    uid = user.uid;
    firebase.database().ref('userlist/' + user.uid + '/playerInfo').once("value",snapshot => {
        if (snapshot.exists()){
            //const userData = snapshot.val();
            //var lastLogin, playerInfo, playerID, emailInfo, playerPetInfo, inventoryInfo, taskListInfo;

            var playerPetInfoRef = firebase.database().ref('userlist/' + user.uid + '/playerPetInfo').once('value').then(function(snapshot) {
                playerPetInfo = snapshot.val();
            });
            console.log("returning user");

            firebase.database().ref('userlist/' + user.uid + '/lastLogin').once('value').then(function(snapshot) {
                lastLogin = new Date(snapshot.val());
                console.log("initlogin", lastLogin);
                firebase.database().ref('userlist/' + user.uid + '/playerInfo').once('value').then(function(snapshot) {
                    playerInfo = snapshot.val();
                    firebase.database().ref('userlist/' + user.uid + '/emailInfo').once('value').then(function(snapshot) {
                        emailInfo = snapshot.val();
                        firebase.database().ref('userlist/' + user.uid + '/inventoryInfo').once('value').then(function(snapshot) {
                            inventoryInfo = snapshot.val();
                            firebase.database().ref('userlist/' + user.uid + '/taskListInfo').once('value').then(function(snapshot) {
                                taskListInfo = snapshot.val();
                                console.log("sdkfjhsdfj", taskListInfo);
                                startGame();
                            });
                        });
                    });
                });
            });
        } else {
            console.log("new user")
            initNewUser()
        }
    });
}

//make all database members for a new user
function initNewUser() {
    var user = firebase.auth().currentUser;
    lastLogin = new Date();
    playerInfo = {
        playerID: user.email,
        currency: 1000,
        activeItem: 0,
        activePet: 0,
        accountEmail: user.email
    };
    playerID = user.email;
    emailInfo = user.email;
    playerPetInfo = [ 
        {
            currentHappiness: 0,
            currentHunger: 0,
            petID: 1,
            petName: "petA",
            totalHappiness: 0,
            totalHunger: 0,
            recycling: 0,
            utility: 0,
            health:0,
        }
    ];
    inventoryInfo = [
        { 
            itemID: 1,
            itemQty: 2,

        },
        {
            itemID: 2,
            itemQty: 4,
        }
    ];
    taskListInfo = { 
        placeholder: 99999,
        taskIDa: 1,
        taskIDb: 2,
        taskIDc: 3,
    };

    var updates = {};
    updates['lastLogin'] = lastLogin.toISOString();
    updates['playerInfo'] = playerInfo;
    updates['playerID'] = playerID;
    updates['emailInfo'] = emailInfo;
    updates['playerPetInfo'] = playerPetInfo;
    updates['inventoryInfo'] = inventoryInfo; 
    updates['taskListInfo'] = taskListInfo;
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref('userlist/' + user.uid + '/').set(updates);
    startGame();
}

function getUrl(){
    // If the account is new and have to pet
    // window.alert("test");
    if (petNum == 0 ){
        return '../icopicoPet/icopico.html';
    } else{
        return '../icopico/icopico.html';
    }
};


var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          return true;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../icopico/icopico.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};


// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
