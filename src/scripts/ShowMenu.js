class ShowMenu extends Phaser.Scene {
    constructor(){
        super({key:"ShowMenu", active:true});
        
        
    }
    preload(){
        this.load.image("menu", '../images/buttons/Other/menu.png');
        this.load.image("buttonTask", '../images/buttons/scene_button/Task_Button.png');
        this.load.image('buttonShop', '../images/buttons/scene_button/Shopping_Button.png');
        this.load.image('buttonPethub', '../images/buttons/scene_button/PetHub_Button.png');
        this.load.image('logout', '../images/buttons/scene_button/logout_Button.png');
        
    }
    create(){
        // let graphics = this.add.graphics();
        // graphics.fillStyle(0X38a081,.8).fillRect(0,0,100, this.scale.height);
        let pet = this.add.sprite(this.scale.width*.06, this.scale.height*.21, 'buttonPethub');
        pet.setInteractive();
        pet.on('pointerdown', () =>{
            console.log('pet');
            this.stopScenes();
            this.scene.run("Pethub");
            this.scene.bringToTop('ShowMenu');      
        })
        let shop =  this.add.sprite(this.scale.width*.26, this.scale.height*.21, 'buttonShop');
        shop.setInteractive();
        shop.on('pointerdown', () =>{
            console.log('shop');
            this.stopScenes();
            this.scene.run('Shop');
            this.scene.bringToTop('ShowMenu');  
        })

        let task =  this.add.sprite(this.scale.width*.46, this.scale.height*.21, 'buttonTask');
        task.setInteractive();
        task.on('pointerdown', () =>{
            newTask = 0;
            console.log("select task")
            this.stopScenes();
            this.scene.run('Task');
            this.scene.bringToTop('ShowMenu'); 
        })
        
        let logout = this.add.sprite(this.scale.width*.66, this.scale.height*.21, 'logout');
    }
    stopScenes(){
        console.log("stop scenes");
        this.scene.stop('Task');
        this.scene.stop('Shop');
        this.scene.stop('Pethub');
    }
    
}