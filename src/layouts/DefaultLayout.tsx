import * as React from 'react';

import { Box, AppBar, Grid, Typography, CssBaseline, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { useLazyLogoutQuery } from 'redux/stores/auth/authApi';
import { useAppSelector } from 'redux/hooks';

import useStyles from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  const [logout] = useLazyLogoutQuery();
  const { user } = useAppSelector((store) => store.profile.userProfile) || {};

  const handleLogoutClick = () => {
    logout();
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
