class Task extends Phaser.Scene {
    constructor(){
        super({key:"Task", active:false});
    }
    preload(){
        this.load.image('backTask', 'testImages/sky.png');
        this.load.image("menuTask", 'testImages/menu.png');
    }
    create(){
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'backTask'); 
        this.add.text(this.scale.width/2, this.scale.height/2, "task");
        let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menuTask');  
    
        menu2.setInteractive();
         menu2.on('pointerdown', ()=> {
            this.scene.run('ShowMenu');
            this.scene.bringToTop('ShowMenu');   
        })
    }
    
}