const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

let userAuth = require('./userAuth.js');

const PORT = 3000;
const app = express();
//app.use('/', express.static(path.join(__dirname, '../site')));
app.get('/', function(req, res) {
    res.send("Hello World");    
});

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(PORT);

//const fabric = require('fabric-client');
//const fabricCert = require('fabric-ca-client');

app.post('/login', function (req, res) {
    userAuth.login(req.headers['authorization']).then(() => {
        res.status(200).end();
    }).catch((err) => {
        res.statusMessage = err.message;
        res.status(err.code).end();
    });        
});

app.post('/register', function(req, res) {
    userAuth.register(req.headers['authorization']).then(() => {
        res.status(200).end();
    }).catch((err) => {
        res.statusMessage = err.message;
        res.status(err.code).end();
    });         
});
