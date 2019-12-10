import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AssyBarras from './assybarrasMain';
import { _cmdaddParte } from '../../base/acciones/partes.Acciones';
import { _cmdlimpioAlerta } from '../../base/acciones/alerta.Acciones';
import { _cmdgetSeries } from '../../base/acciones/inventario.Acciones';

const mapStateToProps = state => ({
  tipo: state.alerta.tipo,
  mensaje: state.alerta.mensaje,
  catIdf: state.inventario.catIdf
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      _cmdgetSeries,
      _cmdaddParte,
      _cmdlimpioAlerta
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssyBarras);

