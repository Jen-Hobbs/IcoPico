class shop extends Phaser.Scene {
    constructor(){
        super({key:"shop", active:false});
    }
    preload(){
    }
    create(){
        this.add.text(20, 20, "text");
    }
    
}