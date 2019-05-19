/**
 * Server database
 *
**/

const express = require('express');
const mysql = require('mysql');

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

const app = express();

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM Account WHERE id = ${req.params.id}`;
    // we use backticks because we want to put a variable in
    // ${varname} -> template string to put a variable
    // req.params.id -> selects from the url :id
    let query = db.query(sql, (err, result) => {
        if (err) {
            return console.error('error: ' + err.message);
        }
        //console.log(JSON.stringify(result));
        // use code above to return a JSON array
        console.log(result);
        //res.send('Post fetched...');
    });
});

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

app.listen('8000', () => {
    console.log('Server started on port 8000');
})
