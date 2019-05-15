//TODO: update time so that new last login is only whole hours so anything below that wont be added.
//TODO: auto update time to change happinees is on the next hour and every hour after that
class Time extends Phaser.Scene {
    constructor(){
        super({key:"Time", active:true});
    }
    preload(){
        
        //this.timer = this.time.addEvent({delay: 5000, callback: this.updateLastLogin, callbackScope:this, loop:true});
    }
    create(){
        console.log(player.lastlogin.getTime());
        this.timeCurrent = new Date();
        console.log(this.timeCurrent.getTime());
        console.log((this.timeCurrent.getTime() - player.lastlogin.getTime())/3600000);
        this.changedTime = (this.timeCurrent.getTime() - player.lastlogin.getTime())/3600000;
        if(this.changedTime >= 1){
            this.updateEmotions();
        }
    }
    updateLastLogin(){
        

    }
    updateEmotions(){
       for(var i = 0; i < playerPets.pet.length; i++){
           console.log("old" + playerPets.pet[i].currentHappiness)
           playerPets.pet[i].currentHappiness -= this.changedTime;
           playerPets.pet[i].currentHunger -= this.changedTime;
           console.log('new' + playerPets.pet[i].currentHappiness);
       }
    }

}