export const CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  AUTH_API_URL: process.env.REACT_APP_AUTH_API_URL,
  GENERAL_API_URL: process.env.REACT_APP_GENERAL_API_URL,
  UPLOAD_API_URL: process.env.REACT_APP_UPLOAD_API_URL || '',
  APP_IMAGE_URL: process.env.REACT_APP_IMAGE_URL,
  GOOGLE_APP_ID: process.env.REACT_APP_GOOGLE_APP_ID || '',
  FACEBOOK_APP_ID: process.env.REACT_APP_FB_APP_ID || '',
};
