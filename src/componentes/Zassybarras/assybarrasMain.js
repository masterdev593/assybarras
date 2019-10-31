import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import JsBarcode from 'react-barcode';
import Typography from '@material-ui/core/Typography';
import ReactToPrint from 'react-to-print';
import BarcodeReader from 'react-barcode-reader';
import _ from 'lodash';
import Alerta from '../alerta';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikTextField, FormikRadioGroupField } from 'formik-material-fields';
import moment from 'moment';
import 'moment/locale/es';

const validationSchema = Yup.object({
  parte: Yup.string('Ingrese la parte').required('El número de Parte es requerido').max(11, 'Código de 11 caracteres'),
  descripcion: Yup.string('Ingrese la descripción').required('La Descripción es requerida'),
  linea: Yup.string().required('La Linea es requerida')
  /*   email: Yup.string()
      .matches(/georges.abitbol@gmail.com/, 'cant change email'),
    providerName: Yup.string()
      .required('type your name'),
    password: Yup.string()
      .min(8, 'at least 8 chars')
      .matches(/[a-z]/, 'at least one lowercase char')
      .matches(/[A-Z]/, 'at least one uppercase char')
      .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).'),
    passwordConfirm: Yup.string()
      .equalTo(Yup.ref('password'), 'passwords dont match') */
});

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
    borderRadius: '20px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  }
});

class AssyBarras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parte: '',
      descripcion: '',
      pieza: 1,
      ubicacion: '',
      marca: 'SAMSUNG',
      origen: 'KOREA',
      resultado: ''
    };
    this.handlearParte = this.handlearParte.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlearDes = this.handlearDes.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props._cmdlimpioAlerta();
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value.toUpperCase() });
  }

  handlearParte(event) {
    const target = event.target;
    const value = target.value.toUpperCase();
    const name = target.name;
    this.props._cmdupdateParte({
      [name]: value
    });
  }
  handlearDes(e) {
    this.props._cmdupdateDes(e.target.value.toUpperCase());
  }

  handleScan(data) {
    this.setState({
      resultado: data
    });
  }

  handleError(err) {
    console.error(err);
  }

  handleSubmit() {
    const { parte, descripcion } = this.state;
    console.table(this.props);
    let datos = {
      parte,
      descripcion
    };
    this.props._cmdaddParte(datos);
  }

  render() {
    const { classes, mensaje, tipo } = this.props;
    const values = {
      parte: this.state.parte.toUpperCase(),
      descripcion: this.state.descripcion.toUpperCase()
    };
    const hoy = moment(new Date()).locale('es').format('YYYYMMDD');
    return (
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            >
            {({ isValid, errors, values }) => (
              <form autoComplete='off' noValidate>
                <FormikTextField
                  className={classes.textField}
                  label='Nro. de Parte'
                  margin='normal'
                  name='parte'
                  onChange={this.handleInputChange}
                  required={true}
                  value={values.parte}
                  variant='outlined'
                />
                {(errors.parte && !errors) ? <Alerta mensaje={errors.parte ? errors.parte : ''} tipo='error' /> : ''}
                <FormikTextField
                  className={classes.textField}
                  label='Descripción'
                  margin='normal'
                  name='descripcion'
                  onChange={this.handleInputChange}
                  required={true}
                  value={values.descripcion}
                  variant='outlined'
                />
                {(errors.descripcion) ? <Alerta mensaje={errors.descripcion ? errors.descripcion : ''} tipo='error' /> : ''}
                <TextField
                  className={classes.textField}
                  id='idpieza'
                  label='Piezas'
                  margin='normal'
                  name='pieza'
                  onChange={this.handleChange}
                  required={true}
                  type='number'
                  value={this.state.pieza}
                  variant='outlined'
                />
                <TextField
                  className={classes.textField}
                  id='idubicacion'
                  label='Ubicación'
                  margin='normal'
                  name='ubicacion'
                  onChange={this.handleChange}
                  required={true}
                  value={this.state.ubicacion.toUpperCase()}
                  variant='outlined'
                />
                <TextField
                  className={classes.textField}
                  id='idmarca'
                  label='Marca'
                  margin='normal'
                  name='marca'
                  onChange={this.handleChange}
                  required={true}
                  value={this.state.marca.toUpperCase()}
                  variant='outlined'
                />
                <TextField
                  className={classes.textField}
                  id='idorigen'
                  label='Origen'
                  margin='normal'
                  name='origen'
                  onChange={this.handleChange}
                  required={true}
                  value={this.state.origen.toUpperCase()}
                  variant='outlined'
                />
                <FormikRadioGroupField
                  className={classes.textField}
                  fullWidth
                  margin='normal'
                  name='linea'
                  options={[
                    { label: 'HHP', value: '0' },
                    { label: 'CE', value: '1' }
                  ]}
                  row='all'
                />
                <ReactToPrint
                  content={() => this.componentRef}
                  onAfterPrint={this.handleSubmit}
                  trigger={() => (
                    <Button
                      color='secondary'
                      disabled={isValid ? false : true}
                      style={{ margin: '0.5rem 5rem' }}
                      variant='contained'
                      >
                      Imprimir
                    </Button>
                  )}
                />
              </form>
            )}
          </ Formik>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}>
            <div ref={el => (this.componentRef = el)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{this.state.descripcion}</Typography>
                <Typography>1 Q14</Typography>
              </div>
              <JsBarcode fontface={'Roboto'} fontSize={50} format={'CODE39'} height={50} value={this.state.parte} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>SAMSUNG</Typography>
                <Typography>KOREA</Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>HHP</Typography>
                <Typography>{hoy}</Typography>
              </div>
            </div>
          </Paper>

          <div>
            <BarcodeReader
              onError={this.handleError}
              onScan={this.handleScan}
            />
            <p>{_.replace(this.state.resultado.toUpperCase(), "'", '-')}</p>
          </div>
        </Grid>
        {mensaje.length > 1 && <Alerta mensaje={mensaje} tipo={tipo} />}
      </Grid>
    );
  }
}

AssyBarras.propTypes = {
  classes: PropTypes.object.isRequired,
  _cmdaddParte: PropTypes.func.isRequired,
  _cmdupdateParte: PropTypes.func.isRequired,
  _cmdupdateDes: PropTypes.func.isRequired,
  _cmdlimpioAlerta: PropTypes.func.isRequired,
  tipo: PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,
  laparte: PropTypes.string.isRequired,
  lades: PropTypes.string.isRequired
};

export default withStyles(styles)(AssyBarras);
