import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

export default class MenuContainer extends Component {
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <img
            src="/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />

          <span className="brand-text font-weight-light">Woodsland App</span>
        </Link>

        <div class="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <Link to="/about" className="d-block">
                Van Long
              </Link>
            </div>
          </div>

          <nav class="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item has-treeview">
                <NavLink activeClassName="active" to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </NavLink>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <NavLink activeClassName="active" to="/about" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v1</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink activeClassName="active" to="/courses" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v2</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink activeClassName="active" to="../../index3.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Dashboard v3</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}
