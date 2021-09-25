import React, { ReactElement } from 'react';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'pages/NotFound';
import DefaultLayout from 'layouts/DefaultLayout';
import routes from 'routes';
import AccessNavigator from 'components/AccessNavigator';
import MainPage from 'pages/MainPage';
import SingInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import ProfilePage from 'pages/ProfilePage';
import ApiErrorsDialog from 'components/ApiErrorsDialog';

// #5FAF2D - logo color
const theme = createTheme({});

interface IApp {}

const App: React.FC<IApp> = (): ReactElement => (
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <DefaultLayout>
        <ApiErrorsDialog />
        <AccessNavigator>
          <Switch>
            <Route exact path={routes.signIn()} component={SingInPage} />
            <Route exact path={routes.signUp()} component={SignUpPage} />
            <Route exact path={routes.profile()} component={ProfilePage} />
            <Route exact path={routes.main()} component={MainPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </AccessNavigator>
      </DefaultLayout>
    </StylesProvider>
  </MuiThemeProvider>
);

export default App;
