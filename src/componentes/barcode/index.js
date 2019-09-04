import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

// Barcode
import JsBarcode from 'react-barcode';

class Barcode extends Component {
  render() {
    const {
      propParte,
      propDescripcion,
      propPieza,
      propUbicacion,
      propMarca,
      propOrigen
    } = this.props;
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '1rem'
          }}
        >
          <Typography>{propDescripcion}</Typography>
          <Typography>
            {propPieza} {propUbicacion}
          </Typography>
        </div>
        <JsBarcode value={propParte} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{propMarca}</Typography>
          <Typography>{propOrigen}</Typography>
        </div>
      </div>
    );
  }
}

Barcode.propTypes = {
  propParte: PropTypes.string.isRequired,
  propDescripcion: PropTypes.string.isRequired,
  propPieza: PropTypes.number.isRequired,
  propUbicacion: PropTypes.string.isRequired,
  propMarca: PropTypes.string.isRequired,
  propOrigen: PropTypes.string.isRequired
};

export default Barcode;
