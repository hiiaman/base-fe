import { userConstants } from '../../../constants/user';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true } : { loggedIn: false };

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        signingUp: true,
        error: ''
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        signingUp: false,
        loggedIn: true,
        isNew: true
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        signingUp: false,
        loggedIn: false,
        error: action.error
      };
    default:
      return {
        ...state
      };
  }
};

export default registerReducer;
