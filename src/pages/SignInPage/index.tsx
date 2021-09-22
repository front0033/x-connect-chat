import React from 'react';

import { Box } from '@material-ui/core';
import LoginForm from 'components/LoginForm';
import { useLazyLoginQuery } from 'redux/stores/auth/authApi';
import routes from 'routes';
import X_CONNECT_LOCALSTORAGE_USER_KEY from 'components/AccessNavigator/constants';
import { useAppSelector } from 'redux/hooks';

// Страница авторизации
const SignInPage: React.FC = () => {
  const [login, { isLoading, isError, isSuccess }] = useLazyLoginQuery();
  const { user } = useAppSelector((store) => store.profile.userProfile) || {};

  React.useEffect(() => {
    if (user?.userId) {
      localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, user?.userId);
    }
  }, [user?.userId]);

  return (
    <Box mt={5}>
      <LoginForm
        isSignUp={false}
        onSubmit={login}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        successRedurectUrl={routes.main()}
      />
    </Box>
  );
};

export default React.memo(SignInPage);
