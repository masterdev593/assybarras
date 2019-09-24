import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { getFirebase } from 'react-redux-firebase';
import rootReducer from './reductores';

const configurarBase = preloadedState => {

  const middleware = [thunk.withExtraArgument(getFirebase), logger];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
