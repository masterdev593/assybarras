import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AssyBarras from './assybarrasMain2';
import { _cmdaddParte } from '../../base/acciones/partes.Acciones';
import { _cmdlimpioAlerta } from '../../base/acciones/alerta.Acciones';

const mapStateToProps = state => ({
  tipo: state.alerta.tipo,
  mensaje: state.alerta.mensaje
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      _cmdaddParte,
      _cmdlimpioAlerta
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssyBarras);

