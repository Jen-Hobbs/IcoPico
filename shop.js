class Shop extends Phaser.Scene {
    constructor(){
        super({key:"Shop", active:false});
    }
    preload(){
        this.load.image('backShop', 'images/sky.png');
        this.load.image("menuShop", 'images/buttons/Other/menu1.png');
        this.load.image('whiteCircle', 'images/icons/whiteCircle.png');
        this.load.image('shinyboi', 'images/pets/shinyboi.png');
        this.load.image('money', 'images/pets/money.png');
        
    }
    create(){
        var test = this.add.sprite(this.scale.width/2, this.scale.height/2, 'backShop');     
        var shop = this.add.text(this.scale.width/2, this.scale.height*.10, "shop", {fontFamily: 'serif', fontSize: 64});
        let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menuShop');  
        var food = this.add.text(this.scale.width/2, this.scale.height*.2, "Food", {fontFamily: 'serif', fontSize: 32});
        var lineL = this.add.line(this.scale.width * .35, this.scale.height*.22, 0, 0, 300, 1, 0x000000);
        var lineR = this.add.line(this.scale.width * .70, this.scale.height*.22, 0, 0, 300, 1, 0x000000);
        var pets = this.add.text(this.scale.width/2, this.scale.height *.6, "Pets", {fontFamily: 'serif', fontSize: 32});
        
        menu2.setInteractive();
        menu2.on('pointerdown', ()=> {
            this.scene.run('ShowMenu');
            this.scene.bringToTop('ShowMenu');  
        });
        this.input.on('gameobjectup', function (pointer, gameObject) {
            gameObject.emit('clicked', gameObject);
        }, this);
        this.pets();
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
            var petSelect = this.add.container(this.scale.width*(.3 + (i*.1)), this.scale.height *.78);
            petSelect.add(this.add.sprite(0,0, 'whiteCircle'));
            console.log(pets.pet[i].petName);
            var pet = this.add.sprite(0,0, pets.pet[i].petName);
            pet.setScale(.1);
            pet.number = i;
            petSelect.add(this.add.text(0, 100, pets.pet[i].cost));
            petSelect.add(pet);
            petSelect.setInteractive();
            petSelect.on('clicked', this.select, this);
        }

    }
    select(pets){
        console.log('hi');
    }
    
}