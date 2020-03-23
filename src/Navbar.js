import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <header className="Navbar">
        <Link to="/searchUser" className="logo">
          Github Finder
        </Link>
        <NavLink
          exact
          className="link"
          activeClassName="link-active"
          to="/searchUser"
        >
          Search User
        </NavLink>
        <NavLink
          exact
          className="link"
          activeClassName="link-active"
          to="/searchRepo"
        >
          Search Repo
        </NavLink>
      </header>
    );
  }
}

export default Navbar;
