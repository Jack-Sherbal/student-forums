const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mongo = require("mongodb");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
// const User = require("./models/user");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect();

// mongo.connect("mongodb://localhost:27017/test", function(err, db) {
//     db.createCollection("users");
//     const userCollection = db.collection("users");

//     const saveData = {};

//     app.get("/new-post", function(req, res) {
//         saveData = new UserModel({
//           username: "Jack",
//           email: "jsherb1028@gmail.com",
//           password: "password"
//         }).save(function(err, result) {
//           if (err) throw err;

//           if (result) {
//             res.json(result);
//           }
//         });
//       });
// });

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String
  },
  {
    collection: "Users"
  }
);

const UserModel = mongoose.model("User", userSchema);
mongoose.connect("mongodb://localhost:27017/test");

app.get("/new-post", function(req, res) {
  const saveData = new UserModel({
    username: "Joe",
    email: "joe@gmail.com",
    password: "password"
  }).save(function(err, result) {
    if (err) throw err;

    if (result) {
      res.json(result);
    }
  });
});

app.get("/", function(req, res) {
  UserModel.find({}, function(err, result) {
    if (err) throw err;

    if (result) {
      res.json(result);
    } else {
      res.send(JSON.stringify({ error: "error" }));
    }
  });
});

// mongoose.Promise = global.Promise;
// var db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", function() {
//   console.log("Connected");
// });

// // var routes = require("./routes/router");
// // app.use("/", routes);

// app.get("/", (req, res) => {
//   res.send("hey");
// });

// app.post("/new-post", (req, res) => {
//   const data = new User({
//     email: "jsherb1028@gmail.com",
//     username: "Jack",
//     password: "password"
//   });
//   data
//     .save()
//     .then(iten => {
//       res.send("item saved");
//     })
//     .catch(err => {
//       res.status(400).send("unable to save to db");
//     });
// });

app.listen(4000, function() {
  console.log("express app listening on port 4000");
});
