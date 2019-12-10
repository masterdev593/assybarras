import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader';
import Alerta from '../alerta';
import TablaVirtualizada from '../tabla2';
// import Dialog from '../dialog';
// import ListaSimpleVista from './ListaSimpleVista';

class inventarioMain extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props._cmdgetSeries();
  }

  render() {
    const { catIdf, estaCargando, tipo, mensaje } = this.props;
    const columns = [
      {
        label: 'Parte',
        dataKey: 'par'
        // width: 200
      },
      {
        label: 'Descripción',
        dataKey: 'des',
        width: 120
      },
      {
        label: 'Ubicación',
        dataKey: 'ubi',
        width: 120
      }
    ];
    return (
      <div className='seriesMain'>
        {estaCargando && <Loader />}
        {!estaCargando && <Alerta mensaje={mensaje} tipo={tipo} />}
        {!estaCargando && <TablaVirtualizada columns={columns} data={catIdf} />}
      </div>
    );
  }
}

inventarioMain.propTypes = {
  _cmdgetSeries: PropTypes.func.isRequired,
  tipo: PropTypes.string,
  mensaje: PropTypes.string,
  catIdf: PropTypes.array,
  estaCargando: PropTypes.bool
};

export default inventarioMain;
