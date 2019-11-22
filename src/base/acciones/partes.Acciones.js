import { ALERTA_SATISFACTORIA } from './constantes';

export const _cmdaddParte = parte => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .push('partez', parte)
      .then(() => {
        dispatch({
          type: ALERTA_SATISFACTORIA,
          payload: 'Guardado'
        });
      });
  };
};
/* export const _cmdupdateParte = (zparte) => {
  return (dispatch) => {
    console.log('====================================');
    console.log(zparte);
    console.log('====================================');
    dispatch({
      type: FORM_ETIQUETAS_PARTE_UPDATE,
      parte: zparte.parte,
      descripcion: zparte.descripcion
    });
  };
};
export const _cmdupdateDes = (zdes) => {
  return (dispatch) => {
    dispatch({
      type: FORM_ETIQUETAS_DESCRIPCION_UPDATE,
      payload: zdes
    });
  };
}; */

/* export const _cmdgetPartes = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .on('value', snapshot => {
        dispatch({
          type: ALERTA_INFO,
          payload: 'PLAYA' + snapshot
        });
      });
  };
}; */
/*
export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

export const completeToDo = completeToDo => async dispatch => {
  todosRef.child(completeToDo).remove();
};

export const fetchToDos = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
}; */
