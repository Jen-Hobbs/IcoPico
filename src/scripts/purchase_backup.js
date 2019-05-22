class Purchase extends Phaser.Scene {
    constructor() {
        super({ key: "Purchase", active: false });
    }
    init(data) {
        this.info = data.getData("locate");
        this.type = data.getData("type");
        console.log('init');
    }
    preload() {
        this.load.image('backdrop', '../images/icons/purchase_screen.png');
        this.load.image('purchase', '../images/buttons/Other/purchase_button.png');
        this.load.image('x', '../images/buttons/Other/x.png');
        console.log("preload start");

        if (this.type == 'pet') {
            //if(player.money < pets.pet[this.info].cost){
            console.log("buy pet" + this.info.petName);
            this.load.image(this.info.petName, '../images/pets/' + this.info.petName + '.png');
            // }
            // else{
            //     console.log('not enough');
            //     this.add.text(this.scale.width/2, this.scale.height/2, 'Insufficient Funds');
            // }
        }
        else {
            console.log(this.info.type);
            this.load.image(this.info.type, '../images/food/' + this.info.type + '.png');
            //this.load.image('item', )
        }
    }
    create() {
      var emitter = new Phaser.Events.EventEmitter()
        .on("taskList", updateTaskList)
        .on("inventory", updateInventory)
        .on("currency", updateCurrency)
        .on("happiness", updateCurrentHappiness)
        .on("hunger", updateCurrentHunger);

        console.log("purchase" + this.info.petName);
        this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'backdrop');
        var purchase = this.add.sprite(this.scale.width * .60, this.scale.height * .59, 'purchase');
        purchase.setInteractive();
        if (this.type == 'pet') {
            var image = this.add.sprite(this.scale.width / 2, this.scale.height * .48, this.info.petName).setScale(.2);
            if (playerInfo.currency >= this.info.cost) {
                this.add.text(this.scale.width * .58, this.scale.height * .58, 'Buy').setColor('black');
                console.log("buy pet");
                purchase.on('pointerdown', () => {
                    playerInfo.currency = playerInfo.currency - this.info.cost;
                    //emit currency change
                    emitter.emit("currency", playerInfo.currency);
                    console.log("money left" + playerInfo.currency);
                    console.log("what is this" + this.info.petName);
                    var newPet = new Object();
                    //missing playerPetID
                    //no way to set petname

                    for(var i =0; i < pets.pet.length; i++){
                        if(pets.pet[i].petName == this.info.petName){
                            newPet.petID = i;
                            console.log('pet location and name' + newPet.petID + this.info.petName);
                        }
                    }
                    newPet.currentHappiness = 50;
                    newPet.currentHunger = 50;
                    newPet.petName = 'empty';
                    newPet.playerID = playerInfo;
                    newPet.totalHappiness = 0;
                    newPet.totalHunger = 0;
                    newPet.recycling = 0;
                    newPet.utility = 0;
                    newPet.health = 0;
                    playerPetInfo.push(newPet);
//***need to emit new pet to database
                    console.log("pet added" + playerPetInfo);
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
            else {
                console.log('not enough');
                var notEnough = this.add.text(this.scale.width *.36, this.scale.height * .45, 'Insufficient Funds', {fontFamily: 'serif', fontSize: 32}).setColor('Black');

                this.add.text(this.scale.width * .57, this.scale.height * .58, 'Close').setColor('black');
                purchase.on('pointerdown', () => {
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
        }
        else {
            var image = this.add.sprite(this.scale.width / 2, this.scale.height * .48, this.info.type).setScale(.8);
            if (playerInfo.currency >= this.info.cost) {

                this.add.text(this.scale.width * .58, this.scale.height * .58, 'Buy').setColor('black');
                console.log("buy food");
                purchase.on('pointerdown', () => {
                    playerInfo.currency = playerInfo.currency - this.info.cost;
                    //emit money
                    emitter.emit("currency", playerInfo.currency);
                    console.log("money left" + playerInfo.currency);
                    var check = 0;
                    for(var i = 0; i < inventoryInfo.length; i++){
                        if(foodTypes.food[inventoryInfo[i].itemID].type == this.info.type){
                            inventoryInfo[i].itemQty++;
                            check++;
                        }
                    }
                    if(check == 0){
                        var stuff = {};
                        for(var i = 0; i < foodTypes.food.length; i++){
                            if(foodTypes.food[i].type == this.info.type){
                                stuff.itemID = i;
                            }
                        }
                        stuff.itemQty = 1;
                        stuff.playerID = playerInfo.playerID;


                        //missing inventory id
                        inventoryInfo.push(stuff);

                        console.log(inventoryInfo);
                    }
                    //emit inventory
                    emitter.emit("inventory", inventoryInfo.itemID, inventoryInfo.itemQty);

                    //information.push(this.info.petName);
                    //player.happiness.push(50);
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
            else {
                console.log('not enough');
                var notEnough = this.add.text(this.scale.width *.36, this.scale.height * .45, 'Insufficient Funds', {fontFamily: 'serif', fontSize: 32}).setColor('Black');

                this.add.text(this.scale.width * .57, this.scale.height * .58, 'Close').setColor('black');
                purchase.on('pointerdown', () => {
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
        }
        var close = this.add.sprite(this.scale.width * .36, this.scale.height * .40, 'x');
        close.setInteractive();
        close.on('pointerup', () => {
            this.scene.stop('Purchase');
            this.scene.run('Shop');
        });

        // purchase.on('pointerdown', ()=>{
        //     console.log(this.info);
        //     console.log(this.type);
        // });

    }

}
