
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
        this.load.image('arrow', 'images/icons/arrow.png');
        this.load.image('backPet', 'testImages/sky.png');
        this.load.image("menuPet", 'images/icons/menu1.png');
        this.load.image('blackHeart', 'images/icons/black_heart.png');
        this.load.image('yellowHeart', 'images/icons/yellow_heart.png');
        this.load.image('redHeart', 'images/icons/red_heart.png');

    }
    
    create ()
    {
        this.cameras.main.setBounds(0, 0, 1236*information.length , 681);
        this.cameras.main.setBackgroundColor('#aaa');
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
                cam.centerOn(618 + 1236*pos, 0);
            });
            //left arrow
            arrowL[i] = this.add.sprite(this.scale.width*0.04, this.scale.height/2, 'arrow');
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
                cam.centerOn(618 + 1236*pos, 0);
            });
            //menu button
            let menu = this.add.sprite(this.scale.width*.04, this.scale.height*.05, 'menuPet');    
            menu.setInteractive();
            menu.on('pointerdown', ()=> {  
                this.scene.run('ShowMenu'); 
                this.scene.bringToTop('ShowMenu');
            });



            pet[i] = this.add.container(i*1236, 0);
            pet[i].add(this.add.sprite(this.scale.width/2, this.scale.height/2, 'backPet')); //background
            pet[i].add(this.add.sprite(this.scale.width/2, this.scale.height/2, 'pet' + i)); //addpet
            pet[i].add(arrowR[i]);
            pet[i].add(arrowL[i]);
            pet[i].add(menu);
            this.checkHappiness(i, pet);
            this.circle();
        }
    }
    update(){
        // if(this.check == 1){
        //     player.anims.play('swap', true);
        //     this.check = 0;
        // }

    }
    circle(){
        var cir = Phaser.Geom.Circle(this.scale.width*.95, this.scale.height*95, 50);
        var graphics = this.add.graphics(cir);

    }
    checkHappiness(i, pet){
        if(player.happiness[i] < 33){
            pet[i].add(this.add.sprite(this.scale.width * .95, this.scale.height * .07, 'blackHeart'));
        }
        else if(player.happiness[i] < 66){
            pet[i].add(this.add.sprite(this.scale.width * .95, this.scale.height * .07, 'yellowHeart'));
        }
        else{
            pet[i].add(this.add.sprite(this.scale.width * .95, this.scale.height * .07, 'redHeart'));
        }
    }
    }
    
    let petNumber = 3;
    var config = {
    
        parent: 'wrapper',
        scale: {
            mode: Phaser.Scale.FIT ,
            width: 1236,
            height: 681,
            type: Phaser.AUTO,
            autoCenter: Phaser.Scale.autoCenter
                   
        },
        scene: [ShowMenu, Shop, Task, Bag, pethub]
        
    };
    
    var game = new Phaser.Game(config);
    var player;
    var display;
    