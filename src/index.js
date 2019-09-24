import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configurarBase from './base';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App from './contenedores/Rutas';
import theme from './tema';
import secretos from './config/secretos';
import * as serviceWorker from './serviceWorker';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/database';

const store = configurarBase();

var firebaseConfig = {
  apiKey: secretos.firebase.apiKey,
  authDomain: secretos.firebase.authDomain,
  databaseURL: secretos.firebase.databaseURL,
  projectId: secretos.firebase.projectId,
  storageBucket: '',
  messagingSenderId: secretos.firebase.messagingSenderId,
  appId: secretos.firebase.appId
};

const rrfConfig = { userProfile: 'users' };

firebase.initializeApp(firebaseConfig);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('assybarras')
);

serviceWorker.unregister();
