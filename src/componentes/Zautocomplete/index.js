import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AutoComplete from './autocompleteMain';
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
      _cmdlimpioAlerta
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoComplete);

