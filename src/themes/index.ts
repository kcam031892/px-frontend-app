import { Theme } from '@material-ui/core';

import { darkTheme } from './dark';
import { lightTheme } from './light';

const themeMap: { [key: string]: Theme } = {
  lightTheme,
  darkTheme,
};

export function getThemeByName(theme: string): Theme {
  return themeMap[theme];
}
