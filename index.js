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

// Gets player info (assuming they already exist)
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

// app.listen('8080', () => {
//     console.log('Server started on port 8080');
// })

var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
