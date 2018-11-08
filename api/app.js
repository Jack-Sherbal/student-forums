const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mongo = require("mongodb");
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

app.post("/register", function(req, res) {
  console.log(req.body);
  res.redirect("/");
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

app.get("/", function(req, res) {
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
