class Bag extends Phaser.Scene {
    constructor(){
        super({key:"Bag", active:false});
    }
    preload(){
        this.load.image("menu", 'testImages/menu.png')
    }
    create(){
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky'); 
        //this.add.text(this.scale.width/2, this.scale.height/2, "bag");
        let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menu');    
        menu2.setInteractive();
         menu2.on('pointerdown', ()=> {
            this.scene.launch('ShowMenu');      
        })
    }
    
}