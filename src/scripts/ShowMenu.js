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
        let pet = this.add.sprite(this.scale.width*.15, this.scale.height*.06, 'buttonPethub').setScale(1.5);
        pet.setInteractive();
        pet.on('pointerdown', () =>{
            console.log('pet');
            this.stopScenes();
            this.scene.run("Pethub");
            this.scene.bringToTop('ShowMenu');      
        })
        let shop =  this.add.sprite(this.scale.width*.38, this.scale.height*.06, 'buttonShop').setScale(1.5);
        shop.setInteractive();
        shop.on('pointerdown', () =>{
            console.log('shop');
            this.stopScenes();
            this.scene.run('Shop');
            this.scene.bringToTop('ShowMenu');  
        })

        let task =  this.add.sprite(this.scale.width*.62, this.scale.height*.06, 'buttonTask').setScale(1.5);
        task.setInteractive();
        task.on('pointerdown', () =>{
            newTask = 0;
            console.log("select task")
            this.stopScenes();
            this.scene.run('Task');
            this.scene.bringToTop('ShowMenu'); 
        })
        
        let logout = this.add.sprite(this.scale.width*.85, this.scale.height*.06, 'logout').setScale(1.5);
        logout.setInteractive();
        logout.on('pointerdown', () =>{
            window.location.href = 'https://icopico-bcit.herokuapp.com/';
        })
    }
    stopScenes(){
        console.log("stop scenes");
        this.scene.stop('Task');
        this.scene.stop('Shop');
        this.scene.stop('Pethub');
    }
    
}