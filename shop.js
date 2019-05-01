class shop extends Phaser.Scene {
    constructor(){
        super({key:"shop", active:false});
    }
    preload(){

        this.load.image("shinyboi", 'testImages/shinyboi.png')
    }
    create(){
        //this.add.image(400, 300, 'shinyboi');
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');     
        this.add.text(this.scale.width/2, this.scale.height/2, "shop");

    }
}