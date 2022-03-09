import { CssBaseline } from '@material-ui/core';
import 'fontsource-roboto';
import 'fontsource-roboto/300.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/700.css';
import 'fontsource-roboto/900.css';
import SwitchThemeProvider from 'app/SwitchThemeProvider';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider, useSelector } from 'react-redux';
import Routes from 'shared/navigation/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from 'shared/redux/store';
import { tokenService } from 'shared/services/tokenService';
import { selectUser } from 'shared/redux/slicers/user.slicer';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <SwitchThemeProvider>
          <SnackbarProvider maxSnack={3}>
            <ConfirmProvider>
              <CookiesProvider>
                <CssBaseline />
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
