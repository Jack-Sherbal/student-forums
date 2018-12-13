import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class NavBar extends Component {
  state = {};

  logout() {
    window.location.href = "/login";
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary fixed-top">
          <Link className="navbar-brand" to="/">
            Forums
          </Link>
          <button className="pull-right" onClick={this.logout}>
            Log out
          </button>
        </nav>
      </div>
    );
  }
}

export default NavBar;
