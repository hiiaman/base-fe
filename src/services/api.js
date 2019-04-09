import axios from 'axios';
import configureStore, { history } from './../redux/store/configureStore';
import { userActions } from './../redux/actions/user';
import { API_BASE, ACCESSTOKEN_VALUE_PREFIX } from '../constants/common';

class HttpRequest {
  constructor(headers, options, authenticated = false) {
    this.axios = axios.create({
      baseURL: API_BASE,
      headers,
      ...options
    });
    if (authenticated) {
      this.handleResponse();
    }
  }

  handleResponse() {
    return this.axios.interceptors.response.use(
      response => response,
      error => {
        const status = error.response.status;
        
        if (status === 401) {
          configureStore().dispatch(userActions.logout());
          location.reload(true);
        }

        if (status === 500 || status === 404) {
          history.replace('/404');
        }

        return Promise.reject(error);
      });
  }

  get(url, params, adapter) {
    return this.axios.get(url, { params, adapter });
  }

  post(url, params, adapter) {
    return this.axios.post(url, params, { adapter });
  }

  put(url, params, adapter) {
    return this.axios.put(url, params, { adapter });
  }

  delete(url, params, adapter) {
    return this.axios.delete(url, params, adapter);
  }

  patch(url, params, adapter) {
    return this.axios.patch(url, params, { adapter });
  }
}

export const AuthenticatedRequest = (token, options = {}) =>
  new HttpRequest(
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${ACCESSTOKEN_VALUE_PREFIX + token}`
    },
    options,
    true
  );

export const UnauthenticatedRequest = () =>
  new HttpRequest({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

export const AuthenticatedFormDataRequest = (token, options = {}) =>
  new HttpRequest(
    {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `${ACCESSTOKEN_VALUE_PREFIX} ${token}`
    },
    options,
    true
  );

export const UnauthenticatedFormDataRequest = (options = {}) =>
  new HttpRequest(
    {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    options
  );
