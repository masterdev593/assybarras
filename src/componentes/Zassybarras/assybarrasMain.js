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

const validationSchema = Yup.object({
  parte: Yup.string('Ingrese la parte').required('El número de Parte es requerido'),
  descripcion: Yup.string('Ingrese la descripción').required('La Descripción es requerida')
});


const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
    borderRadius: '40px'
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
    this.handlearDes = this.handlearDes.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props._cmdlimpioAlerta();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handlearParte(event) {
    const target = event.target;
    const value = target.value;
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
    const { catEtiquetas} = this.props;
    console.table(this.props);
    let datos = {
      parte: catEtiquetas.parte,
      descripcion: catEtiquetas.descripcion
    };
    this.props._cmdaddParte(datos);
  }

  render() {
    const { classes, mensaje, tipo, catEtiquetas } = this.props;
    const values = catEtiquetas;
    return (
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            >
            {({ isValid, errors, handleChange, values, handleReset }) => (
              <form autoComplete='off' noValidate onReset={handleReset}>
                <TextField
                  className={classes.textField}
                  error={errors.parte}
                  helperText={errors.parte ? errors.parte : ''}
                  id='idnombre'
                  label='Nro. de Parte'
                  margin='normal'
                  name='parte'
                  onBlur={this.handlearParte}
                  onChange={handleChange}
                  required={true}
                  value={values.parte}
                  variant='outlined'
                />
                {errors.parte && <Alerta mensaje={errors.parte ? errors.parte : ''} tipo='error' />}
                <TextField
                  className={classes.textField}
                  error={errors.descripcion}
                  helperText={errors.descripcion ? errors.descripcion : ''}
                  id='iddescripcion'
                  label='Descripción'
                  margin='normal'
                  name='descripcion'
                  onBlur={this.handlearParte}
                  onChange={handleChange}
                  required={true}
                  value={values.descripcion}
                  variant='outlined'
                />
                {errors.descripcion && <Alerta mensaje={errors.descripcion ? errors.descripcion : ''} tipo='error' />}
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                >
                <Typography>{catEtiquetas.parte}</Typography>
                <Typography>1 P7</Typography>
              </div>
              <JsBarcode value={values.descripcion} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>SAMSUNG</Typography>
                <Typography>KOREA</Typography>
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
  catEtiquetas: PropTypes.object.isRequired
};

export default withStyles(styles)(AssyBarras);
