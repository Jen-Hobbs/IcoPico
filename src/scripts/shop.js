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

        this.moneyBar = this.add.sprite(this.scale.width * .97, this.scale.height *.19, 'moneyBar').setOrigin(1,0).setScale(1.3);
        var money = this.add.text(this.scale.width*.75, this.scale.height *.205, playerInfo.currency, {fontFamily: 'serif', fontSize: 36}).setColor('black');


    }
    textLayout(){
        var shop = this.add.text(this.scale.width/2, this.scale.height*.16, "Shop", {fontFamily: 'serif', fontSize: 72});
        shop.setOrigin(0.5);
        shop.setColor('black');
        // let menu2 = this.add.sprite(this.scale.width*.04, this.scale.height*.05, 'menuShop');
        var food = this.add.text(this.scale.width/2, this.scale.height*.28, "Food", {fontFamily: 'serif', fontSize: 48});
        food.setOrigin(0.5);
        food.setColor('black');
        var lineL1 = this.add.line(this.scale.width * .30, this.scale.height*.28, 0, 0, 200, 1, 0x000000);
        var lineR1 = this.add.line(this.scale.width * .7, this.scale.height*.28, 0, 0, 200, 1, 0x000000);
        var pets = this.add.text(this.scale.width/2, this.scale.height*.53, "Pets", {fontFamily: 'serif', fontSize: 48});
        pets.setOrigin(.5);
        pets.setColor('black');
        var lineL3 = this.add.line(this.scale.width * .30, this.scale.height*.53, 0, 0, 200, 1, 0x000000);
        var lineR3 = this.add.line(this.scale.width * .7, this.scale.height*.53, 0, 0, 200, 1, 0x000000);
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
            var petSelect = this.add.container(this.scale.width*(.25 + (i*.25)), this.scale.height *.62).setScale(1.5);
            petSelect.setSize(100, 200);
            petSelect.add(this.add.sprite(0,0, 'whiteCircle'));
            var pet = this.add.sprite(0,0, pets.pet[i].petName);
            pet.setScale(.2);
            petSelect.setData("locate", pets.pet[i]);
            petSelect.setData("type", "pet");
            petSelect.add(this.add.sprite(-20,71, 'money').setScale(.4));
            petSelect.add(this.add.text(0, 55, pets.pet[i].cost,{fontFamily: 'serif', fontSize: 32}).setColor('black'));
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
            var foodSelect = this.add.container(this.scale.width*(.25 + (i*.25)), this.scale.height *.37).setScale(1.5);
            foodSelect.setSize(100, 200);
            foodSelect.add(this.add.sprite(0,0, 'whiteCircle'));
            var food = this.add.sprite(0,0, foodTypes.food[i].type);
            food.setScale(.8);
            food.number = i;
            // console.log(pets.pet[i].petName);
            // var pet = this.add.sprite(0,0, pets.pet[i].petName);
            // pet.setScale(.1);
            // pet.number = i;

            foodSelect.add(this.add.sprite(-20,71, 'money').setScale(.4));
            foodSelect.add(food);
            foodSelect.setData("locate", foodTypes.food[i]);
            foodSelect.setData("type", "food");
            foodSelect.add(this.add.text(0, 55, foodTypes.food[i].cost, {fontFamily: 'serif', fontSize: 32}).setColor('black'));
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
