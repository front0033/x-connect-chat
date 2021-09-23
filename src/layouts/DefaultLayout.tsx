import * as React from 'react';

import { Box, AppBar, Grid, Typography, CssBaseline } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import UserInfoWithExitAction from 'components/UserInfoWithExitAction';
import { useLazyLogoutQuery } from 'redux/stores/auth/authApi';
import { useAppSelector } from 'redux/hooks';

import useStyles from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  const [logout] = useLazyLogoutQuery();
  const profile = useAppSelector((store) => store.profile.userProfile) || {};

  const handleLogoutClick = () => {
    logout();
  };

  const userName = profile.username || profile.user?.email || '';
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
          {!!userName && <UserInfoWithExitAction userName={userName} action={handleLogoutClick} />}
        </Grid>
      </AppBar>
      <CssBaseline />
      {children}
    </Box>
  );
};

export default DefaultLayout;
