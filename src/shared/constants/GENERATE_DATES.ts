import { IKeyValue } from 'shared/interfaces/utils/IKeyValue';

const GET_CURRENT_YEAR = new Date().getFullYear();
export const GENERATE_DATES: IKeyValue[] = Array.from({
  length: GET_CURRENT_YEAR - (GET_CURRENT_YEAR - 100),
}).map((_, i) => {
  const value = GET_CURRENT_YEAR - i;
  return {
    key: value.toString(),
    value: value,
  };
});
