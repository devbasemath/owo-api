var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes  = require('./app/routes/invoice');
var Invoice  = require('./app/models/invoice');
var helmet = require('helmet');

// Security; XSS Protection, anti-Clickingjacking
// Context-Security-Policy header etc
app.use(helmet());

// Configure app for bodyParser()
// Let us grab data form the body of a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// // Set up port for server to listen on
var port = process.env.PORT || 3000;

// // Connect to DB
mongoose.connect('mongodb://localhost:27017/invoice');

routes(app);

//Fire up server
app.listen(port);

// Print friendly message to console
console.info('Server listening on port: ' + port)

