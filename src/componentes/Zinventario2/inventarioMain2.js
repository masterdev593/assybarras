import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { isLoaded, isEmpty } from 'react-redux-firebase/lib/helpers';
import Loader from '../loader';
import Alerta from '../alerta';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.secondary.main
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
}));


export default function CustomizedTables({ partez }) {
  const classes = useStyles();
  if (!isLoaded(partez)) {
    return <Loader />;
  }
  if (isEmpty(partez)) {
    return <Alerta mensaje='BDD sin registros' tipo='warning' />;
  }
  const total = Object.keys(partez);

  return (
    <Paper className={classes.root}>
      <Alerta mensaje={total.length + ' partes cargadas'} tipo='info' />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell >NÚMERO DE PARTE</StyledTableCell>
            <StyledTableCell align='right'>DESCRIPCIÓN</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Object.keys(partez).map((key, id) => (
              <StyledTableRow id={id} key={key}>
                <StyledTableCell component='th' scope='row'>
                  {partez[key].parte}
                </StyledTableCell>
                <StyledTableCell align='right'>{partez[key].descripcion}</StyledTableCell>
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTables.propTypes = {
  tipo: PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,
  partez: PropTypes.object
};
