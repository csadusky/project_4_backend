var express = require("express");
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var logger= require('morgan');
var express_session = require('express-session');
require('dotenv').load();

//connecting app to mongo database
console.log(config.mongo.dbUrl);
mongoose.connect(config.mongo.dbUrl);

app.use(logger());
//Use for authentication
// app.use(express_session({secret:"its a secret"}));
var Beach = require('/lib.beaches.js');
//DEPLOYMENT TEST
app.get('/', function(request, response) {
  response.send('Hello World!');
});

//INSTAGRAM CALLBACK
// app.get('/callback' function(request, response){
//   response.send()
// })

module.exports = app;
