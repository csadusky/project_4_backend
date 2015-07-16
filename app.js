var express = require("express");
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var logger= require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var cors = require('cors');
require('dotenv').load();
//connecting app to mongo database
mongoose.connect(config.mongo.dbUrl);
// mongoose.createConnection('mongodb://localhost/beaches');
require('./scripts/seed-beaches-database.js');
var Beach = require('./lib/beaches.js');
app.use(logger());
app.use(cors({
  origin: '*', // change this to the front-end's domain in production
//  methods : [''] // uncomment and fill in if using PUT, DELETE, etc. methods
}));
//Use for authentication
app.use(session({
  secret:"its a secret",
  cookie : {
    httpOnly : true,
    secure : false
  }//,
  // store: new MongoStore...
}));
var api = require('instagram-node').instagram();

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
      res.sendStatus(401);
    } else {
      req.session.aToken = result.access_token;

/*      if(req.socket.remoteAddr === '127.0.0.1'){
        res.redirect('http://localhost:5000');
      } else {*/
        console.log('Yay! Access token is ' + result.access_token);
        res.send('You made it!!');
      //}
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
    beach[0].getPictures(api).then(function(media) {
      res.json(media);
    }).catch(function(err) {
      res.json({
        error : 'yes',
        stack : err.stack
      });
    });
    //res.json(beach);
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
      name: req.body.comment_name,
      body: req.body.comment_body,
      commentType: req.body.comment_commentType
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


var server = app.listen(config.serverPort, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = app;

