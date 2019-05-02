class ShowMenu extends Phaser.Scene {
    constructor(){
        super({key:"ShowMenu", active:false});
    }
    preload(){
        this.load.image("buttonTask", 'testImages/buttonTask.png');
        this.load.image('buttonShop', 'testImages/buttonShop.png');
        this.load.image('buttonPethub', 'testImages/buttonPet.png');
        this.load.image('buttonBag', 'testImages/buttonBag.png')
    }
    create(){
        let graphics = this.add.graphics();
        graphics.fillStyle(0X38a081,.8).fillRect(0,0,75, this.scale.height);
        let menu = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menu');
        menu.setInteractive();
        menu.on('pointerdown', () => {
           this.scene.stop('ShowMenu');
        })
        let pet = this.add.sprite(this.scale.width*.05, this.scale.height*.2, 'buttonPethub');
        pet.setInteractive();
        pet.on('pointerdown', () =>{
            console.log('pet');
            this.scene.start("Pethub");
        })
        let shop =  this.add.sprite(this.scale.width*.05, this.scale.height*.35, 'buttonShop');
        shop.setInteractive();
        shop.on('pointerdown', () =>{
            console.log('shop');
            this.scene.start('Shop');   
        })
        let task =  this.add.sprite(this.scale.width*.05, this.scale.height*.5, 'buttonTask');
        task.setInteractive();
        task.on('pointerdown', () =>{
            console.log(task);
            this.scene.start('Task');   
        })
        let bag =  this.add.sprite(this.scale.width*.05, this.scale.height*.65, 'buttonBag');
        bag.setInteractive();
        bag.on('pointerdown', () =>{
            console.log(task);
            this.scene.start('Bag');   
        })
    }
    update(){

    }
}