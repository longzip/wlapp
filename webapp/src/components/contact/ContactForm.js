import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import TextareaInput from "../common/TextareaInput";

export const ContactForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  handleSave,
  handleCancel
}) => {
  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <h1>{heading}</h1>

      <Field
        type="text"
        name="name"
        label="Mã dự án"
        placeholder="DA.."
        component={FieldInput}
      />
      <Field
        type="text"
        name="description"
        label="Tên chủ đầu tư"
        placeholder="Nhập tên chủ đầu tư"
        component={FieldInput}
      />
      <Field
        type="text"
        name="addressLine"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ dự án"
        component={FieldInput}
      />
      <Field
        type="text"
        name="city"
        label="Tỉnh thành"
        placeholder="Chọn tỉnh thành phố"
        component={FieldInput}
      />
      <Field
        type="text"
        name="phone"
        label="Phone"
        placeholder="Nhập số điện thoại"
        component={FieldInput}
      />
      <Field
        type="text"
        name="email"
        label="Email"
        placeholder="Nhập email"
        component={FieldInput}
      />
      <Field
        type="textarea"
        rows="5"
        name="note"
        label="Ghi chú"
        placeholder="Ghi chú dự án"
        component={TextareaInput}
      />

      <div>
        <button type="submit" disabled={submitting} className="btn btn-primary">
          <i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit
        </button>

        {heading === "Add" && (
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            className="btn btn-default btn-space"
          >
            Clear Values
          </button>
        )}

        <button
          type="button"
          className="btn btn-default btn-space"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.addressLine) {
    errors.addressLine = "Required";
  }

  if (!values.phone) {
    errors.phone = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.city) {
    errors.city = "Required";
  }

  return errors;
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "ContactForm",
  validate
})(ContactForm);
