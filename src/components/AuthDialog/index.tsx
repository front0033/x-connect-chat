import React from 'react';

import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
// import { Alert } from '@material-ui/lab';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Alert } from '@material-ui/lab';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useLazyLoginQuery } from 'redux/stores/auth/authSlice';
import { Redirect } from 'react-router-dom';
import Progress from 'components/LinearProgress';
import routes from 'routes';

import useStyles from './styles';

interface IAuthDialogProps {}

interface IAuthDialogState {
  username: string;
  password: string;
}

const initialState: IAuthDialogState = {
  username: '',
  password: '',
};

const REQUIRED_ERROR_MESSAGE = 'Поле должно быть заполнено';
const EMAIL_ERROR_MESSAGE = 'Логин должен быть в формате email';

const validationSchema: yup.SchemaOf<IAuthDialogState> = yup.object().shape({
  username: yup.string().required(REQUIRED_ERROR_MESSAGE).email(EMAIL_ERROR_MESSAGE),
  password: yup.string().required(REQUIRED_ERROR_MESSAGE),
});

export const X_CONNECT_LOCALSTORAGE_USER_KEY = 'X_CONNECT_CHAT_USER';

const AuthDialog: React.FC<IAuthDialogProps> = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [login, { data: user, isLoading, isError, isSuccess }] = useLazyLoginQuery();

  React.useEffect(() => {
    if (user && isSuccess) {
      localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, user.userId);
    }
  }, [user, isSuccess]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmitClick = async (values: IAuthDialogState) => {
    const { username, password } = values;
    login({ email: username, password });
  };

  return (
    <div>
      <Dialog open aria-labelledby="form-dialog-title" fullWidth maxWidth="xs">
        <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleSubmitClick}>
          {({ values, errors, touched, isSubmitting, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
              <DialogContent>
                <Grid container direction="column">
                  <TextField
                    name="username"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="name.lastname@x5.ru"
                    onChange={handleChange}
                    value={values.username}
                    label="Имя пользователя"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    FormHelperTextProps={{
                      className: classes.helpText,
                    }}
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                  />
                  <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                      error={touched.password && !!errors.password}
                    />
                  </FormControl>
                  {isError && (
                    <Alert className={classes.errorAlert} severity="error">
                      Неправильный логин или пароль
                    </Alert>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions className={classes.actions}>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  Вход
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
        <Progress pending={isLoading} />
      </Dialog>
      {!!user && <Redirect to={routes.main()} />}
    </div>
  );
};

export default React.memo(AuthDialog);
