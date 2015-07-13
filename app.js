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
var api = require('instagram-node').instagram();

// app.configure(function() {
//   client_id: process.env.YOUR_CLIENT_ID,
//   client_secret: process.env.YOUR_CLIENT_SECRET
// });

api.use({
  client_id: process.env.YOUR_CLIENT_ID,
  client_secret: process.env.YOUR_CLIENT_SECRET
});

var redirect_uri = 'https://fast-brook-4146.herokuapp.com/auth';

authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri));
};

handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

// This is where you would initially send users to authorize
app.get('/', authorize_user);
// This is your redirect URI
app.get('/auth', handleauth);



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

app.post('/beaches/:name', jsonParser);
app.post('/beaches/:name', function(req,res){
  console.log(req.body);
  Beach.findOne({name: req.params.name}, function(error, beach){
    if(error){
      console.error(error)
    }
    beach.comments.push({
      name: req.body.comment.name,
      body: req.body.comment.body,
      commentType: req.body.comment.commentType
    });
    beach.save(function(error, beach){
      if(error){
        console.error(error);
      }else{
        res.send('Comment added!');
      }
    });
  });
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;

