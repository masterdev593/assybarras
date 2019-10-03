import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Inventario from './inventarioMain2';
import { _cmdaddTodo } from '../../base/acciones/partes.Acciones';
import { _cmdlimpioAlerta } from '../../base/acciones/alerta.Acciones';
import { firebaseConnect } from 'react-redux-firebase';

const mapStateToProps = state => ({
  partez: state.firebase.data.partez,
  tipo: state.alerta.tipo,
  mensaje: state.alerta.mensaje
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      _cmdaddTodo,
      _cmdlimpioAlerta
    },
    dispatch
  );

const enhance = compose(
  firebaseConnect(['partez']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Inventario);
