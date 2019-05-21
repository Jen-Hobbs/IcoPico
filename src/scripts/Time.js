
class Time extends Phaser.Scene {
    constructor() {
        super({ key: "Time", active: true });
    }
    /**
     * timer to update last login to database every 10 min
     */
    preload() {
        this.timer = this.time.addEvent({ delay: 600000, callback: this.updateLastLogin, callbackScope: this, loop: true });
    }
    /**
     * updates last time user logged in on create
     */
    create() {
        console.log('player tasks length' + playerTasks.length);
        this.updateLastLogin();
        this.setTaskList();
        this.updateTasks();
        this.updateEmotions(); 
        this.evolution();
        updateTaskList();
        console.log('player tasks length' + playerTasks.length);
    }
    /**
     * sets changed time for happiness/hunger change in comparison to last login and current time to the nearest 3rd hour
     */
    updateLastLogin() {
        this.timeCurrent = new Date();
        console.log("current time " + this.timeCurrent.getDate());
        console.log('last login ' + lastLogin.getDate());
        this.changedTime = (this.timeCurrent.getTime() - lastLogin.getTime()) / 10800000;
    }
    /**
     * updates the hunger and happiness of the pet in relation to 3 hours from last login to current updates last login time
     */
    updateEmotions() {
        for (var i = 0; i < playerPetInfo.length; i++) {
            console.log("old" + playerPetInfo[i].currentHappiness);
            console.log("old" + playerPetInfo[i].currentHunger);
            playerPetInfo[i].currentHappiness -= this.changedTime;
            playerPetInfo[i].currentHunger -= this.changedTime;
            //    player.happiness[i] -= this.changedTime; // old version changing happiness
            if (playerPetInfo[i].currentHappiness < 0) {
                playerPetInfo[i].currentHappiness = 0;
            }
            if (playerPetInfo[i].currentHunger < 0) {
                playerPetInfo[i].currentHunger = 0;
            }
            console.log('new' + playerPetInfo[i].currentHappiness);
            console.log("new" + playerPetInfo[i].currentHunger);
        }
        lastLogin = this.timeCurrent;
    }
    /**
     * change tasklist to array
     */
    setTaskList(){
        if(tasklistInfo[0].taskIDa != null){
            console.log('a added');
            playerTasks.push(tasklistInfo[0].taskIDa);
        }
        if(tasklistInfo[0].taskIDb != null){
            console.log('b added');
            playerTasks.push(tasklistInfo[0].taskIDb);
        }
        if(tasklistInfo[0].taskIDc != null){
            console.log('c added' + tasklistInfo[0].taskIDc);
            playerTasks.push(tasklistInfo[0].taskIDc);
        }
    }
    /**
     * update tasks to 3 if last login before midnight
     */
    updateTasks() {

        if (this.timeCurrent.getDate() != lastLogin.getDate()
            || this.timeCurrent.getMonth() != lastLogin.getMonth()
            || this.timeCurrent.getFullYear() != lastLogin.getFullYear()) {
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
    }
}