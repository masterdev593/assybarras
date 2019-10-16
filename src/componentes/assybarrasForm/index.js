/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Form from './assyBarrasFormMain';
import * as Yup from 'yup';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
      .spacing.unit * 5}px`
  },
  container: {
    maxWidth: '200px'
  }
});

const validationSchema = Yup.object({
  name: Yup.string('Enter a name').required('Name is required'),
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain atleast 8 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string('Enter your password')
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
  cantidad: Yup.number('Debe ser un número')
    .required('Cantidad Requerida')
    .positive('Debe ser mayor a 1')
});

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  submit = data => {
    console.log(data);
  };
  render() {
    const { classes } = this.props;
    const values = { name: 'GH', email: '', confirmPassword: '', password: '', cantidad: 23 };
    return (
      <React.Fragment>
        <Formik
          initialValues={values}
          onSubmit={this.submit}
          render={props => <Form {...props} />}
          validationSchema={validationSchema}
        />
      </React.Fragment>
    );
  }
}

InputForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InputForm);
