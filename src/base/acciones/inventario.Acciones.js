import {
  ALERTA_SATISFACTORIA,
  ALERTA_ERROR,
  // ALERTA_ADVERTENCIA,
  // ALERTA_INFO,
  ALERTA_LIMPIAR,
  CAT_INVENTARIO_SOLICITA,
  CAT_INVENTARIO_RECIBE,
  CAT_INVENTARIO_ERROR,
  CAT_INVENTARIO_NUEVO,
  CAT_INVENTARIO_AGREGA
} from './constantes';

export const _cmdgetSeries = () => {
  return (dispatch, getState, apiSeries) => {
    const seriesApp = getState().inventario.catIdf;
    console.log('====================================');
    console.log(seriesApp);
    console.log('====================================');
    // const version = getState().estado.catEstado.appVersion;
    dispatch({
      type: CAT_INVENTARIO_SOLICITA
    });
    dispatch({
      type: ALERTA_LIMPIAR
    });
    if (seriesApp.length === 0) {
      apiSeries
        .get('/api/cat_idfs')
        .then(response => {
          dispatch({
            type: CAT_INVENTARIO_RECIBE,
            payload: response.data
          });
          dispatch({
            type: ALERTA_SATISFACTORIA, payload: 'Inventario cargado correctamente'
          });
        })
        .catch(() => {
          dispatch({ type: ALERTA_ERROR, payload: 'API desconectada' });
          dispatch({ type: CAT_INVENTARIO_ERROR });
        });
    } else {
      dispatch({
        type: CAT_INVENTARIO_SOLICITA
      });
      dispatch({
        type: CAT_INVENTARIO_RECIBE,
        payload: seriesApp
      });
      dispatch({
        type: ALERTA_SATISFACTORIA, payload: 'Inventario cargadas correctamente'
      });
    }
  };
};

export const _cmdmostrarNuevo = () => {
  return { type: CAT_INVENTARIO_NUEVO };
};

export const _cmdpostSeries = item => {
  return (dispatch, getState, api) => {
    api
      .post('/api/notes', item)
      .then(() => {
        dispatch({
          type: CAT_INVENTARIO_AGREGA,
          payload: item
        });
        dispatch({
          type: ALERTA_SATISFACTORIA, mensaje: 'Serie agregada correctamente.'
        });
      })
      .catch(() => {
        dispatch({ type: ALERTA_ERROR, codigo: 4520 });
        dispatch({ type: CAT_INVENTARIO_ERROR });
      });
    dispatch({
      type: CAT_INVENTARIO_SOLICITA
    });
    dispatch({
      type: ALERTA_LIMPIAR
    });
  };
};
