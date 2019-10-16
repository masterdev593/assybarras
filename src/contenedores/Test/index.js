/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikTextField } from 'formik-material-fields';

Yup.setLocale({
  mixed: {
    required: 'Requerido'
  },
  number: {
    min: 'Debe ser mayor que ${min}'
  }
});

let validationSchema = Yup.object().shape({
  username: Yup.string().uppercase(),
  edad: Yup.number()
    .min(18)
    .required()
    .positive()
    .integer()
});

validationSchema.validate({ username: 'jimmy', edad: 11}).catch(function(err) {
  // eslint-disable-next-line no-unused-expressions
  err.username;
  // eslint-disable-next-line no-unused-expressions
  err.errors;
});

const initialValues = {
  username: ''
};

const onSubmit = (values, actions) => {
  // this could also easily use props or other
  // local state to alter the behavior if needed
  // this.props.sendValuesToServer(values)

  setTimeout(() => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

class MyForm extends Component {
  render() {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
        {({ isValid }) => (
          <Form autoComplete='off'>
            <FormikTextField
              label='Nombre'
              margin='normal'
              name='username'
            />
            <FormikTextField
              label='Edad'
              margin='normal'
              name='edad'
            />
          </Form>
        )}
      </Formik>
    );
  }
}

export default MyForm;
