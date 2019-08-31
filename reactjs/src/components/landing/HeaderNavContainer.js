import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spinner from '../common/Spinner';


export const HeaderNavContainer = ({ apiCallsInProgress }) => {
    return (
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
    );
};




HeaderNavContainer.propTypes = {
    apiCallsInProgress: PropTypes.number.isRequired
};



const mapStateToProps = state => ({
    apiCallsInProgress: state.apiReducer.apiCallsInProgress
});



export default connect(mapStateToProps)(HeaderNavContainer);

