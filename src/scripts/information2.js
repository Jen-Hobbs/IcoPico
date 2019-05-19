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


function getPlayerInfo(email)
{
  //Ajax call to get info from player table
  $.ajax({
    url: "/getinitialinfo/" + "'" + email + "'",
    dataType: "json",
    port: "8000",
    type: "GET",
    success: function(data) {
      //playerInfo = JSON.parse(data);
      playerInfo = data;
      console.log(playerInfo);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("ERROR:", jqXHR, textStatus, errorThrown);
    }
  });

  //set playerID
  playerID = playerInfo.playerID;
  console.log(playerID);
}

function getPlayerPet()
{

}
  //Get info from PlayerPet table

  //Get info from Inventory table

  //Get info from TaskList table
