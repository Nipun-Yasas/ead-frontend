const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH: `${BASE_URL}/auth/refresh`,
  },
  USER: {
    PROFILE: `${BASE_URL}/user/profile`,
    UPDATE: `${BASE_URL}/user/update`,
  },
  APPOINTMENTS: {
    CREATE: `${BASE_URL}/appointments`,
    MY_APPOINTMENTS: `${BASE_URL}/appointments/my`,
    GET_BY_ID: (id: number) => `${BASE_URL}/appointments/${id}`,
    UPDATE: (id: number) => `${BASE_URL}/appointments/${id}`,
    CANCEL: (id: number) => `${BASE_URL}/appointments/${id}/cancel`,
    DELETE: (id: number) => `${BASE_URL}/appointments/${id}`,
    BY_STATUS: (status: string) => `${BASE_URL}/appointments/status/${status}`,
    TODAY: `${BASE_URL}/appointments/today`,
    DATE_RANGE: `${BASE_URL}/appointments/date-range`,
  },
  HEALTH: {
    CHECK: `${BASE_URL}/health`,
    DATABASE: `${BASE_URL}/health/db`,
  },
};
