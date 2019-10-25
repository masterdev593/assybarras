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
    padding: theme.spacing(5)
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

  handlearParte(e) {
    this.props._cmdupdateParte(e.target.value.toUpperCase());
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
    const { laparte, lades } = this.props;
    console.table(this.props);
    let datos = {
      parte: laparte,
      descripcion: lades
    };
    this.props._cmdaddParte(datos);
  }

  render() {
    const { classes, mensaje, tipo, laparte, lades } = this.props;
    const values = { parte: laparte, descripcion: lades };
    return (
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Formik
            initialValues={values}
            render={props => (
              <form autoComplete='off' noValidate>
                <TextField
                  className={classes.textField}
                  error={props.errors.parte}
                  helperText={props.errors.parte ? props.errors.parte : ''}
                  id='idnombre'
                  label='Nro. de Parte'
                  margin='normal'
                  name='parte'
                  onBlur={this.handlearParte}
                  onChange={props.handleChange}
                  required={true}
                  value={props.values.parte}
                  variant='outlined'
                />
                {props.errors.parte && <Alerta mensaje={props.errors.parte ? props.errors.parte : ''} tipo='error' />}
                <TextField
                  className={classes.textField}
                  id='iddescripcion'
                  label='Descripción'
                  margin='normal'
                  name='descripcion'
                  onBlur={this.handlearDes}
                  onChange={props.handleChange}
                  required={true}
                  value={props.values.descripcion}
                  variant='outlined'
                />
                {props.errors.descripcion && <Alerta mensaje={props.errors.descripcion ? props.errors.descripcion : ''} tipo='error' />}
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
                      disabled={props.isValid ? false : true }
                      style={{ margin: '0.5rem 5rem' }}
                      variant='contained'
                      >
                      Imprimir
                    </Button>
                  )}
                />
              </form>
            )}
            validationSchema={validationSchema}
          />
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
                <Typography>{lades}</Typography>
                <Typography>1 P12</Typography>
              </div>
              <JsBarcode value={laparte} />
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
  laparte: PropTypes.string.isRequired,
  lades: PropTypes.string.isRequired
};

export default withStyles(styles)(AssyBarras);
