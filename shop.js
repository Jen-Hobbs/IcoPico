class Shop extends Phaser.Scene {
    constructor(){
        super({key:"Shop", active:false});
    }
    preload(){
    }
    create(){
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');     
        this.add.text(this.scale.width/2, this.scale.height/2, "shop");

    }
    
}