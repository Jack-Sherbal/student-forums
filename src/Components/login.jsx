import React, { Component } from "react";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            id="inputEmail"
            placeholder="Email Address"
            className="form-control"
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
            required
          />
          <span className="small">
            Dont have an account? <a href="/register">Register</a>
          </span>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
