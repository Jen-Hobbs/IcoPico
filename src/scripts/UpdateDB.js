class UpdateDB extends Phaser.Scene {
  constructor() {
      super({ key: "UpdateDB", active: true })
  }

  preload() {

  }

  create() {
    var emitter = new Phaser.Events.EventEmitter()
      .on("database", hidoesthiswork)
      //.emit("database", "huh", "wot");



  }

  update() {
    var _playerInfo = Object.assign({}, playerInfo);
    var _playerPetInfo = Object.assign({}, playerPetInfo);
    var _inventoryInfo = Object.assign({}, inventoryInfo);
    var _taskListInfo = Object.assign({}, taskListInfo);


    for(key in _playerInfo) {
      if(_playerInfo[key] != playerInfo[key]) {
        console.log("the playerInfo value changed");
      }
    }

    for(key in _playerPetInfo) {
      if(_playerPetInfo[key] != playerPetInfo[key]) {
        console.log("the playerPetInfo value changed");
      }
    }

    for(key in _inventoryInfo) {
      if(_inventoryInfo[key] != inventoryInfo[key]) {
        console.log("the inventoryInfo value changed");
      }
    }

  }
}

function hidoesthiswork(string1, string2) {
  console.log("hi " + string1, + " " + string2);

}
