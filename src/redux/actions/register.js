import { userConstants } from '../../constants/user';

function request(user) {
  return {
    type: userConstants.REGISTER_REQUEST,
    user
  };
}

function success(user) {
  return {
    type: userConstants.REGISTER_SUCCESS,
    user
  };
}

function failure(error) {
  return {
    type: userConstants.REGISTER_FAILURE,
    error
  };
}

export const registerActions = {
  request,
  success,
  failure
};
