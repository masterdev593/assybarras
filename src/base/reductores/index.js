import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import alertaReductor from './alerta.Reductor';

export default combineReducers({
  firebase: firebaseReducer,
  alerta: alertaReductor
});
