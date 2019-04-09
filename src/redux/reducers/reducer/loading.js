import { LOADING_WAIT_PAGE } from '../../../constants/loading';

const initialState = { loading: true };

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_WAIT_PAGE:
      return {
        loading: action.loading
      };
    default:
      return state;
  }
};

export default loadingReducer;
