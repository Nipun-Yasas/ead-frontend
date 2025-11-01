const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

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
  CHAT: {
    ENDPOINT: "http://localhost:8080/ws-chat",
    CONVERSATIONS: (userId: number) =>
      `${BASE_URL}/chat/conversations/${userId}`,
    MESSAGES: (chatId: number) => `${BASE_URL}/chat/messages/${chatId}`,
    SEND: `${BASE_URL}/chat/send`,
    EDIT: (messageId: number) => `${BASE_URL}/chat/edit/${messageId}`,
    DELETE: (messageId: number) => `${BASE_URL}/chat/delete/${messageId}`,
    CREATE: `${BASE_URL}/chat/create`,
    CUSTOM_QUESTIONS: `${BASE_URL}/chat/custom-questions`,
  },
};
