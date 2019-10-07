import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LoginUserActions from "../Stores/LoginedUser/Actions";

class SignOut extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Redirect to="/" />;
  }
}
const mapStateToProps = state => {
  return {
    user: state.loginedUserReducer.user,
    userIsLoading: state.loginedUserReducer.userIsLoading,
    userErrorMessage: state.loginedUserReducer.userErrorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(LoginUserActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignOut);
