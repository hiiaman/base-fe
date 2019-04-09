import { userConstants } from '../../../constants/user';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { user, loggedIn: true } : { loggedIn: false };

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        error: ''
      };
    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        error: action.error
      };
    case userConstants.LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        user: null
      };
    case userConstants.LOGOUT_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        error: action.error
      };
    case userConstants.UPDATE_PROFILE:
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.profile,
            ...action.user.user.profile
          }
        }
      };
    default:
      return {
        ...state
      };
  }
};

export default authenticationReducer;
