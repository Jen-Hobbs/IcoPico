class Task extends Phaser.Scene {
    constructor(){
        super({key:"Task", active:false});
    }

    preload() {
        //asset preload
        this.cameras.main.setBackgroundColor('#aaa');
        this.load.image("menuPet", '../images/buttons/Other/menu.png');
        this.load.image("task_new", '../images/buttons/task_hub/task_new.png');
        this.load.image("task_done", '../images/buttons/task_hub/task_done.png');
        this.load.image("type1", '../images/buttons/pet_hub/black_heart.png');
        this.load.image("type2", '../images/buttons/pet_hub/red_heart.png');
        this.load.image("type3", '../images/buttons/pet_hub/yellow_heart.png');
        this.load.image("menuPet", '../images/buttons/Other/menu.png');
        this.load.image("get_new", '../images/buttons/task_hub/get_new.png');
        this.cameras.main.setBackgroundColor('#aaa');
    }

    create() {
        var MAX_NUM_TASKS = 3;
        var taskButtons = [];

        //Title
        var shop = this.add.text(this.scale.width/2, this.scale.height*.10, "", {fontFamily: 'serif', fontSize: 64});
        shop.setOrigin(0.5);
        shop.setColor('black');

        //Placeholder Text
        this.add.text(this.scale.width/2, this.scale.height/2, "task");

        //Create Menu Button
        let menu = this.add.sprite(this.scale.width*.04, this.scale.height*.05, 'menuPet');
        menu.setInteractive();
        menu.on('pointerdown', ()=> {
            this.scene.run('ShowMenu');
            this.scene.bringToTop('ShowMenu');
        });

        //this.add.sprite(this, 100, 100, task_new);
        //console.log(Tasks_example.tasks[1].type);


        var dismiss = this.add.sprite(this.scale.width/2, this.scale.height-100, "type1")
          .setScale(0.3)
          .setInteractive({ useHandCursor: true})
          .on('pointerup', () => {

          });

          this.scene.sendToBack('type2');
        for(let i = 0; i < MAX_NUM_TASKS; i++)
        {
            taskButtons[i] = this.add.container(this.scale.width/2, 150*i + 200);
            taskButtons[i].setData('isActive', false);
            var sprite = this.add.sprite(0,0,'task_new')
              .setData('index', i)
              .setScale(0.3)
              .setInteractive({ useHandCursor: true })
              .on('clicked', setSelected, this);
            var icon = this.add.sprite(125,5,'type2').setScale(0.7);
            var new_task = this.add.sprite(175,-40,'get_new')
                .setData('rindex', i)
                .setScale(1.3)
                .setInteractive({ useHandCursor: true })
                .on('clicked', getNewTask, this);

            var title = this.add.text(-175,-45,"Test title " + i,
                {fontFamily: 'Helvetica', fontSize: 20, wordWrap: {width: 265, useAdvancedWrap:true}})
                .setColor('black');

            var description = this.add.text(-175, -20,
              "This is a really cool description. The text wraps as it should. I am very happy. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
                {fontFamily: 'Helvetica', fontSize: 14, wordWrap: {width: 265, useAdvancedWrap:true}})
                .setColor('black');

            taskButtons[i].add([sprite, icon, new_task, title, description]);

            //  If a Game Object is clicked on, this event is fired.
            //  We can use it to emit the 'clicked' event on the game object itself.
            this.input.on('gameobjectup', function (pointer, gameObject)
            {
                gameObject.emit('clicked', gameObject);
            }, this);


          //instantiate new button
          //constructor(scene, x, y, texture, index, icon, type, title, description, isActive, callback)
        //   taskButtons[i] = new TaskButton
        //     (this, this.scale.width/2, 150*i + 200,
        //         ['task_new', i, 3, "Test title" + i, "This is a really cool description", false, () => this.setSelected()])

        //     //     'task_new', i, 3,
        //     //   "Test Title" + i, "This is a really cool description", false, () => this.setSelected());

        //   //add button to canvas
        //   this.add.existing(taskButtons[i])
        //   .setScale(0.3);
        }

        //callback method for click
        function setSelected (tSprite) {
          var i = tSprite.getData('index')
          var newSprite = this.add.sprite(0,0,'task_done')
            .setData('index', i)
            .setScale(0.3)
            .setInteractive({ useHandCursor: true })
            .on('clicked', setSelected, this);
          taskButtons[i].replace(sprite,newSprite,[,true]);
        }

        function getNewTask (rSprite) {
          var i = rSprite.getData('rindex');
          taskButtons[i].destroy();
        }
    }//end create

}
