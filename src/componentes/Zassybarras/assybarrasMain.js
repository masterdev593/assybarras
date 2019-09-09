import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Barcode from '../../componentes/barcode';
import ReactToPrint from 'react-to-print';
import BarcodeReader from 'react-barcode-reader';
import _ from 'lodash';

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
      resultado: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value.toUpperCase()});
  }

  handleScan(data) {
    this.setState({
      resultado: data
    })
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
    const { classes } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="idnombre"
              name='parte'
              label="Nro. de Parte"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.parte.toUpperCase()}
              margin="normal"
              autoFocus={true}
              required={true}
            />
            <TextField
              id="iddescripcion"
              name='descripcion'
              label="Descripción"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.descripcion.toUpperCase()}
              margin="normal"
              required={true}
            />
            <TextField
              id="idpieza"
              name='pieza'
              label="Piezas"
              value={this.state.pieza}
              onChange={this.handleChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              required={true}
            />
            <TextField
              id="idubicacion"
              name='ubicacion'
              label="Ubicación"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.ubicacion.toUpperCase()}
              margin="normal"
              required={true}
            />
            <TextField
              id="idmarca"
              name='marca'
              label="Marca"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.marca.toUpperCase()}
              margin="normal"
              required={true}
            />
            <TextField
              id="idorigen"
              name='origen'
              label="Origen"
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.origen.toUpperCase()}
              margin="normal"
              required={true}
            />
          </form>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Barcode
              propParte={this.state.parte.toUpperCase()}
              propDescripcion={this.state.descripcion.toUpperCase()}
              propPieza={this.state.pieza}
              propUbicacion={this.state.ubicacion.toUpperCase()}
              propMarca={this.state.marca.toUpperCase()}
              propOrigen={this.state.origen.toUpperCase()}
              ref={el => (this.componentRef = el)}
            />
          </Paper>
          <ReactToPrint
            trigger={() => (
              <Button
                color="secondary"
                variant="contained"
                style={{ margin: '2rem 0' }}
              >
                Imprimir
              </Button>
            )}
            content={() => this.componentRef}
            onBeforePrint={this.handleSubmit}
          />
          <div>
            <BarcodeReader onError={this.handleError} onScan={this.handleScan} />
            <p>{_.replace(this.state.resultado.toUpperCase(), "'", '-')}</p>
          </div>
        </Grid>
      </Grid>
    );
  }
}

AssyBarras.propTypes = {
  classes: PropTypes.object.isRequired,
  _cmdaddTodo: PropTypes.func.isRequired
};

export default withStyles(styles)(AssyBarras);
