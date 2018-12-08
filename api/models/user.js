var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({ 
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
  //   confPassword: {
  //     type: String,
  //     required: true
  //   }
}); 

UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({ email: email }).exec(function(err, user) {
    if (err) {
      return callback(error);
    } else if (!user) {
      var err = new Error("user not found");
      err.status = 401;
      return callback(err);
    }

    bcrypt.compare(password, user.password, function(err, result) {
      if (result) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

var User = mongoose.model("User", UserSchema); //here
module.exports = User; //here
