import { createStore, applyMiddleware, compose } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const history = createBrowserHistory();

function configureStore() {
  const reactRouterMiddleware = routerMiddleware(history);
  const composeEnhancers = compose;
  const middlewares = [reactRouterMiddleware, thunk];

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}

export default configureStore;
