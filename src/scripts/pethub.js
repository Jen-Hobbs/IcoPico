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
       
        this.load.image('arrow', '../images/buttons/Other/arrow1.png');
        this.load.image('backPet', '../images/Sad_Appartment.png');
        this.load.image('sad', '../images/buttons/pet_hub/sad.png');
        this.load.spritesheet("thought", '../images/icons/thoughtAnimate.png', { frameWidth: 280, frameHeight: 330 });
        this.idle = [];
        //find nulls?
        for(var i = 0; i < playerPetInfo.length; i++){
            for(var j = 0; j < 2; j++){
                this.idle[i] = this.load.image('idle' + i + j, '../images/IdolAnimations/' + pets.pet[playerPetInfo[i].petID].petName + '/' + pets.pet[playerPetInfo[i].petID].petName + '_' + j + '.png')
               
            }
        }
        
        
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
        console.log(this.textures);
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
        for(var i = 0; i < playerPetInfo.length; i++){
            
            this.animation = this.anims.create({
                key: 'idle' + i,
                frames: [{key: 'idle'+ i + '0'}, {key: 'idle' + i + '1'}, {key: 'idle'+ i + '0'}],
                frameRate: 7,
                repeat: 1
            });
            
        }
        // var timedEvent = this.time.delayedCall(300, this.idleAnimate, [], this);
        // //eating food animation initial pet start
        
        this.idlePet();
        //right arrow
        arrowR = this.add.sprite(this.scale.width * 0.90, this.scale.height * .6, 'arrow');
        arrowR.setInteractive();
        arrowR.on('pointerdown', () => {
            if(playerPetInfo.length != 1){
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
        }
        });
        //left arrow
        arrowL = this.add.sprite(this.scale.width * 0.1, this.scale.height * .6, 'arrow');
        arrowL.flipX = !arrowL.flipX;
        arrowL.setInteractive();
        arrowL.on('pointerdown', () => {
            if(playerPetInfo.length != 1){
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
        }
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
        this.updatepet = this.currentPet;
    }
    idlePet(){
        this.timedEvent = this.time.addEvent({
            delay: 1000 + (Math.random() * 1000),                  // ms
            callback: this.idleAnimate,
            args: [],
            repeat: 1,
            callbackScope: this
        });
    }
    idleAnimate(){
        if(this.textures.get('idle' + this.currentPet + '0').manager.exists('idle' + this.currentPet + '0') == true){
            this.timedEvent.reset({
                delay: 10000 + (Math.random() * 100000),                  // ms
                callback: this.idleAnimate,
                args: [],
                repeat: 1,
                callbackScope: this
            });
            this.pet.anims.play('idle' + this.currentPet);
        }     
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
                playerInfo.activePet++;
            }
            else{
                this.currentPet = 0;
                playerInfo.activePet = 0;
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
                this.idlePet();
            }
    }
    changePetL(){
        if(this.currentPet == 0){
            this.currentPet = playerPetInfo.length-1;
            playerInfo.activePet = playerPetInfo.length-1;
        }
        
        else{
            this.currentPet--;
            playerInfo.activePet--;
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
        this.idlePet();
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
    //amount of food in inventory
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

    // consums item from inventory and animates it
    consume(box) {
        console.log("consume clicked" + box);
        if (inventoryInfo[box.name].itemQty == 1) {
            inventoryInfo[box.name].itemQty =inventoryInfo[box.name].itemQty-1;
            var item = inventoryInfo[box.name].itemID;
            var itemQty = inventoryInfo[box.name].itemQty;
            this.foodButtons.remove(this.amount);
            this.emitter.emit("inventory", item, itemQty);
            this.foodButtons.remove(this.food);
            this.foodButtons.remove(this.type);
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
        var animateFood = this.add.sprite(this.scale.width * (.72 - ((box.name-1) * .18)), this.scale.height * .90, 'food' + inventoryInfo[box.name].itemID).setScale(2);
        var particles = this.add.particles('food' + inventoryInfo[box.name].itemID).setScale(.5);

        
        this.tweens.add({
            targets: animateFood,
            x: 400,
            y: 600,
            scaleX: .5,
            scaleY: .5,
            duration: 1000,
            ease: 'Sine.easeIn',
            onComplete: function ()
            {
                var emitter3 = particles.createEmitter({
                    x: 800,
                    y: 1200,
                    speed: { min: 200, max: 400 },
                    maxParticles: 20,
                    angle: { start: 0, end: 360, steps: 10 },
                    quantity: 1,
                    lifespan: { min: 1000, max: 2000 },
                    blendMode: 'ERASE'
                });
                
                var emitter2 = particles.createEmitter({
                    delay: 0.3,
                    x: 800,
                    y: 1200,
                    speed: { min: 200, max: 400 },
                    maxParticles: 30,
                    angle: { start: 0, end: 360, steps: 10 },
                    quantity: 1,
                    lifespan: { min: 1500, max: 2000 },
                    blendMode: 'ADD'
                });
                var emitter = particles.createEmitter({
                    delay: 0.5,
                    x: 800,
                    y: 1200,
                    speed: { min: 200, max: 400 },
                    maxParticles: 30,
                    angle: { start: 0, end: 360, steps: 10 },
                    quantity: 1,
                    lifespan: { min: 1500, max: 2000 }
                });
                animateFood.destroy();
            }
        });
        this.tweens.add({
            targets: this.pet,
            x: 400,
            y: 400,
            ease: 'Linear',
            rotation: 10,
            delay: 100,
            duration: 1500,
            onComplete: this.rotate,
            callbackScope: this
        });
        playerPetInfo[playerInfo.activePet].currentHunger += foodTypes.food[inventoryInfo[box.name].itemID].hungerIncrease;
        console.log("current hunger of pet " + playerPetInfo[playerInfo.activePet].currentHunger);
        this.checkHunger(this.currentPet);
      
     
        this.emitter.emit("hunger", playerPetInfo[playerInfo.activePet].petID, Math.floor(playerPetInfo[playerInfo.activePet].currentHunger));
        
    }
    rotate(){
        this.tweens.add({
            targets: this.pet,
            rotation: 12.6,
            x: this.scale.width / 2,
            y: this.scale.height * .85,
            duration: 1500,
            ease: 'Linear'
        });
    }
}
