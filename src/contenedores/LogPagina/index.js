import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Inferior from '../../componentes/inferior';
import Superior from '../../componentes/Zsuperior';
import Log from '../../componentes/Zlog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

export default function ProgramaPagina() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Superior />
        <Log />
      <Inferior />
    </div>
  );
}
