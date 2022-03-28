import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';

export const errorResponseToArray = (error: IErrorResponse): string[] => {
  return Object.entries(error).reduce((acc: string[], curr) => {
    const [key, value] = curr;
    const text = `${key}: ${value.join(',')}`;
    return [...acc, text];
  }, []);
};
