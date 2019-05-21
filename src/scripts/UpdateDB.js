class UpdateDB extends Phaser.Scene {
  constructor() {
      super({ key: "UpdateDB", active: true })
  }

  preload() {
  }

  create() {
    // var emitter = new Phaser.Events.EventEmitter()
    //   .on("sampleAjax", clickTaskUpdate)
    //   .emit("sampleAjax", "sample1@gmail.com");
  }

  update() {
    // var _playerInfo = Object.assign({}, playerInfo);
    // var _playerPetInfo = Object.assign({}, playerPetInfo);
    // var _inventoryInfo = Object.assign({}, inventoryInfo);
    // var _taskListInfo = Object.assign({}, taskListInfo);
    //
    //
    // for(key in _playerInfo) {
    //   if(_playerInfo[key] != playerInfo[key]) {
    //     console.log("the playerInfo value changed");
    //   }
    // }
    //
    // for(key in _playerPetInfo) {
    //   if(_playerPetInfo[key] != playerPetInfo[key]) {
    //     console.log("the playerPetInfo value changed");
    //   }
    // }
    //
    // for(key in _inventoryInfo) {
    //   if(_inventoryInfo[key] != inventoryInfo[key]) {
    //     console.log("the inventoryInfo value changed");
    //   }
    // }

  }
}

// function updateTaskList(newIDa, newIDb, newIDc) {
//
//     //console.log("updating TaskList using this data:", data);
//
//     //Ajax call to update info in TaskList table
//     $.ajax({
//         url: "/updatetasklist/" + playerID + "/" + newIDa
//         + "/" + newIDb + "/" + newIDc,
//         dataType: "json", // for updating the player's tasklist
//         //contentType: 'application/json',
//         type: "GET",
//         port: "8000",
//         async: false,
//         success: function(data) {
//             taskListInfo = data[0];
//             console.log(taskListInfo);
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//           //console.log("ERROR:", jqXHR, textStatus, errorThrown);
//           console.log('error');
//         }
//     });
}
