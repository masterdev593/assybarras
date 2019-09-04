import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configurarBase from './base';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import App from './contenedores/Rutas';
import theme from './tema';
import * as serviceWorker from './serviceWorker';

const store = configurarBase();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('assybarras')
);

serviceWorker.unregister();
