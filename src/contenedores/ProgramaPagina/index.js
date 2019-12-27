import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Inferior from '../../componentes/inferior';
import Superior from '../../componentes/Zsuperior';
import AssyBarras from '../../componentes/Zassybarras';
import AutoComplete from '../../componentes/Zautocomplete';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1)
  }
}));

export default function ProgramaPagina() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Superior />
      <Container className={classes.main} component='main' maxWidth='md'>
        <AssyBarras />
        <AutoComplete />
      </Container>
      <Inferior />
    </div>
  );
}
