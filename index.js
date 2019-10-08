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
    console.log("Long live firebase...");
});

app.use(express.static('./'));
app.use(express.static('/src'));
app.use('index.html', express.static('index.html'));
app.use('/css', express.static(__dirname + '/src/css'));
app.use('/scripts', express.static(__dirname + '/src/scripts'));
app.use('/images', express.static(__dirname + '/src/images'));
app.use('login.html', express.static('/src/login/login.html'));
app.use('icopico.html', express.static('/src/icopico/icopico.html'));
app.use('icopico.html', express.static('/src/icopicoPet/icopico.html'));

var port = process.env.PORT || 8000;
var server = app.listen(port, function(){
    console.log("Server started at http://localhost:%s", port);
});

