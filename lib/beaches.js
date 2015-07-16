var mongoose = require ('mongoose');

var commentTypes = ['parking', 'restaurants', 'activities'];

var commentSchema = new mongoose.Schema({
  postDate: {
    type: Date,
    default: Date.now
  },
  name: String,
  body: String,
  commentType: {
    type:String,
    required:true,
    enum: {
      values: commentTypes
    }
  }
});

var beachSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  lat: Number,
  lng: Number,
  thumbnail: String,
  comments: [commentSchema]
});

beachSchema.methods.getPictures = require('./instagram.js');

var Beach = mongoose.model('Beach', beachSchema);

module.exports = Beach;

