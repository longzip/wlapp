import React from "react";
import { Field, reduxForm } from "redux-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const renderTextField = ({
  label,
  input,
  variant,
  type,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    variant={variant}
    type={type}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
);

const LoginForm = props => {
  const {
    handleSubmit,
    pristine,
    userErrorMessage,
    submitting,
    handleLogin
  } = props;
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        {userErrorMessage && (
          <Box mt={8}>
            <Typography variant="body2" color="error" align="center">
              {userErrorMessage}
            </Typography>
          </Box>
        )}
        <form onSubmit={handleSubmit(handleLogin)} className={classes.form}>
          <div>
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
              component={renderTextField}
            />
          </div>
          <div>
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              component={renderTextField}
            />
          </div>

          <div>
            <Field
              id="remember"
              name="remember"
              value="true"
              color="primary"
              label="Ghi nhớ đăng nhập"
              component={renderCheckbox}
              type="checkbox"
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={pristine || submitting}
          >
            Đăng nhập
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default reduxForm({
  form: "login" // a unique identifier for this form
})(LoginForm);
