import { LOADING_WAIT_PAGE } from '../../constants/loading';

function setStatus(loading) {
  return {
    type: LOADING_WAIT_PAGE,
    loading
  };
}

export const loadingActions = {
  setStatus
};
