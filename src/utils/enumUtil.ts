import { SelectListItem } from '../types';

export const EnumToMap = (enumeration: any, isReverse?: boolean): SelectListItem[] => {
  const items = [];
  for (let key in enumeration) {
    //TypeScript does not allow enum keys to be numeric
    if (!isNaN(Number(key))) continue;

    const val = enumeration[key] as string;

    //TypeScript does not allow enum value to be null or undefined
    if (val !== undefined && val !== null) {
      if (!isReverse) {
        items.push({
          text: key,
          value: val,
        });
      } else {
        items.push({
          text: val,
          value: key,
        });
      }
    }
  }

  return items;
};
