var mongoose = require("mongoose");
var PostSchema = new mongoose.Schema({ 
    user: {
      type: String,
      required: true,
      trim: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    comments: [{
      type: String
    }],
    time: {
        type: String,
        default: new Date()
    }
 
  });

  var Post = mongoose.model("Post", PostSchema); 
  module.exports = Post; 
