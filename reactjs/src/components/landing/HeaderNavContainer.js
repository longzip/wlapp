import React, { Component } from "react";
import { Link } from "react-router-dom";

class HeaderNavContainer extends Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#">
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/courses" className="nav-link">
              Courses
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default HeaderNavContainer;
