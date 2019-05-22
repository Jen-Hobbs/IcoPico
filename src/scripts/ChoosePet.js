class ChoosePet extends Phaser.Scene {
    constructor() {
        super({
            key: 'ChoosePet', active: true
        });
    }
    preload(){
         this.load.image("white", "../images/choose/white_circle.png");
         this.load.image("yellow", "../images/choose/yellow_circle.png");
         this.load.image("petNum2", "../images/pets/octoboi.png");
         this.load.image("petNum0", "../images/pets/shinyboi.png");
         this.load.image("petNum1", "../images/pets/dogboi.png");   
         this.load.image('select', "../images/choose/green_button.png");   
    }
    create(){
        this.selected;
        this.number = 0;
        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);
        this.cameras.main.setBackgroundColor('#c4ffeb');
        this.add.text(this.scale.width/2, this.scale.height*.15, "Pick Your Pet", {fontFamily: 'serif', fontSize: 64})
        .setOrigin(.5,.5)
        .setColor('Black');
        this.pet = [];
        for(var i = 0; i < 3; i++){
            this.pet[i] = this.add.sprite(this.scale.width * (.19 + (.32 * i)), this.scale.height * .5, "white").setScale(.5);
            this.pet[i].setInteractive();
            this.pet[i].name = i;
            this.pet[i].on('clicked', this.selected, this);
            this.add.sprite(this.scale.width * (.19 + (.32 * i)), this.scale.height * .5, "petNum" + i).setScale(.5).setDepth(1);
        }
        
    }
    selected(info){
        console.log(info.name);
        if(this.number != 0){
            this.selected.destroy();
        }
        this.selected = this.add.sprite(this.scale.width * (.19 + (.32 * info.name)), this.scale.height * .5, "yellow").setScale(.5);
        this.selected.name = info.name;
        this.number++;

        this.add.sprite(this.scale.width * .5, this.scale.height * .9, "select")
        .setInteractive()
        .on('pointerdown', ()=>{
            var newPet = new Object();
            //missing playerPetID
            //no way to set petname
            console.log("pet id" + this.selected.name)
            newPet.petID = this.selected.name;
            newPet.currentHappiness = 50;
            newPet.currentHunger = 50;
            newPet.petName = 'empty';
            newPet.playerID = playerInfo;
            newPet.totalHappiness = 0;
            newPet.totalHunger = 0;
            newPet.recycling = 0;
            newPet.utility = 0;
            newPet.health = 0;
            playerPetInfo.push(newPet);
            this.scene.stop('ChoosePet');
            this.scene.start('Pethub');
            this.scene.start('PethubOverlay');
            console.log(playerPetInfo);
            
        });

        this.add.text(this.scale.width * .455, this.scale.height * .87, "Select", {fontFamily: 'serif', fontSize: 32}).setColor('black');
    }
}