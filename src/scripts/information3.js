var user = firebase.auth().currentUser;
var lastLogin, playerInfo, playerID, emailInfo, playerPetInfo, inventoryInfo, taskListInfo;
// var parameters, check;

//check new user
if (user.isNew == null) {
   

}

function writeNewUserData(userId) {
    //make defaults for new user 
    firebase.database().ref('users/' + userId).set({
        lastLogin: datetime /*how to do current date?*/,
        playerInfo:
            {
                playerID: user.email,
                currency: 200,
                activeItem: 0,
                activePet: 0,
                accountEmail: user.email,
            }, 
        playerID: user.email,
        emailInfo: user.email,
        playerPetInfo: 
        [ 
            {
                currentHappiness: 0,
                currentHunger: 0,
                petID: 1,
                petName: "petA",
                playerID: 1,
                playerPetID: 1,
                totalHappiness: 0,
                totalHunger: 0
            }
        ],
        inventoryInfo:
        [
            { 
                inventoryID: 1,
                itemID: 1,
                itemQty: 2,
                playerID: 1
            },
            {
                inventoryID: 2,
                itemID: 2,
                itemQty: 4,
                playerID: 1
            }
        ],
        taskListInfo: ,
        parameters: ,
        check: 
}

function writeUserData(userId) {
    firebase.database().ref
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

if (user !=null) {
  // User is signed in.
  uid = user.uid; 
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid; 

} else {
  // No user is signed in.
  // the person probably accessed the page without logging in first. 
  // might want to add a redirect to the login page
}