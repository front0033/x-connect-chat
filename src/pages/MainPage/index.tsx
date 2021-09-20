import * as React from 'react';

import { Grid, Typography } from '@material-ui/core';

import useStyles from './styles';

const MainPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" className={classes.root}>
      <Typography variant="h5" gutterBottom id="no-found-title">
        Main Page
      </Typography>
    </Grid>
  );
};

export default MainPage;
