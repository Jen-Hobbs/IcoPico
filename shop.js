class Shop extends Phaser.Scene {
    constructor(){
        super({key:"Shop", active:false});
    }
    preload(){
<<<<<<< HEAD
        this.load.image("menu", 'testImages/menu.png')
    }
    create(){
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');     
        this.add.text(this.scale.width/2, this.scale.height/2, "shop");
        let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menu');  
    
        menu2.setInteractive();
        menu2.on('pointerdown', ()=> {
            this.scene.launch('ShowMenu');     
        })
=======
        this.load.image('sky', 'testImages/sky.png');
    }
    create(){
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'sky');    

        this.add.text(20, 20, "text");
>>>>>>> parent of cb1994f... Merge branch 'Joanna'
    }
    
}