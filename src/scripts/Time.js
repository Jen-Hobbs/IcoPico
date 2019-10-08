
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
        console.log('time loading');
        this.emitter = new Phaser.Events.EventEmitter()
          .on("taskList", updateTasks)
          .on("inventory", updateInventory)
          .on("currency", updateCurrency)
          .on("happiness", updateCurrentHappiness)
          .on("hunger", updateHung)
          .on("activePet", updateActivePet)
          .on("newPet", insertNewPlayerPet)
          .on("lastLogin", updateLastLogin)
          .on("evolution", updateCurrentEvoluion);
        this.updateLogin();
        this.setTaskList();
        this.newTask();
        this.updateEmotions();
        this.evolution();
        updateTaskList();
        this.time = this.timeCurrent;
        this.emitter.emit("taskList", taskListInfo.taskIDa, taskListInfo.taskIDb, taskListInfo.taskIDc);
    }
    /**
     * sets changed time for happiness/hunger change in comparison to last login and current time to the nearest 3rd hour
     */
    updateLogin() {
        
        var emitter = new Phaser.Events.EventEmitter()
          .on("lastLogin", updateLastLogin);
        this.timeCurrent = new Date();
        this.time = lastLogin;
        console.log(this.time);
        console.log(this.timeCurrent);
        this.changedTime = (this.timeCurrent.getTime() - this.time.getTime()) / 10800000;
        console.log("changedtime", this.changedTime);
        emitter.emit("lastLogin", this.timeCurrent); //change to be on specific email
    }
    /**
     * updates the hunger and happiness of the pet in relation to 3 hours from last login to current updates last login time
     */
    updateEmotions() {
        for (var i = 0; i < playerPetInfo.length; i++) {
            console.log("old happiness" + playerPetInfo[i].currentHappiness);
            console.log("old hunger" + playerPetInfo[i].currentHunger);
            console.log(this.changedTime);
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
            playerTasks.push(taskListInfo.taskIDa);
        }
        if(taskListInfo.taskIDb != null){
            playerTasks.push(taskListInfo.taskIDb);
        }
        if(taskListInfo.taskIDc != null){
            playerTasks.push(taskListInfo.taskIDc);
        }
        console.log(playerTasks);
    }
    /**
     * update tasks to 3 if last login before midnight
     * TODO: Make sure you dont get the same task maybe add in a probability to tasks? (done through hard coded task list)
     */
    newTask() {
        if (this.timeCurrent.getDate() != this.time.getDate()
            || this.timeCurrent.getMonth() != this.time.getMonth()
            || this.timeCurrent.getFullYear() != this.time.getFullYear()) {
            while (playerTasks.length != 3) {
                var determineTask = Math.floor(Math.random() * (+10 - +1)) + +1; //make dynamic
                for(var i = 0; i < playerTasks.length; i++){
                    if(determineTask == playerTasks[i]){
                        i= 0;
                        determineTask = Math.floor(Math.random() * (+10 - +1)) + +1; //make dynamic
                    }
                }
                playerTasks[playerTasks.length] = determineTask
            }
        }
    }
    /**
     * chance of evolving pet
     * need to save evolution
     */
    evolution() {
        for (var i = 0; i < playerPetInfo.length; i++) {
            console.log("pet recycling complete" + playerPetInfo[i].recycling);
            if (playerPetInfo[i].petID <= 3 && Math.random() > 0.7) {
                if (playerPetInfo[i].recycling > 10) {
                    playerPetInfo[i].petID += 3;
                }
                if (playerPetInfo[i].utility > 10 && Math.random() > 0.7) {
                    playerPetInfo[i].petID += 6;
                }
                if (playerPetInfo[i].health > 10 && Math.random() > 0.7) {
                    playerPetInfo[i].petID += 9;
                }
            }
            console.log("testing evolution");
            console.log(playerPetInfo);
            
        }
        this.emitter.emit("evolution");


        //
        //evolution updated
        //
        //
    }
}
