class shop extends Phaser.Scene {
    constructor(){
        super({key:"shop", active:false});
    }
    preload(){
        this.load.image('sky', 'testImages/sky.png');
    }
    create(){
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');    

        this.add.text(20, 20, "text");
    }
}