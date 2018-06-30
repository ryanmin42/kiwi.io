const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const PORT = 8080;
const app = express();
app.use('/', express.static(path.join(__dirname, '../site')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(PORT);

const fabric = require('fabric-client');
const fabricCert = require('fabric-ca-client');