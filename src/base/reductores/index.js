import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import alertaReductor from './alerta.Reductor';
import partesReductor from './partes.Reductor';

export default combineReducers({
  firebase: firebaseReducer,
  alerta: alertaReductor,
  partes: partesReductor
});
