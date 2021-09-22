import * as React from 'react';

import { Redirect } from 'react-router-dom';
import { useLazyGetUserQuery } from 'redux/stores/auth/authSlice';
import { useLazyGetProfileByUserIdQuery } from 'redux/stores/userProfile/userProfileSlice';
import routes from 'routes';

import X_CONNECT_LOCALSTORAGE_USER_KEY from './constants';

// обеспечивает навигацию приложения в зависимости от доступа
const AccessNavigator: React.FC = ({ children }) => {
  const localStorageUserId: string | null = localStorage.getItem(X_CONNECT_LOCALSTORAGE_USER_KEY);
  const [getUser, { data: userData, isSuccess: isUserDataSuccess, isError: isUserDataError }] = useLazyGetUserQuery();
  const [getProfile, { data: profileData, isSuccess: isProfileDataSuccess, isError: isProfileDataError }] =
    useLazyGetProfileByUserIdQuery();
  console.log(localStorageUserId);
  React.useEffect(() => {
    if (localStorageUserId && !userData) {
      getUser({ userId: localStorageUserId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageUserId]);

  React.useEffect(() => {
    // если записи о userId нет в LocalStorage но userId у нас есть то записываем его туда
    if (userData && isUserDataSuccess && !localStorageUserId) {
      localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, userData.userId);
    }

    if (userData && isUserDataSuccess) {
      console.log('isUserDataSuccess - ', isUserDataSuccess);
      getProfile({ userId: userData.userId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, isUserDataSuccess]);

  const redirectToSignInPage = !localStorageUserId || isUserDataError;
  const redirectToProfilePage = (!profileData && !!userData && !!localStorageUserId) || isProfileDataError;
  const redurectToMainPage = isProfileDataSuccess && profileData;

  return (
    <>
      {children}
      {redirectToSignInPage && <Redirect to={routes.signIn()} />}
      {redirectToProfilePage && <Redirect to={routes.profile()} />}
      {redurectToMainPage && <Redirect to={routes.main()} />}
    </>
  );
};

export default AccessNavigator;
