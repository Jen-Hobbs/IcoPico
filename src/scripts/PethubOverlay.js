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
        console.log("hello world" + inventoryInfo.length);
        for (var i = 0; i < inventoryInfo.length; i++) {
            console.log('check' + inventoryInfo[i].itemQty);
            console.log(inventoryInfo[i].itemID);
            this.load.image('food' + inventoryInfo[i].itemID, "../images/food/" + foodTypes.food[inventoryInfo[i].itemID].type + '.png');
        };
        // this.load.image('food0',  "../images/food/icecream.png");
        // this.load.image('food2', '../images/food/donut.png');
        // this.load.image('food1', '../images/food/carrot.png');
    }
    create() {
        this.emitter = new Phaser.Events.EventEmitter()
        .on("taskList", updateTaskList)
        .on("inventory", updateInventory)
        .on("currency", updateCurrency)
        .on("happiness", updateCurrentHappiness)
        .on("hunger", updateHung)
        .on("activePet", updateActivePet) 
        .on("newPet", insertNewPlayerPet)
        .on("lastLogin", updateLastLogin);

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
            taskActive = this.add.sprite(this.scale.width * .90, this.scale.height * .72, 'whiteCircle')
            .setInteractive()
            .on('pointerdown', () => {
            this.scene.stop('Pethub');
            this.scene.stop('PethubOverlay');
            this.scene.run('Task');
        });
        }
        else {
            taskActive = this.add.sprite(this.scale.width * .90, this.scale.height * .72, 'yellowCircle')
            .setInteractive()
            .on('pointerdown', () => {
            newTask = 0;
            this.scene.stop('Pethub');
            this.scene.stop('PethubOverlay');
            this.scene.run('Task');

        });
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
                    if(inventoryInfo[i].itemQty != 0){
                    this.food[i] = this.add.sprite(this.scale.width * (.78 - (i * .12)), this.scale.height * .90, 'whiteCircle');
                    this.food[i].setInteractive();
                    this.food[i].name = i;

                    this.food[i].on('clicked', this.consume, this);
                    this.amount[i] = this.add.text(this.scale.width * (.76 - (i * .12)), this.scale.height * .85, inventoryInfo[i].itemQty, { fontFamily: 'serif', fontSize: 64 }).setColor('black');
                    this.amount[i].alpha = .8;
                    this.type[i] = this.add.sprite(this.scale.width * (.78 - (i * .12)), this.scale.height * .90, 'food' + inventoryInfo[i].itemID);
                    this.type[i].setScale(.7);
                    }
                }
                console.log(this.type);
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
            //
            //
            //
            //possible to delete?
            
            this.emitter.emit("inventory", inventoryInfo[box.name].itemID, 0);
            inventoryInfo.splice(box.name, 1);
            this.foodButtons.remove(this.food);
            this.foodButtons.remove(this.type);
            this.food = [];
            this.type = [];
            for (var i = 0; i < inventoryInfo.length; i++) {
                if(inventoryInfo[i].itemQty != 0){
                    this.food[i] = this.add.sprite(this.scale.width * (.78 - (i * .12)), this.scale.height * .90, 'whiteCircle');
                    this.type[i] = this.add.sprite(this.scale.width * (.78 - (i * .12)), this.scale.height * .90, 'food' + inventoryInfo[i].itemID);
                    this.type[i].setScale(.7);
                    this.food[i].setInteractive();
                    this.food[i].name = i;
                    this.food[i].on('clicked', this.consume, this);
                }

            }
            this.foodButtons.add(this.food);
            this.foodButtons.add(this.type);
            
        }
        else{
            inventoryInfo[box.name].itemQty =inventoryInfo[box.name].itemQty-1;
            var item = inventoryInfo[box.name].itemID;
            var itemQty = inventoryInfo[box.name].itemQty;
            console.log('item number' + item);
            console.log('item quantity' + itemQty);
            this.emitter.emit("inventory", item, itemQty);
        }
        this.foodButtons.remove(this.amount);
        this.amount = [];
        for (var i = 0; i < inventoryInfo.length; i++) {
            if(inventoryInfo[i].itemQty != 0){
                this.amount[i] = this.add.text(this.scale.width * (.76 - (i * .12)), this.scale.height * .85, inventoryInfo[i].itemQty, { fontFamily: 'serif', fontSize: 64 }).setColor('black');
                this.amount[i].alpha = .8;
            }
        }
        this.foodButtons.add(this.amount);
        console.log(playerInfo.activePet);
        console.log(playerPetInfo[playerInfo.activePet]);
        playerPetInfo[playerInfo.activePet].currentHunger += 30;
        console.log('new pet hunger' + playerPetInfo[playerInfo.activePet].currentHunger);
        updateHunger = 1;
        console.log('check hunger ' + updateHunger);
        console.log(playerPetInfo[playerInfo.activePet].petID+ " " + playerPetInfo[playerInfo.activePet].currentHunger);
        this.emitter.emit("hunger", playerPetInfo[playerInfo.activePet].petID, Math.floor(playerPetInfo[playerInfo.activePet].currentHunger));
        
    }

}