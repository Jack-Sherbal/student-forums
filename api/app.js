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
const cookieParser = require('cookie-parser');
const User = require("../api/models/user");
const Post = require("../api/models/post");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;

app.use(
  session({
    name: "user_sid",
    secret: "verysecuresecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use((req, res, next) => {
  if(req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if(req.session.user && req.cookies.user_sid) {
    res.redirect('/feed');
  } else {
    next();
  }
}

app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login")
});

// function requiresLogin(req, res, next) {
//   console.log(req.sessionID);
//   if (req.session && req.sessionID) {
//     return next();
//   } else {
//     var err = new Error("You must be logged in to view this page");
//     err.status = 401;
//     return next(err);
//   }
// }

app.route("/register")
  .get(sessionChecker, (req, res) => {
    res.redirect("http://localhost:3000/register")
  })  //"/register",
  .post((req, res, next) => {
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

    //LOOK AT ME
    User.create(userData
      // if (error) {
      //   return next(error);
      // } else {
      //   req.session.userId = user._id;
      //   return res.redirect("http://localhost:3000/feed");
      // }
    )
    .then(user => {
      req.session.user = "user1";
      res.redirect("http://localhost:3000/feed");
    });
  } else {
    var err = new Error("All fields are required.");
    err.status = 400;
    return next(err);
  }
});

app.route("/login").get(sessionChecker, (req, res) => {
  res.redirect("http://localhost:3000/login");
})
.post((req, res, next) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error("Wrong email or password");
        err.status = 401;
        return next(err);
      } else {
        req.session.user = "User1"; //user.dataValues;
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

app.get("/remove_post", function(req, res) {
  const query = (req.get('referer')).split('?');
  const pid = query[1].split('=')[1];

  Post.findOneAndRemove({_id: pid}, function(err, result) {
    if(err) throw err;

    res.redirect("http://localhost:3000/feed");
  });
});

app.get("/feed", function(req, res) {

  console.log(req.session.user);
  console.log(req.cookies);
  if(!req.session.user && !req.cookies.user_sid) {
    Post.find({}, function(err, result) {
      if (err) throw err;
  
      if (result) {
        res.json(result);
      } else {
        res.send(JSON.stringify({ error: "error" }));
      }
    });
  } else {
    res.redirect("http://localhost:3000/login");
  }
});

app.listen(4000, function() {
  console.log("express app listening on port 4000");
});

app.post("/post", function(req, res, next) {

  const postData = {
    user: 'Jack',
    title: req.body.title,
    content: req.body.content,
    comments: []
  }  
  Post.create(postData, function(error, post) {
    if (error) {
      return next(error);
    } else {
      return res.redirect("http://localhost:3000/feed");
    }
  });

});

app.get("/posts", function(req, res) {
  const url = require('url');
  const query = url.parse(req.url, true).query;

  Post.find({_id: query.pid}, function(error, post) {
    if(error) throw error;

    if(post) {
      res.json(post)
    } else {
      res.send(JSON.stringify({ error: "error" }));
    }
  });
});

app.post("/comment", function(req, res, next) {
  // console.log("comment got");
    const url = require('url');
    console.log(req.get('referer'));
    const query = (req.get('referer')).split('?');
    const pid = query[1].split('=')[1];


    console.log(pid);
    Post.findOneAndUpdate({_id: pid},
      {$push: {comments: req.body.comment}},
      function(err, doc) {
        console.log(doc);
          if(err){
          console.log(err);
          }else{
           res.redirect(req.get("referer"));
          }
      }
    );

    // Post.find({_id: query.pid}, function(err, post) {
    //   if(!post) {
    //     return next(new Error("Error"));
    //   } else {
    //     console.log(post);
    //     post.comments = ["testing"];

    //     post.save(function(err) {
    //       if(err) {
    //         throw err;
    //       } else {
    //         console.log("success");
    //         res.redirect(req.get("referer"));
    //       }
    //     })
    //   }
    // });

    // Post.findOneAndUpdate({_id: query.pid},
    //   {$push: {comments: req.body.comment}, 
    //   function (err, result) {
    //     if(error) return next(error);

    //     if(result) {
    //       return res.redirect(req.get('referer'));
    //     }
    //   }
    // });
});
