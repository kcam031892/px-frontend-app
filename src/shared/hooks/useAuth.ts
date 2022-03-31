import { useRef } from 'react';
import { IUser } from 'shared/interfaces/IUser';
import { ls } from 'shared/utils/ls';

const { getLS } = ls();
export const useAuth = () => {
  const user = useRef<IUser | null>(JSON.parse(getLS('user') || ''));

  return {
    user: user.current,
  };
};
