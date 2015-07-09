var express = require("express");
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var logger= require('morgan');
var express_session = require('express-session');
require('dotenv').load();

//connecting app to mongo database
mongoose.connect(config.mongo.dbUrl);

app.use(logger());
//Use for authentication
// app.use(express_session({secret:"its a secret"}));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

module.exports = app;
