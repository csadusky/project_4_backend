var express = require("express");
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var logger= require('morgan');
var express_session = require('express-session');


//connecting app to mongo database
mongoose.connect(config.mongo.dbUrl);

app.use(logger());
//Use for authentication
// app.use(express_session({secret:"its a secret"}));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
