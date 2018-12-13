import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/navbar";
import Feed from "./Components/feed";
import Post from "./Components/post";
import Login from "./Components/login";
import NewPost from "./Components/new_post";
import Register from "./Components/register";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    // console.log(sessionStorage.getItem("userId"));
    return (
      <div>
        <NavBar />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Feed} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/post" component={NewPost} />
        <Route exact path="/posts" component={Post} />
        {/* <p>WIP</p> */}
        {/* <Feed /> */}
        {/* <Rating /> */}
      </div>
    );
  }
}

export default App;
