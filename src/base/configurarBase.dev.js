import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';
// import { getFirebase } from 'react-redux-firebase';
import rootReducer from './reductores';

const configurarBase = preloadedState => {
  const defaultOptions = {
    baseURL: 'http://192.168.1.131:5005',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const axiosInstance = axios.create(defaultOptions);
  axiosInstance.interceptors.request.use(function(config) {
    // const token = store.getState().session.token;
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `${token}` : '';
    return config;
  });
  const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = [thunk.withExtraArgument(axiosInstance), logger];
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middleware)
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
