
class pethub extends Phaser.Scene{
    constructor(){
        super({key:'Pethub', active: true})
    }
    init(data){
        console.log('init', data);
        this.greetings = data.hi;
        this.check = 0;
        
    }
     preload ()
    {
    this.load.image('backPet', 'testImages/sky.png');
    this.load.image("menuPet", 'testImages/menu.png');
    this.load.image("button", 'testImages/button.png');
    this.load.image("star", 'testImages/star.png');
    this.load.spritesheet('animate', 'testImages/animate.png', {frameWidth: 50, frameHeight: 50});
    console.log('hello world'); //run reloads scene
    }
    
    create ()
    {
    var container = this.add.container(0, 100);
    container.add(this.add.sprite(this.scale.width/2, this.scale.height/2, 'backPet')); 

    // for (var i = 0; i <= 3; i++){
    //     this.add.sprite(this.scale.width/i, this.scale.height/2, 'backPet');
    // }
    // let stars = this.add.group({
    //     key: 'backPet',
    //     repeat: petNumber,
    //     setXY: { x: 12, y: this.scale.height/2, stepX: 800 }
    // }); 
    let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menuPet');    
        menu2.setInteractive();
        menu2.on('pointerdown', ()=> {  
            this.scene.run('ShowMenu'); 
            this.scene.bringToTop('ShowMenu');
        });
        let button = this.add.sprite(this.scale.width*.5, this.scale.height*.5, 'button');
        button.setInteractive();
        button.on('pointerdown', ()=> {
            if(this.check == 0){
                console.log("hi");
                player = this.add.sprite(this.scale.width*.5, this.scale.height*.15, 'animate');
                this.check = 1;
            }
            else{
                this.check = 0;
                player.destroy();
            }
        });
        this.anims.create({
            key: 'swap',
            frames: this.anims.generateFrameNumbers('animate', {start: 0, end: 2}),
            frameRate: 5,
            repeat: 5
        });
    container.addAt([menu2, button], 1);
    }
    update(){
        // if(this.check == 1){
        //     player.anims.play('swap', true);
        //     this.check = 0;
        // }

    }
    }
    
    let petNumber = 3;
    var config = {
    
        parent: 'wrapper',
        scale: {
            //mode: Phaser.Scale.FIT ,
            width: 800,
            height:600,
            type: Phaser.AUTO,
            autoCenter: Phaser.Scale.autoCenter
                   
        },
        scene: [ShowMenu, Shop, Task, Bag, pethub]
        
    };
    
    var game = new Phaser.Game(config);
    var player;
    var display;
    