class Shop extends Phaser.Scene {
    constructor(){
        super({key:"Shop", active:false});
    }
    preload(){
      //emitter presets
    

        this.load.image("menuShop", '../images/buttons/Other/menu.png');
        this.load.image('whiteCircle', '../images/icons/whiteCircle.png');
        // this.load.image('shinyboi', '../images/pets/shinyboi.png');
        for(var i = 0; i <  3; i++){
            this.load.image(pets.pet[i].petName, '../images/pets/' + pets.pet[i].petName + '.png');
        }
        this.load.image('money', '../images/icons/money.png');
        this.load.image('moneyBar', '../images/icons/money_bar.png');
        // this.load.image('icecream', '../images/food/icecream.png');
        // this.load.image('carrot', '../images/food/carrot.png');
        for(var i = 0; i < foodTypes.food.length; i++){
            this.load.image(foodTypes.food[i].type, '../images/food/' + foodTypes.food[i].type + '.png');
        }

    }
    create(){
        this.cameras.main.setBackgroundColor('#65EAA2');
        this.textLayout();
        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);
        this.pets();
        this.food();
        this.updateMoneyBar();
    }
    updateMoneyBar(){

        this.moneyBar = this.add.sprite(this.scale.width, this.scale.height *.10, 'moneyBar').setOrigin(1,0);
        var money = this.add.text(this.scale.width*.82, this.scale.height *.123, playerInfo.currency, {fontFamily: 'serif', fontSize: 28}).setColor('black');


    }
    textLayout(){
        var shop = this.add.text(this.scale.width/2, this.scale.height*.10, "Shop", {fontFamily: 'serif', fontSize: 64});
        shop.setOrigin(0.5);
        shop.setColor('black');
        // let menu2 = this.add.sprite(this.scale.width*.04, this.scale.height*.05, 'menuShop');
        var food = this.add.text(this.scale.width/2, this.scale.height*.2, "Food", {fontFamily: 'serif', fontSize: 32});
        food.setOrigin(0.5);
        food.setColor('black');
        var lineL1 = this.add.line(this.scale.width * .30, this.scale.height*.2, 0, 0, 200, 1, 0x000000);
        var lineR1 = this.add.line(this.scale.width * .7, this.scale.height*.2, 0, 0, 200, 1, 0x000000);
        var pets = this.add.text(this.scale.width/2, this.scale.height *.6, "Pets", {fontFamily: 'serif', fontSize: 32});
        pets.setOrigin(0.5);
        pets.setColor('black');
        var lineL2 = this.add.line(this.scale.width * .30, this.scale.height*.6, 0, 0, 200, 1, 0x000000);
        var lineR2 = this.add.line(this.scale.width * .7, this.scale.height*.6, 0, 0, 200, 1, 0x000000);
        pets.setOrigin(0.5);
    }
    //petnumber = 3 currently only repeating shinyboi
    pets(){
        // for(var i = 0; i < petnumber; i++){
        //     var white = this.add.sprite(this.scale.width*(.3 + (i*.1)), this.scale.height *.4, 'whiteCircle');
        //     white.number = i;
        //     white.setInteractive();
        //     white.on('clicked', this.select, this);
        // }
        for(var i = 0; i < 3; i++){
            var petSelect = this.add.container(this.scale.width*(.2 + (i*.15)), this.scale.height *.75);
            petSelect.setSize(100, 200);
            petSelect.add(this.add.sprite(0,0, 'whiteCircle'));
            var pet = this.add.sprite(0,0, pets.pet[i].petName);
            pet.setScale(.2);
            petSelect.setData("locate", pets.pet[i]);
            petSelect.setData("type", "pet");
            petSelect.add(this.add.sprite(-35,70, 'money').setScale(.4));
            petSelect.add(this.add.text(-15, 65, pets.pet[i].cost).setColor('black'));
            petSelect.add(pet);
            petSelect.setInteractive();
            console.log("shop " + petSelect.getData("locate").petName);
            // petSelect.on('pointerdown',()=>{
            //     console.log(petSelect.getData("locate"));
            // });
            petSelect.on('clicked', this.select, this);
        }

    }
    food(){
        for(var i = 0; i < foodTypes.food.length; i++){
            var foodSelect = this.add.container(this.scale.width*(.2 + (i*.15)), this.scale.height *.35);
            foodSelect.setSize(100, 200);
            foodSelect.add(this.add.sprite(0,0, 'whiteCircle'));
            var food = this.add.sprite(0,0, foodTypes.food[i].type);
            food.setScale(.8);
            food.number = i;
            // console.log(pets.pet[i].petName);
            // var pet = this.add.sprite(0,0, pets.pet[i].petName);
            // pet.setScale(.1);
            // pet.number = i;

            foodSelect.add(this.add.sprite(-35,70, 'money').setScale(.4));
            foodSelect.add(food);
            foodSelect.setData("locate", foodTypes.food[i]);
            foodSelect.setData("type", "food");
            foodSelect.add(this.add.text(-15, 65, foodTypes.food[i].cost).setColor('black'));
            // foodSelect.add(pet);
            foodSelect.setInteractive();
            foodSelect.on('clicked', this.select, this);
        }
    }
    select(pets){
        // if(pets.getData('type') == 'pet'){
            console.log("check");
            this.scene.pause('Shop');
            this.scene.run('Purchase', pets);
            this.scene.bringToTop('Purchase');
        //     console.log("pet" + pets.getData("locate"));
        // }
        // else{
        //     console.log("food" + pets.getData("locate"));
        // }

    }



}
