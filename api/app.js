const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mongo = require("mongodb");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const User = require("../api/models/user");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const userSchema = new Schema(
//   {
//     username: String,
//     email: String,
//     password: String
//   },
//   {
//     collection: "Users"
//   }
// );

// const UserModel = mongoose.model("User", User);
mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;

app.use(
  session({
    secret: "verysecuresecret",
    resave: true,
    saveUninitialized: false,
    name: "test-ses",
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

function requiresLogin(req, res, next) {
  console.log(req.sessionID);
  if (req.session && req.sessionID) {
    return next();
  } else {
    var err = new Error("You must be logged in to view this page");
    err.status = 401;
    return next(err);
  }
}

app.post("/register", function(req, res, next) {
  //make sure all fields are filled out

  if (
    req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.confPassword
  ) {
    //make sure passwords match
    if (req.body.password !== req.body.confPassword) {
      var err = new Error("Passwords do not match.");
      err.status = 400;
      res.send("Passwords dont match");
      return next(error);
    }

    const saltRounds = 10;
    var plainPass = req.body.password;
    //   var plainPassConf = req.body.confPassword;
    const salt = bcrypt.genSalt(saltRounds);
    const hashPass = bcrypt.hashSync(plainPass, 10);
    //   const hashConfPass = bcrypt.hashSync(plainPassConf, salt);

    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: hashPass
      // confPassword: hashConfPass
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("http://localhost:3000/feed");
      }
    });
  } else {
    var err = new Error("All fields are required.");
    err.status = 400;
    return next(err);
  }
});

app.post("/login", function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error("Wrong email or password");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect("http://localhost:3000/feed");
      }
    });
  } else {
    var err = new Error("Must provide email and password");
    err.status = 401;
    return next(err);
  }
});

app.get("/logout", function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        console.log("got1");
        return next(err);
      } else {
        console.log("got2");
        return res.redirect("http://localhost:3000/");
      }
    });
  }
});

// app.get("/register", function(req, res) {
//   const userData = {
//     username: "Joe",
//     email: "joe@gmail.com",
//     password: "password",
//     confPassword: "password"
//   };

//   User.create(userData, function(error, user) {
//     if (error) {
//       console.log(error);
//       //   return next(error);
//     } else {
//       //   req.session.userId = user._id;
//       return res.redirect("/");
//     }
//   });

//   //   const saveData = new UserModel({
//   //     username: "Joe",
//   //     email: "joe@gmail.com",
//   //     password: "password",
//   //     confPassword: "password"
//   //   }).save(function(err, result) {
//   //     if (err) throw err;

//   //     if (result) {
//   //       res.json(result);
//   //     }
//   //   });
// });

app.get("/feed", requiresLogin, function(req, res) {
  User.find({}, function(err, result) {
    if (err) throw err;

    if (result) {
      res.json(result);
    } else {
      res.send(JSON.stringify({ error: "error" }));
    }
  });
});

app.listen(4000, function() {
  console.log("express app listening on port 4000");
});
