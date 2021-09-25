import * as React from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useLazyGetUserQuery } from 'redux/stores/auth/authApi';
import { wsConnect } from 'redux/stores/ws/wsSlice';

import routes from 'routes';

import X_CONNECT_LOCALSTORAGE_USER_KEY from './constants';

// обеспечивает навигацию приложения в зависимости от доступа
const AccessNavigator: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  // единственное место где мы берем userId из localstorage
  const localStorageUserId: string | null = localStorage.getItem(X_CONNECT_LOCALSTORAGE_USER_KEY);
  const [getUser, { isLoading: isUserLoading, isFetching: isUserFetching, isError: isUserDataError }] =
    useLazyGetUserQuery();

  const { user, username } = useAppSelector((store) => store.profile.userProfile) || {};

  React.useEffect(() => {
    if (localStorageUserId && !user) {
      getUser({ userId: localStorageUserId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageUserId]);

  React.useEffect(() => {
    // если profile полностью загружен - создаем сокет соединение
    if (username) {
      dispatch(wsConnect({ host: process.env.REACT_APP_WS_URL || '' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const profileIsComplete = !!user && !!username;

  const redirectToSignInPage = !user || isUserDataError;

  // если profile отсутствует но есть user пользователю нужно заполнить profile
  const redirectToProfilePage = !!user && !username;

  const loading = isUserLoading || isUserFetching;

  return (
    <>
      {loading && (
        <Grid container direction="column" style={{ height: 500 }} justifyContent="center" alignItems="center">
          <Typography variant="button">Проверка доступа</Typography>
          <br />
          <CircularProgress color="primary" />
        </Grid>
      )}

      {!loading && children}

      {/* если никаких данных нет, то отправляем пользователя на страницу входа */}
      {redirectToSignInPage && <Redirect to={routes.signIn()} />}

      {/* если profile отсутствует но есть user пользователю нужно заполнить profile */}
      {redirectToProfilePage && <Redirect to={routes.profile()} />}

      {/* если profile полностью загружен - разрешаем редирект на главную страницу */}
      {profileIsComplete && <Redirect to={routes.main()} />}
    </>
  );
};
export default AccessNavigator;
