export const CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  API_URL: process.env.REACT_APP_API_URL,
  APP_IMAGE_URL: process.env.REACT_APP_IMAGE_URL,
  GOOGLE_APP_ID: process.env.REACT_APP_GOOGLE_APP_ID || '',
  FACEBOOK_APP_ID: process.env.REACT_APP_FB_APP_ID || '',
};
