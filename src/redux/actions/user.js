import { userConstants } from '../../constants/user';

function request(user) {
  return {
    type: userConstants.LOGIN_REQUEST,
    user
  };
}

function success(user) {
  return {
    type: userConstants.LOGIN_SUCCESS,
    user
  };
}

function updateProfile(user) {
  return {
    type: userConstants.UPDATE_PROFILE,
    user
  };
}

function failure(error) {
  return {
    type: userConstants.LOGIN_FAILURE,
    error
  };
}

function logout() {
  return {
    type: userConstants.LOGOUT
  };
}

function logoutFailure(error) {
  return {
    type: userConstants.LOGOUT_FAILURE,
    error
  };
}

export const userActions = {
  request,
  success,
  failure,
  logout,
  logoutFailure,
  updateProfile
};
