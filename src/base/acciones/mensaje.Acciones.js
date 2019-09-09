import { MENSAJE_ENVIA } from './constantes';

const sendNotification = (payload) => ({
  type: MENSAJE_ENVIA,
  payload
})

export const _cmdaddTodo = parte => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.push('cat_partes', parte).then(() => {
    dispatch(sendNotification('Todo Added'));
  });
};
