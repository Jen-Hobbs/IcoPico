class Rock extends Phaser.Scene {
    constructor(){
        super({key:"Rock", active:false});
    }
    preload(){
        this.load.image('sky', 'testImages/sky.png');
    }

    create(){
        //this.add.image(400, 300, 'shinyboi');
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');
        let text = this.add.text(this.scale.width/2, this.scale.height/2, "Rock - Desktop");
        text.setInteractive();
        text.on('pointerdown', () => {
        this.scene.bringToTop('Potato');
        })
    }
}