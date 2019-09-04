import { MENSAJE_ENVIA } from './constantes';

const sendNotification = (payload) => ({
  type: MENSAJE_ENVIA,
  payload
})

export const _cmdaddTodo = newTodo => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.push('todos', newTodo).then(() => {
    dispatch(sendNotification('Todo Added'));
  });
};
