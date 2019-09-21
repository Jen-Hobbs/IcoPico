console.log('information 3 loading');
var lastLogin, playerInfo, playerID, emailInfo, playerPetInfo, inventoryInfo, taskListInfo;
// var parameters, check;

//make all database members for a new user
function initNewUser() {
    var user = firebase.auth().currentUser;
    playerInfo = {
        playerID: user.email,
        currency: 200,
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
            playerPetID: 1,
            totalHappiness: 0,
            totalHunger: 0
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
        taskIDa: 1,
        taskIDb: 2,
        taskIDc: 3,
    };

    
    var updates = {};
    updates['playerInfo'] = playerInfo;
    updates['playerID'] = playerID;
    updates['emailInfo'] = emailInfo;
    updates['playerPetInfo'] = playerPetInfo;
    updates['inventoryInfo'] = inventoryInfo; 
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref('userlist/' + user.uid + '/').update(updates);
    
}