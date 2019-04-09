import { SAVE_TASK_REQUEST } from '../../../constants/task';

const initialState = {
  totalTaskRequest: 0
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TASK_REQUEST:
      return {
        ...state,
        totalTaskRequest: action.totalTaskRequest
      };
    default:
      return state;
  }
};

export default notificationReducer;
