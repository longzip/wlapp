import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import FieldInput from "../common/FieldInput";
import SelectInput from "../common/SelectInput";
import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates
} from "../common/Datepicker";
import FormSubmitButton from "../common/FormSubmitButton";

export const QuoteForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  heading,
  contacts,
  handleSave,
  handleCancel
}) => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo báo giá</h3>
      </div>
      <form role="form" onSubmit={handleSubmit(handleSave)}>
        <div className="card-body">
          <Field
            type="text"
            name="contact"
            options={contacts}
            label="Chọn dự án"
            component={SelectInput}
          />

          <Field
            type="text"
            name="description"
            label="Gói thầu"
            placeholder="Nhập gói thầu"
            component={FieldInput}
          />

          <Field
            type="text"
            name="version"
            label="Phiên bản"
            placeholder="Nhập phiên bản"
            component={FieldInput}
          />

          <Field
            name={"dateFinished"}
            component={DatePicker}
            placeholder="Chọn ngày"
            parse={normalizeDates}
            format={formatDates}
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

  if (!values.name) {
    errors.name = "Required";
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
