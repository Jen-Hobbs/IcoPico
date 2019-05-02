class Task extends Phaser.Scene {
    constructor(){
        super({key:"Task", active:false});
    }
    preload(){
        this.load.image("menu", 'testImages/menu.png')
    }
    create(){
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky'); 
        this.add.text(this.scale.width/2, this.scale.height/2, "task");
        let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menu');  
    
        menu2.setInteractive();
        menu2.on('pointerdown', ()=> {
            console.log("task");
            this.scene.launch('ShowMenu');     
        })
    }
    
}