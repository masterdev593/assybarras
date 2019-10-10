/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
// core
import TextField from '@material-ui/core/TextField';
import asyncValidate from './asynValidate';
import validate from './validate';

const renderTextField = (
  { input, error, helpText, ...custom }
) => (
    <TextField
      error={error}
      helperText={helpText === '' ? 'Necesario' : ' '}
      {...input}
      {...custom}
    />
  );

const MaterialUiForm = props => {
  const { onSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <Field component={renderTextField} label='First Name' name='parte' />
      </div>
      <div>
        <Field component={renderTextField} label='Last Name' name='descripcion' />
      </div>
      <div>
        <Field component={renderTextField} label='Email' name='email' />
      </div>
      <div>
        <Field
          component={renderTextField}
          label='Notes'
          multiLine={true}
          name='notes'
          rows={2}
        />
      </div>
      <div>
        <button disabled={pristine || submitting} type='submit'>Submit</button>
        <button disabled={pristine || submitting} onClick={reset} type='button'>
          Clear Values
        </button>
      </div>
    </form>
  );
};

MaterialUiForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  helpText: PropTypes.string,
  error: PropTypes.bool
};

export default reduxForm({
  form: 'MaterialUiForm',
  validate,
  asyncValidate
})(MaterialUiForm);
