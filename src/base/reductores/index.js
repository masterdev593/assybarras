import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { reducer as formReducer } from 'redux-form';
import alertaReductor from './alerta.Reductor';
import partesReductor from './partes.Reductor';

export default combineReducers({
  firebase: firebaseReducer,
  form: formReducer,
  alerta: alertaReductor,
  partes: partesReductor
});
