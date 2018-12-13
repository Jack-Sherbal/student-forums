import React, { Component } from "react";

class New_Post extends Component {
  state = {};
  render() {
    return (
      <div className="text-center">
        <form action="http://localhost:4000/post" method="post">
          <div className="row text-center">
            <h1 className="h3 mb-3 font-weight-normal col-lg-12">
              Create Post
            </h1>
          </div>
          <div className="row">
            <div className="col-md-4" />
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="form-control col-md-4"
              required
              autoFocus
            />
          </div>
          <div className="row">
            <div className="col-md-4" />
            <textarea
              id="content"
              name="content"
              className="form-control col-md-4 mt-1"
              placeholder="Post"
            />
          </div>
          <div className="row">
            <div className="col-md-7" />
            <button
              className="btn btn-lg btn-primary btn-block col-md-1 mt-3"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default New_Post;
