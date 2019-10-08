console.log('information 3 loading');
//update functions
//update tasklist
var lastLogin, playerInfo, playerID, emailInfo, playerPetInfo, inventoryInfo, taskListInfo;
var uid; 

function updateTasks(newIDa, newIDb, newIDc) {
    // taskListInfo = {
    //     newIDa,
    //     newIDb,
    //     newIDc
    // }
    firebase.database().ref('userlist/' + uid + '/taskListInfo').set(taskListInfo);
}
function updateCurrentEvoluion() {
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').set(playerPetInfo);
}
// Updates/deletes info in the Inventory table
function updateInventory(itemID, updatedQty) {
    // var isExisting = 0;

    // //item exists already, and new quantity isnt 0
    // for(var j = 0; j < inventoryInfo.length; j++)
    // {
    //     var obj = inventoryInfo[j];
    //     if(obj.itemID == itemID)
    //     {
    //         isExisting = 1;
    //         inventoryInfo[j].itemQty = updatedQty;
    //     }
    // }
    // //item doesn't already exist
    // if(isExisting == 0)
    // {
    //     var newItem = {
    //         itemID: itemID,
    //         itemQty: updatedQty
    //     };
    //     inventoryInfo.push(newItem)
    // }
    firebase.database().ref('userlist/' + uid + '/inventoryInfo').set(inventoryInfo);
}

//update currency (money)
function updateCurrency(newCurrency) {
    playerInfo.currency = newCurrency;
    firebase.database().ref('userlist/' + uid + '/playerInfo').set(playerInfo);
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
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').set(playerPetInfo);
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
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').set(playerPetInfo);
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
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').set(playerPetInfo);
}

//update currentHappiness
function updateCurrentHappiness(petID, newHappiness) {
    // for (var i = 0; i < playerPetInfo.length; i++){
    //     var obj = playerPetInfo[i];
    //     if(obj.petID == petID)
    //     {
    //         playerPetInfo[i].currentHappiness = newHappiness; 
    //     }
    // }
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').set(playerPetInfo);
}

//update currentHunger
function updateHung(petID, newHunger) {
    // for (var i = 0; i < playerPetInfo.length; i++){
    //     var obj = playerPetInfo[i];
    //     if(obj.petID == petID)
    //     {
    //         playerPetInfo[i].currentHunger = newHunger; 
    //     }
    // }
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').set(playerPetInfo);
}

/** Update active pet */
function updateActivePet(petID) {
    playerInfo.activePet = petID;
    firebase.database().ref('userlist/' + uid + '/playerInfo').set(playerInfo);

}
/** Inserts new pet from shop */
function insertNewPlayerPet(petID) {
    // petIndex = playerPetInfo.length;
    // var newPet = {        
    //     currentHappiness: 0,
    //     currentHunger: 0,
    //     petID: 1,
    //     petIndex: petIndex,
    //     petName: "petA",
    //     totalHappiness: 0,
    //     totalHunger: 0,
    //     recycling: 0,
    //     utility: 0,
    //     health:0,
    // }

    // playerPetInfo.push(newPet);
    firebase.database().ref('userlist/' + uid + '/playerPetInfo').set(playerPetInfo);
}

/** Update lastLogin value */
function updateLastLogin(lastLoginInfo) {
    lastLogin = new Date();
    firebase.database().ref('userlist/' + uid + '/lastLogin').set(lastLogin.toISOString());
}


