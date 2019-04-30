
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
button = this.add.sprite(this.scale.width*.25, this.scale.height*.25, 'button');
button.setInteractive();
button.on('pointerdown', function() {
//launch adds onto current scene
//start gets rid of current scene and adds new scene ontop

    this.scene.start("shop");
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
    scene: [pethub, shop, ShowMenu]
    
};
var game = new Phaser.Game(config);
var background;
var button;
