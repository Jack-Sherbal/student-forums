import React, { Component } from "react";

class Login extends Component {
  state = {
    email: ""
  };

  updateEmail = (e) => {
    console.log(e.target.value);
    this.setState({email: e.target.value})
  }

  setCookie = (e) => {
    const email =this.state.email;
    document.cookie = "email=" + email;
  }

  render() {
    return (
      <div className="text-center">
        <form
          className="form-signin"
          action="http://localhost:4000/login"
          method="post"
        >
          <div className="row text-center">
            <h1 className="h3 col-lg-12 mb-3 font-weight-normal">Sign in</h1>
          </div>
          <div className="row">
            <div className="col-md-5" />
            <label htmlFor="inputEmail" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              onChange={this.updateEmail}
              id="inputEmail"
              placeholder="Email Address"
              className="form-control col-md-2"
              name="email"
              required
              autoFocus
            />
          </div>
          <div className="row">
            <div className="col-md-5" />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              className="form-control col-md-2 mt-1"
              id="inputPassword"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <span className="small">
            Dont have an account? <a href="/register">Register</a>
          </span>
          <div className="row">
            <div className="col-md-6" />
            <button
              onClick={this.setCookie}
              className="btn btn-lg btn-primary btn-block col-md-1 mt-3"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
