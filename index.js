/**
 * Server database
 *
**/

const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
const db = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'JBLUFDmAIL',
    password : '6g5HLkJiSe',
    database : 'JBLUFDmAIL'
});

// Connect
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log("MySql connected...");
});

app.use(express.static('./'));
app.use(express.static('src'));
app.use('index.html', express.static('index.html'));
app.use('/css', express.static(__dirname + '/src/css'));
app.use('/scripts', express.static(__dirname + '/src/scripts'));
app.use('/images', express.static(__dirname + '/src/images'));
app.use('login.html', express.static('/src/login/login.html'));
app.use('icopico.html', express.static('/src/icopico/icopico.html'));
app.use('icopico.html', express.static('/src/icopicoPet/icopico.html'));


///////////////////////////////////////////////////////////////////////////////
//GETTING FROM DATABASE

//get info from Player table
app.get('/getinitialinfo/:id', (req, res) => {
    let sql = `SELECT * FROM Player WHERE accountEmail = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        //console.log(JSON.stringify(result));
        // use code above to return a JSON array
        //console.log(result);
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
        //res.write(JSON.stringify(result));
    });
});

//get lastlogin from Account table
app.get('/getlastlogin/:id', (req, res) => {
    let sql = `SELECT lastLogin FROM Account WHERE email = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

//get info from Player table
app.get('/getinitialinfo/:id', (req, res) => {
    let sql = `SELECT * FROM Player WHERE accountEmail = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        //console.log(JSON.stringify(result));
        // use code above to return a JSON array
        //console.log(result);
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
        //res.write(JSON.stringify(result));
    });
});

//get info from PlayerPet table
app.get('/getplayerpetinfo/:id', (req, res) => {
    let sql = `SELECT * FROM PlayerPet WHERE playerID = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

//get info from Inventory table
app.get('/getinventoryinfo/:id', (req, res) => {
    let sql = `SELECT * FROM Inventory WHERE playerID = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

//Get info from TaskList table
app.get('/gettasklistinfo/:id', (req, res) => {
    let sql = `SELECT * FROM TaskList WHERE playerID = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Update lastlogin (when player scrolls through pets)
app.get('/updatelastlogin/:email/:login', (req, res) => {
    let sql = `UPDATE Account SET lastLogin = ${req.params.login}
    WHERE email = ${req.params.email}`;

    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        console.log('updating lastLogin success');
        res.send(JSON.stringify(result));

    })
});

////////////////////////////////////////////////////////////////////////////////////////////////////
//UPDATING TO DATABASE

//Update tasklist
app.get('/updatetasklist/:id/:taskIDa/:taskIDb/:taskIDc', (req, res) => {

    let sqlA = `UPDATE TaskList SET taskIDa = ${req.params.taskIDa}, taskIDb = ${req.params.taskIDb},
        taskIDc = ${req.params.taskIDc} WHERE playerID = ${req.params.id}`;
    //let data = [1, 2, 3];
    req.body

    let queryA = db.query(sqlA, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log('update TaskList success');
    });

    let sqlB = `SELECT * FROM TaskList WHERE playerID = ${req.params.id}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        //res.setHeader('Content-Type', 'application/json');
        console.log("Stuff sent to server", req.body);
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Updates the Inventory table (adding/decreasing the quantity of an object)
app.get('/updateinventory/:id/:itemID/:updatedQty', (req, res) => {

    // updating the player's inventory
    let sqlA = `UPDATE Inventory SET itemQty = ${req.params.updatedQty}
    WHERE playerID = ${req.params.id} AND itemID = ${req.params.itemID}`;
    //let data = [1, 2, 3];

    let queryA = db.query(sqlA, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log('update Inventory success');
    });

    let sqlB = `SELECT * FROM Inventory WHERE playerID = ${req.params.id}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Deletes a row from the Inventory table
app.get('/deleteinventory/:id/:itemID', (req, res) => {

    // deleting row from the player's inventory
    let sqlA = `DELETE FROM Inventory WHERE
     playerID = ${req.params.id} AND itemID = ${req.params.itemID}`;

    let queryA = db.query(sqlA, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log('delete Inventory success');
    });

    let sqlB = `SELECT * FROM Inventory WHERE playerID = ${req.params.id}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Inserts a row in the Inventory table (when player buys a new item)
app.get('/insertinventory/:id/:itemID/:itemQty', (req, res) => {

    // deleting row from the player's inventory
    let sqlA = `INSERT INTO Inventory(itemID, playerID, itemQty)
    VALUES(${req.params.itemID}, ${req.params.playerID}, ${req.params.itemQty})`;
});

// Update lastlogin (when player scrolls through pets)
app.get('/updatelastlogin/:email/:login', (req, res) => {
    let sql = `UPDATE Account SET lastLogin = ${req.params.login}
    WHERE email = ${req.params.email}`;

    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        console.log('updating lastLogin success');
        res.send(JSON.stringify(result));

    })
});

//update currency
app.get('/updatecurrency/:id/:newCurrency', (req, res) => {

    let sqlB = `UPDATE Player SET currency = ${req.params.newCurrency} WHERE playerID = ${req.params.id}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

//update happiness
app.get('/updatecurrenthappiness/:id/:petID/:newHappiness', (req, res) => {
    let sqlB = `UPDATE PlayerPet SET currentHappiness = ${req.params.newHappiness}
    WHERE PlayerPet.playerID = ${req.params.id} AND petID = ${req.params.petID}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

//update utility
app.get('/updatecurrentutility/:id/:petID/:utility', (req, res) => {
    let sqlB = `UPDATE PlayerPet SET utility = ${req.params.utility}
    WHERE PlayerPet.playerID = ${req.params.id} AND petID = ${req.params.petID}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});
//update recycling
app.get('/updatecurrentrecycling/:id/:petID/:recycling', (req, res) => {
    let sqlB = `UPDATE PlayerPet SET recycling = ${req.params.recycling}
    WHERE PlayerPet.playerID = ${req.params.id} AND petID = ${req.params.petID}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});
//update health
app.get('/updatecurrenthealth/:id/:petID/:health', (req, res) => {
    let sqlB = `UPDATE PlayerPet SET health = ${req.params.health}
    WHERE PlayerPet.playerID = ${req.params.id} AND petID = ${req.params.petID}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});
//update hunger
app.get('/updatecurrenthunger/:id/:petID/:newHunger', (req, res) => {
    let sqlB = `UPDATE PlayerPet SET currentHunger = ${req.params.newHunger}
    WHERE PlayerPet.playerID = ${req.params.id} AND petID = ${req.params.petID}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Update active pet (when player scrolls through pets)
app.get('/updateactivepet/:id/:petID', (req, res) => {
    let sql = `UPDATE Player SET activePet = ${req.params.petID}
    WHERE playerID = ${req.params.id}`;

    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        console.log('updating activePet success');
        res.send(JSON.stringify(result));

    })
});

// Insert a new row in the PlayerPet table (when player gets a pet
// from the shop)
app.get('/insertnewplayerpet/:id/:petID', (req, res) => {
    let sql = `INSERT INTO PlayerPet(playerID, petID)
    VALUES(${req.params.id}, ${req.params.petID})`;

    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log('creating a new PlayerPet row success');
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    })
});


///////////////////////////////////////////////////////////////////////////////
/***** CREATING PLAYER DATA FOR A NEW PLAYER
******/

// Creates a row in the Account table
app.get('/createaccount/:email', (req, res) => {

    let sql =  `INSERT INTO Account(email) VALUES(${req.params.email})`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('createaccount error: ' + err.message);
        }
        console.log('creating a new Account row success');
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Creates a row in the Player table
app.get('/createplayer/:email', (req, res) => {
    let sql = `INSERT INTO Player(accountEmail, activePet, activeItem)
    VALUES(${req.params.email}, 0, 1)`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('createplayererror: ' + err.message);
        }
        console.log('creating a new Player row success');
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Creates a row in the Inventory table
// This is different from /insertinventory/ request,
// because a default item is given whenever a new player signs up
// Precondition: playerID is required for this query to work properly
app.get('/createinventory/:id/:itemID', (req, res) => {
    let sql = `INSERT INTO Inventory(playerID, itemID, itemQty)
     VALUES(${req.params.id}, 1, ${req.params.itemID})`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('createinventory error: ' + err.message);
        }
        console.log('creating a new Inventory row success');
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });

    // let sql2 = `INSERT INTO Inventory(playerID, itemID, itemQty)
    //  VALUES(${req.params.id}, 2, 1)`;
    // let query2 = db.query(sql, (err, result) => {
    //     if (err) {
    //         return console.log('createinventory error: ' + err.message);
    //     }
    //     console.log('creating a new Inventory row success');
    //     //console.log(JSON.parse(JSON.stringify(result)));
    //     res.send(JSON.stringify(result));
    // });

    // let sql3 = `INSERT INTO Inventory(playerID, itemID, itemQty)
    //  VALUES(${req.params.id}, 3, 1)`;
    // let query3 = db.query(sql, (err, result) => {
    //     if (err) {
    //         return console.log('createinventory error: ' + err.message);
    //     }
    //     console.log('creating a new Inventory row success');
    //     //console.log(JSON.parse(JSON.stringify(result)));
    //     res.send(JSON.stringify(result));
    // });
});

// Creates a row in the PlayerPet table, and sets a default pet
app.get('/createplayerpet/:id', (req, res) => {
    let sql = `INSERT INTO PlayerPet(playerID, petID)
    VALUES(${req.params.id}, 1)`;

    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('createplayerpet error: ' + err.message);
        }
        console.log('creating a new PlayerPet row success');
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});



// Creates a row in the TaskList table, and sets default tasks
app.get('/createtasklist/:id', (req, res) => {
    let sql = `INSERT INTO TaskList(playerID, taskIDa, taskIDb, taskIDc)
    VALUES(${req.params.id}, 1, 2, 3)`;

    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('createtasklist error: ' + err.message);
        }
        console.log('creating a new TaskList row success');
        //console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });

});


/**************************** OTHER REQUESTS FOR DB
*****
*****/

// Returns the corresponding row in the Account table that
// has the given email.
app.get('/checkaccount/:email', (req, res) => {
    let sql = `SELECT * FROM Account WHERE email = ${req.params.email}`;

    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('checkaccount error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });

});

var port = process.env.PORT || 8000;
var server = app.listen(port, function(){
   // var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

