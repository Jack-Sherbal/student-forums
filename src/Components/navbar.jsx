import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class NavBar extends Component {
  state = {};

  logout() {
    axios.get("http://localhost:4000/logout");
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary fixed-top">
          <Link className="navbar-brand" to="/">
            Student Forums
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
