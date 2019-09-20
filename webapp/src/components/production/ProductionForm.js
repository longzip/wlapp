import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import SelectInput from "../common/SelectInput";
import FormSubmitButton from "../common/FormSubmitButton";

export const ProductionForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thêm lệnh sản xuất</h3>
      </div>
      <form role="form" onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="text"
            name="name"
            label="Số"
            placeholder="Lệnh sản xuất số"
            component={FieldInput}
          />
          {/* <Field
            type="text"
            name="contact"
            options={products}
            label="Sản phẩm"
            component={SelectInput}
          />
          <Field
            type="text"
            name="name"
            label="Số"
            placeholder="Số lượng cần sản xuất"
            component={FieldInput}
          />
          <Field
            type="text"
            name="boms"
            options={products}
            label="Định mức nguyên vật liệu"
            component={SelectInput}
          />
          <Field
            type="text"
            name="boms"
            options={products}
            label="Quy trình sản xuất"
            component={SelectInput}
          />
          <Field
            type="text"
            name="boms"
            options={products}
            label="Hạn chót để bắt đầu"
            component={SelectInput}
          /> */}
        </div>
        <div className="card-footer">
          <FormSubmitButton
            pristine={pristine}
            heading={heading}
            submitting={submitting}
            reset={reset}
            handleCancel={handleCancel}
          />
        </div>
      </form>
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

ProductionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "ProductionForm",
  validate
})(ProductionForm);
