class PethubOverlay extends Phaser.Scene {
    constructor() {
        super({
            key: 'PethubOverlay', active: true
        });
    }
    preload() {
        this.load.image("whiteCircle", "../images/buttons/Other/white_circle.png");
        this.load.image('yellowCircle', '../images/buttons/Other/yellow_circle.png');
        this.load.image("menuPet", '../images/buttons/Other/menu.png');
    }
    create() {
        //menu button
        let menu = this.add.sprite(this.scale.width * .04, this.scale.height * .05, 'menuPet');
        menu.setInteractive();
        menu.on('pointerdown', () => {
            this.runningScenes = ['pethub', 'PethubOverlay'];
            
            this.scene.run('ShowMenu', this.runningScenes);
            this.scene.bringToTop('ShowMenu');
        });
        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
            console.log('hi');
        }, this);
        this.displayfood();
        this.task();
    }


    task(){
        var taskActive;
        if(newTask == 0){
            taskActive = this.add.sprite(this.scale.width *.95, this.scale.height *.72, 'whiteCircle');
        }
        else{
            taskActive = this.add.sprite(this.scale.width *.95, this.scale.height *.72, 'yellowCircle');
        }
    }
    displayfood() {
        
        var showfood = 0;
        // for (var i = 0; i < player.food.length; i++) {
        //     this.food[i] = this.add.sprite(this.scale.width * (.85 - (i * .10)), this.scale.height * .95, 'whiteCircle');
        //     this.food[i].setInteractive();
        //     this.food[i].name = i;
        //     this.food[i].setVisible(false);
        //     this.food[i].disableInteractive();
        //     this.food[i].on('clicked', this.location, this);
        //     this.food[i].on('pointerup', () => {
        //         console.log("pointer up");
        //     })


        // }
        this.foodButtons = this.add.container(0,0);
        
        
        this.white = this.add.sprite(this.scale.width * .95, this.scale.height * .90, 'whiteCircle');

        this.white.setInteractive();
        this.foodButtons.add(this.white);
        
        this.white.on('pointerdown', ()=>{
            if(showfood == 0){
                this.yellow = this.add.sprite(this.scale.width * .95, this.scale.height * .90, 'yellowCircle');
                this.food = [];
                for (var i = 0; i < player.food.length; i++) {
                    this.food[i] = this.add.sprite(this.scale.width * (.85 - (i * .10)), this.scale.height * .90, 'whiteCircle');
                    this.food[i].setInteractive();
                    this.food[i].name = i;
               
                    this.food[i].on('clicked', this.location, this);
                    this.food[i].on('pointerup', () => {
                        console.log("pointer up");
                    });
                }
                this.foodButtons.add(this.food);
                this.foodButtons.add(this.yellow);
                showfood = 1;
            }
            else{
                this.foodButtons.remove(this.yellow);
                showfood = 0;
                this.foodButtons.remove(this.food);
            }
        });
    }
    

    
    location(box) {
        player.food.splice(box.name, 1);
        this.foodButtons.remove(this.food);
        this.food = [];
        for (var i = 0; i < player.food.length; i++) {
            this.food[i] = this.add.sprite(this.scale.width * (.85 - (i * .10)), this.scale.height * .90, 'whiteCircle');
            this.food[i].setInteractive();
            this.food[i].name = i;
       
            this.food[i].on('clicked', this.location, this);
            this.food[i].on('pointerup', () => {
                console.log("pointer up");
            });
        }
        this.foodButtons.add(this.food);
        this.resetFood = 1;
        console.log('hi');
        console.log(box.name);


        // console.log(food);
        // box.off('clicked', location);
        // box.input.enabled = false;
        // box.setVisible(false);

    }
   
}