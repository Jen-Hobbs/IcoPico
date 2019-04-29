var config = {

    parent: 'wrapper',
    scale: {
        mode: Phaser.Scale.FIT ,
        width:800,
        height:400,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter
               
    },
    scene: {
        preload: preload,
        create: create
    }
};
var game = new Phaser.Game(config);
var background;
var button;

function preload ()
{
background = this.load.image('sky', 'testImages/sky.png');
this.load.image('button', 'testImages/button.png')
}

function create ()
{


background = this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');    

button = this.add.sprite(this.scale.width/2, this.scale.height/2, 'button');
button.setInteractive();
button.on('pointerdown', () => {this.scene.start("startShop")})

}

function update(){

}