import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { DataGrid } from 'tubular-react';
import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from 'tubular-common';

const columns = [
  new ColumnModel('OrderID', {
    DataType: ColumnDataType.NUMERIC,
    Filterable: true,
    IsKey: true,
    Label: 'Id',
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }),
  new ColumnModel('CustomerName', {
    Aggregate: AggregateFunctions.COUNT,
    Filterable: true,
    Searchable: true,
    Sortable: true
  }),
  new ColumnModel('ShippedDate', {
    DataType: ColumnDataType.DATE_TIME,
    Filterable: true,
    Sortable: true
  }),
  new ColumnModel('ShipperCity'),
  new ColumnModel('Amount', {
    DataType: ColumnDataType.NUMERIC,
    Sortable: true
  }),
  new ColumnModel('IsShipped', {
    DataType: ColumnDataType.BOOLEAN,
    Filterable: true,
    Sortable: true
  })
];

const localData = [
  {
    OrderID: 1,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-03-19T19:00:00',
    ShipperCity: 'Guadalajara, JAL, Mexico',
    Amount: 300.00
  },
  {
    OrderID: 2,
    CustomerName: 'Microsoft',
    ShippedDate: '2016-11-08T18:00:00',
    ShipperCity: 'Los Angeles, CA, USA',
    Amount: 9.00
  }
];


/* function valuesToArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
} */

class Inventario extends Component {
  render() {
    const { partez } = this.props;
    if (!isLoaded(partez)) {
      return <div>Cargando...</div>;
    }
    if (isEmpty(partez)) {
      return <div>Partes esta vacia</div>;
    }

    const peopleArray = Object.values(partez);
    console.log(peopleArray);

    const var1 = peopleArray.map((key) => (
      key
    ));
    console.log(var1);

    return (
      <div>
        <h1>HHP</h1>
        <DataGrid
          columns={columns}
          dataSource={localData}
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
