import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AssyBarras from './assybarrasMain';
import { _cmdaddTodo } from '../../base/acciones/mensaje.Acciones';

/* const mapStateToProps = state => ({
  tipo: state.alerta.tipo,
  mensaje: state.alerta.mensaje,
  catEstado: state.estado.catEstado
}); */

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      _cmdaddTodo
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(AssyBarras);

