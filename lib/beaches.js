var mongoose = require ('mongoose');

var commentTypes = ['parking', 'restaurants', 'activities'];

var commentSchema = new mongoose.Schema({
  id: Number,
  required:true,
  postDate: {
    type: Date,
    default: Date.now
  },
  body: Text,
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
  parkingComment: [commentSchema],
  restaurantsComment: [commentSchema],
  activitiesComment: [commentSchema]

});

var Beach = mongoose.model('Beach', beachSchema);

module.exports = Beach;

