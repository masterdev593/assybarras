import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%'
  }
});

export default function TablaSimple({ data }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <table className={classes.table}>
        <tr>
          <th>Parte</th>
          <th>Descripcion</th>
          <th>Ubicación</th>
        </tr>
        {data.map(row => (
          <tr>
            <td>{row.parte}</td>
            <td>{row.descripcion}</td>
            <td>{row.ubi}</td>
          </tr>
        ))}
      </table>
    </Paper>
  );
}
TablaSimple.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

