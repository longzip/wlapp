import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as workcenterAction from "../../action/WorkcenterAction";
import WorkcenterForm from "./WorkcenterForm";

export class AddOrEditWorkcenterContainer extends React.Component {
  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.action
      .getWorkcenterAction(this.props.match.params.id)
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
      .saveWorkcenterAction(product)
      .then(() => {
        toastr.success("Product saved");
        this.props.history.push("/products");
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.replace("/products");
  }

  render() {
    const { initialValues } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    console.log(this.props.initialValues);
    return (
      <div className="content-wrapper">
        <div className="container">
          <WorkcenterForm
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
  const productId = parseInt(ownProps.match.params.id);
  if (
    productId &&
    state.selectedProductReducer.product &&
    productId === state.selectedProductReducer.product.id
  ) {
    return {
      initialValues: state.selectedProductReducer.product
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(workcenterAction, dispatch)
});

AddOrEditWorkcenterContainer.propTypes = {
  action: PropTypes.object.isRequired,
  history: PropTypes.object,
  initialValues: PropTypes.object,
  match: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditWorkcenterContainer);
