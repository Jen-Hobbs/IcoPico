class Task extends Phaser.Scene {
    constructor(){
        super({key:"Task", active:false});
    }

    preload() {
        //asset preload
        this.cameras.main.setBackgroundColor('#aaa');
        this.load.image("menuPet", '/src/images/buttons/Other/menu.png');
        this.load.image("task_new", '/../src/images/buttons/task_hub/task_new.png');
        this.load.image("task_done", '/src/images/buttons/task_hub/task_done.png');
        this.load.image("type1", '/src/images/buttons/pet_hub/black_heart.png');
        this.load.image("type2", '/src/images/buttons/pet_hub/red_heart.png');
        this.load.image("type3", '/src/images/buttons/pet_hub/yellow_heart.png');
        this.load.image("menuPet", '/src/images/buttons/Other/menu.png');
        this.cameras.main.setBackgroundColor('#aaa');  
    }

    create() {
        var MAX_NUM_TASKS = 3;
        var taskButtons = [];

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

        for(let i = 0; i < MAX_NUM_TASKS; i++)
        {
          //instantiate new button
          //constructor(scene, x, y, texture, index, icon, type, title, description, isActive, callback)
          taskButtons[i] = new TaskButton
            (this, 100, 100*i, 'task_new', i, 3,
              "Test Title" + i, "This is a really cool description", false, () => this.setSelected());
                
          //add button to canvas
          this.add.existing(taskButtons[i]);
        }
    }  

    update() {}

    //callback method for click
    setSelected(clickedTaskIndex) {
        let status = this.taskButtons[clickedTaskIndex].isActive = true;
        console.log('Task at index: ' + this.clickedTaskIndex + ' is ' + this.status);
    }
}