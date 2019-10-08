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
        console.log('puchase loaded');
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
        .on("inventory", updateInventory)
        .on("currency", updateCurrency)
        .on("activePet", updateActivePet) 
        .on("newPet", insertNewPlayerPet);

        
        console.log("purchase" + this.info.petName);
        this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'backdrop').setScale(1.5);
        var purchase = this.add.sprite(this.scale.width * .65, this.scale.height * .65, 'purchase').setScale(1.8);
        purchase.setInteractive();
        if (this.type == 'pet') {
            this.add.text(this.scale.width * .30, this.scale.height * .50, this.info.info,  {fontFamily: 'serif', fontSize: 44, wordWrap: { width: 360, useAdvancedWrap: true } }).setColor('black');
            var image = this.add.sprite(this.scale.width * .5, this.scale.height * .4, this.info.petName).setScale(.4);
            if (playerInfo.currency >= this.info.cost) {
                this.add.text(this.scale.width * .60, this.scale.height * .635, 'Buy',  {fontFamily: 'serif', fontSize: 48}).setColor('black');
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
                    newPet.totalHappiness = 0;
                    newPet.totalHunger = 0;
                    newPet.recycling = 0;
                    newPet.utility = 0;
                    newPet.health = 0;
                    //
                    //
                    //
                    //
                    //
                    console.log('newpet');
                    playerPetInfo.push(newPet);
                    emitter.emit("newPet", newPet.petID);
//***need to emit new pet to database
                    console.log("pet added" + playerPetInfo);
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
            else {
                console.log('not enough');
                var notEnough = this.add.text(this.scale.width *.36, this.scale.height * .48, 'Insufficient Funds', {fontFamily: 'serif', fontSize: 32}).setColor('Black');

                this.add.text(this.scale.width * .59, this.scale.height * .635, 'Close', {fontFamily: 'serif', fontSize: 48}).setColor('black');
                purchase.on('pointerdown', () => {
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
        }
        else {
            var image = this.add.sprite(this.scale.width *.5, this.scale.height * .4, this.info.type).setScale(1.4);
            this.add.text(this.scale.width * .30, this.scale.height * .50, this.info.info,  {fontFamily: 'serif', fontSize: 44, wordWrap: { width: 360, useAdvancedWrap: true } }).setColor('black');
            if (playerInfo.currency >= this.info.cost) {

                this.add.text(this.scale.width * .60, this.scale.height * .635, 'Buy',  {fontFamily: 'serif', fontSize: 48}).setColor('black');
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
                            //emit inventory food?
                            emitter.emit("inventory", inventoryInfo[i].itemID, inventoryInfo[i].itemQty);
                        }
                    }
                    if(check == 0){
                        var stuff = {};
                        for(var i =0; i < foodTypes.food.length; i++){
                            if(foodTypes.food[i].type == this.info.type){
                                stuff.itemID = i;
                            }
                        }
                        stuff.itemQty = 1;
                        //
                        //
                        //
                        //
                        //
                        inventoryInfo.push(stuff);
                        emitter.emit("insertInventory", stuff.itemID, stuff.itemQty);
                        //missing inventory id
                        
                        //emit inventory food?
                        

                        console.log(inventoryInfo);
                    }

                    //emit inventory


                    //information.push(this.info.petName);
                    //player.happiness.push(50);
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
            else {
                console.log('not enough');
                var notEnough = this.add.text(this.scale.width *.36, this.scale.height * .48, 'Insufficient Funds', {fontFamily: 'serif', fontSize: 32}).setColor('Black');

                this.add.text(this.scale.width * .59, this.scale.height * .635, 'Close', {fontFamily: 'serif', fontSize: 48}).setColor('black');
                purchase.on('pointerdown', () => {
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
        }
        var close = this.add.sprite(this.scale.width * .30, this.scale.height * .34, 'x').setScale(1.5);
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
