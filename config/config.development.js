var config = require('./config.global.js');


config.env = 'development';
config.hostname = 'localhost';
config.serverPort = 3000;


config.authStrategy = 'local';

config.mongo = {};
config.mongo.dbUrl = 'mongodb://localhost/beaches';


module.exports = config;
