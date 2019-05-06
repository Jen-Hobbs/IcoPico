
class pethub extends Phaser.Scene{
    constructor(){
        super({key:'Pethub', active: true})
    }
    init(data){
        // console.log('init', data);
        // this.greetings = data.hi;
        // this.check = 0;
        
    }
     preload ()
    {
        for(var i = 0; i < information.length; i++){
            this.load.image('pet' + i, 'testImages/' + information[i] + '.png');
        }
        this.load.image('arrow', 'images/buttons/Other/arrow.png');
        this.load.image('backPet', 'testImages/sky.png');
        this.load.image("menuPet", 'images/buttons/Other/menu1.png');
    // this.load.image("button", 'testImages/button.png');
    // this.load.image("star", 'testImages/star.png');
    // this.load.spritesheet('animate', 'testImages/animate.png', {frameWidth: 50, frameHeight: 50});
    // console.log('hello world'); //run reloads scene
    }
    
    create ()
    {
        this.cameras.main.setBounds(0, 0, 800*information.length , 600);
        var pet = [];
        var arrowR = [];
        var arrowL = [];
        
        //create container for all information about pet and Flip between pets
        for(var i = 0; i < information.length; i++){
            var pos = 0;
            
            //right arrow
            arrowR[i] = this.add.sprite(this.scale.width*0.95, this.scale.height/2, 'arrow');
            arrowR[i].setInteractive();
            arrowR[i].on('pointerdown', ()=>{
                var cam = this.cameras.main;
                if(pos < information.length - 1){
                    pos++;
                }
                else{
                    pos = 0;
                }
                cam.centerOn(400 + 800*pos, 0);
            });
            //left arrow
            arrowL[i] = this.add.sprite(this.scale.width*0.05, this.scale.height/2, 'arrow');
            arrowL[i].flipX = !arrowL[i].flipX;
            arrowL[i].setInteractive();
            arrowL[i].on('pointerdown', ()=>{
                var cam = this.cameras.main;
                if(pos == 0){
                    pos = information.length - 1;
                }
                else{
                    pos--;
                }
                cam.centerOn(400 + 800*pos, 0);
            });
            //menu button
            let menu = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menuPet');    
            menu.setInteractive();
            menu.on('pointerdown', ()=> {  
                this.scene.run('ShowMenu'); 
                this.scene.bringToTop('ShowMenu');
            });
            pet[i] = this.add.container(i*800, 0);
            pet[i].add(this.add.sprite(this.scale.width/2, this.scale.height/2, 'backPet')); //background
            pet[i].add(this.add.sprite(this.scale.width/2, this.scale.height/2, 'pet' + i)); //addpet
            pet[i].add(arrowR[i]);
            pet[i].add(arrowL[i]);
            pet[i].add(menu);
        }
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
            mode: Phaser.Scale.FIT ,
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
    