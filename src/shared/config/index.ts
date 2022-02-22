export const CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  API_URL: process.env.REACT_APP_API_URL,
  FB_APP_ID: process.env.REACT_APP_FB_APP_ID || '',
};
