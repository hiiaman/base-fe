
import { SAVE_TASK_REQUEST } from '../../constants/task';

export const NotificationAction = {
  totalTaskRequest
};

function totalTaskRequest(total) {
  return {
    type: SAVE_TASK_REQUEST,
    totalTaskRequest: total
  };
}
