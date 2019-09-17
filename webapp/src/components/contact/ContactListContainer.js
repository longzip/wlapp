import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as contactAction from "../../action/ContactAction";
import ContactList from "./ContactList";

export class ContactListContainer extends Component {
  constructor() {
    super();

    this.state = { selectedContactId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getContactsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/sales/contact");
  }

  handleEdit() {
    const selectedContactId = this.state.selectedContactId;
    if (selectedContactId) {
      this.setState({ selectedContactId: undefined });
      this.props.history.push(`/sales/contact/${selectedContactId}`);
    }
  }

  handleDelete() {
    const selectedContactId = this.state.selectedContactId;

    if (selectedContactId) {
      this.setState({ selectedContactId: undefined });
      this.props.action.deleteContactAction(selectedContactId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedContactId: row.id });
    }
  }

  render() {
    const { contacts } = this.props;

    if (!contacts) return <div>Đang tải...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row mt-3">
            <div>
              <h1>Bảng thông tin khách hàng</h1>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleAdd}
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
              </div>
            </div>
          </div>

          <ContactList
            contacts={contacts}
            handleRowSelect={this.handleRowSelect}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(contactAction, dispatch)
});

ContactListContainer.propTypes = {
  contacts: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactListContainer);
