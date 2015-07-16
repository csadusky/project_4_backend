var ig = require('instagram-node').instagram();
var Beach = require('./beaches.js');
var request = require('request');

var getPictures = function(beachObject, accessToken){
  var lat= beachObject.lat;
  var lng= beachObject.lng;

  var url = 'http://api.instagram.com/v1/media/search?lat=@lat@&lng=@lng@&access_token=@access_token@'.
    replace('@lat@', lat).
    replace('@lng@', lng).
    replace('@access_token@', accessToken);

  console.log(url);

  request(url, function (error, response, body){
    if(error) {
      return console.error(error);
    }
    if (response.statusCode === 200){
      console.log(body);
    }
 })
}; // end getPictures definition

module.exports = getPictures;
