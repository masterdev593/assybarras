import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';
import rootReducer from './reductores';

const configurarBase = preloadedState => {

  const middleware = [thunk.withExtraArgument(getFirebase)];

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  return store;
};
export default configurarBase;
