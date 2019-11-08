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
  parte: Yup.string('Ingrese la parte').required('El número de parte es requerido').max(11, 'Número de parte de 11 caracteres'),
  descripcion: Yup.string('Ingrese la descripción').required('La descripción es requerida'),
  ubicacion: Yup.string('Ingrese la ubicación').required('La ubicación es requerida'),
  factura: Yup.string('Ingrese la factura').required('La factura es requerida'),
  cantidad: Yup.number('Ingrese la cantidad')
    .required('La cantidad es requerida')
    .positive('La cantidad debe ser mayor que 0')
    .integer('La cantidad debe ser un número válido'),
  marca: Yup.string('Ingrese la marca').required('La marca es requerida'),
  origen: Yup.string('Ingrese el origen').required('El origen es requerido'),
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
  borde2: {
    borderTop: '2px solid #000'
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
      ubicacion: '',
      factura: '',
      cantidad: 1,
      marca: 'SAMSUNG',
      origen: 'KOREA',
      linea: '',
      resultado: ''
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
      cantidad: this.state.cantidad,
      ubicacion: this.state.ubicacion,
      marca: this.state.marca,
      origen: this.state.origen,
      linea: this.state.linea,
      factura: this.state.factura
    };
    const hoy = moment(new Date()).locale('es').format('YYYYMMDD');
    return (
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
          >
            {({ isValid, errors, values, touched }) => (
              <form autoComplete='off' noValidate>
                <FormikTextField
                  className={classes.textField}
                  label='Nro. de Parte'
                  margin='normal'
                  name='parte'
                  onChange={this.handleInputChange}
                  required={true}
                  value={this.state.parte}
                  variant='outlined'
                />
                {(errors.parte && touched.parte) ? <Alerta mensaje={errors.parte ? errors.parte : ''} tipo='error' /> : ''}
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
                {(errors.descripcion && touched.descripcion) ? <Alerta mensaje={errors.descripcion ? errors.descripcion : ''} tipo='error' /> : ''}
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
                {(errors.ubicacion && touched.ubicacion) ? <Alerta mensaje={errors.ubicacion ? errors.ubicacion : ''} tipo='error' /> : ''}
                <FormikTextField
                  className={classes.textField}
                  label='Factura'
                  margin='normal'
                  name='factura'
                  onChange={this.handleInputChange}
                  required={true}
                  value={values.factura}
                  variant='outlined'
                />
                {(errors.factura && touched.factura) ? <Alerta mensaje={errors.factura ? errors.factura : ''} tipo='error' /> : ''}
                <FormikTextField
                  className={classes.textField}
                  label='Cantidad'
                  margin='normal'
                  name='cantidad'
                  onChange={this.handleInputChange}
                  required={true}
                  type='number'
                  value={values.cantidad}
                  variant='outlined'
                />
                {(errors.cantidad && touched.cantidad) ? <Alerta mensaje={errors.cantidad ? errors.cantidad : ''} tipo='error' /> : ''}
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
                {(errors.marca && touched.marca) ? <Alerta mensaje={errors.marca ? errors.marca : ''} tipo='error' /> : ''}
                <FormikTextField
                  className={classes.textField}
                  label='Origen'
                  margin='normal'
                  name='origen'
                  onChange={this.handleInputChange}
                  required={true}
                  value={values.origen}
                  variant='outlined'
                />
                {(errors.origen && touched.origen) ? <Alerta mensaje={errors.origen ? errors.origen : ''} tipo='error' /> : ''}
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
                {(errors.linea && touched.linea) ? <Alerta mensaje={errors.linea ? errors.linea : ''} tipo='error' /> : ''}
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
                  {this.state.cantidad} PC
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
              <Box borderTop={1} className={classes.borde} p={1}>
                INVOICE NO: {this.state.factura}
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
