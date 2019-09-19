import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import SelectInput from "../common/SelectInput";
import TextareaInput from "../common/TextareaInput";

export const OrderLineForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  products,
  uoms,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-warning">
      <div className="card-header">
        <h3 className="card-title">Thêm sản phẩm</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleSave)}>
          <Field
            name="product"
            label="Chọn sản phẩm"
            options={products}
            component={SelectInput}
          />

          <Field
            type="text"
            name="productDimension"
            label="Kích thước"
            placeholder="DxRxC"
            component={FieldInput}
          />

          <Field
            type="text"
            name="productSpec"
            label="Spec"
            placeholder="Product Spec"
            component={FieldInput}
          />

          <Field
            type="text"
            name="productUomQty"
            label="Số lượng"
            placeholder="Name of the course"
            component={FieldInput}
          />

          <Field
            type="text"
            name="productUom"
            options={uoms}
            label="Đơn vị tính"
            component={SelectInput}
          />

          <Field
            type="text"
            name="productPrice"
            label="Giá"
            placeholder=""
            component={FieldInput}
          />

          <Field
            type="text"
            name="note"
            label="Ghi chú"
            placeholder=""
            component={TextareaInput}
          />

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              <i className="fa fa-paper-plane-o" aria-hidden="true" /> Thêm vào
              dòng sản phẩm
            </button>

            {heading === "Add" && (
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
                className="btn btn-default btn-space"
              >
                Làm lại
              </button>
            )}

            <button
              type="button"
              className="btn btn-default btn-space"
              onClick={handleCancel}
            >
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  return errors;
};

OrderLineForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "OrderLineForm",
  validate
})(OrderLineForm);
