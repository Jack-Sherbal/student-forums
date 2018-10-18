var express = require("express");
var router = express.Router();
var User = require("../models/user");

//POST route for updating data
router.post("/", function(req, res, next) {
  if (req.body.email && req.body.username && req.body.password) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("/");
      }
    });
  }
});
