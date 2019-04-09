import { DOMAIN_API } from '../config/env';

export const API_BASE = `${DOMAIN_API}`;
export const API_BASE_PREFIX = 'api/cms';
export const ACCESSTOKEN_VALUE_PREFIX = 'Bearer ';
export const API_LOGIN = `${API_BASE}/${API_BASE_PREFIX}/login`;
export const API_REGISTER = `${API_BASE}/${API_BASE_PREFIX}/register`;
export const API_LOGOUT = `${API_BASE}/${API_BASE_PREFIX}/logout`;
export const API_CLIENT_LIST = `${API_BASE}/${API_BASE_PREFIX}/users`;
export const API_TASK_LIST = `${API_BASE}/${API_BASE_PREFIX}/tasks`;
export const API_TASK_UPDATE_STATUS = `${API_BASE}/${API_BASE_PREFIX}/tasks`;
export const API_TASK_DETAIL = `${API_BASE}/${API_BASE_PREFIX}/tasks`;
export const API_TASK_UPDATE_ESTIMATED_TIME = `${API_BASE}/${API_BASE_PREFIX}/tasks`;
export const API_TASK_UPDATE_RESULT = `${API_BASE}/${API_BASE_PREFIX}/tasks`;
export const API_TASK_REQUEST = `${API_BASE}/${API_BASE_PREFIX}/task-requests`;
export const API_TOTAL_TASK_NEW = `${API_BASE}/${API_BASE_PREFIX}/total-task-request`;
export const API_USER_DETAIL = `${API_BASE}/${API_BASE_PREFIX}/users`;
export const UPDATE_PROFILE = `${API_BASE}/${API_BASE_PREFIX}/profile-update`;
export const EXPORT_CSV_TIME_USE = `${API_BASE}/${API_BASE_PREFIX}/export-csv`;
export const API_ADD_TIME_BANK = `${API_BASE}/${API_BASE_PREFIX}/subscriptions`;

export default API_BASE;
