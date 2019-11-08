import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import JsBarcode from 'react-barcode';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ReactToPrint from 'react-to-print';
import BarcodeReader from 'react-barcode-reader';
import _ from 'lodash';
import Alerta from '../alerta';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikTextField, FormikSelectField } from 'formik-material-fields';
import moment from 'moment';
import 'moment/locale/es';

// TODO: Verificar el prop Touched de formik y Verificar todas la validaciones, acomdar la etiqueta para un release 1

const validationSchema = Yup.object({
  parte: Yup.string('ingrese la parte').required('el número de parte es requerido').max(11, 'número de parte de 11 caracteres'),
  descripcion: Yup.string('ingrese la descripción').required('la descripción es requerida'),
  linea: Yup.string().required('la Linea es requerida')
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
    padding: theme.spacing(1),
    borderRadius: '20px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },
  borde: {
    padding: 0,
    margin: 0
  },
  bordeBarcode: {
    borderTop: '2px solid #000',
    padding: 0,
    margin: 0
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
      resultado: '',
      linea: ''
    };
    this.handlearParte = this.handlearParte.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
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
  handleSelectChange(event) {
    this.setState({
      value: event.target.value
    });
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
      descripcion: this.state.descripcion.toUpperCase(),
      pieza: this.state.pieza,
      ubicacion: this.state.ubicacion,
      marca: this.state.marca,
      origen: this.state.origen,
      linea: this.state.linea
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
                  value={this.state.parte.toUpperCase()}
                  variant='outlined'
                />
                {(errors.parte) ? <Alerta mensaje={errors.parte ? errors.parte : ''} tipo='error' /> : ''}
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
                <FormikTextField
                  className={classes.textField}
                  label='Piezas'
                  margin='normal'
                  name='pieza'
                  onChange={this.handleInputChange}
                  required={true}
                  type='number'
                  value={values.pieza}
                  variant='outlined'
                />
                {(errors.pieza) ? <Alerta mensaje={errors.pieza ? errors.pieza : ''} tipo='error' /> : ''}
                <FormikTextField
                  className={classes.textField}
                  label='Ubicación'
                  margin='normal'
                  name='ubicacion'
                  onChange={this.handleInputChange}
                  required={true}
                  value={values.ubicacion}
                  variant='outlined'
                />
                {(errors.ubicacion) ? <Alerta mensaje={errors.ubicacion ? errors.ubicacion : ''} tipo='error' /> : ''}
                <FormikTextField
                  className={classes.textField}
                  label='Marca'
                  margin='normal'
                  name='marca'
                  onChange={this.handleInputChange}
                  required={true}
                  value={values.marca}
                  variant='outlined'
                />
                {(errors.marca) ? <Alerta mensaje={errors.marca ? errors.marca : ''} tipo='error' /> : ''}
                <FormikTextField
                  className={classes.textField}
                  label='origen'
                  margin='normal'
                  name='origen'
                  onChange={this.handleInputChange}
                  required={true}
                  value={values.origen}
                  variant='outlined'
                />
                {(errors.origen) ? <Alerta mensaje={errors.origen ? errors.origen : ''} tipo='error' /> : ''}
                <FormikSelectField
                  className={classes.textField}
                  fullWidth
                  label='Linea'
                  margin='normal'
                  name='linea'
                  onChange={this.handleInputChange}
                  options={[
                    { label: 'CE', value: 'CE' },
                    { label: 'HHP', value: 'HHP' },
                    { label: 'PP', value: 'PP' },
                    { label: 'OTROS', value: 'OTROS' }
                  ]}
                  value={values.linea}
                  variant='outlined'
                />
                <ReactToPrint
                  content={() => this.componentRef}
                  onBeforePrint={this.handleSubmit}
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
            <Typography ref={el => (this.componentRef = el)} variant='subtitle2'>
              <Box className={classes.borde} display='flex' flexDirection='row' justifyContent='space-between' m={1} p={1}>
                <Box className={classes.borde} fontSize='h6.fontSize' fontWeight={500} p={1}>
                  BIN NO: {this.state.ubicacion}
                </Box>
                <Box className={classes.borde} p={1}>
                  {this.state.pieza} PC
                </Box>
              </Box>
              <Box className={classes.borde} fontSize='h6.fontSize' p={1}>
                {this.state.descripcion}
              </Box>
              <Box className={classes.bordeBarcode} p={1}>
                <JsBarcode fontface={'Roboto'} fontSize={50} format={'CODE39'} height={70} value={this.state.parte} />
              </Box>
              <Box className={classes.borde} display='flex' flexDirection='row' justifyContent='space-between' m={1} p={1}>
                <Box className={classes.borde} p={1}>
                  {this.state.marca}
                </Box>
                <Box className={classes.borde} p={1}>
                  {this.state.origen}
                </Box>
              </Box>
              <Box className={classes.borde} display='flex' flexDirection='row' justifyContent='space-between' m={1} p={1}>
                <Box className={classes.borde} p={1}>
                {this.state.linea}
                </Box>
                <Box className={classes.borde} p={1}>
                  {hoy}
                </Box>
              </Box>
              <Box className={classes.borde} p={1}>
                INVOICE NO: {Math.floor(1000000000000 + Math.random() * 9000000000000)}
              </Box>
            </Typography>

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
