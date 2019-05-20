
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

        this.updateLastLogin();
        this.updateTasks();
        this.updateEmotions();
        this.evolution();
    }
    /**
     * sets changed time for happiness/hunger change in comparison to last login and current time to the nearest 3rd hour
     */
    updateLastLogin() {
        this.timeCurrent = new Date();
        console.log("current time " + this.timeCurrent.getDate());
        console.log('last login ' + player.lastlogin.getDate());
        this.changedTime = (this.timeCurrent.getTime() - player.lastlogin.getTime()) / 10800000;
    }
    /**
     * updates the hunger and happiness of the pet in relation to 3 hours from last login to current updates last login time
     */
    updateEmotions() {
        for (var i = 0; i < playerPets.pet.length; i++) {
            console.log("old" + playerPets.pet[i].currentHappiness);
            console.log("old" + playerPets.pet[i].currentHunger);
            playerPets.pet[i].currentHappiness -= this.changedTime;
            playerPets.pet[i].currentHunger -= this.changedTime;
            //    player.happiness[i] -= this.changedTime; // old version changing happiness
            if (playerPets.pet[i].currentHappiness < 0) {
                playerPets.pet[i].currentHappiness = 0;
            }
            if (playerPets.pet[i].currentHunger < 0) {
                playerPets.pet[i].currentHunger = 0;
            }
            console.log('new' + playerPets.pet[i].currentHappiness);
            console.log("new" + playerPets.pet[i].currentHunger);
        }
        player.lastlogin = this.timeCurrent;
        this.databaseUpdate();
    }
    //add query here to update database of last login, and pets current Happiness current hunger
    databaseUpdate() {

    }
    /**
     * update tasks to 3 if last login before midnight
     */
    updateTasks() {

        if (this.timeCurrent.getDate() != player.lastlogin.getDate()
            || this.timeCurrent.getMonth() != player.lastlogin.getMonth()
            || this.timeCurrent.getFullYear() != player.lastlogin.getFullYear()) {
            while (playerTasks.task.length != 3) {
                newTask = 1;
                playerTasks.task[playerTasks.task.length] = Math.floor(Math.random() * (+10 - +1)) + +1;
                console.log("random value" + playerTasks.task[playerTasks.task.length - 1]);
            }
        }
    }
    evolution() {
        for (var i = 0; i < playerPets.pet.length; i++) {
            if (playerPets.pet[i].petID <= 3) {
                if (playerPets.pet[i].recycling > 10 && Math.random() > 0.7) {
                    playerPets.pet[i].petID += 3;
                }
                if (playerPets.pet[i].recycling > 10 && Math.random() > 0.7) {
                    playerPets.pet[i].petID += 6;
                }
                if (playerPets.pet[i].recycling > 10 && Math.random() > 0.7) {
                    playerPets.pet[i].petID += 9;
                }
            }
        }
    }
}