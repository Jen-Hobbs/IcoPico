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

function initGameInfo() {
  var parameters = new URLSearchParams(window.location.search);
  playerEmail = parameters.get('email');
  getPlayerInfo(playerEmail);
  getPlayerPet();
  getInventory();
  getTasks();
  getLastLogin(playerEmail);
  console.log(playerInfo);
}

function getLastLogin(email)
{
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
      console.log(playerInfo);
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
      console.log(playerPetInfo);
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
        console.log(inventoryInfo);
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
        console.log(taskListInfo);
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
            console.log(taskListInfo);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          //console.log("ERROR:", jqXHR, textStatus, errorThrown);
          console.log('error');
        }
    });
}

// Updates/deletes info in the Inventory table
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
      console.log(data);
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
      console.log(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });
}

//update currentHunger
function updateCurrentHunger(petID, newHunger)
{
  //Ajax call to update currency
  $.ajax({
    url: "/updatecurrenthappiness/" + playerID + "/" + petID + "/" + newHunger,
    dataType: "json",
    type: "GET",
    async: false,
    success: function(data) {
      //playerInfo = JSON.parse(data);
      //data[0] because there will always only be 1 tasklist per email
      console.log(data);
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

/////////////////////////////////////////////////////////////////
//CREATING DEFAULTS FOR NEW PLAYER
