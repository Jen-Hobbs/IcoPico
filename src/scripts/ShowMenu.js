class ShowMenu extends Phaser.Scene {
    constructor(){
        super({key:"ShowMenu", active:false});
        
        
    }
    init(data){
        this.runningScenes = data;
        console.log("init started data pased in " + this.runningScenes);
    }
    preload(){
        this.load.image("menu", '../images/buttons/other/menu.png');
        this.load.image("buttonTask", '../images/buttons/scene_button/Task_Button.png');
        this.load.image('buttonShop', '../images/buttons/scene_button/Shopping_Button.png');
        this.load.image('buttonPethub', '../images/buttons/scene_button/PetHub_Button.png');
        this.load.image('logout', '../images/buttons/scene_button/logout_Button.png');
        
    }
    create(){
        // let graphics = this.add.graphics();
        // graphics.fillStyle(0X38a081,.8).fillRect(0,0,100, this.scale.height);
        let menu = this.add.sprite(this.scale.width*.06, this.scale.height*.06, 'menu');
        menu.setInteractive();
        menu.on('pointerdown', () => {
           this.scene.stop('ShowMenu');
        })
        let pet = this.add.sprite(this.scale.width*.06, this.scale.height*.21, 'buttonPethub');
        pet.setInteractive();
        pet.on('pointerdown', () =>{
            console.log('pet');
            this.stopScenes();
            this.scene.run("Pethub");
            this.scene.bringToTop("Pethub"); 
            this.scene.run('PethubOverlay');
            this.scene.bringToTop('PethubOverlay');      
            this.scene.stop('ShowMenu');      
        })
        let shop =  this.add.sprite(this.scale.width*.06, this.scale.height*.36, 'buttonShop');
        shop.setInteractive();
        shop.on('pointerdown', () =>{
            console.log('shop');
            this.stopScenes();
            this.scene.run('Shop');
            this.scene.bringToTop('Shop'); 
            this.scene.stop('ShowMenu');  
        })

        let task =  this.add.sprite(this.scale.width*.06, this.scale.height*.51, 'buttonTask');
        task.setInteractive();
        task.on('pointerdown', () =>{
            newTask = 0;
            this.stopScenes();
            this.scene.run('Task');
            this.scene.bringToTop('Task');  
            this.scene.stop('ShowMenu'); 
        })
        
        let logout = this.add.sprite(this.scale.width*.06, this.scale.height*.66, 'logout');
    }
    stopScenes(){
        for(var i = 0; i < this.runningScenes.length; i++){
            this.scene.stop(this.runningScenes[i]);
            console.log("running secenes" + this.runningScenes[i]);
        }
    }
    update(){

    }
    
}