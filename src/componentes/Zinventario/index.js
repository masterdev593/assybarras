import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Inventario from './inventarioMain';
import { _cmdaddParte } from '../../base/acciones/partes.Acciones';
import { _cmdlimpioAlerta } from '../../base/acciones/alerta.Acciones';
import { firebaseConnect } from 'react-redux-firebase';

const mapStateToProps = state => ({
  partez: state.firebase.data.partez
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      _cmdaddParte,
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
