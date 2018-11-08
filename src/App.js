import React, { Component } from "react";
import "./App.css";
import Rating from "./Components/rating";
import NavBar from "./Components/navbar";
import Feed from "./Components/feed";
import Post from "./Components/post";
import Login from "./Components/login";
import Register from "./Components/register";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    console.log(sessionStorage.getItem("userId"));
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/post/:postId" component={Post} />
        {/* <p>WIP</p> */}
        {/* <Feed /> */}
        <Rating />
      </div>
    );
  }
}

export default App;
