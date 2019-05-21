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
        this.load.image("task", '../images/buttons/pet_hub/task.png');
        this.load.image('food', '../images/food/donut.png');
        for (var i = 0; i < inventoryInfo.length; i++) {
            this.load.image('food' + inventoryInfo[i].itemID, "../images/food/" + foodTypes.food[inventoryInfo[i].itemID].type + '.png');
        };
    }
    create() {
        //console.log(foodTypes.food[0]);
        //menu button
        let menu = this.add.sprite(this.scale.width*.06, this.scale.height*.06, 'menuPet');
        menu.setInteractive();
        menu.on('pointerdown', () => {
            runningScenes = ['Pethub', 'PethubOverlay'];

            this.scene.run('ShowMenu', runningScenes);
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
            taskActive = this.add.sprite(this.scale.width * .90, this.scale.height * .72, 'whiteCircle');
        }
        else {
            taskActive = this.add.sprite(this.scale.width * .90, this.scale.height * .72, 'yellowCircle');
        }
        this.add.sprite(this.scale.width * .90, this.scale.height * .73, 'task');
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


        this.white = this.add.sprite(this.scale.width * .90, this.scale.height * .90, 'whiteCircle');
        this.food = this.add.sprite(this.scale.width * .90, this.scale.height *.9, 'food').setScale(.7);
        this.white.setInteractive();
        this.foodButtons.add(this.white);

        this.white.on('pointerdown', () => {
            if (showfood == 0) {
                this.yellow = this.add.sprite(this.scale.width * .90, this.scale.height * .90, 'yellowCircle');
                this.food = [];
                this.type = [];
                this.amount = [];
                for (var i = 0; i < inventoryInfo.length; i++) {
                    this.food[i] = this.add.sprite(this.scale.width * (.80 - (i * .10)), this.scale.height * .90, 'whiteCircle');
                    this.food[i].setInteractive();
                    this.food[i].name = i;

                    this.food[i].on('clicked', this.consume, this);
                    this.amount[i] = this.add.text(this.scale.width * (.79 - (i * .10)), this.scale.height * .85, inventoryInfo[i].itemQty, { fontFamily: 'serif', fontSize: 64 }).setColor('black');
                    this.amount[i].alpha = .8;
                    this.type[i] = this.add.sprite(this.scale.width * (.80 - (i * .10)), this.scale.height * .90, 'food' + inventoryInfo[i].itemID);
                    this.type[i].setScale(.7);

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



    consume(box) {
        if (inventoryInfo[box.name].itemQty == 1) {
            inventoryInfo.splice(box.name, 1);
            this.foodButtons.remove(this.food);
            this.foodButtons.remove(this.type);
            this.food = [];
            this.type = [];
            for (var i = 0; i < inventoryInfo.length; i++) {
                this.food[i] = this.add.sprite(this.scale.width * (.80 - (i * .10)), this.scale.height * .90, 'whiteCircle');
                this.type[i] = this.add.sprite(this.scale.width * (.80 - (i * .10)), this.scale.height * .90, 'food' + inventoryInfo[i].itemID);
                this.type[i].setScale(.7);
                this.food[i].setInteractive();
                this.food[i].name = i;
                this.food[i].on('clicked', this.consume, this);

            }
            this.foodButtons.add(this.food);
            this.foodButtons.add(this.type);
        }
        else{
            inventoryInfo[box.name].itemQty =inventoryInfo[box.name].itemQty-1;
        }
        this.foodButtons.remove(this.amount);
        this.amount = [];
        for (var i = 0; i < inventoryInfo.length; i++) {
            this.amount[i] = this.add.text(this.scale.width * (.79 - (i * .10)), this.scale.height * .85, inventoryInfo[i].itemQty, { fontFamily: 'serif', fontSize: 64 }).setColor('black');
            this.amount[i].alpha = .8;
        }
        this.foodButtons.add(this.amount);
        playerPetInfo[playerInfo[0].activePet].currentHunger += 30;
        console.log('new pet hunger' + playerPetInfo[playerInfo[0].activePet].currentHunger);
        updateHunger = 1;
        console.log('check hunger ' + updateHunger);
    }

}