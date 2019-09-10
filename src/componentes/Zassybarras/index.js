import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AssyBarras from './assybarrasMain';
import { _cmdaddTodo } from '../../base/acciones/partes.Acciones';

const mapStateToProps = state => ({
  tipo: state.alerta.tipo,
  mensaje: state.alerta.mensaje
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      _cmdaddTodo
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssyBarras);

