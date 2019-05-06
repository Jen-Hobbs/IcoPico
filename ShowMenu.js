class ShowMenu extends Phaser.Scene {
    constructor(){
        super({key:"ShowMenu", active:false});
    }
    preload(){
        this.load.image("menu", 'images/icons/menu1.png');
        this.load.image("buttonTask", 'testImages/buttonTask.png');
        this.load.image('buttonShop', 'testImages/buttonShop.png');
        this.load.image('buttonPethub', 'testImages/buttonPet.png');
        this.load.image('buttonBag', 'testImages/buttonBag.png');
        
    }
    create(){
        let graphics = this.add.graphics();
        graphics.fillStyle(0X38a081,.8).fillRect(0,0,100, this.scale.height);
        let menu = this.add.sprite(this.scale.width*.04, this.scale.height*.05, 'menu');
        menu.setInteractive();
        menu.on('pointerdown', () => {
           this.scene.sleep('ShowMenu');
        })
        let pet = this.add.sprite(this.scale.width*.04, this.scale.height*.2, 'buttonPethub');
        pet.setInteractive();
        pet.on('pointerdown', () =>{
            console.log('pet');
            this.scene.run("Pethub");
            this.scene.bringToTop("Pethub");       
            this.scene.sleep('ShowMenu');      
        })
        let shop =  this.add.sprite(this.scale.width*.04, this.scale.height*.35, 'buttonShop');
        shop.setInteractive();
        shop.on('pointerdown', () =>{
            console.log('shop');
            this.scene.run('Shop');
            this.scene.bringToTop('Shop'); 
            this.scene.sleep('ShowMenu');  
        })

        let task =  this.add.sprite(this.scale.width*.04, this.scale.height*.5, 'buttonTask');
        task.setInteractive();
        task.on('pointerdown', () =>{
            this.scene.run('Task');
            this.scene.bringToTop('Task');  
            this.scene.sleep('ShowMenu'); 
        })
        let bag =  this.add.sprite(this.scale.width*.04, this.scale.height*.65, 'buttonBag');
        bag.setInteractive();
        bag.on('pointerdown', () =>{
            this.scene.run('Bag');
            this.scene.bringToTop('Bag');   
            this.scene.sleep('ShowMenu');
        });
        let pic = this.add.sprite(this.scale.width*.95, this.scale.height*.95, 'buttonBag');
        pic = this.add.sprite(this.scale.width*.95, this.scale.height*.95, 'buttonBag');
        food(info);
    }
    update(){

    }
    food(pic){
        pic.setInteractive();
        pic.on('pointerhover', ()=>{
            
        });
        pic.on('pointerdown', () => {
            
        });
    }
}