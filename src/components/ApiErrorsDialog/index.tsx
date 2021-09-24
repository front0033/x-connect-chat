import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Typography,
} from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import { resetErrors } from 'redux/stores/apiErrors/errorSlice';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import useStyles from './styles';

const ApiErrorsDialog: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => state.apiErrors.items);

  const handleSkipErrors = () => {
    dispatch(resetErrors());
  };

  return (
    <Dialog open={!!errors.length} onClose={handleSkipErrors} id="dialog-error">
      <DialogTitle>
        <Icon color="error" className={classes.icon}>
          <ErrorOutline />
        </Icon>
        Ошибка сервера
      </DialogTitle>
      <DialogContent className={classes.content} dividers id="dialog-error-text">
        {errors.map((error, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DialogContentText key={i}>
            <Typography>{`${error.title}`}</Typography>
            <br />
          </DialogContentText>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSkipErrors} color="primary" id="dialog-error-button-ok">
          ОК
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiErrorsDialog;
