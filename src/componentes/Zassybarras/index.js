import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AssyBarras from './assybarrasMain';
import { _cmdaddParte, _cmdupdateParte, _cmdupdateDes } from '../../base/acciones/partes.Acciones';
import { _cmdlimpioAlerta } from '../../base/acciones/alerta.Acciones';

const mapStateToProps = state => ({
  tipo: state.alerta.tipo,
  mensaje: state.alerta.mensaje,
  laparte: state.partes.laparte,
  lades: state.partes.lades
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      _cmdaddParte,
      _cmdupdateParte,
      _cmdupdateDes,
      _cmdlimpioAlerta
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssyBarras);

