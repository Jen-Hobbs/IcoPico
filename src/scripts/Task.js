class Task extends Phaser.Scene {
  constructor() {
    super({ key: "Task", active: false });
  }

  preload() {
    //emitter presets
    console.log("task script preload");


    //asset preload
    this.cameras.main.setBackgroundColor('#FF9999');
    this.load.image("menuPet", '../images/buttons/Other/menu.png');
    this.load.image("task_new", '../images/buttons/task_hub/task_new.png');
    this.load.image("task_done", '../images/buttons/task_hub/task_done.png');
    this.load.image("type4", '../images/icons/money.png');
    this.load.image("type2", '../images/food/carrot.png');
    this.load.image("type3", '../images/food/donut.png');
    this.load.image('type1', '../images/food/icecream.png');
    this.load.image('type5', '../images/buttons/pet_hub/red_heart.png');
    this.load.image("x", '../images/buttons/Other/purchase_button.png');
    this.load.image("menuPet", '../images/buttons/Other/menu.png');
    this.load.image("get_new", '../images/buttons/Other/x.png');
    console.log(pets.pet[(playerPetInfo[playerInfo.activePet].petID)].petName);
    this.load.image(pets.pet[(playerPetInfo[playerInfo.activePet].petID)].petName, '../images/pets/' + pets.pet[(playerPetInfo[playerInfo.activePet].petID)].petName + '.png');
  }

  create() {
    var CUR_NUM_TASKS = playerTasks.length;
    console.log("task script created");
    this.emitter = new Phaser.Events.EventEmitter()
    .on("taskList", updateTasks)
    .on("inventory", updateInventory)
    .on("currency", updateCurrency)
    .on("happiness", updateCurrentHappiness)
    .on("hunger", updateHung)
    .on("activePet", updateActivePet) 
    .on("newPet", insertNewPlayerPet)
    .on("lastLogin", updateLastLogin)
    .on('utility', updateUtility)
    .on('recycling', updateRecycling)
    .on('health', updateHealth);

    console.log('tasks' + playerTasks);
    var pet = {};
    pet = this.add.sprite(this.scale.width * .85, this.scale.height * .85, pets.pet[(playerPetInfo[playerInfo.activePet].petID)].petName).setScale(2);
    //  If a Game Object is clicked on, this event is fired.
    //  We can use it to emit the 'clicked' event on the game object itself.
    this.input.on('gameobjectup', function (pointer, gameObject) {
      gameObject.emit('clicked', gameObject);
    }, this);

    this.taskButtons = [];
    this.title = [];
    this.icon = [];
    this.description = [];

    //Create "tasks done" text to show up when there are no more tasks
    this.add.text(this.scale.width / 2, 300, "All tasks complete. Great job!", { fontFamily: 'Helvetica', fontSize: 25 })
      .setOrigin(0.5)
      ;

    
    if (playerTasks != 0) {
      //Create dismiss task button
      var dismiss = this.add.sprite(this.scale.width / 2, this.scale.height - 100, "x")
        .setScale(4)
        .setInteractive({ useHandCursor: true })
        .setVisible(false)
        .on('clicked', dismiss, this);
      var complete = this.add.text(this.scale.width / 2, this.scale.height - 100, "Complete", { fontFamily: 'Helvetica', fontSize: 48 }).setOrigin(0.5).setVisible(false);
      //send button to back for now until task is selected
      //this.scene.sendToBack('type2');


      //populate task list
      for (let i = 0; i < CUR_NUM_TASKS; i++) {
        console.log("number of tasks " + CUR_NUM_TASKS);
        this.taskButtons[i] = this.add.container(this.scale.width / 2, 250 * i + 300).setScale(1.7);
        //background sprite
        var sprite = this.add.sprite(0, 0, 'task_new')
          .setData('index', i)
          .setScale(0.3)
          .setInteractive({ useHandCursor: true })
          .on('clicked', setSelected, this);

        //refresh button to get new task
        var new_task = this.add.sprite(175, -40, 'get_new')
          .setData('rindex', i)
          .setScale(1)
          .setInteractive({ useHandCursor: true })
          //on('event', callback method, scene)
          .on('clicked', deleteTask, this);

        //task reward icon
        console.log('hyi' + playerTasks[i]);
        this.icon[i] = this.add.sprite(125, 0, task_list.task[playerTasks[i]].icon).setScale(0.7);

        //task title
        this.title[i] = this.add.text(-175, -45, task_list.task[playerTasks[i]].title,
          { fontFamily: 'Helvetica', fontSize: 20, wordWrap: { width: 265, useAdvancedWrap: true } })
          .setColor('black');

        //task description
        this.description[i] = this.add.text(-175, -20,
          task_list.task[playerTasks[i]].description,
          { fontFamily: 'Helvetica', fontSize: 14, wordWrap: { width: 265, useAdvancedWrap: true } })
          .setColor('black');

        //add all items to taskButton[i] container
        this.taskButtons[i].add([sprite, new_task, this.icon[i], this.title[i], this.description[i]]);
      }//end for
    }//end if

    /**
      * callback function for click
      **/
    function setSelected(tSprite) {
      var i = tSprite.getData('index');
      console.log(i);
      //switch active state
      if (!(this.taskButtons[i].getData('isActive'))) {
        this.taskButtons[i].setData('isActive', true);

        //flip background sprite to yellow or white
        this.taskButtons[i].addAt(
          this.add.sprite(0, 0, 'task_done')
            .setData('index', i)
            .setScale(0.3)
            .setInteractive({ useHandCursor: true })
            .on('clicked', setSelected, this)
          , [, 0]);
        this.taskButtons[i].removeAt(1, [, true]);
        //show delete button
        dismiss.setVisible(true);
        complete.setVisible(true);
        //console.log(this.taskButtons[i].getData('isActive'));
      } else {
        this.taskButtons[i].setData('isActive', false);
        this.taskButtons[i].addAt(
          this.add.sprite(0, 0, 'task_new')
            .setData('index', i)
            .setScale(0.3)
            .setInteractive({ useHandCursor: true })
            .on('clicked', setSelected, this)
          , [, 0]);
        this.taskButtons[i].removeAt(1, [, true]);

        //remove close button if nothing is selected
        var anyActive = false;
        for (var i = 0; i < this.taskButtons.length; i++) {
          if (this.taskButtons[i].getData('isActive')) {
            anyActive = true;
          }
        }

        if (!anyActive) {
          dismiss.setVisible(false);
          complete.setVisible(false);
        }
      }
    }

    /**
      * callback function for deleteTask button
      **/
    function deleteTask(rSprite) {

      console.log('deletTask');
      var i = rSprite.getData('rindex');

      //delete task from task_list at index
      playerTasks.splice(i, 1);
      updateTaskList();
      this.emitter.emit("taskList", taskListInfo.taskIDa, taskListInfo.taskIDb, taskListInfo.taskIDc);

      //destroy whole task list
      for (var i = 0; i < CUR_NUM_TASKS; i++) {
        this.taskButtons[i].destroy(true);
      }

      //decrease total number of tasks
      CUR_NUM_TASKS--;

      //repopulate task list
      for (let i = 0; i < CUR_NUM_TASKS; i++) {
        this.taskButtons[i] =  this.add.container(this.scale.width / 2, 250 * i + 300).setScale(1.7);

        //background sprite
        var sprite = this.add.sprite(0, 0, 'task_new')
          .setData('index', i)
          .setScale(0.3)
          .setInteractive({ useHandCursor: true })
          .on('clicked', setSelected, this);

        //refresh button to get new task
        var new_task = this.add.sprite(175, -40, 'get_new')
          .setData('rindex', i)
          .setScale(1)
          .setInteractive({ useHandCursor: true })
          //on('event', callback method, scene)
          .on('clicked', deleteTask, this);

        //task reward icon
        //task reward icon
        this.icon[i] = this.add.sprite(127, 0, task_list.task[playerTasks[i]].icon).setScale(0.7);

        //task title
        this.title[i] = this.add.text(-175, -45, task_list.task[playerTasks[i]].title,
          { fontFamily: 'Helvetica', fontSize: 20, wordWrap: { width: 265, useAdvancedWrap: true } })
          .setColor('black');

        //task description
        this.description[i] = this.add.text(-175, -20,
          task_list.task[playerTasks[i]].description,
          { fontFamily: 'Helvetica', fontSize: 14, wordWrap: { width: 265, useAdvancedWrap: true } })
          .setColor('black');

        this.taskButtons[i] =  this.add.container(this.scale.width / 2, 250 * i + 300).setScale(1.7);
        this.taskButtons[i].add([sprite, new_task, this.icon[i], this.title[i], this.description[i]]);
      }//end for

    }//end deleteTask

    /**
     * completes task
     */
    function dismiss() {
      console.log('dismiss');
      for (var i = 0; i < this.taskButtons.length; i++) {
        if (this.taskButtons[i].getData('isActive')) {
          this.addItems(i)
        }
      }
      for (var i = 0; i < this.taskButtons.length; i++) {
        if (this.taskButtons[i].getData('isActive')) {
          playerTasks.splice(i, 1);
          updateTaskList();
          CUR_NUM_TASKS--;
          this.emitter.emit("taskList", taskListInfo.taskIDa, taskListInfo.taskIDb, taskListInfo.taskIDc);
        }
      }
      //destroy whole task list
      for (var i = 0; i < this.taskButtons.length; i++) {
        this.taskButtons[i].destroy(true);
      }

      //repopulate task list
      for (let i = 0; i < CUR_NUM_TASKS; i++) {
        this.taskButtons[i] =  this.add.container(this.scale.width / 2, 250 * i + 300).setScale(1.7);

        //background sprite
        var sprite = this.add.sprite(0, 0, 'task_new')
          .setData('index', i)
          .setScale(0.3)
          .setInteractive({ useHandCursor: true })
          .on('clicked', setSelected, this);

        //refresh button to get new task
        var new_task = this.add.sprite(175, -40, 'get_new')
          .setData('rindex', i)
          .setScale(1)
          .setInteractive({ useHandCursor: true })
          //on('event', callback method, scene)
          .on('clicked', deleteTask, this);

        //task reward icon
        //task reward icon
        this.icon[i] = this.add.sprite(127, 0, task_list.task[playerTasks[i]].icon).setScale(0.7);

        //task title
        this.title[i] = this.add.text(-175, -45, task_list.task[playerTasks[i]].title,
          { fontFamily: 'Helvetica', fontSize: 20, wordWrap: { width: 265, useAdvancedWrap: true } })
          .setColor('black');

        //task description
        this.description[i] = this.add.text(-175, -20,
          task_list.task[playerTasks[i]].description,
          { fontFamily: 'Helvetica', fontSize: 14, wordWrap: { width: 265, useAdvancedWrap: true } })
          .setColor('black');

        this.taskButtons[i] =  this.add.container(this.scale.width / 2, 250 * i + 300).setScale(1.7);
        this.taskButtons[i].add([sprite, new_task, this.icon[i], this.title[i], this.description[i]]);
      }//end for

    }
  }//end create
  /**
   * change status of tasks when completing tasks
   * @param {*} i task selected
   */
  addItems(i) {
    //update task competion
    if (task_list.task[playerTasks[i]].icon == 'type1') {
      this.addFood('icecream');
      console.log('icecream');
    }
    else if (task_list.task[playerTasks[i]].icon == 'type2') {
      this.addFood('carrot')
      console.log('carrot');
    }
    else if (task_list.task[playerTasks[i]].icon == 'type3') {
      this.addFood('donut');
      console.log('donut');
    }
    else if (task_list.task[playerTasks[i]].icon == 'type4') {
      playerInfo.currency += 10;
      this.emitter.emit("currency", playerInfo.currency);

    }
    else if (task_list.task[playerTasks[i]].icon == 'type5') {
      for (var n = 0; n < playerPetInfo.length; n++) {
        playerPetInfo[n].currentHappiness += 30;
        this.emitter.emit("happiness", playerPetInfo[n].petID, playerPetInfo[n].currentHappiness);
      }

    }
    //update evolution
    if(task_list.task[playerTasks[i]].evolutionType == 'health'){
      playerPetInfo[playerInfo.activePet].health++;
      console.log('health' + playerPetInfo[playerInfo.activePet].health);
      this.emitter.emit("health", playerPetInfo[playerInfo.activePet].petID, playerPetInfo[playerInfo.activePet].health);
    }
    else if(task_list.task[playerTasks[i]].evolutionType == 'utility'){
      playerPetInfo[playerInfo.activePet].utility++;
      console.log('utility' + playerPetInfo[playerInfo.activePet].utility);
      this.emitter.emit("utility", playerPetInfo[playerInfo.activePet].petID, playerPetInfo[playerInfo.activePet].utility);
    }
    else if(task_list.task[playerTasks[i]].evolutionType == 'recycling'){
      playerPetInfo[playerInfo.activePet].recycling++;
      console.log('recycling' + playerPetInfo[playerInfo.activePet].recycling);
      this.emitter.emit("recycling", playerPetInfo[playerInfo.activePet].petID, playerPetInfo[playerInfo.activePet].recycling);
    }
  }
  /**
   * add food to inventory
   * @param  name food type
   */
  addFood(name){
    var check = 0;
      for (var i = 0; i < inventoryInfo.length; i++) {
        if (foodTypes.food[inventoryInfo[i].itemID].type == name) {
          inventoryInfo[i].itemQty++;
          check++;
          this.emitter.emit("inventory", inventoryInfo[i].itemID, inventoryInfo[i].itemQty);
        }
      }
      if (check == 0) {
        var stuff = {};
        for (var i = 0; i < foodTypes.food.length; i++) {
          if (foodTypes.food[i].type == name) {
            stuff.itemID = i;
          }
        }
        stuff.itemQty = 1;
        stuff.playerID = playerInfo.playerID;
        //missing inventory id
        inventoryInfo.push(stuff);

        console.log(inventoryInfo);
      }
  }
}//end Tasks
