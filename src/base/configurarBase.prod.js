import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { getFirebase } from 'react-redux-firebase';
import rootReducer from './reductores';

const configurarBase = preloadedState => {
  const defaultOptions = {
    baseURL: 'http://192.168.1.148:5005',
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
  const middleware = [thunk.withExtraArgument({ getFirebase, axiosInstance })];

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  return store;
};
export default configurarBase;
