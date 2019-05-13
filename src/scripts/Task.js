var MAX_NUM_TASKS = 3;

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
        //  If a Game Object is clicked on, this event is fired.
        //  We can use it to emit the 'clicked' event on the game object itself.
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('clicked', gameObject);
        }, this);

        this.taskButtons = [];

        //Create "tasks done" text to show up when there are no more tasks
        this.add.text(this.scale.width/2, 200, "All tasks complete. Great job!", {fontFamily: 'Helvetica', fontSize: 25})
          .setOrigin(0.5)
        ;

        //Create Menu Button
        let menu = this.add.sprite(this.scale.width*.04, this.scale.height*.05, 'menuPet');
        menu.setInteractive();
        menu.on('pointerdown', ()=> {
            this.scene.run('ShowMenu');
            this.scene.bringToTop('ShowMenu');
        });

        //Create dismiss task button
        var dismiss = this.add.sprite(this.scale.width/2, this.scale.height-100, "type1")
          .setScale(0.3)
          .setInteractive({ useHandCursor: true})
          .setVisible(false)
          .on('pointerup', () => {
            console.log("dismiss");
          });
        //send button to back for now until task is selected
        this.scene.sendToBack('type2');
        
        //create task list
        for(let i = 0; i < MAX_NUM_TASKS; i++)
        {
            this.taskButtons[i] = this.add.container(this.scale.width/2, 150*i + 200);
            this.taskButtons[i].setData('isActive', false);
            var sprite = this.add.sprite(0,0,'task_new')
              .setData('index', i)
              .setScale(0.3)
              .setInteractive({ useHandCursor: true })
              .on('clicked', setSelected, this);
              // var sprite_active = this.add.sprite(0,0,'task_done')
              // .setData('index', i)
              // .setScale(0.3)
              // .setInteractive({ useHandCursor: true })
              // .on('clicked', setSelected, this);
              // this.scene.sendToBack('task_done');
            var icon = this.add.sprite(125,5,'type2').setScale(0.7);
            var new_task = this.add.sprite(175,-40,'get_new')
                .setData('rindex', i)
                .setScale(1.3)
                .setInteractive({ useHandCursor: true })
                //on('event', callback method, scene)
                .on('clicked', deleteTask, this);

            var title = this.add.text(-175,-45,"Test title " + i,
                {fontFamily: 'Helvetica', fontSize: 20, wordWrap: {width: 265, useAdvancedWrap:true}})
                .setColor('black');

            var description = this.add.text(-175, -20,
              "This is a really cool description. The text wraps as it should. I am very happy. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
                {fontFamily: 'Helvetica', fontSize: 14, wordWrap: {width: 265, useAdvancedWrap:true}})
                .setColor('black');

            this.taskButtons[i].add([sprite, icon, new_task, title, description]);
        }//end for 

        //callback method for click
        function setSelected (tSprite) {
          var i = tSprite.getData('index');
          //console.log(i);
          //console.log(this.taskButtons[i].getData('isActive'));
          if(!(this.taskButtons[i].getData('isActive'))) {
              this.taskButtons[i].setData('isActive', true);
              //update sprite
              //this.scene.bringToTop()
              console.log(this.taskButtons[i].getData('isActive'));
          } else {
            this.taskButtons[i].setData('isActive', false);
            console.log(this.taskButtons[i].getData('isActive'));
          }
        }

        //callback method for deleteTask
        function deleteTask (rSprite) {
          var i = rSprite.getData('rindex');
          this.taskButtons[i].destroy();

          //shift tasks up in the array
          for(i; i < MAX_NUM_TASKS; i++)
          {
            console.log(i);
            this.taskButtons[i] = this.taskButtons[i+1];
          }

          //redraw all tasks
          var temp = [];
          temp = this.taskButtons;
          console.log(temp);
          //delete old tasklist
          for(var i = 0; i < MAX_NUM_TASKS; i++)
          {
            if(this.taskButtons[i] != null)
            {
              this.taskButtons[i].destroy();
            }
          }
          
          //redraw new tasklist
          for(var i = 0; i < MAX_NUM_TASKS; i++)
          {
            if(temp[i] != null)
            {
              //console.log('hi');
              this.taskButtons[i] = this.add.container(temp[i]);
            }
          }
        }
        
        // //make the tasks move up a position if there is a space
        // function floatUp(deletedIndex)
        // {
        //   for(var i = deletedIndex; i < MAX_NUM_TASKS; i++)
        //   {
        //     console.log(i);
        //     this.taskButtons[i] = this.taskButtons[i+1];
        //   }
        // }

        function refreshTasklist()
        {

        }
    }//end create

}
