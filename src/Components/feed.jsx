import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Feed extends Component {
  state = {
    posts: null
  };

  async componentDidMount() {
    const posts = [
      {
        user: "Jack",
        title: "Hello World",
        msg: "Message Content",
        comments: ["This is cool", "Nah this is trash dude", "oh...."],
        id: 1
      }
    ];
    this.setState({ posts: posts });
  }

  render() {
    console.log(this.state.posts);
    return (
      <div className="container">
        <div className="row">
          {this.state.posts === null && <p>Loading Posts....</p>}
          {this.state.posts &&
            this.state.posts.map(post => (
              <div key={post.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/post/${post.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">
                      Comments: {post.comments.length}
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{post.title}</h4>
                      <p className="card-text">{post.msg}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Feed;
