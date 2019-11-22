import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { _cmdgetSeries } from '../../base/acciones/inventario.Acciones';
import { _cmdlimpioAlerta } from '../../base/acciones/alerta.Acciones';
import Inventario from './inventarioMain';

const mapStateToProps = state => ({
  tipo: state.alerta.tipo,
  mensaje: state.alerta.mensaje,
  catIdf: state.inventario.catIdf,
  estaCargando: state.inventario.estaCargando
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      _cmdgetSeries,
      _cmdlimpioAlerta
    },
    dispatch
  );

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Inventario);
