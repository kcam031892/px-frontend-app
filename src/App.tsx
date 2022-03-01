import { CssBaseline } from '@material-ui/core';

import SwitchThemeProvider from 'app/SwitchThemeProvider';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import Routes from 'shared/navigation/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'shared/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <SwitchThemeProvider>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <ConfirmProvider>
              <CookiesProvider>
                <Routes />
              </CookiesProvider>
            </ConfirmProvider>
          </SnackbarProvider>
        </SwitchThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
