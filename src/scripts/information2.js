/** OTHERS
  lastLogin: datetime;
**/
var lastLogin;

/** PLAYER TABLE JSON FORMAT
 *{ playerID:,
 *    currency:,
 *    activeItem:,
 *    activePet:,
 *    accountEmail: }
 **/
var playerInfo;
var playerID;
var lastLogin;

/** PLAYERPET TABLE JSON FORMAT
 *[ { currentHappiness: 0
      currentHunger: 0
      petID: 1
      petName: "petA"
      playerID: 1
      playerPetID: 1
      totalHappiness: 0
      totalHunger: 0 } ]
 **/
var playerPetInfo;

/** INVENTORY TABLE JSON FORMAT
   [ { inventoryID: 1
      itemID: 1
      itemQty: 2
      playerID: 1 },
    { inventoryID: 2
      itemID: 2
      itemQty: 4
      playerID: 1 }]
 **/
var inventoryInfo;

/** TASKLIST TABLE JSON FORMAT
 *{ playerID: 1
    taskIDa: 1
    taskIDb: 2
    taskIDc: 3
    taskListID: 1 }
 **/
var taskListInfo;

////////////////////////////////////////////////////////////////////////////////
initGameInfo();

////////////////////////////////////////////////////////////////////////////////
//GETTING FROM database
/*
function initGameInfo() {
  var parameters = new URLSearchParams(window.location.search);
  playerEmail = parameters.get('email');
  getPlayerInfo(playerEmail);
  getPlayerPet();
  getInventory();
  getTasks();
  getLastLogin(playerEmail);
  console.log(playerInfo);
}*/

//initGameInfo();

/** This function grabs the user's initial info before the
 * game starts.
 */

function initGameInfo() {
	var parameters = new URLSearchParams(window.location.search);
	playerEmail = parameters.get('email');

	var check = isNewPlayer('sample1@gmail.com');
	if (check) { // if player is new, call the CREATE functions first.
		console.log("New player!");
		//createAccount(playerEmail);
		//getPlayerInfo(playerInfo);
		//createDefaultInfo();

	} else { // if player is an existing player, call the GET functions
		console.log("Old player!");
		//getPlayerInfo(playerEmail);
	}
	//getPlayerPet();
	//getInventory();
	//getTaskList();
	//console.log(playerInfo);
}





/*********************** GRABBING PLAYER DATA FROM DATABASE
*****
*****/


/** Get info from Player table */
function getPlayerInfo(email) {
	//Ajax call to get info from player table
	$.ajax({
		url: "/getinitialinfo/" + "'" + email + "'",
		dataType: "json",
		port: "8000",
		type: "GET",
		async: false,
		success: function (data) {
			playerInfo = data[0];
			// set playerID
			playerID = playerInfo.playerID;
			lastLogin = data[1];
			console.log(data);
			console.log(playerInfo);
			console.log(playerID);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});

}

/** Get lastLoginInfo from Account table */
function getLastLoginInfo(email) {
	//Ajax call to get info from player table
	$.ajax({
		url: "/getlastlogininfo/" + "'" + email + "'",
		dataType: "json",
		port: "8000",
		type: "GET",
		async: false,
		success: function (data) {
			lastLogin = data[0];
			console.log(data);
			console.log(lastLogin);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});

}


/** Get info from PlayerPet table */
function getPlayerPet() {
	//Ajax call to get info from playerPet table
	$.ajax({
		url: "/getplayerpet/" + "'" + playerID + "'",
		dataType: "json",
		port: "8000",
		type: "GET",
		async: false,
		success: function (data) {
			playerPetInfo = data[0];
			console.log(playerPetInfo);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}

/** Get info from Inventory table */
function getInventory() {
	//Ajax call to get info from Inventory table
	$.ajax({
		url: "/getinventory/" + "'" + playerID + "'",
		dataType: "json",
		port: "8000",
		type: "GET",
		async: false,
		success: function (data) {

			inventoryInfo = data;
			console.log(inventoryInfo);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}
/** Get info from TaskList table */
function getTaskList() {
	//Ajax call to get info from TaskList table
	$.ajax({
		url: "/gettasklist/" + "'" + playerID + "'",
		dataType: "json",
		port: "8000",
		type: "GET",
		async: false,
		success: function (data) {
			taskListInfo = data[0];
			console.log(taskListInfo);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}





/*********************** UPDATING PLAYER DATA
*****
*****/

/** Updates info in the TaskList table */
function updateTaskList(newIDa, newIDb, newIDc) {

	//console.log("updating TaskList using this data:", data);

	//Ajax call to update info in TaskList table
	$.ajax({
		url: "/updatetasklist/" + playerID + "/" + newIDa
			+ "/" + newIDb + "/" + newIDc,
		dataType: "json", // for updating the player's tasklist
		//contentType: 'application/json',
		type: "GET",
		port: "8000",
		async: false,
		success: function (data) {
			taskListInfo = data[0];
			console.log(taskListInfo);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			//console.log("ERROR:", jqXHR, textStatus, errorThrown);
			console.log('error');
		}
	});
}

/** Updates/deletes info in the Inventory table */
function updateInventory(itemID, updatedQty) {

	// if updatedQty is not 0, just update existing row in database
	if (updatedQty != 0 && updatedQty != 1) {
		$.ajax({
			url: "/updateinventory/" + playerID + "/"
				+ itemID + "/" + updatedQty,
			dataType: "json",
			//contentType: 'application/json',
			type: "GET",
			port: "8000",
			async: false,
			success: function (data) {
				inventoryInfo = data;
				console.log(inventoryInfo);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				//console.log("ERROR:", jqXHR, textStatus, errorThrown);
				console.log('error');
			}
		});

		// if updatedQty is 1, we need to insert a new row in the database
	} else if (updatedQty == 1) {

		$.ajax({
			url: "/insertinventory/" + playerID + "/"
				+ itemID,
			dataType: "json",
			//contentType: 'application/json',
			type: "GET",
			port: "8000",
			async: false,
			success: function (data) {
				inventoryInfo = data;
				console.log(inventoryInfo);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				//console.log("ERROR:", jqXHR, textStatus, errorThrown);
				console.log('error');
			}
		});


		// if updatedQty is 0, we need to delete the row from database
	} else {
		$.ajax({
			url: "/deleteinventory/" + playerID + "/" + itemID,
			dataType: "json",
			//contentType: 'application/json',
			type: "GET",
			port: "8000",
			async: false,
			success: function (data) {
				inventoryInfo = data;
				console.log(inventoryInfo);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				//console.log("ERROR:", jqXHR, textStatus, errorThrown);
				console.log('error');
			}
		});
	}
}

/** Update currency (money) */
function updateCurrency(newCurrency) {
	//Ajax call to update currency
	$.ajax({
		url: "/updatecurrency/" + playerID + "/" + newCurrency,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			//playerInfo = JSON.parse(data);
			//data[0] because there will always only be 1 tasklist per email
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}

/** Update currentHappiness */
function updateCurrentHappiness(petID, newHappiness) {
	//Ajax call to update currency
	$.ajax({
		url: "/updatecurrenthappiness/" + playerID + "/" + petID + "/" + newHappiness,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			//playerInfo = JSON.parse(data);
			//data[0] because there will always only be 1 tasklist per email
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}

/** Update currentHunger */
function updateCurrentHunger(petID, newHunger) {
	//Ajax call to update currency
	$.ajax({
		url: "/updatecurrenthunger/" + playerID + "/" + petID + "/" + newHunger,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			//playerInfo = JSON.parse(data);
			//data[0] because there will always only be 1 tasklist per email
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}

/** Update active pet */
function updateActivePet(petID) {
	$.ajax({
		url: "/udpateactivepet" + playerID + "/"
		+ petID,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}

/** Inserts new pet from shop */
function insertNewPlayerPet(petID) {
	$.ajax({
		url: "/insertnewplayerpet" + "/" + playerID + "/" + petID,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}

/** Update lastLogin value */
function updateLastLogin(email, lastLoginInfo) {
	$.ajax({
		url: "/updatelastlogin" + "/" + email + "/" + lastLoginInfo,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}



/*********************** CREATING DEFAULTS FOR A NEW PLAYER
*****
*****/

/** Create a new account for a new player
 * and updates the corresponding player to the database
 */
function createAccount(email) {

	// Creating a new account
	$.ajax({
		url: "/createaccount/" + "'" + email + "'",
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});

	// Creating a new player
	$.ajax({
		url: "/createplayer/" + "'" + email + "'",
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});

}

/** Creates all the default info (inventory, playerpet,
 * tasklist) for a new player.
 * 
 * Precondition: playerID is required for this function to work.
 */
function createDefaultInfo() {

	// Creating default inventory
	$.ajax({
		url: "/createinventory/" + playerID,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});

	// Creating default playerpet
	$.ajax({
		url: "/createplayerpet/" + playerID,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});

	// Creating default task list
	$.ajax({
		url: "/createtasklist/" + playerID,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});

	
}



/**  Checks if the player logging in is a new player or an
 *	existing player by checking if their email is already on
 *	the Account table. 
 *
 * 	Returns true if player is new, and returns false otherwise.
 */

function isNewPlayer(email) {
	
	$.ajax({
		url: "/checkaccount/" + "'" + email + "'",
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) { // player is already existing
			console.log(data);
			return false;
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
			return true;
		}
	});
}
