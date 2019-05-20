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

//Update attribute in databse table
app.get('/gettasklistinfo/:table:attribute:listlevel:id', (req, res) => {
    //let sql = `SELECT * FROM ${req.params.table} WHERE playerID = ${req.params.attribute}`;
    let sql = `UPDATE ${req.params.attribute} FROM ${req.params.table} WHERE playerID`
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.log('error: ' + err.message);
        }
        console.log(JSON.parse(JSON.stringify(result)));
        res.send(JSON.stringify(result));
    });
});
var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
