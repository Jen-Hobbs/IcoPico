
class pethub extends Phaser.Scene{
constructor(){
<<<<<<< HEAD
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

=======
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

>>>>>>> parent of cb1994f... Merge branch 'Joanna'
}
}
var config = {

    parent: 'wrapper',
    scale: {
<<<<<<< HEAD
        mode: Phaser.Structs.Size.WIDTH_CONTROLS_HEIGHT ,
=======
        mode: Phaser.Scale.FIT ,
>>>>>>> parent of cb1994f... Merge branch 'Joanna'
        width: 800,
        height:400,
        type: Phaser.AUTO,
               
    },
<<<<<<< HEAD
    scene: [pethub, Shop, Task, Bag, ShowMenu]
    
=======
    scene: [pethub, shop]
>>>>>>> parent of cb1994f... Merge branch 'Joanna'
};

var game = new Phaser.Game(config);
var background;
<<<<<<< HEAD
var button;
=======
var button;
>>>>>>> parent of cb1994f... Merge branch 'Joanna'
