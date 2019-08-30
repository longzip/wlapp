import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* SEARCH FORM */}
          <form className="form-inline ml-3">
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>
        </nav>
      </div>
    );
  }
}
