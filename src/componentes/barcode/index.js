import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// Barcode
import JsBarcode from 'react-barcode';

class Barcode extends Component {
  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem' }}>
          <Typography>BATTERY</Typography>
          <Typography>1 Q16</Typography>
        </div>
        <JsBarcode value='GH82-15658A' width='2'/>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>SAMSUNG</Typography>
          <Typography>KOREA</Typography>
        </div>
      </div>
    );
  }
}

export default Barcode;
