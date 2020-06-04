/* eslint-disable react/display-name */
/* eslint-disable no-undef */
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
import { FixedSizeList } from 'react-window';
import Autocomplete from '@material-ui/lab/Autocomplete';

const validationSchema = Yup.object({
  parte: Yup.string('Ingrese la parte').required('El número de parte es requerido').max(25, 'Número de parte de 25 caracteres'),
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
  listbox: {
    '& ul': {
      padding: 0,
      margin: 0
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderRadius: '20px',
    paddingTop: '50px'
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

function renderRow(props) {
  const { data, index, style } = props;

  return React.cloneElement(data[index], {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
      ...style
    }
  });
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  // const theme = useTheme();
  // const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const itemCount = Array.isArray(children) ? children.length : 0;
  // const itemSize = smUp ? 36 : 48;
  const outerElementType = React.useMemo(() => {
    return React.forwardRef((props2, ref2) => <div ref={ref2} {...props2} {...other} />);
  }, []);

  return (
    <div ref={ref}>
      <FixedSizeList
        height={150}
        innerElementType='ul'
        itemCount={itemCount}
        itemData={children}
        itemSize={48}
        outerElementType={outerElementType}
        overscanCount={5}
        style={{ padding: 0, maxHeight: 'auto' }}
        width='100%'
        >
        {renderRow}
      </FixedSizeList>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node
};

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
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrangeClick = this.handleOrangeClick.bind(this);
  }

  componentDidMount() {
    this.props._cmdlimpioAlerta();
    this.props._cmdgetSeries();

  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value.toUpperCase() });
  }
  handleSelectChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  handleOrangeClick(event, value) {
    if (value.descripcion === 'null') {
      this.setState({
        descripcion: 'SU',
        ubicacion: value.ubi
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.descripcion + '     si           ' + this.state.ubicacion);
      });
    } else {
      this.setState({
        parte: value.parte,
        descripcion: value.descripcion,
        ubicacion: value.ubi
      }, () => {
        // This will output an array of objects
        // given by Autocompelte options property.
        console.log(this.state.descripcion + '     no           ' + this.state.ubicacion);
      });
    }
    console.log(value.descripcion + '     +           ' + value.ubi);
  }

  /*   handlearParte(event) {
      const target = event.target;
      const value = target.value.toUpperCase();
      const name = target.name;
      this.props._cmdupdateParte({
        [name]: value
      });
    }
    handlearDes(e) {
      this.props._cmdupdateDes(e.target.value.toUpperCase());
    } */

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
    const { classes, mensaje, tipo, catIdf } = this.props;
    const { parte, descripcion, cantidad, ubicacion, marca, origen, linea, factura } = this.state;
    let values = {
      parte: parte,
      descripcion: descripcion,
      cantidad: cantidad,
      ubicacion: ubicacion,
      marca: marca,
      origen: origen,
      linea: linea,
      factura: factura
    };
    const hoy = moment(new Date()).locale('es').format('YYYYMMDD');
    const oxtions = catIdf;
    // Autosuggest will pass through all these props to the input.
    /*     const inputProps = {
          placeholder: 'Type a programming language',
          value,
          onChange: this.onChange
        }; */
    return (
      <Grid container spacing={3}>
        <Grid item sm={10} xs={12}>
          <Autocomplete
            className={classes.listbox}
            disableClearable={true}
            getOptionLabel={option => option.parte}
            id='autocomplete-assybarrasMain'
            ListboxComponent={ListboxComponent}
            noOptionsText={'Parte no encontrada'}
            onChange={this.handleOrangeClick}
            options={oxtions}
            renderInput={params => (
              <Formik onSubmit={values => {
                // same shape as initial values
                console.table(values);
              }}
                      >
                {({ errors, touched }) => (
                  <form autoComplete='off' noValidate>
                    <FormikTextField {...params}
                      className={classes.textField}
                      label='Nro. de Parte'
                      margin='normal'
                      name='parte555'
                      variant='outlined'
                    />
                    {(errors.parte && touched.parte) ? <Alerta mensaje={errors.parte ? errors.parte : ''} tipo='error' /> : ''}
                  </form>
                )}
              </ Formik>
            )}
            style={{ width: 300 }}
          />
          <Formik
            initialValues={values}
            validationSchema={validationSchema}
            >
            {({ isValid, errors, values, touched }) => (
              <form autoComplete='off' noValidate>
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
                {(errors.descripcion && touched.descripcion) ?
                  <Alerta mensaje={errors.descripcion ? errors.descripcion : ''} tipo='error' /> : ''}
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
                  trigger={() => (
                    <Button
                      color='secondary'
                      disabled={isValid ? true : false}
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
        <Grid item sm={10} xs={12}>
          <Paper className={classes.paper}>
            <Typography ref={el => (this.componentRef = el)} variant='subtitle2'>
              <Box className={classes.borde} display='flex' flexDirection='row' justifyContent='space-between' m={1} p={1}>
                <Box className={classes.borde} fontSize='h6.fontSize' p={1}>
                  BIN NO: {this.state.ubicacion}
                </Box>
                <Box className={classes.borde} p={1}>
                  {this.state.cantidad} PC
                </Box>
              </Box>
              <Box className={classes.borde} fontSize='caption' p={1}>
                {this.state.descripcion}
              </Box>
              <Box className={classes.bordeBarcode} p={1}>
                <JsBarcode fontface={'Roboto'} fontSize={30} format={'CODE128'} height={10} value={this.state.parte} width={1.5} />
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
  _cmdlimpioAlerta: PropTypes.func.isRequired,
  _cmdgetSeries: PropTypes.func.isRequired,
  tipo: PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,
  catIdf: PropTypes.array.isRequired
};

export default withStyles(styles)(AssyBarras);
