import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import LoginUserActions from "../Stores/LoginedUser/Actions";
import LoginForm from "./LoginForm";

class SignIn extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(values) {
    const { username, password, remember } = values;
    this.props.login(username, password, remember);
    console.log("SignIn");
    console.log(values);
  }

  render() {
    const { user, userIsLoading, userErrorMessage } = this.props;
    return (
      <React.Fragment>
        {user.email ? (
          <Redirect
            to={user.WorkcenterId ? "/workcenter/" + user.WorkcenterId : "/"}
          />
        ) : (
          <LoginForm
            handleLogin={this.handleLogin}
            userErrorMessage={userErrorMessage}
            userIsLoading={userIsLoading}
            initialValues={{ username: "admin", password: "123456" }}
          />
        )}
      </React.Fragment>
    );
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
  login: (username, password, remember) =>
    dispatch(LoginUserActions.login(username, password, remember))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);
