import React, { Component } from "react";

class Register extends Component {
  state = {};

  async submit() {
    console.log("got");
  }

  render() {
    return (
      <div className="text-center">
        <form
          className="form-signin"
          action="http://localhost:4000/register"
          method="post"
        >
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="inputEmail"
            placeholder="Email Address"
            className="form-control"
            required
            autoFocus
          />
          <label htmlFor="inputUsername" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="inputUsername"
            placeholder="Username"
            name="username"
            className="form-control"
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            className="form-control mb-0"
            id="inputPassword"
            placeholder="Password"
            name="password"
            required
          />
          <label htmlFor="inputConfPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputConfPassword"
            placeholder="Confirm Password"
            name="confPassword"
            required
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            // onClick={() => {
            //   this.submit();
            // }}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
