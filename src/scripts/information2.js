/** PLAYER TABLE JSON FORMAT
 *[ { playerID:,
 *    currency:,
 *    activeItem:,
 *    activePet:,
 *    accountEmail: } ]
 **/
var playerInfo;
var playerID;

/** PLAYERPET TABLE JSON FORMAT
 *[ { playerID:,
 *    currency:,
 *    activeItem:,
 *    activePet:,
 *    accountEmail: } ]
 **/
var playerPetInfo;

/** INVENTORY TABLE JSON FORMAT
 *[ { playerID:,
 *    currency:,
 *    activeItem:,
 *    activePet:,
 *    accountEmail: } ]
 **/
var inventoryInfo;

/** TASKLIST TABLE JSON FORMAT
 *[ { playerID:,
 *    currency:,
 *    activeItem:,
 *    activePet:,
 *    accountEmail: } ]
 **/
var tasklistInfo;


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
			console.log(playerInfo);
			console.log(playerID);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log("ERROR:", jqXHR, textStatus, errorThrown);
		}
	});

	// set playerID
	//playerID = playerInfo.playerID;
	//console.log(playerInfo);
	//console.log(playerID);
}

/*
function setPlayerInfo(data) {
    playerInfo = data;
	playerID = data.playerID;
	console.log(playerInfo);
    
}
*/

//Get info from PlayerPet table
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

//Get info from Inventory table
function getInventory()
{
    //Ajax call to get info from Inventory table
    $.ajax({
      url: "/getinventory/" + "'" + playerID + "'",
      dataType: "json",
      port: "8000",
	  type: "GET",
	  async: false,
      success: function(data) {
        
        inventoryInfo = data;
        console.log(inventoryInfo);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
}
//Get info from TaskList table
function getTaskList()
{
    //Ajax call to get info from playerPet table
    $.ajax({
      url: "/gettasklist/" + "'" + playerID + "'",
      dataType: "json",
      port: "8000",
	  type: "GET",
	  async: false,
      success: function(data) {
        taskListInfo = data[0];
        console.log(taskListInfo);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR:", jqXHR, textStatus, errorThrown);
      }
    });
}
