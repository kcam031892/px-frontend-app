import { Error } from '../types/commonTypes';

export const hasError = (fieldName: string, errors: Error[]): boolean => {
  return errors.findIndex((x) => x.field === fieldName) > -1;
};

export const getErrorMessage = (fieldName: string, errors: Error[]): string => {
  return errors.find((x) => x.field === fieldName)?.message || '';
};
