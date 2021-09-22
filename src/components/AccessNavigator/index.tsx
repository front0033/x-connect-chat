import * as React from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useLazyGetUserQuery } from 'redux/stores/auth/authApi';
import { useLazyGetProfileByUserIdQuery } from 'redux/stores/userProfile/userProfileApi';
import { wsConnect } from 'redux/stores/ws/wsSlice';

import routes from 'routes';

import X_CONNECT_LOCALSTORAGE_USER_KEY from './constants';

// обеспечивает навигацию приложения в зависимости от доступа
const AccessNavigator: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const localStorageUserId: string | null = localStorage.getItem(X_CONNECT_LOCALSTORAGE_USER_KEY);
  const [getUser, { isLoading: isUserLoading, isFetching: isUserFetching, isError: isUserDataError }] =
    useLazyGetUserQuery();

  const [getProfile, { isLoading: isProfileLoading, isFetching: isProfileFetching, isError: isProfileDataError }] =
    useLazyGetProfileByUserIdQuery();

  const { user, username } = useAppSelector((store) => store.profile.userProfile) || {};

  React.useEffect(() => {
    if (localStorageUserId && !user) {
      getUser({ userId: localStorageUserId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageUserId]);

  React.useEffect(() => {
    // если записи о userId нет в LocalStorage но userId у нас есть то записываем его туда
    if (user && !localStorageUserId) {
      const userIdFromUserData = user ? user.userId : '';
      localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, userIdFromUserData);
    }

    if (user) {
      getProfile({ userId: user.userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    dispatch(wsConnect({ host: process.env.REACT_APP_WS_URL || '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToSignInPage = !localStorageUserId || isUserDataError;
  const redirectToProfilePage = (!!user && !username) || isProfileDataError;
  const redurectToMainPage = !!username;

  const loading = isUserLoading || isProfileLoading || isProfileFetching || isUserFetching;

  return (
    <>
      {loading && (
        <Grid container direction="column" style={{ height: 500 }} justifyContent="center" alignContent="center">
          <Typography>Данные загружаються</Typography>
          <CircularProgress />
        </Grid>
      )}
      {!loading && children}
      {redirectToSignInPage && <Redirect to={routes.signIn()} />}
      {redirectToProfilePage && <Redirect to={routes.profile()} />}
      {redurectToMainPage && <Redirect to={routes.main()} />}
    </>
  );
};
export default AccessNavigator;
