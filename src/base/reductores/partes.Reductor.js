import {
  FORM_ETIQUETAS_PARTE_UPDATE,
  FORM_ETIQUETAS_DESCRIPCION_UPDATE,
  FORM_ETIQUETAS_SOLICITA,
  FORM_ETIQUETAS_ERROR
} from '../acciones/constantes';

const initialState = {
  estaCargando: false,
  catEtiquetas: []
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
        catEtiquetas: [...state.catEtiquetas, action.zparte]
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
