import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as quoterAction from "../../action/QuoteAction";
import QuoteForm from "./QuoteForm";
import OrderLineList from "../orderLine/OrderLineList";

export class AddOrEditQuoteContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.action
        .getQuoteAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
  }

  handleSave(values) {
    const order = {
      id: values.id,
      code: values.code,
      name: values.name
    };

    this.props.action
      .saveQuoteAction(order)
      .then(() => {
        toastr.success("Đã lưu báo giá");
        this.props.history.push("/sales/quotes");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/sales/quotes");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    return (
      <div className="content-wrapper">
        <div className="container">
          <QuoteForm
            heading={heading}
            handleSave={this.handleSave}
            handleCancel={this.handleCancel}
            initialValues={this.props.initialValues}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const quoteId = parseInt(ownProps.match.params.id);
  if (
    quoteId &&
    state.selectedQuoteReducer.quote &&
    quoteId === state.selectedQuoteReducer.quote.id
  ) {
    return {
      initialValues: state.selectedQuoteReducer.quote
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(quoterAction, dispatch)
});

AddOrEditQuoteContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditQuoteContainer);
