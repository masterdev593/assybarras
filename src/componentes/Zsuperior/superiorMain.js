import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../recursos/logo.png';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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
    color: theme.palette.secondary.main
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
  },
  border: {
    borderBottom: '3px solid',
    borderBottomColor: theme.palette.secondary.main
  }
}));

const SuperiorMain = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  function handleMenuHhp(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuProtectionPro(event) {
    setAnchorEl2(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClose2() {
    setAnchorEl2(null);
  }

  return (
    <AppBar className={classes.border} position='static'>
      <Toolbar style={{ justifyContent: 'space-around' }}>
        <img alt='IDF' className={classes.logo} src={logo} />
        <div className={classes.title}>
          <Button color='secondary' component={Link} to='./'>
            Etiquetas
          </Button>
          <Button
            aria-controls='menu-appbar'
            aria-haspopup='true'
            aria-label='account of current user'
            color='secondary'
            onClick={handleMenuHhp}
            >
            HHP
          </Button>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            id='menu-appbar'
            keepMounted
            onClose={handleClose}
            open={open}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            >
            <MenuItem component={Link} onClick={handleClose} to='./hhp'>
              Inventario
            </MenuItem>
            <MenuItem component={Link} onClick={handleClose} to='./test'>
              Talleres
            </MenuItem>
            <MenuItem component={Link} onClick={handleClose} to='./test'>
              Ventas
            </MenuItem>
            <MenuItem component={Link} onClick={handleClose} to='./test'>
              Notas de Entrega
            </MenuItem>
          </Menu>
          <Button
            aria-controls='menu-protection'
            aria-haspopup='true'
            aria-label='account of current user'
            color='secondary'
            onClick={handleMenuProtectionPro}
            >
            Protection Pro
          </Button>
          <Menu
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            id='menu-protection'
            keepMounted
            onClose={handleClose2}
            open={open2}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            >
            <MenuItem component={Link} onClick={handleClose2} to='./inventariopro'>
              Inventario
            </MenuItem>
          </Menu>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'buscar' }}
            placeholder='Buscar...'
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default SuperiorMain;
