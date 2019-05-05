class Shop extends Phaser.Scene {
    constructor(){
        super({key:"Shop", active:false});
    }
    preload(){
        this.load.image('backShop', 'testImages/sky.png');
        this.load.image("menuShop", 'testImages/menu.png');
    }
    create(){
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'backShop');     
        this.add.text(this.scale.width/2, this.scale.height/2, "shop");
        let menu2 = this.add.sprite(this.scale.width*.05, this.scale.height*.05, 'menuShop');  
    
        menu2.setInteractive();
        menu2.on('pointerdown', ()=> {
            this.scene.run('ShowMenu');
            this.scene.bringToTop('ShowMenu');  
        });
        console.log(information[0]);
    }
    
}