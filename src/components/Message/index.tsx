import * as React from 'react';

import { Alert } from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';

import DATE_VIEW_FORMAT_WITH_TIME from 'shared/utils/date';

import useStyles from './styles';

interface IMessageProps {
  userName: string;
  message: string;
  date: string;
  my: boolean;
}

const Message: React.FC<IMessageProps> = ({ userName, message, date, my }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent={my ? 'flex-end' : 'flex-start'}>
      <Alert severity={my ? 'success' : 'info'} className={classes.alert}>
        <Grid container direction="column" justifyContent={my ? 'flex-end' : 'flex-start'}>
          <Typography variant="caption">{userName}</Typography>
          <Typography>{message}</Typography>
          <Typography variant="caption">{moment(date).format(DATE_VIEW_FORMAT_WITH_TIME)}</Typography>
        </Grid>
      </Alert>
    </Grid>
  );
};

export default React.memo(Message);
