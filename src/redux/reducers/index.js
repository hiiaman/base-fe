import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './reducer/user';
import authenticationReducer from './reducer/authentication';
import notificationReducer from './reducer/notification';
import registerReducer from './reducer/register';
import loadingReducer from './reducer/loading';

const rootReducer = combineReducers({
  routing: routerReducer,
  userReducer,
  authenticationReducer,
  registerReducer,
  notificationReducer,
  loadingReducer
});

export default rootReducer;
