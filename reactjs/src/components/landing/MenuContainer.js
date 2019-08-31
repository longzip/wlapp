import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spinner from '../common/Spinner';


export const HeaderNavContainer = ({ apiCallsInProgress }) => {
    return (
<div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <NavLink className="brand-link" to="/">
            <img
              src="dist/img/logo.png"
              alt="WoodsLand"
              className="brand-image elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">WoodsLand App</span>
          </NavLink>

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


          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
};




HeaderNavContainer.propTypes = {
    apiCallsInProgress: PropTypes.number.isRequired
};



const mapStateToProps = state => ({
    apiCallsInProgress: state.apiReducer.apiCallsInProgress
});



export default connect(mapStateToProps)(HeaderNavContainer);

