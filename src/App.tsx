import React, { ReactElement } from 'react';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'pages/NotFound';
import DefaultLayout from 'layouts/DefaultLayout';
import routes from 'routes';
import MainPage from 'pages/MainPage';
import AuthPage from 'pages/AuthPage';

// #5FAF2D - logo color
const theme = createTheme({});

interface IApp {}

const App: React.FC<IApp> = (): ReactElement => (
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <DefaultLayout>
        <Switch>
          <Route exact path={routes.auth()} component={AuthPage} />
          <Route exact path={routes.main()} component={MainPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </DefaultLayout>
    </StylesProvider>
  </MuiThemeProvider>
);

export default App;
