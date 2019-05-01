
class pethub extends Phaser.Scene{
constructor(){
    super({key:'Pethub', active: true})
}

 preload ()
{
background = this.load.image('sky', 'testImages/sky.png');
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
        mode: Phaser.Structs.Size.WIDTH_CONTROLS_HEIGHT ,
        width: 800,
        height:400,
        type: Phaser.AUTO,
               
    },
    scene: [pethub, Shop, Task, Bag, ShowMenu]
    
};

var game = new Phaser.Game(config);
var background;
var button;
