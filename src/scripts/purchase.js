class Purchase extends Phaser.Scene {
    constructor() {
        super({ key: "Purchase", active: false });
    }
    init(data) {
        this.info = data.getData("locate");
        this.type = data.getData("type");
        console.log('init');
    }
    preload() {
        this.load.image('backdrop', '../images/icons/purchase_screen.png');
        this.load.image('purchase', '../images/buttons/Other/purchase_button.png');
        this.load.image('x', '../images/buttons/Other/x.png');
        console.log("preload start");

        if (this.type == 'pet') {
            //if(player.money < pets.pet[this.info].cost){
            console.log("buy pet" + this.info.petName);
            this.load.image(this.info.petName, '../images/pets/' + this.info.petName + '.png');
            // }
            // else{
            //     console.log('not enough');
            //     this.add.text(this.scale.width/2, this.scale.height/2, 'Insufficient Funds');
            // }
        }
        else {
            //this.load.image('item', )
        }
    }
    create() {
        console.log("purchase" + this.info.petName);
        this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'backdrop');
        var purchase = this.add.sprite(this.scale.width * .56, this.scale.height * .58, 'purchase');
        var image = this.add.sprite(this.scale.width / 2, this.scale.height * .48, this.info.petName).setScale(.1);
        purchase.setInteractive();
        if (this.type == 'pet') {
           
            if (player.money >= this.info.cost) {
                this.add.text(this.scale.width * .55, this.scale.height * .57, 'Buy').setColor('black');
                console.log("buy pet");
                purchase.on('pointerdown', () => {
                    player.money = player.money - this.info.cost;
                    console.log("money left" + player.money);
                    information.push(this.info.petName);
                    player.happiness.push(50);
                    console.log("pet added" + information);
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
            else {
                console.log('not enough');
                var notEnough = this.add.text(this.scale.width *.40, this.scale.height * .45, 'Insufficient Funds', {fontFamily: 'serif', fontSize: 32}).setColor('Black');
                
                this.add.text(this.scale.width * .54, this.scale.height * .57, 'Close').setColor('black');
                purchase.on('pointerdown', () => {
                    image.destroy('purchase');
                    this.scene.stop('Purchase');
                    this.scene.run('Shop');
                });
            }
        }
        else {
            //this.load.image('item', )
        }
        var close = this.add.sprite(this.scale.width * .41, this.scale.height * .41, 'x');
        close.setInteractive();
        close.on('pointerdown', () => {
            this.scene.stop('Purchase');
            this.scene.run('Shop');
        });

        // purchase.on('pointerdown', ()=>{
        //     console.log(this.info);
        //     console.log(this.type);
        // });

    }
}