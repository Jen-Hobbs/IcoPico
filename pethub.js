
class pethub extends Phaser.Scene{
    constructor(){
        super({key:'Pethub', active: true})
    }

    preload ()
    {
        background = this.load.image('sky', 'testImages/sky.png');
        this.load.image('button', 'testImages/button.png')
        this.load.image("menu", 'testImages/menu.png')
    }

    create ()
    {
        background = this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');    
        let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menu');  
            menu2.setInteractive();
            menu2.on('pointerdown', ()=> {
                this.scene.launch('ShowMenu');      
            })
    }

    update(){
        
    }
}

var config = {

    parent: 'wrapper',
    scale: {
        mode: Phaser.Scale.FIT ,
        width:800,
        height:400,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter
               
    },
    scene: [pethub, Shop, Shop2, ShowMenu, Task]
    
};

var game = new Phaser.Game(config);
var background;
var button;


// Game = function()
// {
// 	this._construct();
// }

// Game.prototype = 
// {
// 	_game,
// 	_construct: function()
// 	{
// 		this._game = new Phaser.Game(config);
// 	},
// 	loadDesktopLayout: function()
// 	{
// 		game = new Game(config);
//     },
//     loadMobileLayout: function()
// 	{
// 		game = new Game(config2);
// 	}
// }

// var game = new Game();

//Now you can do this anywhere you want.game.phaserFunction();
