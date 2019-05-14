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
        for (var i = 0; i < player.food.length; i++) {
            this.load.image(player.food[i].foodType, "../images/food/" + player.food[i].foodType + '.png');
        };
    }
    create() {
        console.log(foodTypes.food[0]);
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

        }, this);
        this.displayfood();
        this.task();
    }


    task() {
        var taskActive;
        if (newTask == 0) {
            taskActive = this.add.sprite(this.scale.width * .95, this.scale.height * .72, 'whiteCircle');
        }
        else {
            taskActive = this.add.sprite(this.scale.width * .95, this.scale.height * .72, 'yellowCircle');
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
        this.foodButtons = this.add.container(0, 0);


        this.white = this.add.sprite(this.scale.width * .95, this.scale.height * .90, 'whiteCircle');

        this.white.setInteractive();
        this.foodButtons.add(this.white);

        this.white.on('pointerdown', () => {
            if (showfood == 0) {
                this.yellow = this.add.sprite(this.scale.width * .95, this.scale.height * .90, 'yellowCircle');
                this.food = [];
                this.type = [];
                this.amount = [];
                for (var i = 0; i < player.food.length; i++) {
                    this.food[i] = this.add.sprite(this.scale.width * (.85 - (i * .10)), this.scale.height * .90, 'whiteCircle');
                    this.food[i].setInteractive();
                    this.food[i].name = i;

                    this.food[i].on('clicked', this.location, this);
                    this.amount[i] = this.add.text(this.scale.width * (.84 - (i * .10)), this.scale.height * .85, player.food[i].amount, { fontFamily: 'serif', fontSize: 64 }).setColor('black');
                    this.amount[i].alpha = .5;
                    this.type[i] = this.add.sprite(this.scale.width * (.85 - (i * .10)), this.scale.height * .90, player.food[i].foodType);

                }
                this.foodButtons.add(this.food);
                this.foodButtons.add(this.type);
                this.foodButtons.add(this.yellow);
                this.foodButtons.add(this.amount);
                showfood = 1;
            }
            else {
                this.foodButtons.remove(this.yellow);
                showfood = 0;
                this.foodButtons.remove(this.food);
                this.foodButtons.remove(this.type);
                this.foodButtons.remove(this.amount);
            }
        });
    }



    location(box) {
        if (player.food[box.name].amount == 1) {
            player.food.splice(box.name, 1);
            this.foodButtons.remove(this.food);
            this.foodButtons.remove(this.type);
            this.food = [];
            this.type = [];
            for (var i = 0; i < player.food.length; i++) {
                this.food[i] = this.add.sprite(this.scale.width * (.85 - (i * .10)), this.scale.height * .90, 'whiteCircle');
                this.type[i] = this.add.sprite(this.scale.width * (.85 - (i * .10)), this.scale.height * .90, player.food[i].foodType);
                this.food[i].setInteractive();
                this.food[i].name = i;
                this.food[i].on('clicked', this.location, this);

            }
            this.foodButtons.add(this.food);
            this.foodButtons.add(this.type);
        }
        else{
            player.food[box.name].amount =player.food[box.name].amount-1;
        }
        this.foodButtons.remove(this.amount);
        this.amount = [];
        for (var i = 0; i < player.food.length; i++) {
            this.amount[i] = this.add.text(this.scale.width * (.84 - (i * .10)), this.scale.height * .85, player.food[i].amount, { fontFamily: 'serif', fontSize: 64 }).setColor('black');
            this.amount[i].alpha = .5;
        }
        this.foodButtons.add(this.amount);
    }

}