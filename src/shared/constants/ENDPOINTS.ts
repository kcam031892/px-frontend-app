import { CONFIG } from 'shared/config';

export const ENDPOINTS = {
  USERS: `${CONFIG.AUTH_API_URL}/users`,
  ME: `${CONFIG.GENERAL_API_URL}/me`,
  PROFILE: `${CONFIG.GENERAL_API_URL}/profiles`,
  AGENCY: `${CONFIG.GENERAL_API_URL}/agencies`,
};
