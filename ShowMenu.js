class ShowMenu extends Phaser.Scene {
    constructor(){
        super({key:"ShowMenu", active:false});
    }
    create(){
        let graphics = this.add.graphics();
        graphics.fillStyle(0X800000,1).fillRect(0,0,75, this.scale.height);
        let menu = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menu');
        menu.setInteractive();
        menu.on('pointerdown', () => {
           this.scene.stop('ShowMenu');
        })
    }
    update(){

    }
}