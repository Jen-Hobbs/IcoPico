/**
 * Server database
 *
**/

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // gets the body content
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



/***** GETTING PLAYER'S INITIAL DATA (assuming they already exist) */

// Gets player info
app.get('/getinitialinfo/:id', (req, res) => {
    let sql = `SELECT * FROM Player WHERE accountEmail = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));

    });
});

// Gets player lastLogin info
app.get('/getlastlogininfo/:id', (req, res) => {

    let sql = `SELECT lastLogin FROM Account WHERE email = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));

    });
});
// Gets player's PlayerPet info
app.get('/getplayerpet/:id', (req, res) => {
    let sql = `SELECT * FROM PlayerPet WHERE playerID = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Gets player's Inventory info
app.get('/getinventory/:id', (req, res) => {
    let sql = `SELECT * FROM Inventory WHERE playerID = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Gets player's TaskList info
app.get('/gettasklist/:id', (req, res) => {
    let sql = `SELECT * FROM TaskList WHERE playerID = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});


/***** UPDATING PLAYER'S EXISTING DATA (assuming they already exist) */

// Updates TaskList info
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
        //console.log(req.body);
        //console.log(JSON.parse(JSON.stringify(result)));
        //res.send(JSON.stringify(result));
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
app.get('/insertinventory/:id/:itemID', (req, res) => {
    
    // deleting row from the player's inventory
    let sqlA = `INSERT INTO Inventory(itemID, playerID, itemQty)
    VALUES(${req.params.itemID}, ${req.params.playerID}, 1)`;

    let queryA = db.query(sqlA, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log('insert Inventory success');
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

/***** CREATING PLAYER DATA FOR A NEW PLAYER */

// Creates a row in the Account table and gets back log-in value
app.get('/createaccount/:email', (req, res) => {

    let sqlA =  `INSERT INTO Account(email) VALUES(${req.params.email})`;
    let queryA = db.query(sqlA, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log('creating a new Account row success');
    });

    let sqlB = `SELECT lastLogin FROM Account WHERE email = ${req.params.email}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));

    });
});

// Creates a row in the Player table and gets back playerInfo
app.get('/createplayer/:email', (req, res) => {
    let sqlA = `INSERT INTO Player(accountEmail) VALUES(${req.params.email})`;
    let queryA = db.query(sqlA, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log('creating a new Player row success');
    });

    let sqlB = `SELECT * FROM Player 
    WHERE accountEmail = ${req.params.email}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});

// Creates a row in the Inventory table and gets back inventoryInfo
// This is different from /insertinventory/ request,
// because a default item is given whenever a new player signs up 
app.get('/createinventory/:id', (req, res) => {
    let sqlA = `INSERT INTO Inventory(playerID, itemID, itemQty)
     VALUES(${req.params.id}, 1, 1)`;
    let queryA = db.query(sqlA, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log('creating a new Inventory row success');
    });

    let sqlB = `SELECT * FROM Inventory 
    WHERE playerID = ${req.params.id}`;
    let queryB = db.query(sqlB, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});


// app.listen('8080', () => {
//     console.log('Server started on port 8080');
// })

var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
