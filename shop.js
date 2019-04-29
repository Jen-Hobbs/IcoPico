class shop extends Phaser.Scene {
    constructor(){
        super("startShop");
    }
    preload(){
        this.load.image('sky', 'testImages/sky.png');
    }
    create(){
        this.add.text(20, 20, "text");
    }
}