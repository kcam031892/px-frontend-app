import { IUser } from 'shared/interfaces/IUser';
import { ls } from 'shared/utils/ls';

const { getLS } = ls();
export const tokenService = () => {
  const getAuthToken = () => {
    return getLS('auth_token');
  };
  const isAuthenticated = () => {
    return !!getAuthToken();
  };

  const isCompletedPrimaryDetail = (): boolean => {
    return getLS('is_completed_primary_details') === 'true';
  };

  const getUser = (): IUser | null => {
    const userLS = getLS('user');
    if (userLS) {
      return JSON.parse(getLS('user') || '');
    }
    return null;
  };

  return {
    getAuthToken,
    isAuthenticated,
    getUser,
    isCompletedPrimaryDetail,
  };
};
