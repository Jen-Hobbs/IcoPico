class test extends Phaser.Scene{
    constructor(){
        super({key:'test', active: true})
    }
    preload ()
    {
        this.load.image('backPet', 'one.png');
        this.load.image('two', 'two.png');
        this.load.image('three', 'three.png');
        // this.load.image('pic', 'screen.png');
        
    }
    create(){
        var container = this.add.container(200,0);
        container.add(this.add.sprite(this.scale.width/2, this.scale.height/2, 'backPet'));
        var two = this.add.container(100, 0);
        two.add(this.add.sprite(this.scale.width/2, this.scale.height/2, 'three'));
        var three = this.add.container(0, 0);
        three.add(this.add.sprite(this.scale.width/2, this.scale.height/2, 'two'));
        //  Set the camera bounds to be the size of the image
        // this.add.image(0, 0, 'pic').setOrigin(0);

        //  Set the camera bounds to be the size of the image
         this.cameras.main.setBounds(0, 0, 300 , 600);

        //  Camera controls
        var cursors = this.input.keyboard.createCursorKeys();
       
        
    var controlConfig = {
        camera: this.cameras.main,
        left: pointer.left,
        right: pointer.right,
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    

    }
    update(time, delta){
        controls.update(delta);
    }
}

var config = {
    
    parent: 'wrapper',
    scale: {
        mode: Phaser.Scale.FIT ,
        width: 100,
        height:600,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter
               
    },
    scene: [test]
    
};

var game = new Phaser.Game(config);
var controls;