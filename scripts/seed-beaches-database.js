var async = require('async');
var mongoose = require('mongoose');
var Beach = require('../lib/beaches.js');

// var removeBeaches = function(done){
//   Beach.remove({}, done);
// };

var ogunquit = function(done){
  Beach.create({
    name: 'Ogunquit',
    lat: 43.3508,
    lng: -70.7315,
    thumbnail: [],
    comments: [{
      body: 'if you are going on the weekend, make sure you get there before 9 if you wanna be close to the beach',
      commentType: 'parking'
    },
    {
      name:'Frills',
      body: 'you gotta go to Frills. small place but they make great mojitos and the jerk wings are the best',
      commentType: 'restaurants'
    },
    {
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
    thumbnail: [],
    comments: [{
      body: 'you gotta take the steam boat in',
      commentType: 'parking'
    },
    {
      name:'Boarding House',
      body: 'very nice place to take your lady to',
      commentType: 'restaurants'
    },
    {
      body: 'shopping',
      commentType: 'activities'
    }]

  }, done);
};

var lucy = function(done){
  Beach.create({
    name: 'Lucy Vincent Beach',
    lat: 41.33845,
    lng: -70.72669,
    thumbnail: [],
    comments: [{
      body: 'you gotta take the steam boat in',
      commentType: 'parking'
    },
    {
      name:'Boarding House',
      body: 'very nice place to take your lady to',
      commentType: 'restaurants'
    },
    {
      body: 'shopping',
      commentType: 'activities'
    }]

  }, done);
};

Beach.find({}, function(err, beaches) {
  if(!beaches.length || !beaches) {
    async.series([
      ogunquit,
      nantucket,
      lucy
      ],

      function(err){
        if(err){
          console.error(err);
        }
    //  mongoose.disconnect();
      }
    );
  }
});
