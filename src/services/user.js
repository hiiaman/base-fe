import { UnauthenticatedRequest, AuthenticatedRequest } from './api';
import { API_LOGIN, API_REGISTER, API_LOGOUT } from './../constants/common';

export const UserService = {
  login,
  register,
  logout
};

function login(emailTxt, passwordTxt) {
  const requestOptions = {
    email: emailTxt, password: passwordTxt
  };
  
  return UnauthenticatedRequest().post(API_LOGIN, requestOptions)
    .then(response => response.data);
}

function register(emailTxt, passwordTxt, firstnameText, lastnameText, passwordConfirmationText) {
  const requestOptions = {
    email: emailTxt,
    password: passwordTxt,
    password_confirmation: passwordConfirmationText,
    firstname: firstnameText,
    lastname: lastnameText
  };

  return UnauthenticatedRequest().post(API_REGISTER, requestOptions)
    .then(response => response.data);
}

function logout(accessToken) {
  return AuthenticatedRequest(accessToken).post(API_LOGOUT)
    .then(response => response.data);
}
