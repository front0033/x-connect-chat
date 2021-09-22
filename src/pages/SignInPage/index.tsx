import React from 'react';

import { Box } from '@material-ui/core';
import LoginForm from 'components/LoginForm';
import { useLazyLoginQuery } from 'redux/stores/auth/authSlice';
import routes from 'routes';
import X_CONNECT_LOCALSTORAGE_USER_KEY from 'components/AccessNavigator/constants';

// Страница авторизации
const SignInPage: React.FC = () => {
  const [login, { data, isLoading, isError, isSuccess }] = useLazyLoginQuery();

  React.useEffect(() => {
    if (data) {
      localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, data.userId);
    }
  }, [data]);

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
