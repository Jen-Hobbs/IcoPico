
class Pethub extends Phaser.Scene {
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
        this.load.image('backPet', '../images/Sad_Appartment.png');
        this.load.image('sad', '../images/buttons/pet_hub/sad.png');
        this.load.image('thought', '../images/icons/4th_bubble.png');
        this.load.image('hungry', '../images/buttons/pet_hub/hungry.png');
        this.hunger = [];
        this.hungerBubble = [];
        this.sad = [];
        this.sadBubble = [];

    }
    /**
     * create positioning of pet
     * sets up camera for multiple pets using arrows on screen to move between pets
     */
    create() {   
        console.log("current pet" + player.activePet);
        this.resetFood = 0;
        this.cameras.main.setBounds(0, 0, 800 * information.length, 400);
        this.cameras.main.setBackgroundColor('#aaa');
        this.pet = [];
        var arrowR = [];
        var arrowL = [];

        //create container for all information about pet and Flip between pets
        for (var i = 0; i < information.length; i++) {
           

            //right arrow
            arrowR[i] = this.add.sprite(this.scale.width * 0.95, this.scale.height / 2, 'arrow');
            arrowR[i].setInteractive();
            arrowR[i].on('pointerdown', () => {
                var cam = this.cameras.main;
                if (player.activePet < information.length - 1) {
                    player.activePet++;
                }
                else {
                    player.activePet = 0;
                }
                cam.centerOn(400 + 800 * player.activePet, 0);
            });
            //left arrow
            arrowL[i] = this.add.sprite(this.scale.width * 0.04, this.scale.height / 2, 'arrow');
            arrowL[i].flipX = !arrowL[i].flipX;
            arrowL[i].setInteractive();
            arrowL[i].on('pointerdown', () => {
                var cam = this.cameras.main;
                if (player.activePet == 0) {
                    player.activePet = information.length - 1;
                }
                else {
                    player.activePet--;
                }
                cam.centerOn(400 + 800 * player.activePet, 0);
            });
            



            this.pet[i] = this.add.container(i * 800, 0);
            this.pet[i].add(this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'backPet')); //background
            this.pet[i].add(this.add.sprite(this.scale.width / 2, this.scale.height *.97, 'pet' + i).setOrigin(0.5,1)); //addpet
            this.pet[i].add(arrowR[i]);
            this.pet[i].add(arrowL[i]);
            
            this.checkHunger(i, this.pet);
            this.checkHappiness(i, this.pet);
            var cam = this.cameras.main;
            cam.centerOn(400 + 800 * player.activePet, 0);

        }
        
    }
    /**
     * update status of pet
     */
    update() {
        //update hunger
        if(updateHunger == 1){
            console.log("hi" + this.pet[player.activePet].getIndexList());
            //console.log(this.hungerBubble);
            this.pet[player.activePet].remove(this.hungerBubble[player.activePet]);
            this.pet[player.activePet].remove(this.hunger[player.activePet]);
            this.checkHunger(player.activePet, this.pet);
            
            updateHunger = 0;
        }
        //for happiness from tasks
    

    }
    /**
     * check happiness of the pet and create thought bubble corrisponding status
     * @param {pet number} i 
     * @param {pet object} pet 
     */
    checkHappiness(i, pet) {
        //console.log(playerPets.pet[i].currentHappiness);
        if (playerPets.pet[i].currentHappiness < 33) {
            this.sadBubble[i] = this.add.sprite(this.scale.width*.28, this.scale.height *.45, 'thought').setFlipX(true);
            this.sad[i] = this.add.sprite(this.scale.width*.29, this.scale.height *.37, 'sad');
            pet[i].add(this.sadBubble[i]);
            pet[i].add(this.sad[i]);
        }
        else if (playerPets.pet[i].currentHappiness < 66) {
            this.sadBubble[i] = this.add.sprite(this.scale.width*.28, this.scale.height *.45, 'thought').setFlipX(true);
            this.sad[i] = this.add.sprite(this.scale.width*.29, this.scale.height *.37, 'sad');
            pet[i].add(this.sadBubble[i]);
            pet[i].add(this.sad[i]);
        }
        
        
    }
    /**
     * check hunger of the pet and create thought bubble corrisponding status
     * @param {pet number} i 
     * @param {pet object} pet 
     */
    checkHunger(i, pet){
        //console.log(playerPets.pet[i].currentHappiness);
        
       
        if (playerPets.pet[i].currentHunger < 33) {
            this.hungerBubble[i] = this.add.sprite(this.scale.width*.73, this.scale.height *.35, 'thought');
            this.hunger[i] = this.add.sprite(this.scale.width*.71, this.scale.height *.27, 'hungry');
            pet[i].add(this.hungerBubble[i]);
            pet[i].add(this.hunger[i]);
        }
        else if (playerPets.pet[i].currentHunger < 66) {
            this.hungerBubble[i] = this.add.sprite(this.scale.width*.73, this.scale.height *.35, 'thought');
            this.hunger[i] = this.add.sprite(this.scale.width*.71, this.scale.height *.27, 'hungry');
            pet[i].add(this.hungerBubble[i]);
            pet[i].add(this.hunger[i]);
        }

    }
}

