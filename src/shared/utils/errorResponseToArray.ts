import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';

type ErrorValues = {
  [key: string]: string[];
};
export const errorResponseToArray = (error: ErrorValues): string[] => {
  return Object.entries(error).reduce((acc: string[], curr) => {
    const [key, value] = curr;
    const text = `${key}: ${value.join(',')}`;
    return [...acc, text];
  }, []);
};
