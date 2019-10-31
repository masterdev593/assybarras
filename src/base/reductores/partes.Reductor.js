import {
  FORM_ETIQUETAS_PARTE_UPDATE,
  FORM_ETIQUETAS_DESCRIPCION_UPDATE,
  FORM_ETIQUETAS_SOLICITA,
  FORM_ETIQUETAS_ERROR
} from '../acciones/constantes';

const initialState = {
  estaCargando: false,
  // catEtiquetas: [],
  laparte: 'GH97-21065A',
  lades: 'ASSY PBA MAIN'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORM_ETIQUETAS_SOLICITA:
      return {
        ...state,
        estaCargando: true
      };
    case FORM_ETIQUETAS_PARTE_UPDATE:
      return {
        ...state,
        // catEtiquetas: action.zparte
        // catEtiquetas: [...state.catEtiquetas, action.zparte]
        laparte: action.parte,
        lades: action.descripcion
      };
    case FORM_ETIQUETAS_DESCRIPCION_UPDATE:
      return {
        ...state,
        lades: action.payload
      };
    case FORM_ETIQUETAS_ERROR:
      return {
        ...state,
        estaCargando: false
      };
    default:
      return state;
  }
};
