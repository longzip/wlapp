import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as productAction from "../../action/ProductAction";
import BomList from "./BomList";

export class BomListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedProductId: undefined };

    this.handleAddCourse = this.handleAddCourse.bind(this);
    this.handleEditProduct = this.handleEditProduct.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getProductsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAddCourse() {
    this.props.history.push("/product");
  }

  handleEditProduct() {
    const selectedProductId = this.state.selectedProductId;
    if (selectedProductId) {
      this.setState({ selectedProductId: undefined });
      this.props.history.push(`/product/${selectedProductId}`);
    }
  }

  handleDelete() {
    const selectedProductId = this.state.selectedProductId;

    if (selectedProductId) {
      this.setState({ selectedProductId: undefined });
      this.props.action.deleteProductAction(selectedProductId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedProductId: row.id });
    }
  }

  render() {
    const { products } = this.props;

    if (!products) {
      return <div>Loading...</div>;
    }

    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col">
              <h1>Products</h1>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleAddCourse}
                >
                  <i className="fa fa-plus" aria-hidden="true" /> New
                </button>

                <button
                  type="button"
                  className="btn btn-warning ml-2"
                  onClick={this.handleEditProduct}
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

          <div className="row">
            <div className="col">
              <BomList
                products={products}
                handleRowSelect={this.handleRowSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productsReducer.products
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(productAction, dispatch)
});

BomListContainer.propTypes = {
  products: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BomListContainer);
