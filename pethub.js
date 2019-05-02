
class pethub extends Phaser.Scene{
constructor(){
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 691001e... trying to push again
    super({key:'Pethub', active: true})
=======
    super({key:'pethub', active: true})
>>>>>>> parent of 9df190f... Merge pull request #4 from Jen-Hobbs/master
}

 preload ()
{
background = this.load.image('sky', 'testImages/sky.png');
this.load.image('button', 'testImages/button.png')
}
<<<<<<< HEAD

create ()
{


background = this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');    

button = this.add.sprite(this.scale.width/2, this.scale.height/2, 'button');
button.setInteractive();
button.on('pointerdown', () => {this.scene.start("shop")})

=======
    super({key:'pethub', active: true})
=======
    super({key:'Pethub', active: true})
>>>>>>> parent of 1ea7e64... Revert "Merge pull request #4 from Jen-Hobbs/master"
}

 preload ()
{
background = this.load.image('sky', 'testImages/sky.png');
<<<<<<< HEAD
this.load.image('button', 'testImages/button.png')
=======

create ()
{


background = this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');    
let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menu');    
    menu2.setInteractive();
    menu2.on('pointerdown', ()=> {  
        this.scene.launch('ShowMenu');      
    })
>>>>>>> parent of 691001e... trying to push again
=======
this.load.image("menu", 'testImages/menu.png')
>>>>>>> parent of 1ea7e64... Revert "Merge pull request #4 from Jen-Hobbs/master"
}
update(){

<<<<<<< HEAD
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

>>>>>>> parent of cb1994f... Merge branch 'Joanna'
=======
>>>>>>> parent of 691001e... trying to push again
}
}
var config = {

    parent: 'wrapper',
    scale: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        mode: Phaser.Structs.Size.WIDTH_CONTROLS_HEIGHT ,
=======
        mode: Phaser.Scale.FIT ,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of cb1994f... Merge branch 'Joanna'
=======
        mode: Phaser.Structs.Size.WIDTH_CONTROLS_HEIGHT ,
>>>>>>> parent of 691001e... trying to push again
=======
<<<<<<< HEAD
<<<<<<< HEAD
        width:800,
=======
=======
>>>>>>> parent of ff3424e... small changes for size of game
>>>>>>> parent of 92cb29a... fixes
=======
        width:800,
=======
>>>>>>> parent of f61cc72... fk
        width: 800,
>>>>>>> parent of ff3424e... small changes for size of game
=======
        width:800,
>>>>>>> parent of 6856d5b... help
=======
        mode: Phaser.Structs.Size.WIDTH_CONTROLS_HEIGHT ,
        width: 800,
>>>>>>> parent of 1ea7e64... Revert "Merge pull request #4 from Jen-Hobbs/master"
=======
        mode: Phaser.Scale.FIT ,
        width:800,
>>>>>>> parent of 9df190f... Merge pull request #4 from Jen-Hobbs/master
        height:400,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter
               
    },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 691001e... trying to push again
    scene: [pethub, Shop, Task, Bag, ShowMenu]
    
=======
    scene: [pethub, shop]
>>>>>>> parent of cb1994f... Merge branch 'Joanna'
=======
    scene: [pethub, Shop, Task, Bag, ShowMenu]
    
>>>>>>> parent of 1ea7e64... Revert "Merge pull request #4 from Jen-Hobbs/master"
=======
    scene: [pethub, shop]
>>>>>>> parent of 9df190f... Merge pull request #4 from Jen-Hobbs/master
};
var game = new Phaser.Game(config);
var background;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
var button;
<<<<<<< HEAD
=======
var button;
>>>>>>> parent of cb1994f... Merge branch 'Joanna'
=======
>>>>>>> parent of 691001e... trying to push again
=======
var button;
>>>>>>> parent of 1ea7e64... Revert "Merge pull request #4 from Jen-Hobbs/master"
=======
var button;
>>>>>>> parent of 9df190f... Merge pull request #4 from Jen-Hobbs/master
