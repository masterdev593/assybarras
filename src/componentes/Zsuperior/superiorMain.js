import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../recursos/logo.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  }
}));

const SuperiorMain = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ borderBottom: '3px solid #ffde31' }}>
      <Toolbar style={{ justifyContent: 'space-around' }}>
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
            inputProps={{ 'aria-label': 'buscar' }}
          />
        </div>
        <div className={classes.title}>
          <Button color="secondary" component={Link} to='./'>Etiquetas</Button>
          <Button color="secondary" component={Link} to='./test'>Ventas</Button>
          <Button color="secondary" component={Link} to='./test'>Notas de Entrega</Button>
          <Button color="secondary" component={Link} to='./test'>Talleres</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default SuperiorMain;
