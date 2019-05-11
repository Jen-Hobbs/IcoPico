class Purchase extends Phaser.Scene {
    constructor(){
        super({key:"Purchase", active:false});
    }
    init(data){
        this.info = data.getData("locate");
        this.type = data.getData("type");
        console.log('init');
    }
    preload(){
        this.load.image('backdrop', '../images/icons/purchase_screen.png');
        this.load.image('purchase', '../images/buttons/Other/purchase_button.png');
        this.load.image('x', '../images/buttons/Other/x.png');
        
        if(this.type == 'pet'){
            //if(player.money < pets.pet[this.info].cost){
                console.log("buy pet");
                this.load.image('item', '../images/pets/' + this.info.petName + '.png');
            // }
            // else{
            //     console.log('not enough');
            //     this.add.text(this.scale.width/2, this.scale.height/2, 'Insufficient Funds');
            // }
        }
        else{
            //this.load.image('item', )
        }
    }
    create(){
        console.log(pets.pet[this.info].petName);
        this.add.sprite(this.scale.width/2, this.scale.height/2, 'backdrop');
        if(this.type == 'pet'){
            if(player.money <= this.info.cost){
                console.log("buy pet");
                this.add.sprite(this.scale.width/2, this.scale.height*.48, 'item').setScale(.1);
            }
            else{
                console.log('not enough');
                this.add.text(this.scale.width/2, this.scale.height/2, 'Insufficient Funds');
            }
        }
        else{
            //this.load.image('item', )
        }
        var close = this.add.sprite(this.scale.width*.41, this.scale.height*.41, 'x');
        close.setInteractive();
        close.on('pointerdown', ()=>{
            this.scene.stop('Purchase');
            this.scene.run('Shop');
        });
        var purchase = this.add.sprite(this.scale.width*.56, this.scale.height*.58, 'purchase');
        purchase.setInteractive();
        purchase.on('pointerdown', ()=>{
            console.log(this.info);
            console.log(this.type);
        });
       
    }
}