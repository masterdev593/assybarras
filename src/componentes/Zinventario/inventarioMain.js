import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { DataGrid } from 'tubular-react';
import { ColumnModel } from 'tubular-common';

const columns = [
  new ColumnModel('OrderID'),
  new ColumnModel('CustomerName'),
  new ColumnModel('ShipperCity')
];

class Inventario extends Component {
  render() {
    const { partez } = this.props;
    if (!isLoaded(partez)) {
      return <div>Cargando...</div>;
    }
    if (isEmpty(partez)) {
      return <div>Partes esta vacia</div>;
    }
    const var1 = Object.keys(partez).map((key) => (
        partez[key].parte
    ));
    console.log(partez);
    return (
      <div>
        <h1>HHP</h1>
        <ol>{var1}</ol>
        <DataGrid
          columns={columns}
          dataSource={partez}
          gridName='Grid'
        />
      </div>
    );
  }
}

Inventario.propTypes = {
  firebase: PropTypes.object.isRequired,
  partez: PropTypes.object
};

export default Inventario;
