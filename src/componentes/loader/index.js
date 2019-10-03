import React from 'react';
import './loader.css';
import { makeStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
// OPCIONAL: <CircularProgress size={50} style={{color: '#FFC107', textAlign: 'center'}} />

const useStyles = makeStyles(theme => ({
  centro: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  texto: {
    color: theme.palette.common.black,
    textAlign: 'center',
    fontSize: 18,
    padding: '50px'
  }
}));

const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.centro}>
      <div className='sk-fading-circle'>
        <div className='sk-circle1 sk-circle' />
        <div className='sk-circle2 sk-circle' />
        <div className='sk-circle3 sk-circle' />
        <div className='sk-circle4 sk-circle' />
        <div className='sk-circle5 sk-circle' />
        <div className='sk-circle6 sk-circle' />
        <div className='sk-circle7 sk-circle' />
        <div className='sk-circle8 sk-circle' />
        <div className='sk-circle9 sk-circle' />
        <div className='sk-circle10 sk-circle' />
        <div className='sk-circle11 sk-circle' />
        <div className='sk-circle12 sk-circle' />
      </div>
      <div className={classes.texto}>
        <p>Espera un poco. Cargando</p>
      </div>
    </div>
  );
};

export default Loader;
