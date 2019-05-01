class Shop2 extends Phaser.Scene {
    constructor(){
        super({key:"Shop2", active:false});
    }
    preload(){
        this.load.image("shinyboi", 'testImages/shinyboi.png')
    }
    create(){
        this.add.image(100, 100, 'shinyboi');
        //this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');     
        this.add.text(this.scale.width/2, this.scale.height/2, "shop");

    }
    
}