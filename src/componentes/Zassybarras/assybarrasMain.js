import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import showResults from './showResults';
// import TextField from '@material-ui/core/TextField';
import MaterialUiForm from '../assybarrasForm';
import Button from '@material-ui/core/Button';
import Barcode from '../../componentes/barcode';
import ReactToPrint from 'react-to-print';
import BarcodeReader from 'react-barcode-reader';
import _ from 'lodash';
import Alerta from '../alerta';
// TODO: Validar campos de texto al presionar el boton imprimir

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: 'initial'
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
      resultado: '',
      helpText: '',
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props._cmdlimpioAlerta();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.toUpperCase() });
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
    let datos = {
      parte: this.state.parte,
      descripcion: this.state.descripcion
    };
    this.props._cmdaddTodo(datos);
  }

  render() {
    const { classes, mensaje, tipo } = this.props;
    return (
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <MaterialUiForm error={this.state.error}
            helpText={this.state.helpText} onSubmit={showResults}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Barcode
              propDescripcion={this.state.descripcion.toUpperCase()}
              propMarca={this.state.marca.toUpperCase()}
              propOrigen={this.state.origen.toUpperCase()}
              propParte={this.state.parte.toUpperCase()}
              propPieza={this.state.pieza}
              propUbicacion={this.state.ubicacion.toUpperCase()}
              ref={el => (this.componentRef = el)}
            />
          </Paper>
          <ReactToPrint
            content={() => this.componentRef}
            onBeforePrint={this.handleSubmit}
            trigger={() => (
              <Button
                color='secondary'
                style={{ margin: '2rem 0' }}
                variant='contained'
                >
                Imprimir
              </Button>
            )}
          />
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
  _cmdaddTodo: PropTypes.func.isRequired,
  _cmdlimpioAlerta: PropTypes.func.isRequired,
  tipo: PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,
  partes: PropTypes.array
};

export default withStyles(styles)(AssyBarras);
