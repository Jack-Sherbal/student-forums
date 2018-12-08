import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  state = { post: null };

  async componentDidMount() {
    const post = {
      user: "Jack",
      title: "Hello World",
      msg: "Message Content",
      comments: ["This is cool", "Nah this is trash dude", "oh...."],
      id: 1
    };

    // const post = await axios.get(`http://localhost:4000`).data;
    // console.log(post);

    this.setState({
      post: post
    });
  }

  render() {
    const { post } = this.state;
    console.log(this.state);
    if (post === null) return <p>Loading...</p>;
    return (
      <div className="containter">
        <div className="row">
          <div className="jumbotron col-lg-12">
            <h1 className="display-3">{post.title}</h1>
            <p className="lead">{post.msg}</p>
            <hr className="my-4" />
            <p>Comments:</p>
            {post.comments.map((comment, idx) => (
              <p className="lead" key={idx}>
                {comment}
              </p>
            ))}
            <hr className="my-4" />
            <div className="row">
              <form
                className="col-lg-12"
                action="http://localhost:4000/comments"
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
