import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import SelectInput from "../common/SelectInput";
import DatePicker, { formatDates, normalizeDates } from "../common/Datepicker";
import FormSubmitButton from "../common/FormSubmitButton";

export const QuoteForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  quote,
  contacts,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">
          {heading === "Add" ? "Tạo báo giá" : "Sửa báo giá"}
        </h3>
      </div>
      <form role="form" onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          {heading === "Add" && (
            <Field
              type="text"
              name="Contact"
              options={contacts}
              label="Chọn dự án"
              component={SelectInput}
            />
          )}

          {heading === "Edit" && (
            <div className="form-group">
              <label>Dự án</label>
              <div className="field">
                <input
                  className="form-control"
                  type="text"
                  value={quote ? quote.Contact.name : ""}
                  disabled
                />
              </div>
            </div>
          )}

          <Field
            type="text"
            name="description"
            label="Gói thầu"
            placeholder="Nhập gói thầu"
            component={FieldInput}
          />

          <Field
            type="number"
            name="version"
            label="Phiên bản"
            placeholder="Nhập phiên bản"
            component={FieldInput}
          />

          <Field
            name={"dateFinished"}
            component={DatePicker}
            parse={normalizeDates}
            format={formatDates}
            label="Ngày hoàn thành"
          />
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

  if (!values.Contact) {
    errors.Contact = "Required";
  }

  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.version) {
    errors.version = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.dateFinished) {
    errors.dateFinished = "Required";
  }

  return errors;
};

QuoteForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
};

export default reduxForm({
  form: "QuoteForm",
  validate
})(QuoteForm);
