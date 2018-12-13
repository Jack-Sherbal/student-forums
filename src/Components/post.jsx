import React, { Component } from "react";
import Rating from "../Components/rating";
import axios from "axios";

class Post extends Component {
  state = { post: null };

  async componentDidMount() {
    //console.log(this.props.location);
    console.log(this.props.location);
    const post = (await axios.get("http://localhost:4000/posts" + this.props.location.search)).data[0]; 
    console.log(post);
    // + this.props.location)).data;

    // const post = {
    //   user: "Jack",
    //   title: "Hello World",
    //   msg: "Message Content",
    //   comments: ["This is cool", "Nah this is trash dude", "oh...."],
    //   id: 1
    // };

    // const post = await axios.get(`http://localhost:4000`).data;
    // console.log(post);

    this.setState({
      post: post
    });
  }

  delete_post = () => {
    console.log("Got");
    axios.get("http://localhost:4000/remove_post");
  }

  render_admin = () => {
    if(document.cookie.split("=")[1] == "jsherb1028@gmail.com") {
      return (
        <form action="http://localhost:4000/remove_post"
            method="get">
            <button type="submit">
            x
            </button>
            </form>
      )
    }
  }

  render() {
    const { post } = this.state;
    if (post === null) return <p>Loading...</p>;
    return (
      <div className="containter">
        <div className="row">
          <div className="jumbotron col-lg-12">
          
          {this.render_admin()}
          
          <hr></hr>
            <small>Posted By: {document.cookie.split("=")[1]} on {post.time}</small>
            <h1 className="display-3">{post.title}</h1>
            <p className="lead">{post.content}</p>
            <hr className="my-4" />
            <p>Comments:</p>
            {post.comments.map((comment, idx) => (
              <p className="lead" key={idx}>
                {comment}
              </p>
            ))}
            <hr className="my-4" />
            <Rating />
            <div className="row">
              <form
                className="col-lg-12"
                action="http://localhost:4000/comment"
                method="post"
              >
                <div>
                  <h2>Post Comment:</h2>
                  <textarea
                    className="form-control col-lg-8"
                    id="comment-input"
                    name="comment"
                    rows="7"
                  />
                  <div>
                    <button
                      className="btn btn-md btn-primary col-sm-2"
                      type="submit"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
