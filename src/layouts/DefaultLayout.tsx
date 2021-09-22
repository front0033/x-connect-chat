import * as React from 'react';

import { Box, AppBar, Grid, Typography, CssBaseline, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { resetAuthApi, useLazyLogoutQuery } from 'redux/stores/auth/authApi';
import { resetUserApi } from 'redux/stores/user/userApi';
import { resetProfileApi } from 'redux/stores/userProfile/userProfileApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import X_CONNECT_LOCALSTORAGE_USER_KEY from 'components/AccessNavigator/constants';

import useStyles from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  const [logout] = useLazyLogoutQuery();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.profile.userProfile) || {};

  const handleLogoutClick = () => {
    logout();

    dispatch(resetAuthApi());
    dispatch(resetUserApi());
    dispatch(resetProfileApi());
    localStorage.removeItem(X_CONNECT_LOCALSTORAGE_USER_KEY);
  };

  return (
    <Box className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" title="REACT APP" color="default">
        <Grid
          className={classes.titleContainer}
          container
          wrap="nowrap"
          alignItems="center"
          justifyContent="space-between"
        >
          <LockIcon />
          <Typography className={classes.title} variant="h6">
            X-CONNECT-CHAT
          </Typography>
          {user ? <Button onClick={handleLogoutClick}>Выйти</Button> : <div />}
        </Grid>
      </AppBar>
      <CssBaseline />
      {children}
    </Box>
  );
};

export default DefaultLayout;
