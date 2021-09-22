import * as React from 'react';

import { useAppDispatch } from 'redux/hooks';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useLazyGetUserQuery, useLazyLoginQuery } from 'redux/stores/auth/authSlice';
import { useLazyGetProfileByUserIdQuery } from 'redux/stores/userProfile/userProfileSlice';
import { wsConnect } from 'redux/stores/ws/wsSlice';

import routes from 'routes';

import X_CONNECT_LOCALSTORAGE_USER_KEY from './constants';

// обеспечивает навигацию приложения в зависимости от доступа
const AccessNavigator: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const localStorageUserId: string | null = localStorage.getItem(X_CONNECT_LOCALSTORAGE_USER_KEY);
  const [getUser, { data: userData, isLoading: isUserLoading, isFetching: isUserFetching, isError: isUserDataError }] =
    useLazyGetUserQuery();

  const [
    getProfile,
    { data: profileData, isLoading: isProfileLoading, isFetching: isProfileFetching, isError: isProfileDataError },
  ] = useLazyGetProfileByUserIdQuery();

  React.useEffect(() => {
    if (localStorageUserId && !userData) {
      getUser({ userId: localStorageUserId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageUserId]);

  React.useEffect(() => {
    // если записи о userId нет в LocalStorage но userId у нас есть то записываем его туда
    if (userData && !localStorageUserId) {
      const userIdFromUserData = userData ? userData.userId : '';
      localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, userIdFromUserData);
    }

    if (userData) {
      getProfile({ userId: userData.userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  React.useEffect(() => {
    dispatch(wsConnect({ host: process.env.REACT_APP_WS_URL || '' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectToSignInPage = !localStorageUserId || isUserDataError;
  const redirectToProfilePage = (!profileData && !!userData) || isProfileDataError;
  const redurectToMainPage = !!userData && !!profileData;

  const loading = isUserLoading || isProfileLoading || isProfileFetching || isUserFetching;
  console.log('loading - ', loading);
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
