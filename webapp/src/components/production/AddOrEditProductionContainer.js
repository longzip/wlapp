import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as productionAction from "../../action/ProductionAction";
import * as productAction from "../../action/ProductAction";
import * as bomAction from "../../action/BomAction";
import * as routingAction from "../../action/RoutingAction";
import ProductionForm from "./ProductionForm";
import {
  productsFormattedForDropdown,
  bomsFormattedForDropdown,
  routingsFormattedForDropdown
} from "../../selectors/selectors";

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
    this.props.action.getProductsAction().catch(error => {
      toastr.error(error);
    });
    this.props.action.getBomsAction().catch(error => {
      toastr.error(error);
    });
    this.props.action.getRoutingsAction().catch(error => toastr.error(error));
  }

  handleSave(values) {
    const production = {
      id: values.id,
      name: values.name,
      origin: values.origin,
      productQty: values.productQty,
      productUom: values.productUom,
      datePlannedStart: values.datePlannedStart,
      datePlannedFinished: values.datePlannedFinished,
      dateStart: values.dateStart,
      dateFinished: values.dateFinished,
      priority: values.priority,
      state: values.state,
      availability: values.availability,
      ProductId: values.Product.value,
      BomId: values.Bom ? values.Bom.value : undefined,
      RoutingId: values.Routing.value
    };

    this.props.action
      .saveProductionAction(production)
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
    const { initialValues, products, boms, routings } = this.props;
    const heading = initialValues && initialValues.id ? "Edit" : "Add";
    console.log(this.props.initialValues);
    return (
      <div className="content-wrapper">
        <div className="container">
          <ProductionForm
            heading={heading}
            products={products}
            boms={boms}
            routings={routings}
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
  const products = productsFormattedForDropdown(state);
  const boms = bomsFormattedForDropdown(state);
  const routings = routingsFormattedForDropdown(state);
  if (
    productionId &&
    state.selectedProductionReducer.production &&
    productionId === state.selectedProductionReducer.production.id
  ) {
    return {
      initialValues: state.selectedProductionReducer.production,
      products,
      boms,
      routings
    };
  } else {
    return { products, boms, routings };
  }
};

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(
    { ...productionAction, ...productAction, ...bomAction, ...routingAction },
    dispatch
  )
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
