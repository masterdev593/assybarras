import { ALERTA_SATISFACTORIA, FETCH_TODOS } from './constantes';

export const _cmdaddTodo = parte => {
  return (dispatch, getState, getFirebase) => {
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

export const _cmdgetPartes = () => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    firebase
      .on('value', snapshot => {
        dispatch({
          type: FETCH_TODOS,
          payload: snapshot.val()
        });
    });
  };
};
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
