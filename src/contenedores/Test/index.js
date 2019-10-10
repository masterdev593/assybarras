/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
// core
import TextField from '@material-ui/core/TextField';
/* import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'; */
// import asyncValidate from './asyncValidate';
import validate from '../../componentes/assybarrasForm/validate';

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom }
) => (
    <TextField
      errorText={touched && error}
      floatingLabelText={label}
      hintText={label}
      {...input}
      {...custom}
    />
  );

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field component={renderTextField} label='First Name' name='firstName' />
      </div>
      <div>
        <Field component={renderTextField} label='Last Name' name='lastName' />
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

export default reduxForm({
  form: 'MaterialUiForm',
  validate
})(MaterialUiForm);
