
class Time extends Phaser.Scene {
    constructor() {
        super({ key: "Time", active: true });
    }
    /**
     * timer to update last login to database every 10 min
     */
    preload() {
      //emitter presets
        this.timer = this.time.addEvent({ delay: 600000, callback: this.updateLogin, callbackScope: this, loop: true });
    }
    /**
     * updates last time user logged in on create
     */
    create() {
        this.emitter = new Phaser.Events.EventEmitter()
          .on("taskList", updateTasks)
          .on("inventory", updateInventory)
          .on("currency", updateCurrency)
          .on("happiness", updateCurrentHappiness)
          .on("hunger", updateHunger)
          .on("activePet", updateActivePet)
          .on("newPet", insertNewPlayerPet)
          .on("lastLogin", updateLastLogin);

        console.log('player tasks length' + playerTasks.length);
        this.updateLogin();
        this.setTaskList();
        this.newTask();
        this.updateEmotions();
        this.evolution();
        updateTaskList();
        this.time = this.timeCurrent;
        console.log('player tasks length' + playerTasks.length);
        this.emitter.emit("taskList", taskListInfo.taskIDa, taskListInfo.taskIDb, taskListInfo.taskIDc);
    }
    /**
     * sets changed time for happiness/hunger change in comparison to last login and current time to the nearest 3rd hour
     */
    updateLogin() {
        var emitter = new Phaser.Events.EventEmitter()
          .on("lastLogin", updateLastLogin);

        this.timeCurrent = new Date();
        emitter.emit("lastLogin", "sample1@gmail.com", this.timeCurrent.toISOString().slice(0, 19).replace('T', ' '));
        //console.log("current time " + this.timeCurrent.getDate());
        console.log('last login ' + lastLogin.lastLogin);
        this.time = new Date(lastLogin.lastLogin);
        this.changedTime = (this.timeCurrent.getTime() - this.time.getTime()) / 10800000;
        console.log(this.changedTime);
    }
    /**
     * updates the hunger and happiness of the pet in relation to 3 hours from last login to current updates last login time
     */
    updateEmotions() {
        for (var i = 0; i < playerPetInfo.length; i++) {
            console.log("old happiness" + playerPetInfo[i].currentHappiness);
            console.log("old hunger" + playerPetInfo[i].currentHunger);
            playerPetInfo[i].currentHappiness -= this.changedTime;
            playerPetInfo[i].currentHunger -= this.changedTime;
            //
            //happiness hunger updated
            //
            //    player.happiness[i] -= this.changedTime; // old version changing happiness
            if (playerPetInfo[i].currentHappiness < 0) {
                playerPetInfo[i].currentHappiness = 0;
            }
            if (playerPetInfo[i].currentHunger < 0) {
                playerPetInfo[i].currentHunger = 0;
            }
            console.log('new happiness' + playerPetInfo[i].currentHappiness);
            console.log("new hunger" + playerPetInfo[i].currentHunger);
            this.emitter.emit("happiness", playerPetInfo[i].petID, playerPetInfo[i].currentHappiness);
            this.emitter.emit("hunger", playerPetInfo[i].petID, playerPetInfo[i].currentHunger);
        }



    }
     /**
     * change tasklist to array
     */
    setTaskList(){
        console.log('tasklist')
        console.log(taskListInfo);
        if(taskListInfo.taskIDa != null){
            console.log('a added');
            playerTasks.push(taskListInfo.taskIDa);
        }
        if(taskListInfo.taskIDb != null){
            console.log('b added');
            playerTasks.push(taskListInfo.taskIDb);
        }
        if(taskListInfo.taskIDc != null){
            console.log('c added' + taskListInfo.taskIDc);
            playerTasks.push(taskListInfo.taskIDc);
        }
        console.log(playerTasks);
    }
    /**
     * update tasks to 3 if last login before midnight
     */
    newTask() {
        console.log('new task');
        if (this.timeCurrent.getDate() != this.time.getDate()
            || this.timeCurrent.getMonth() != this.time.getMonth()
            || this.timeCurrent.getFullYear() != this.time.getFullYear()) {
                console.log('time out of synch');
            while (playerTasks.length != 3) {
                newTask = 1;
                playerTasks[playerTasks.length] = Math.floor(Math.random() * (+10 - +1)) + +1;
                console.log("random value" + playerTasks[playerTasks.length - 1]);
            }
        }
    }
    /**
     * chance of evolving pet
     * need to save evolution
     */
    evolution() {
        for (var i = 0; i < playerPetInfo.length; i++) {
            if (playerPetInfo[i].petID <= 3) {
                if (playerPetInfo[i].recycling > 10 && Math.random() > 0.7) {
                    playerPetInfo[i].petID += 3;
                }
                if (playerPetInfo[i].utility > 10 && Math.random() > 0.7) {
                    playerPetInfo[i].petID += 6;
                }
                if (playerPetInfo[i].health > 10 && Math.random() > 0.7) {
                    playerPetInfo[i].petID += 9;
                }
            }

        }
        //
        //evolution updated
        //
        //
    }
}
