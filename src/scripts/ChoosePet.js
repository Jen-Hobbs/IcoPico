class ChoosePet extends Phaser.Scene {
    constructor() {
        super({
            key: 'ChoosePet', active: true
        });
    }
    preload(){
         this.load.image("white", "../images/choose/white_circle.png");
         this.load.image("yellow", "../images/choose/yellow_circle.png");
         this.load.image("pet0", "../images/pets/octoboi.png");
         this.load.image("pet1", "../images/pets/shinyboi.png");
         this.load.image("pet2", "../images/pets/dogboi.png");      
    }
    create(){
        this.cameras.main.setBackgroundColor('#65EAA2');
        this.add.text(this.scale.width/2, this.scale.height*.15, "Pick Your Pet", {fontFamily: 'serif', fontSize: 64})
        .setOrigin(.5,.5)
        .setColor('Black');
        for(var i = 0; i < 3; i++){
            this.add.sprite(this.scale.width * (.19 + (.32 * i)), this.scale.height * .5, "white").setScale(.5)
            .setInteractive();
            this.add.sprite(this.scale.width * (.19 + (.32 * i)), this.scale.height * .5, "pet" + i).setScale(.5);
        }
    }
}