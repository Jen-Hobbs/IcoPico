/**
 * Server database
 *
**/

const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');

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

//hi, if you add a page you need to add an app.use and app.get
app.use('/', express.static('/'));
app.use('/src/css', express.static(path.join(__dirname, 'src', 'css')));
app.use('/src/scripts', express.static(path.join(__dirname, 'src', 'scripts')));
app.use('/src/images', express.static(path.join(__dirname, 'src', 'images')));
app.use('/src/icopico', express.static(path.join(__dirname, 'src', 'icopico')));
app.use('/src/login', express.static(path.join(__dirname, 'src', 'login')));
app.use('/src/signup', express.static(path.join(__dirname, 'src', 'signup')));
app.use('/src/signup', express.static(path.join(__dirname, 'src', 'signup')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/aboutPage.html', (req, res) => {
    res.sendFile(path.join(__dirname,'aboutPage.html'));
});


app.get('/src/icopico/icopico.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'icopico', 'icopico.html'));
});

app.get('/src/login/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login', 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login', 'login.html'));
});

app.get('/src/signup/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup', 'signup.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup', 'signup.html'));
});


// app.use(express.static('./'));
// app.use(express.static('src'));
//
// app.use('/css', express.static(__dirname + '/src/css'));
// app.use('/scripts', express.static(__dirname + '/src/scripts'));
// app.use('/images', express.static(__dirname + '/src/images'));
// app.use('login.html', express.static('/src/login/login.html'));
// app.use('icopico.html', express.static('/src/icopico/icopico.html'));
// app.use('icopico.html', express.static('/src/icopicoPet/icopico.html'));

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

//update hunger
app.get('/updatecurrenthappiness/:id/:petID/:newHappiness', (req, res) => {
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

var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
