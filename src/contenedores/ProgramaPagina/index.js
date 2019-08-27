import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../recursos/logo.png';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffde31'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    margin: '15px'
  },
  footer: {
    padding: '30px 0 !important',
    borderTop: '3px solid #ffde31',
    marginTop: 'auto',
    backgroundColor: '#000'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontWeight: 'initial'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: '#F8f8f8' }}>
      {'Copyright © '}
      <Link
        color="secondary"
        href="https://idfimportadora.com/"
        target="_blank"
        rel="noopener"
      >
        {'IDF Importadora '}
      </Link>
      {new Date().getFullYear()}
      {'. Todos los derechos reservados. Por '}
      <Link
        color="secondary"
        href="https://desarrollonodejs.pro/"
        target="_blank"
        rel="noopener"
      >
        Desarrollo Web NodeJS
      </Link>
    </Typography>
  );
}

function GridMain() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    parte: '',
    descripcion: '',
    cantidad: 1,
    ubicacion: '',
    marca: 'SAMSUNG',
    origen: 'KOREA'
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="idnombre"
            label="Nro. de Parte"
            className={classes.textField}
            onChange={handleChange('parte')}
            value={values.parte.toUpperCase()}
            margin="normal"
          />
          <TextField
            id="iddescripcion"
            label="Descripción"
            className={classes.textField}
            onChange={handleChange('descripcion')}
            value={values.descripcion.toUpperCase()}
            margin="normal"
          />
          <TextField
            id="idcantidad"
            label="Cantidad"
            value={values.cantidad}
            onChange={handleChange('cantidad')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
          />
          <TextField
            id="idubicacion"
            label="Ubicación"
            className={classes.textField}
            onChange={handleChange('ubicacion')}
            value={values.ubicacion.toUpperCase()}
            margin="normal"
          />
          <TextField
            id="idmarca"
            label="Marca"
            className={classes.textField}
            onChange={handleChange('marca')}
            value={values.marca}
            margin="normal"
          />
          <TextField
            id="idorigen"
            label="Origen"
            className={classes.textField}
            onChange={handleChange('origen')}
            value={values.origen}
            margin="normal"
          />
        </form>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>Vista Previa</Paper>
      </Grid>
    </Grid>
  );
}

export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ borderBottom: '3px solid #ffde31' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <img src={logo} alt="IDF" className={classes.logo} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Container component="main" className={classes.main} maxWidth="md">
        <GridMain />
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
