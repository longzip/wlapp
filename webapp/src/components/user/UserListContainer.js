import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as userAction from "../../action/UserAction";
import UserList from "./UserList";

export class UserListContainer extends Component {
  constructor() {
    super();

    this.state = { selectedUserId: undefined };

    this.handleAd = this.handleAd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getUsersAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAd() {
    this.props.history.push("/settings/user");
  }

  handleEdit() {
    const selectedUserId = this.state.selectedUserId;
    if (selectedUserId) {
      this.setState({ selectedUserId: undefined });
      this.props.history.push(`/settings/user/${selectedUserId}`);
    }
  }

  handleDelete() {
    const selectedUserId = this.state.selectedUserId;

    if (selectedUserId) {
      this.setState({ selectedUserId: undefined });
      this.props.action
        .deleteUserAction(selectedUserId)
        .catch(error => {
          toastr.error(error);
        });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedUserId: row.id });
    }
  }

  render() {
    const { users } = this.props;

    if(!users) return <div>Loading...</div>
    return (
      <div className="content-wrapper">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Users</h3>
          </div>
          <div className="card-footer clearfix">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleAd}
              >
                <i className="fa fa-plus" aria-hidden="true" /> New
              </button>

              <button
                type="button"
                className="btn btn-warning ml-2"
                onClick={this.handleEdit}
              >
                <i className="fa fa-pencil" aria-hidden="true" /> Edit
              </button>

              <button
                type="button"
                className="btn btn-danger ml-2"
                onClick={this.handleDelete}
              >
                <i
                  className="fa fa-trash-o"
                  aria-hidden="true"
                  onClick={this.handleDelete}
                />{" "}
                Delete
              </button>
            </div>{" "}
          </div>
          <div className="card-body p-0">
            <UserList
              users={users}
              handleRowSelect={this.handleRowSelect}
            />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(userAction, dispatch)
});

UserListContainer.propTypes = {
  users: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);