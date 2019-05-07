class Rock_m_h extends Phaser.Scene {
    constructor(){
        super({key:"Rock_m_h", active:false});
    }
    preload(){
        this.load.image("shinyboi", 'testImages/shinyboi.png')
    }
    create(){
        //this.add.image(400, 300, 'shinyboi');
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');     
        this.add.text(this.scale.width/2, this.scale.height/2, "Rock - Mobile Horizontal");
    }
    
}