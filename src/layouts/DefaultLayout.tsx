import * as React from 'react';

import { Box, AppBar, Grid, Typography, CssBaseline } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" title="REACT APP" color="default">
        <Grid className={classes.titleContainer} container wrap="nowrap" alignItems="center">
          <LockIcon />
          <Typography className={classes.title} variant="h6">
            X-CONNECT-CHAT
          </Typography>
        </Grid>
      </AppBar>
      <CssBaseline />
      {children}
    </Box>
  );
};

export default DefaultLayout;
