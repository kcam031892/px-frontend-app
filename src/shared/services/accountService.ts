import { useMutation, useQuery } from 'react-query';
import { accountDao } from 'shared/dao/accountDao';
import { IAccountResponsePayload, IAccountUpdatePayload } from 'shared/interfaces/IAccount';

const { getAccount: getAccountDao, updateAccount: updateAccountDao } = accountDao();
export const accountService = () => {
  const getAccount = () => {
    return useQuery<IAccountResponsePayload, Error>(['accounts'], () => getAccountDao());
  };

  const updateAccount = () => {
    return useMutation((payload: IAccountUpdatePayload) => updateAccountDao(payload));
  };

  return {
    getAccount,
    updateAccount,
  };
};
