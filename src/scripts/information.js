console.log('information 1 loading');
var updateHunger = 0; //used when we feed pet
var runningScenes = [];
var newTask = 0;
    // let information = ['shinyboi', 'shinyboi', 'shinyboi'];

    // var player = {
    //     // 'happiness' :[20, 60, 70],

    //     'activePet' : 0,
    //     'food':[
    //         {'foodType': 'carrot' , 'amount' : 2}
    //     ],


    //     'money' : 30,
    //     'items' : [],
    //     // 'pet1' : {
    //     //     'happiness' : 20
    //     // },
    //     // 'pet2' : {
    //     //     'happiness' : 60
    //     // },
    //     // 'pet3' : {
    //     //     'happiness' : 70
    //     // }

    //     'lastlogin' : currentDate
    // };

var playerTasks = [];

// var playerPets = {'pet' : [
//     {'currentHappiness' : 20,
//     'currentHunger' : 100,
//     'petID' : 1,
//     'recycling': 0,
//     'utility' : 0,
//     'health' : 0},
//     {'currentHappiness' : 60,
//     'currentHunger' : 40,
//     'petID' : 1,
//     'recycling': 0,
//     'utility' : 0,
//     'health' : 0},
//     {'currentHappiness' : 100,
//     'currentHunger' : 40,
//     'petID' : 1,
//     'recycling': 0,
//     'utility' : 0,
//     'health' : 0}
// ]
// }
// let currentDate = new Date(); //last login sample data

// var lastLogin = currentDate;
var pets = {"pet" : [
    {"petName": "shinyboi", "cost" : 100, 'info': 'Cute little Shinyboi'},
    {"petName": "dogboi", "cost" : 100, 'info': "Who doesn't want a dogboi"},
    {"petName": "octoboi", "cost" : 100, 'info': 'Mustache octoboi'},
    //food
    {"petName": "eggboi"},
    {"petName": "potatoboi"},
    {"petName": "sushiboi"},
    //exersize
    {"petName": "legboi"},
    {"petName": "longboi"},
    {"petName": "muscleboi"},
    //utility
    {"petName": "whaleboi"},
    {"petName": "fluffboi"},
    {"petName": "jellyboi"},
    //recyle
    {"petName": "planteyboi"},
    {"petName": "squidboi"}
]};
let foodTypes = {'food' : [
    {'type' : 'icecream', 'cost' : 20, 'hungerIncrease' : 20, 'info' : 'Gives your pet some satisfaction'},
    {'type' : 'carrot', 'cost' : 30, 'hungerIncrease': 30, 'info': 'Your pet will love eating this'},
    {'type' : 'donut', 'cost' : 10, 'hungerIncrease': 10, 'info': 'Just a snack'}
]};

var task_list = {"task" : [
  {
    "id": "0",
    "title": "Around the World",
    "description" : "Ride your bike around town",
    "evolutionType" : 'health',
    "icon": "type1"
  },
  {
    "id": "1",
    "title": "Turn off the lights",
    "description" : "Turn off the lights when you leave the house",
    "evolutionType" : 'utility',
    "icon": "type2"
  },
  {
    "id": "2",
    "title": "Take out the recycling",
    "description": "Remember to separate the plastic from the garbage",
    "evolutionType" : 'recycling',
    "icon": "type3"
  },
  {
    "id": "3",
    "title": "Eco Grocery Shopping",
    "description": "Take the bus, walk, or bike to go grocery shopping",
    "evolutionType" : 'recycling',
    "icon": "type4"
  },
  {
    "id": "4",
    "title": "Transit to Work",
    "description": "Take the bus, walk, or bike to work",
    "evolutionType" : 'health',
    "icon": "type5"
  },
  {
    "id": "5",
    "title": "Reusable Bags",
    "description": "For the next week use reusable bags instead of plastic",
    "evolutionType" : 'recycling',
    "icon": "type5"
  },
  {
    "id": "6",
    "title": "Reusable Water Bottle",
    "description": "Use a reussable waterbottle instead of plastic",
    "evolutionType" : 'recycling',
    "icon": "type3"
  },
  {
    "id": "7",
    "title": "Thermos",
    "description": "Use a Thermos to buy coffee/tea instead of a disposible cup or make your own",
    "evolutionType" : 'recycling',
    "icon": "type3"
  },
  {
    "id": "8",
    "title": "Turn off the tap",
    "description": "Turn off the water when brushing your teeth",
    "evolutionType" : 'utility',
    "icon": "type2"
  },
  {
    "id": "9",
    "title": "Turn off the shower",
    "description": "Turn off the water when washing your hair",
    "evolutionType" : 'utility',
    "icon": "type1"
  },
]};
// believe this is the create tasks function?
function updateTaskList(){
  if(playerTasks[0] != null){
    taskListInfo.taskIDa =playerTasks[0];
    console.log("task id a " + taskListInfo.taskIDa);
  }
  else{
    taskListInfo.taskIDa = null;
    console.log("task id a " + taskListInfo.taskIDa);
  }
  if(playerTasks[1] != null){
    taskListInfo.taskIDb =playerTasks[1];
    console.log("task id b " + taskListInfo.taskIDb);
  }
  else{
    taskListInfo.taskIDb = null;
    console.log("task id b " + taskListInfo.taskIDb);
  }
  if(playerTasks[2] != null){
    taskListInfo.taskIDc =playerTasks[2];
    console.log("task id c " + taskListInfo.taskIDc);
  }
  else{
    taskListInfo.taskIDc = null;
    console.log("task id c " + taskListInfo.taskIDc);
  }
  console.log("task list information " + taskListInfo.taskIDa + taskListInfo.taskIDb + taskListInfo.taskIDc);
 
}

// console.log('current date '+ currentDate);
// var timeNow = new Date('2019-05-14T18:21:00');
// console.log('time now ' + timeNow);
// console.log((timeNow.getTime() - currentDate.getTime())/3600000);
