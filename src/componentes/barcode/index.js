import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// Barcode
import JsBarcode from 'react-barcode';

class Barcode extends Component {
  render() {
    return (
      <div style={{ padding: '1px', fontWeight: 'bold' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>ASSY DECO BATTERY</p>
          <p>1 R10</p>
        </div>
        <JsBarcode value="GH82-18849B" />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <p>SAMSUNG</p>
          <p>KOREA</p>
        </div>
      </div>
    );
  }
}

export default Barcode;
