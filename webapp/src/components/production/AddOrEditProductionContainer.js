import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as productionAction from "../../action/ProductionAction";
import ProductionForm from "./ProductionForm";

export class AddOrEditProductionContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.action
        .getProductionAction(this.props.match.params.id)
        .catch(error => {
          toastr.error(error);
        });
  }

  handleSave(values) {
    const product = {
      id: values.id,
      code: values.code,
      name: values.name
    };

    this.props.action
      .saveProductionAction(product)
      .then(() => {
        toastr.success("Đã lưu thành công");
        this.props.history.push("/mrp/productions");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/mrp/productions");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    console.log(this.props.initialValues);
    return (
      <div className="content-wrapper">
        <div className="container">
          <ProductionForm
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
  const productionId = parseInt(ownProps.match.params.id);
  if (
    productionId &&
    state.selectedProductionReducer.production &&
    productionId === state.selectedProductionReducer.production.id
  ) {
    return {
      initialValues: state.selectedProductionReducer.production
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(productionAction, dispatch)
});

AddOrEditProductionContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditProductionContainer);
