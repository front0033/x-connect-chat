import * as React from 'react';

import { Alert } from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';

import { DATE_VIEW_TIME_FORMAT_WITHOUT_DATE } from 'shared/utils/date';

import useStyles from './styles';

interface IMessageProps {
  userName: string;
  message: string;
  date: string;
  my: boolean;
}

const Message: React.FC<IMessageProps> = ({ userName, message, date, my }) => {
  const classes = useStyles();
  const alertClasses = { message: classes.alertMessage, root: classes.alert, icon: classes.alertIcon };
  return (
    <Grid container justifyContent={my ? 'flex-end' : 'flex-start'}>
      <Alert severity={my ? 'success' : 'info'} classes={alertClasses}>
        <Grid container direction="column" alignContent={my ? 'flex-start' : 'flex-end'}>
          <Typography variant="caption">{userName}</Typography>
          <Typography>{message}</Typography>
        </Grid>
        <Grid container justifyContent={my ? 'flex-end' : 'flex-start'}>
          <Typography variant="caption" className={classes.date}>
            {moment(date).format(DATE_VIEW_TIME_FORMAT_WITHOUT_DATE)}
          </Typography>
        </Grid>
      </Alert>
    </Grid>
  );
};

export default React.memo(Message);
