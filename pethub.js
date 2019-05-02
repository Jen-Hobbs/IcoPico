
class pethub extends Phaser.Scene{
    constructor(){
        super({key:'Pethub', active: true})
    }
    
     preload ()
    {
    this.load.image('backPet', 'testImages/sky.png');
    this.load.image("menuPet", 'testImages/menu.png');
    }
    
    create ()
    {
     this.add.sprite(this.scale.width/2, this.scale.height/2, 'backPet');    
    let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menuPet');    
        menu2.setInteractive();
        menu2.on('pointerdown', ()=> {  
            this.scene.bringToTop('ShowMenu'); 
        })
    }
    update(){
    
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
        scene: [ShowMenu, Shop, Task, Bag, pethub]
        
    };
    
    var game = new Phaser.Game(config);
    

    