import { CONFIG } from 'shared/config';

export const ENDPOINTS = {
  USERS: `${CONFIG.AUTH_API_URL}/users`,
  RESET_PASSWORD: `${CONFIG.AUTH_API_URL}/reset_password`,
  CHANGE_PASSWORD: `${CONFIG.AUTH_API_URL}/change_password`,
  PROVIDER_AUTHENTICATION: `${CONFIG.AUTH_API_URL}/provider_authentication`,
  ME: `${CONFIG.GENERAL_API_URL}/me`,
  PROFILE: `${CONFIG.GENERAL_API_URL}/profiles`,
  AGENCY: `${CONFIG.GENERAL_API_URL}/agencies`,
  MEDIA: `${CONFIG.UPLOAD_API_URL}/media`,
  MEDIA_URLS: `${CONFIG.UPLOAD_API_URL}/media_urls`,

  TALENTS: `${CONFIG.GENERAL_API_URL}/talents`,
};
