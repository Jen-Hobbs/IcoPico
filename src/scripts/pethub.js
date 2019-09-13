class Pethub extends Phaser.Scene {
    constructor() {
        super({ key: 'Pethub', active: true })

    }
    init(data) {
        // console.log('init', data);
        // this.greetings = data.hi;
        // this.check = 0;

    }
    preload() {
        console.log('pethub loading');

        //.emit("sampleAjax", "sample1@gmail.com");
        this.petName = [];
        for (var i = 0; i < playerPetInfo.length; i++) {
            this.load.image('pet' + i, '../images/pets/' + pets.pet[playerPetInfo[i].petID].petName + '.png');
        }
       
        this.load.image('arrow', '../images/buttons/Other/arrow.png');
        this.load.image('backPet', '../images/Sad_Appartment.png');
        this.load.image('sad', '../images/buttons/pet_hub/sad.png');
        this.load.spritesheet("thought", '../images/icons/thoughtAnimate.png', { frameWidth: 280, frameHeight: 330 });
        this.load.spritesheet("Shiny_Boi_Food", '../images/Shiny_Boi_Food/shiny_boi_consume.png', {frameWidth: 943, frameHeight: 470});
        this.load.image('hungry', '../images/buttons/pet_hub/hungry.png');
        this.hunger;
        this.hungerBubble;
        this.sad;
        this.sadBubble;
        this.pet;
        this.currentPet = 0; //needs to be active pet


        this.load.image("whiteCircle", "../images/buttons/Other/white_circle.png");
        this.load.image('yellowCircle', '../images/buttons/Other/yellow_circle.png');
        this.load.image("task", '../images/buttons/pet_hub/task.png');
        this.load.image('food', '../images/food/donut.png');
        for (var i = 0; i < inventoryInfo.length; i++) {

            this.load.image('food' + inventoryInfo[i].itemID, "../images/food/" + foodTypes.food[inventoryInfo[i].itemID].type + '.png');
        };
    }
    /**
     * create positioning of pet
     * sets up camera for multiple pets using arrows on screen to move between pets
     */
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

        
        var arrowR;
        var arrowL;

        this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'backPet'); //background

        this.pet = this.add.sprite(this.scale.width / 2, this.scale.height * .84, 'pet' + this.currentPet).setOrigin(0.5, 1).setScale(1.2); //addpet
        //hungry bubble animation
        this.anims.create({
            key: 'hungry',
            frames: this.anims.generateFrameNumbers('thought', { frames:[0,1,2,3,4] }),
            frameRate: 1.8,
            repeat: 1
        });
        //sad bubble animation
        this.anims.create({
            key: 'sad',
            frames: this.anims.generateFrameNumbers('thought', { frames:[0,1,2,3,5] }),
            frameRate: 1.8,
            repeat: 1
        });
        //eating food animation initial pet start
        this.anims.create({
            key: 'eat',
            frames: this.anims.generateFrameNumbers('Shiny_Boi_Food', {frames:[0,1,2,3,2,1,0]}),
            frameRate: 9,
            repeat: 0
        });
        
        //right arrow
        arrowR = this.add.sprite(this.scale.width * 0.95, this.scale.height / 2, 'arrow');
        arrowR.setInteractive();
        arrowR.on('pointerdown', () => {
            this.tweens.add({
                targets: this.pet,
                x: 900,
                y: 1700,
                ease: 'Linear',
                rotation: 3,
                duration: 2000,
                onComplete: this.changePet,
                callbackScope: this
            });
        });
        //left arrow
        arrowL = this.add.sprite(this.scale.width * 0.04, this.scale.height / 2, 'arrow');
        arrowL.flipX = !arrowL.flipX;
        arrowL.setInteractive();
        arrowL.on('pointerdown', () => {
            this.tweens.add({
                targets: this.pet,
                x: -100,
                y: 1700,
                ease: 'Linear',
                rotation: 3,
                duration: 2000,
                onComplete: this.changePetL,
                callbackScope: this
            });
        });
        this.hungerBubble = this.add.sprite(this.scale.width * .70, this.scale.height * .42);
        this.sadBubble = this.add.sprite(this.scale.width * .30, this.scale.height * .52);
        this.checkHunger(this.currentPet);
        this.checkHappiness(this.currentPet);
        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);

        }, this);
        this.displayfood();
        this.task();
    }
    /**
     * update status of pet
     */
    update() {
    }
    changePet(){
        console.log("completion of tween 1");
            if(this.currentPet < (playerPetInfo.length-1)){
                this.currentPet++;
            }
            else{
                this.currentPet = 0;
            }
            this.pet.setTexture('pet' + this.currentPet);
            this.checkHunger(this.currentPet);
            this.checkHappiness(this.currentPet);
            this.pet.x = -100;
            this.pet.y = 1700;
            if(playerPetInfo.length != 1){
                this.tweens.add({
                    targets: this.pet,
                    rotation: 0,
                    x: this.scale.width / 2,
                    y: this.scale.height * .85,
                    duration: 2000,
                    ease: 'Linear'
                });
            }
    }
    changePetL(){
        if(this.currentPet == 0){
            this.currentPet = playerPetInfo.length-1;
        }
        else{
            this.currentPet--;
        }
        this.pet.setTexture('pet' + this.currentPet);
        this.checkHunger(this.currentPet);
        this.checkHappiness(this.currentPet);
        this.pet.x = 900;
        this.pet.y = 1700;
        if(playerPetInfo.length != 1){
            this.tweens.add({
                targets: this.pet,
                rotation: 0,
                x: this.scale.width / 2,
                y: this.scale.height * .85,
                duration: 2000,
                ease: 'Linear'
            });
        }
    }
    /**
     * check happiness of the pet and create thought bubble corrisponding status
     * @param {pet number} i
     * @param {pet object} pet
     */
    checkHappiness(i) {
        this.sadBubble.setVisible(true);
        if (playerPetInfo[i].currentHappiness < 33) {
            this.sadBubble.setTexture('thought').setFlipX(true).setTint('0x875e5e').play('sad').setScale(1.2);
        }
        else if (playerPetInfo.currentHappiness < 66) {
            this.sadBubble.setTexture('thought').setFlipX(true).setTint('0xf9b6a7').play('sad').setScale(1.2);
        }
        else{
            this.sadBubble.setVisible(false);
        }

    }
    /**
     * check hunger of the pet and create thought bubble corrisponding status
     * @param {pet number} i
     * @param {pet object} pet
     */
    checkHunger(i) {
        this.hungerBubble.setVisible(true);
        if (playerPetInfo[i].currentHunger < 33) {
            this.hungerBubble.setTexture('thought').setTint('0x875e5e').play('hungry').setScale(1.2);
        }
        else if (playerPetInfo[i].currentHunger < 66) {
            this.hungerBubble.setTexture('thought').setTint('0xf9b6a7').play('hungry').setScale(1.2);
        }
        else{
            this.hungerBubble.setVisible(false);
        }
    }
    //task bubble
    task() {
        // var taskActive;
        // if (newTask == 0) {
        //     taskActive = this.add.sprite(this.scale.width * .90, this.scale.height * .8, 'whiteCircle')
        //     .setScale(1.5)
        //     .setInteractive()
        //     .on('pointerdown', () => {
        //     this.scene.stop('Pethub');
        //     this.scene.run('Task');
        // });
        // }
        // else {
        //     taskActive = this.add.sprite(this.scale.width * .90, this.scale.height * .8, 'yellowCircle')
        //     .setScale(1.5)
        //     .setInteractive()
        //     .on('pointerdown', () => {
        //     newTask = 0;
        //     this.scene.stop('Pethub');
        //     this.scene.run('Task');

        // });
        // }
        // this.add.sprite(this.scale.width * .90, this.scale.height * .8, 'task').setScale(1.5);
        
    }
    displayfood() {

        this.showfood = 0;

        this.foodButtons = this.add.container(0, 0);


        this.white = this.add.sprite(this.scale.width * .90, this.scale.height * .90, 'whiteCircle').setScale(1.5);
        this.food = this.add.sprite(this.scale.width * .90, this.scale.height *.9, 'food');
        this.white.setInteractive();
        this.foodButtons.add(this.white);

        this.white.on('pointerdown', () => {
            if (this.showfood == 0) {
                this.yellow = this.add.sprite(this.scale.width * .90, this.scale.height * .90, 'yellowCircle').setScale(1.5);
                this.foodButtons.add(this.yellow);
                this.showfood = 1;
                this.addFood();
                this.addAmount();
            }
            else {
                this.foodButtons.remove(this.yellow);
                this.showfood = 0;
                this.foodButtons.remove(this.food);
                this.foodButtons.remove(this.type);
                this.foodButtons.remove(this.amount);
            }
        });
    }
    addFood(){
        this.food = [];
        this.type = [];
        var n = 0;
        for (var i = 0; i < inventoryInfo.length; i++) {
            if(inventoryInfo[i].itemQty > 0){
            
                this.food[n] = this.add.sprite(this.scale.width * (.72 - (n * .18)), this.scale.height * .90, 'whiteCircle').setScale(1.5);
                this.food[n].setInteractive();
                this.food[n].name = i;
                this.food[n].on('clicked', this.consume, this);
                this.type[n] = this.add.sprite(this.scale.width * (.72 - (n * .18)), this.scale.height * .90, 'food' + inventoryInfo[i].itemID);
            n++;
            }
        }
        if(this.food.length > 0){
            this.foodButtons.add(this.food); 
            this.foodButtons.add(this.type);
        }

    }
    addAmount(){
        this.amount = [];
        var n = 0;
        for (var i = 0; i < inventoryInfo.length; i++) {
            if(inventoryInfo[i].itemQty != 0){
                this.amount[n] = this.add.text(this.scale.width * (.70 - (n * .18)), this.scale.height * .87, inventoryInfo[i].itemQty, { fontFamily: 'serif', fontSize: 64 }).setColor('black');
                this.amount[n].alpha = .8;
                n++;
            }
        }
        if(this.food.length > 0){
            this.foodButtons.add(this.amount);
        }
    }


    consume(box) {
        console.log(box);
        if (inventoryInfo[box.name].itemQty == 1) {
            //
            //
            //
            //possible to delete?
            inventoryInfo[box.name].itemQty--;
            this.emitter.emit("inventory", inventoryInfo[box.name].itemID, 0);
            this.foodButtons.remove(this.food);
            this.foodButtons.remove(this.type);
            this.foodButtons.remove(this.amount);
            this.addFood();
            
        }
        else{
            inventoryInfo[box.name].itemQty =inventoryInfo[box.name].itemQty-1;
            var item = inventoryInfo[box.name].itemID;
            var itemQty = inventoryInfo[box.name].itemQty;
            this.foodButtons.remove(this.amount);
            this.emitter.emit("inventory", item, itemQty);
        }
        this.addAmount();
     
        playerPetInfo[playerInfo.activePet].currentHunger += 30;
        this.pet.play("eat");
        console.log("current hunger of pet " + playerPetInfo[playerInfo.activePet].currentHunger);
        this.checkHunger(this.currentPet);
      
     
        this.emitter.emit("hunger", playerPetInfo[playerInfo.activePet].petID, Math.floor(playerPetInfo[playerInfo.activePet].currentHunger));
        
    }
}
