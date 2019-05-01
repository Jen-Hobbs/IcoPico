
class pethub extends Phaser.Scene{
constructor(){
    super({key:'pethub', active: true})
}

 preload ()
{
background = this.load.image('sky', 'testImages/sky.png');
this.load.image('button', 'testImages/button.png')
}

create ()
{


background = this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');    

button = this.add.sprite(this.scale.width/2, this.scale.height/2, 'button');
button.setInteractive();
button.on('pointerdown', () => {this.scene.start("shop")})

}
}
var config = {

    parent: 'wrapper',
    scale: {
        mode: Phaser.Scale.FIT ,
        width: 800,
        height:400,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter
               
    },
    scene: [pethub, shop]
};
var game = new Phaser.Game(config);
var background;
var button;