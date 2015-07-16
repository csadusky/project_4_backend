//var ig = require('instagram-node').instagram();
var Beach = require('./beaches.js');
var request = require('request');

var getPictures = function(ig){
  var lat= this.lat;
  var lng= this.lng;

/*  var url = 'http://api.instagram.com/v1/media/search?lat=@lat@&lng=@lng@&access_token=@access_token@'.
    replace('@lat@', lat).
    replace('@lng@', lng).
    replace('@access_token@', accessToken);/**/

/*  request(url, function (error, response, body){
    if(error) {
      return console.error(error);
    }

    console.log(body);
  });/**/
  return new Promise(function(resolve, reject) {
    ig.media_search(lat, lng, function(err, media, remaining, limit) {
        if(err) {
          return reject(err);
        }
        resolve(media);
    });
  });
}; // end getPictures definition

module.exports = getPictures;
