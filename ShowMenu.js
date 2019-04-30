class ShowMenu extends Phaser.Scene {
    constructor(){
        super({key:"ShowMenu", active:false});
    }
    preload(){
        // this.load.image("task", 'testImages/buttonTask.png');
        this.load.image('shop', 'testImages/buttonShop.png');
        this.load.image('pethub', 'testImages/buttonPet.png')
    }
    create(){
        let graphics = this.add.graphics();
        graphics.fillStyle(0X38a081,.8).fillRect(0,0,75, this.scale.height);
        let menu = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menu');
        menu.setInteractive();
        menu.on('pointerdown', () => {
           this.scene.stop('ShowMenu');
        })
        let pet = this.add.sprite(this.scale.width*.05, this.scale.height*.2, 'pethub');
        pet.setInteractive();
        pet.on('pointerdown'), () =>{
            this.scene.start("Pethub");   
        }
        // let shop =  this.add.sprite(this.scale.width*.05, this.scale.height*.4, 'shop');
        // pet.setInteractive();
        // pet.on('pointerdown'), () =>{
        //     this.scene.start('Shop');   
        // }
    }
    update(){

    }
}