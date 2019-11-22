import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import alertaReductor from './alerta.Reductor';
import inventarioReductor from './inventario.Reductor';

export default combineReducers({
  firebase: firebaseReducer,
  alerta: alertaReductor,
  inventario: inventarioReductor
});
