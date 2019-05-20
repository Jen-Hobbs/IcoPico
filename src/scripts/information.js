
    let information = ['shinyboi', 'shinyboi', 'shinyboi'];
    var runningScenes = [];
    var newTask = 0;
    
    let currentDate = new Date('2019-05-18T13:41:00'); //last login sample data
    var player = {
        // 'happiness' :[20, 60, 70],
        
        'activePet' : 0,
        'food':[
            {'foodType': 'carrot' , 'amount' : 2}
        ],


        'money' : 30,
        'items' : [],
        // 'pet1' : {
        //     'happiness' : 20
        // },
        // 'pet2' : {
        //     'happiness' : 60
        // },
        // 'pet3' : {
        //     'happiness' : 70
        // }

        'lastlogin' : currentDate
    };

var playerTasks = {'task' :[
    {'taskIDa': 1},
    {'taskIDb': 2},
    {'taskIDc': 3}
]};

var playerPets = {'pet' : [
    {'currentHappiness' : 20,
    'currentHunger' : 100},
    {'currentHappiness' : 60,
    'currentHunger' : 40},
    {'currentHappiness' : 100,
    'currentHunger' : 40}
] 
}
    var pets = {"pet" : [
        {"petName": "shinyboi", "cost" : 100}
    ]};
    let foodTypes = {'food' : [
        {'type' : 'icecream', 'cost' : 20},
        {'type' : 'carrot', 'cost' : 10},
        {'type' : 'donut', 'cost' : 30}
    ]};
    
var updateHunger = 0; //used when we feed pet

    var task_list = {"task" : [
        {
          "id": "1",
          "title": "Around the World",
          "description" : "Ride your bike around town",
          "icon": "type1"
        },
        {
          "id": "2",
          "title": "Turn off the lights",
          "description" : "Turn off the lights when you leave the house",
          "icon": "type2"
        },
        {
          "id": "3",
          "title": "Take out the recycling",
          "description": "Remember to separate the plastic from the garbage",
          "icon": "type3"
        },
        {
            "id": "4",
            "title": "Eco Grocery Shopping",
            "description": "Take the bus, walk, or bike to go grocery shopping",
            "icon": "type4"
          },
          {
            "id": "5",
            "title": "Transit to Work",
            "description": "Take the bus, walk, or bike to work",
            "icon": "type5"
          },
          {
            "id": "6",
            "title": "Reusable Bags",
            "description": "For the next week use reusable bags instead of plastic",
            "icon": "type5"
          },
          {
            "id": "7",
            "title": "Reusable Water Bottle",
            "description": "Use a reussable waterbottle instead of plastic",
            "icon": "type3"
          },
          {
            "id": "8",
            "title": "Thermos",
            "description": "Use a Thermos to buy coffee/tea instead of a disposible cup or make your own",
            "icon": "type3"
          },
          {
            "id": "9",
            "title": "Turn off the tap",
            "description": "Turn off the water when brushing your teeth",
            "icon": "type2"
          },
          {
            "id": "10",
            "title": "Turn off the shower",
            "description": "Turn off the water when washing your hair",
            "icon": "type1"
          },
    ]};

// console.log('current date '+ currentDate);
// var timeNow = new Date('2019-05-14T18:21:00');
// console.log('time now ' + timeNow);
// console.log((timeNow.getTime() - currentDate.getTime())/3600000);
