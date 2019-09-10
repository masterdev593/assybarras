import { MENSAJE_ENVIA } from './constantes';

export const _cmdaddTodo = parte => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .push('cat_partes', parte)
      .then(() => {
        dispatch({
          type: MENSAJE_ENVIA,
          payload: 'OK'
        });
    });
  };
};
