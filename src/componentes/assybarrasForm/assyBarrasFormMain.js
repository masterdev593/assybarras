/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import NameIcon from '@material-ui/icons/SupervisorAccount';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  }
});

const Form = props => {
  const {
    values: { name, email, password, confirmPassword, cantidad },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    classes
  } = props;
  console.table(props);

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        error={Boolean(errors.name)}
        helperText={touched.name ? errors.name : ''}
        label='Name'
        margin='normal'
        name='name'
        value={name}
      />
      <div>{errors.name ? errors.name : ''}</div>
      <TextField
        className={classes.textField}
        error={Boolean(errors.email)}
        helperText={touched.email ? errors.email : ''}
        label='Email'
        margin='normal'
        name='email'
        onChange={handleChange}
        value={email}
      />
      <div>{errors.email ? errors.email : ''}</div>
      <TextField
        className={classes.textField}
        error={Boolean(errors.password)}
        helperText={touched.password ? errors.password : ''}
        label='Password'
        margin='normal'
        name='password'
        onChange={handleChange}
        type='password'
        value={password}
      />
      <div>{errors.password}</div>
      <TextField
        className={classes.textField}
        error={Boolean(errors.confirmPassword)}
        helperText={touched.confirmPassword ? errors.confirmPassword : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon />
            </InputAdornment>
          )
        }}
        label='Confirm Password'
        margin='normal'
        name='confirmPassword'
        onChange={handleChange}
        type='password'
        value={confirmPassword}
      />
      <div>{errors.confirmPassword}</div>
      <TextField
        className={classes.textField}
        label='CANTIDAD'
        margin='normal'
        name='cantidad'
        onChange={handleChange}
        required={true}
        value={cantidad}
      />
      <div>{errors.cantidad}</div>
      <Button
        color='secondary'
        disabled={!isValid}
        margin='normal'
        type='submit'
        variant='contained'
        >
        Submit
			</Button>
    </form>
  );
};

export default withStyles(styles)(Form);
