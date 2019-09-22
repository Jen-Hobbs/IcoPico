console.log('information 2 loading');
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
var emailInfo;
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
var parameters;
var check;
////////////////////////////////////////////////////////////////////////////////
checkNewPlayer();
////////////////////////////////////////////////////////////////////////////////
//GETTING FROM database

//check for new player
function checkNewPlayer() {
  parameters = new URLSearchParams(window.location.search);
  playerEmail = parameters.get('email');
  isNewPlayer(playerEmail);
  if(check == true) {
    console.log("new player");
    initNewPlayer();
  } else {
    console.log("returning player");
  }
  initGameInfo();
}

//add new entries in database for new player
function initNewPlayer() {
  createAccount(playerEmail);
  getPlayerInfo(playerEmail);
  createDefaultInfo();
  //add iitems 2 and 3

  //createDefaultInfo();
}

//fetch game info
function initGameInfo() {
  parameters = new URLSearchParams(window.location.search);
  playerEmail = parameters.get('email');
  getPlayerInfo(playerEmail);
  getPlayerPet();
  getInventory();
  getTasks();
  getLastLogin(playerEmail);
//  console.log(playerInfo);
}

function getLastLogin(email)
{
  emailInfo = email;
  //Ajax call to get lastLogin from  table
  $.ajax({
    url: "/getlastlogin/" + "'" + email + "'",
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 playerInfo per email
      lastLogin = data[0];
      console.log("lastLogin");
      console.log(lastLogin);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}

function getPlayerInfo(email)
{
  //Ajax call to get info from player table
  $.ajax({
    url: "/getinitialinfo/" + "'" + email + "'",
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 playerInfo per email
      playerInfo = data[0];
      playerID = playerInfo.playerID;
//      console.log(playerInfo);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}

  //Get info from PlayerPet table
function getPlayerPet()
{
  //Ajax call to get info from playerPet table
  $.ajax({
    url: "/getplayerpetinfo/" + "'" + playerID + "'",
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      playerPetInfo = data;
//      console.log(playerPetInfo);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}
  //Get info from Inventory table
function getInventory()
{
    //Ajax call to get info from Inventory table
    $.ajax({
      url: "/getinventoryinfo/" + "'" + playerID + "'",
      dataType: "json",
      type: "GET",
      async: false,
      success: function(data) {
        //playerInfo = JSON.parse(data);
        inventoryInfo = data;
//        console.log(inventoryInfo);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
}
  //Get info from TaskList table
function getTasks()
{
    //Ajax call to get info from TaskList table
    $.ajax({
      url: "/gettasklistinfo/" + "'" + playerID + "'",
      dataType: "json",
      type: "GET",
      async: false,
      success: function(data) {
        //playerInfo = JSON.parse(data);
        //data[0] because there will always only be 1 tasklist per email
        taskListInfo = data[0];
//        console.log(taskListInfo);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
}

////////////////////////////////////////////////////////////////////////////////
//UPDATING TO DATABASE

//update tasklist
function updateTasks(newIDa, newIDb, newIDc) {

    //console.log("updating TaskList using this data:", data);

    //Ajax call to update info in TaskList table
    $.ajax({
        url: "/updatetasklist/" + playerID + "/" + newIDa
        + "/" + newIDb + "/" + newIDc,
        dataType: "json", // for updating the player's tasklist
        //contentType: 'application/json',
        type: "GET",
        async: false,
        success: function(data) {
            taskListInfo = data[0];
//            console.log(taskListInfo);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          //console.log("ERROR:", jqXHR, textStatus, errorThrown);
          console.log('error');
        }
    });
}


/** Updates/deletes info in the Inventory table */

function updateInventory(itemID, updatedQty) {
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
//          console.log(inventoryInfo);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          //console.log("ERROR:", jqXHR, textStatus, errorThrown);
          console.log('error');
      }
  });
}

//update currency (money)
function updateCurrency(newCurrency)
{
  //Ajax call to update currency
  $.ajax({
    url: "/updatecurrency/" + playerID + "/" + newCurrency,
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 tasklist per email
//      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}
//update recycling
function updateRecycling(petID, newRecycling){
  $.ajax({
    url: "/updatecurrentrecycling/" + playerID + "/" + petID + "/" + newRecycling,
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 tasklist per email
//      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}
//update health
function updateHealth(petID, newHealth){
  $.ajax({
    url: "/updatecurrenthealth/" + playerID + "/" + petID + "/" + newHealth,
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 tasklist per email
//      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}
//update utility
function updateUtility(petID, newUtility){
  $.ajax({
    url: "/updatecurrentutility/" + playerID + "/" + petID + "/" + newUtility,
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 tasklist per email
//      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}
//update currentHappiness
function updateCurrentHappiness(petID, newHappiness)
{
  //Ajax call to update currency
  $.ajax({
    url: "/updatecurrenthappiness/" + playerID + "/" + petID + "/" + newHappiness,
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 tasklist per email
//      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}

//update currentHunger
function updateHung(petID, newHunger)
{
  //Ajax call to update currency
  $.ajax({
    url: "/updatecurrenthunger/" + playerID + "/" + petID + "/" + newHunger,
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 tasklist per email
//      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
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
//			console.log(data);
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
//			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
}

/** Update lastLogin value */
function updateLastLogin(lastLoginInfo) {
  $.ajax({
      url: "/updatelastlogin" + '/"' + emailInfo + '"/' + '"' + lastLoginInfo + '"',
      dataType: "json",
      type: "GET",
      async: false,
      success: function (data) {
        console.log("ajax last login sent");
        console.log(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
  });
}
/////////////////////////////////////////////////////////////////
//CREATING DEFAULTS FOR NEW PLAYER
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
//			console.log(data);
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
//			console.log(data);
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
  //item1
	$.ajax({
		url: "/createinventory/" + playerID + "/" + 1,
		dataType: "json",
		type: "GET",
		async: false,
		success: function (data) {
//			console.log(data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});
  //item2
  $.ajax({
    url: "/createinventory/" + playerID + "/" + 2,
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
//      console.log(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });

  //item2
  $.ajax({
    url: "/createinventory/" + playerID + "/" + 2,
    dataType: "json",
    type: "GET",
    async: false,
    success: function (data) {
//      console.log(data);
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
//			console.log(data);
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
//			console.log(data);
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
//             console.log(data[0]);

             if (data[0] == undefined) { // no data returned, meaning player is new
                 check = true;
             }
             else {    // there is data returned, and player is not new
                 check = false;
             }
         },
         error: function (jqXHR, textStatus, errorThrown) {
             console.log("ERROR:", jqXHR, textStatus, errorThrown);
         }
     });
 }