import {
  FORM_ETIQUETAS_PARTE_UPDATE,
  FORM_ETIQUETAS_DESCRIPCION_UPDATE,
  FORM_ETIQUETAS_SOLICITA,
  FORM_ETIQUETAS_ERROR
} from '../acciones/constantes';

const initialState = {
  estaCargando: false,
  laparte: '',
  lades: ''
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
        laparte: action.payload
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
