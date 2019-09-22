console.log('information 3 loading');
//update functions
//update tasklist
var lastLogin, playerInfo, playerID, emailInfo, playerPetInfo, inventoryInfo, taskListInfo;
var uid; 

function updateTasks(newIDa, newIDb, newIDc) {
    taskListInfo = {
        newIDa,
        newIDb,
        newIDc
    }
    firebase.database().ref('userlist/' + uid + '/taskLisInfo').update(taskListInfo);
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

    firebase.database().ref('userlist/' + uid + '/inventoryInfo').update(inventoryInfo);
}

//update currency (money)
function updateCurrency(newCurrency) {
    playerInfo.currency = newCurrency;
    firebase.database().ref('userlist/' + uid + '/playerInfo').update(playerInfo);
}

//update recycling
function updateRecycling(petID, newRecycling){
    for (var i = 0; i < playerPetInfo.length; i++){
        var obj = playerPetInfo[i];
        if(obj.petID == petID)
        {
            playerPetInfo[i].recycling = newRecycling; 
        }
    }
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').update(playerPetInfo);
}

//update health
function updateHealth(petID, newHealth){
    for (var i = 0; i < playerPetInfo.length; i++){
        var obj = playerPetInfo[i];
        if(obj.petID == petID)
        {
            playerPetInfo[i].health = newHealth; 
        }
    }
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').update(playerPetInfo);
}

//update utility
function updateUtility(petID, newUtility){
    for (var i = 0; i < playerPetInfo.length; i++){
        var obj = playerPetInfo[i];
        if(obj.petID == petID)
        {
            playerPetInfo[i].utility = newUtility; 
        }
    }
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').update(playerPetInfo);
}

//update currentHappiness
function updateCurrentHappiness(petID, newHappiness) {
    for (var i = 0; i < playerPetInfo.length; i++){
        var obj = playerPetInfo[i];
        if(obj.petID == petID)
        {
            playerPetInfo[i].currentHappiness = newHappiness; 
        }
    }
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').update(playerPetInfo);
}

//update currentHunger
function updateHung(petID, newHunger) {
    for (var i = 0; i < playerPetInfo.length; i++){
        var obj = playerPetInfo[i];
        if(obj.petID == petID)
        {
            playerPetInfo[i].currentHunger = newHunger; 
        }
    }
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').update(playerPetInfo);
}

/** Update active pet */
function updateActivePet(petID) {
    playerInfo.activePet = petID;
    firebase.database().ref('userlist/' + uid + '/playerInfo').update(playerInfo);

}

/** Inserts new pet from shop */
function insertNewPlayerPet(petID) {
    newPetID = playerPetInfo.length + 1;
    var newPet = {        
        currentHappiness: 0,
        currentHunger: 0,
        petID: newPetID,
        petName: null,
        totalHappiness: 0,
        totalHunger: 0
    }
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').update(playerPetInfo);
}

/** Update lastLogin value */
function updateLastLogin(lastLoginInfo) {
    lastLogin = lastLoginInfo;
    console.log(lastLogin);
    firebase.database().ref('userlist/' + uid + '/lastLogin').update(lastLogin);
}


