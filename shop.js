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
        
        console.log(information[0]);
    }
    
}