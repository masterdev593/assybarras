import {
  CAT_INVENTARIO_SOLICITA,
  CAT_INVENTARIO_RECIBE,
  CAT_INVENTARIO_AGREGA,
  CAT_INVENTARIO_ERROR,
  CAT_INVENTARIO_NUEVO
} from '../acciones/constantes';

const initialState = {
  catIdf: [],
  estaCargando: false,
  mostrarNuevo: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CAT_INVENTARIO_SOLICITA:
      return {
        ...state,
        estaCargando: true
      };
    case CAT_INVENTARIO_RECIBE:
      return {
        ...state,
        estaCargando: false,
        catIdf: [...action.payload]
      };
    case CAT_INVENTARIO_AGREGA:
      return {
        ...state,
        catIdf: [...state.catIdf, action.payload],
        estaCargando: false,
        mostrarNuevo: false
      };
    case CAT_INVENTARIO_NUEVO:
      return {
        ...state,
        mostrarNuevo: !state.mostrarNuevo
      };
    case CAT_INVENTARIO_ERROR:
      return {
        ...state,
        estaCargando: false,
        mostrarNuevo: false
      };
    default:
      return state;
  }
};
