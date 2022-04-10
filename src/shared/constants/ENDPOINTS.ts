import { CONFIG } from 'shared/config';

export const ENDPOINTS = {
  USERS: `${CONFIG.AUTH_API_URL}/users`,
  PROVIDER_AUTHENTICATION: `${CONFIG.AUTH_API_URL}/provider_authentication`,
  ME: `${CONFIG.GENERAL_API_URL}/talent/me`,
  PROFILE: `${CONFIG.GENERAL_API_URL}/profiles`,
  AGENCY: `${CONFIG.GENERAL_API_URL}/agencies`,
  MEDIA: `${CONFIG.UPLOAD_API_URL}/media`,
  TALENTS: `${CONFIG.GENERAL_API_URL}/talents`,
};
