var express = require("express");
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var logger= require('morgan');
var express_session = require('express-session');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
require('dotenv').load();
//connecting app to mongo database
mongoose.connect(config.mongo.dbUrl);
// mongoose.createConnection('mongodb://localhost/beaches');
var Beach = require('./lib/beaches.js');
app.use(logger());

//Use for authentication
// app.use(express_session({secret:"its a secret"}));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/beaches', function(req, res){
  Beach.find({}, function(error, beaches){
    if(error){
      console.error(error);
      res.sendStatus(404);
    }
    res.json(beaches);
  })
});

app.get('/beaches/:name', function(req, res){
  Beach.find({
    name:req.params.name
  }, function(error, beach){
    if(error){
      console.error(error);
      res.sendStatus (404);
    }
    res.json(beach);
  });
});

app.post('/:name', jsonParser);
app.post('/:name', function(req,res){
  Beach.restaurantsComment.create(req.body, function(error, comment){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }
      res.sendStatus(201);
  });
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;

