import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as contactAction from "../../action/ContactAction";
import * as quoteAction from "../../action/QuoteAction";
import ContactDetail from "./ContactDetail";

class ContactDetailContainer extends Component {
  constructor() {
    super();
    this.state = {
      selectedQuoteId: undefined
    };
    this.handleSaveQuote = this.handleSaveQuote.bind(this);
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this);
    this.handleRowSelectQuote = this.handleRowSelectQuote.bind(this);
    this.handleEditQuote = this.handleEditQuote.bind(this);
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    if (id)
      this.props.action.getContactAction(id).catch(error => {
        toastr.error(error);
      });
    this.props.action.getQuotesAction().catch(error => {
      toastr.error(error);
    });
  }
  handleRowSelectQuote(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedQuoteId: row.id });
    }
  }
  handleDeleteQuote() {
    const selectedQuoteId = this.state.selectedQuoteId;

    if (selectedQuoteId) {
      this.setState({ selectedQuoteId: undefined });
      this.props.action.deleteQuoteAction(selectedQuoteId).catch(error => {
        toastr.error(error);
      });
      this.props.action.getQuotesAction().catch(error => {
        toastr.error(error);
      });
    }
  }
  handleSaveQuote(values) {
    const { contact, currentUser } = this.props;
    const order = {
      id: values.id,
      description: values.description,
      version: values.version,
      dateFinished: values.dateFinished,
      ContactId: contact.id,
      UserId: currentUser.id
    };

    this.props.action
      .saveQuoteAction(order)
      .then(() => {
        toastr.success("Đã lưu báo giá");
        // this.props.history.push("/sales/quotes");
        this.props.action.getQuotesAction().catch(error => {
          toastr.error(error);
        });
      })
      .catch(error => {
        toastr.error(error);
      });
  }
  handleEditQuote() {}
  render() {
    const { contact, quotes } = this.props;
    return (
      <div className="content-wrapper">
        <section className="content">
          <ContactDetail
            contact={contact}
            quotes={quotes}
            handleRowSelect={this.handleRowSelectQuote}
            handleSaveQuote={this.handleSaveQuote}
            handleDeleteQuote={this.handleDeleteQuote}
            handleEditQuote={this.handleEditQuote}
          />
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const contactId = parseInt(ownProps.match.params.id);
  const currentUser = state.loginedUserReducer.userAuth;
  if (
    contactId &&
    state.selectedContactReducer.contact &&
    contactId === state.selectedContactReducer.contact.id
  ) {
    return {
      contact: state.selectedContactReducer.contact,
      quotes: state.quotesReducer.quotes,
      currentUser
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...contactAction, ...quoteAction }, dispatch)
});

ContactDetailContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  contact: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetailContainer);
