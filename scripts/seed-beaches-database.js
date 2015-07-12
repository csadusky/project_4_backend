var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beaches');
var Beach = require('./lib/beaches.js');

// var removeBeaches = function(done){
//   Beach.remove({}, done);
// };

var ogunquit = function(done){
  Beach.create({
    name: 'Ogunquit',
    lat: 43.3508,
    lng: -70.7315,
    parkingComment: [{
      body: 'if you are going on the weekend, make sure you get there before 9 if you wanna be close to the beach',
      commentType: 'parking'
    }],
    restaurantsComment: [{
      name:'Frills',
      body: 'you gotta go to Frills. small place but they make great mojitos and the jerk wings are the best',
      commentType: 'restaurants'
    }],
    activitiesComment: [{
      body: 'there is a long path by the water that ',
      commentType: 'activities'
    }]

  }, done);
};

var nantucket = function(done){
  Beach.create({
    name: 'Nantucket',
    lat: 41.2834,
    lng: -70.0994,
    parkingComment: [{
      body: 'you gotta take the steam boat in',
      commentType: 'parking'
    }],
    restaurantsComment: [{
      name:'Boarding House',
      body: 'very nice place to take your lady to',
      commentType: 'restaurants'
    }],
    activitiesComment: [{
      body: 'shopping',
      commentType: 'activities'
    }]

  }, done);
};

async.series([
  ogunquit,
  nantucket
  ],

  function(err){
    if(err){
      console.error(err);
    }
  mongoose.disconnect();
  }
);

