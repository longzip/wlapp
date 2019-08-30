import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";

export default class Menu extends Component {
  render() {
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link className="brand-link" to="/">
            <img
              src="dist/img/logo.png"
              alt="WoodsLand"
              className="brand-image elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">WoodsLand App</span>
          </Link>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User"
                />
              </div>
              <div className="info">
                <a href="fake_url" className="d-block">
                  Van Long
                </a>
              </div>
            </div>
            {/* Sidebar Menu */}

            <nav className="mt-2">
              <Nav
                defaultActiveKey="/"
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <Nav.Item className="nav-item">
                  <Nav.Link className="nav-link" href="/">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Dashboard</p>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="nav-item has-treeview">
                  <Nav.Link className="nav-link" href="#">
                    <i className="nav-icon fas fa-copy" />
                    <p>
                      Kế hoạch sản xuất
                      <i className="fas fa-angle-left right" />
                    </p>
                  </Nav.Link>
                  <Nav className="nav nav-treeview">
                    <Nav.Item className="nav-item">
                      <Nav.Link className="nav-link" href="/products">
                      <i className="far fa-circle nav-icon" />
                      <p>Sản phẩm</p>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Nav.Item>
              </Nav>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
