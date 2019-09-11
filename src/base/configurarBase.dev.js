import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import rootReducer from './reductores';
import firebase from 'firebase/app';
import 'firebase/database';
import secretos from '../config/secretos';

const configurarBase = preloadedState => {

  var firebaseConfig = {
    apiKey: secretos.firebase.apiKey,
    authDomain: secretos.firebase.authDomain,
    databaseURL: secretos.firebase.databaseURL,
    projectId: secretos.firebase.projectId,
    storageBucket: '',
    messagingSenderId: secretos.firebase.messagingSenderId,
    appId: secretos.firebase.appId
  };

  firebase.initializeApp(firebaseConfig);

  const middleware = [thunk.withExtraArgument(getFirebase), logger];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middleware),
      reactReduxFirebase(firebase, {
        userProfile: 'users',
        enableLogging: false
      })
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reductores', () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};
export default configurarBase;
