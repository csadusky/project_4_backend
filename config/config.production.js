var config = require('./config.global.js');

// make any production-specific changes here

config.env = 'production';
config.hostname = 'https://fast-brook-4146.herokuapp.com';
config.serverPort = process.env.PORT; // heroku is particular

config.authCallbackUrl = 'https://fast-brook-4146.herokuapp.com/';

config.authStrategy = 'local'



config.cookieOptions.secure = true;


config.mongo.dbUrl = process.env.DBURL;


module.exports = config;
