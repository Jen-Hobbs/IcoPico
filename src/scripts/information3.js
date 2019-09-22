console.log('information 3 loading');
//update functions
//update tasklist
function updateTasks(newIDa, newIDb, newIDc) {
    taskListInfo = {
        newIDa,
        newIDb,
        newIDc
    }
}

// Updates/deletes info in the Inventory table
function updateInventory(itemID, updatedQty, type) {
    var existingItem = 0;
    for (var i = 0; i < inventoryInfo.length; i++){
        var obj = inventoryInfo[i];
        if(obj.itemID == itemID)
        {
            existingItem = 1;
            if(updatedQty == 0)
            {
                delete inventoryInfo[i];
            }else {
                inventoryInfo[i].itemQty == updatedQty
            }
        }
    }
    //make new item if it doesn't exist already
    if(existingItem == 0)
    {
        var newItem = {
            itemID: itemID,
            itemQty: updatedQty,
            type: type
        };
        inventoryInfo.push(newItem)
    }
}

// var parameters, check;
function checkNewUser() {
    var user = firebase.auth().currentUser; 
    firebase.database().ref('userlist/' + user.uid + '/playerInfo').once("value",snapshot => {
        if (snapshot.exists()){
            //const userData = snapshot.val();
            //var lastLogin, playerInfo, playerID, emailInfo, playerPetInfo, inventoryInfo, taskListInfo;

            var playerPetInfoRef = firebase.database().ref('userlist/' + user.uid + '/playerPetInfo').once('value').then(function(snapshot) {
                console.log(snapshot.val());
                playerPetInfo = snapshot.val();
                console.log(playerPetInfo);
            });
            console.log(playerPetInfo);
            console.log("returning user");
        } else {
            console.log("new user")
            initNewUser()
        }
    });
}

//make all database members for a new user
function initNewUser() {
    var user = firebase.auth().currentUser;
    //lastLogin =
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
    //updates['lastLogin'] = lastLogin;
    updates['playerInfo'] = playerInfo;
    updates['playerID'] = playerID;
    updates['emailInfo'] = emailInfo;
    updates['playerPetInfo'] = playerPetInfo;
    updates['inventoryInfo'] = inventoryInfo; 
    //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    firebase.database().ref('userlist/' + user.uid + '/').update(updates);

}