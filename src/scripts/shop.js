class Shop extends Phaser.Scene {
    constructor(){
        super({key:"Shop", active:false});
    }
    preload(){
        this.load.image('backShop', '../images/sky.png');
        this.load.image("menuShop", '../images/buttons/Other/menu.png');
        this.load.image('whiteCircle', '../images/icons/whiteCircle.png');
        this.load.image('shinyboi', '../images/pets/shinyboi.png');
        this.load.image('mony', '../images/pets/money.png');
        this.load.image('money', '../images/icons/money.png')
        
    }
    create(){
        var test = this.add.sprite(this.scale.width/2, this.scale.height/2, 'backShop');     
        this.textLayout();
        let menu2 = this.add.sprite(this.scale.width*.04, this.scale.height*.05, 'menuShop');  
        menu2.setInteractive();
        menu2.on('pointerdown', ()=> {
            this.scene.run('ShowMenu');
            this.scene.bringToTop('ShowMenu');
        });
        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);
        this.pets();
        this.food();
    }
    textLayout(){
        var shop = this.add.text(this.scale.width/2, this.scale.height*.10, "Shop", {fontFamily: 'serif', fontSize: 64});
        shop.setOrigin(0.5);
        shop.setColor('black');
        let menu2 = this.add.sprite(this.scale.width*.04, this.scale.height*.05, 'menuShop');  
        var food = this.add.text(this.scale.width/2, this.scale.height*.2, "Food", {fontFamily: 'serif', fontSize: 32});
        food.setOrigin(0.5);
        food.setColor('black');
        var lineL1 = this.add.line(this.scale.width * .30, this.scale.height*.2, 0, 0, 350, 1, 0x000000);
        var lineR1 = this.add.line(this.scale.width * .7, this.scale.height*.2, 0, 0, 350, 1, 0x000000);
        var pets = this.add.text(this.scale.width/2, this.scale.height *.6, "Pets", {fontFamily: 'serif', fontSize: 32});
        pets.setOrigin(0.5);
        pets.setColor('black');
        var lineL2 = this.add.line(this.scale.width * .30, this.scale.height*.6, 0, 0, 350, 1, 0x000000);
        var lineR2 = this.add.line(this.scale.width * .7, this.scale.height*.6, 0, 0, 350, 1, 0x000000);
        pets.setOrigin(0.5);
    }
    //petnumber = 3 currently only repeating shinyboi
    pets(){
        var petnumber = 2;
        // for(var i = 0; i < petnumber; i++){
        //     var white = this.add.sprite(this.scale.width*(.3 + (i*.1)), this.scale.height *.4, 'whiteCircle');
        //     white.number = i;
        //     white.setInteractive();
        //     white.on('clicked', this.select, this);
        // }
        for(var i = 0; i < pets.pet.length; i++){
            var petSelect = this.add.container(this.scale.width*(.2 + (i*.1)), this.scale.height *.75);
            petSelect.setSize(100, 200);
            petSelect.add(this.add.sprite(0,0, 'whiteCircle'));
            console.log(pets.pet[i].petName);
            var pet = this.add.sprite(0,0, pets.pet[i].petName);
            pet.setScale(.1);
            pet.number = i;
            petSelect.add(this.add.sprite(-35,70, 'money'));
            petSelect.add(this.add.text(-15, 65, pets.pet[i].cost).setColor('black'));
            petSelect.add(pet);
            petSelect.setInteractive();
            petSelect.on('clicked', this.select, pet);
        }

    }
    food(){
        for(var i = 0; i < pets.pet.length; i++){
            var foodSelect = this.add.container(this.scale.width*(.2 + (i*.1)), this.scale.height *.35);
            foodSelect.add(this.add.sprite(0,0, 'whiteCircle'));
            // console.log(pets.pet[i].petName);
            // var pet = this.add.sprite(0,0, pets.pet[i].petName);
            // pet.setScale(.1);
            // pet.number = i;
            foodSelect.add(this.add.sprite(-35,70, 'money'));
            foodSelect.add(this.add.text(-15, 65, pets.pet[i].cost).setColor('black'));
            // foodSelect.add(pet);
            foodSelect.setInteractive();
            foodSelect.on('clicked', this.select, this);
        }
    }
    select(pets){
        console.log(pets);
    }
    
    
}