import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
});

export default function SimpleTable({ tileData }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table aria-label='simple table' className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Parte</TableCell>
            <TableCell align='right'>Descripcion</TableCell>
            <TableCell align='right'>Ubicación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tileData.map(row => (
            <TableRow key={row.id}>
              <TableCell component='th' scope='row'>
                {row.parte}
              </TableCell>
              <TableCell align='right'>{row.descripcion}</TableCell>
              <TableCell align='right'>{row.ubi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tileData: PropTypes.array.isRequired
};

