
class pethub extends Phaser.Scene {
    constructor() {
        super({ key: 'Pethub', active: true })
    
    }
    init(data) {
        // console.log('init', data);
        // this.greetings = data.hi;
        // this.check = 0;

    }
    preload() {
        for (var i = 0; i < information.length; i++) {
            this.load.image('pet' + i, '../images/pets/' + information[i] + '.png');
        }
        this.load.image('arrow', '../images/buttons/Other/arrow.png');
        this.load.image('backPet', '../images/sky.png');
        this.load.image('blackHeart', '../images/buttons/pet_hub/black_heart.png');
        this.load.image('yellowHeart', '../images/buttons/pet_hub/yellow_heart.png');
        this.load.image('redHeart', '../images/buttons/pet_hub/red_heart.png');


    }

    create() {

        this.resetFood = 0;
        this.cameras.main.setBounds(0, 0, 1236 * information.length, 681);
        this.cameras.main.setBackgroundColor('#aaa');
        this.pet = [];
        var arrowR = [];
        var arrowL = [];

        //create container for all information about pet and Flip between pets
        for (var i = 0; i < information.length; i++) {
            var pos = 0;

            //right arrow
            arrowR[i] = this.add.sprite(this.scale.width * 0.95, this.scale.height / 2, 'arrow');
            arrowR[i].setInteractive();
            arrowR[i].on('pointerdown', () => {
                var cam = this.cameras.main;
                if (pos < information.length - 1) {
                    pos++;
                }
                else {
                    pos = 0;
                }
                cam.centerOn(618 + 1236 * pos, 0);
            });
            //left arrow
            arrowL[i] = this.add.sprite(this.scale.width * 0.04, this.scale.height / 2, 'arrow');
            arrowL[i].flipX = !arrowL[i].flipX;
            arrowL[i].setInteractive();
            arrowL[i].on('pointerdown', () => {
                var cam = this.cameras.main;
                if (pos == 0) {
                    pos = information.length - 1;
                }
                else {
                    pos--;
                }
                cam.centerOn(618 + 1236 * pos, 0);
            });
            



            this.pet[i] = this.add.container(i * 1236, 0);
            this.pet[i].add(this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'backPet')); //background
            this.pet[i].add(this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'pet' + i)); //addpet
            this.pet[i].add(arrowR[i]);
            this.pet[i].add(arrowL[i]);
        
            this.checkHappiness(i, this.pet);

        }
    }
    update() {


    }






    checkHappiness(i, pet) {
        console.log(player.happiness[i]);
        if (player.happiness[i] < 33) {
            pet[i].add(this.add.sprite(this.scale.width * .95, this.scale.height * .07, 'blackHeart'));
        }
        else if (player.happiness[i] < 66) {
            pet[i].add(this.add.sprite(this.scale.width * .95, this.scale.height * .07, 'yellowHeart'));
        }
        else {
            pet[i].add(this.add.sprite(this.scale.width * .95, this.scale.height * .07, 'redHeart'));
        }
    }
}

let petNumber = 3;
var config = {

    parent: 'wrapper',
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1236,
        height: 681,
        type: Phaser.AUTO,
        autoCenter: Phaser.Scale.autoCenter

    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ShowMenu, Shop, Task, Purchase, pethub, PethubOverlay]

};

var game = new Phaser.Game(config);
var player;
var display;
