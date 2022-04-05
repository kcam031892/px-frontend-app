import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';

import { getThemeByName } from '.';

type Props = {
  children: React.ReactNode;
};
const SwitchThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = getThemeByName('lightTheme');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default SwitchThemeProvider;
