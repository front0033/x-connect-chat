import React from 'react';

import { Box } from '@material-ui/core';
import LoginForm from 'components/LoginForm';
import { useCreateUserMutation } from 'redux/stores/user/userApi';
import routes from 'routes';
import X_CONNECT_LOCALSTORAGE_USER_KEY from 'components/AccessNavigator/constants';

// Страница регистрации
const SignUpPage: React.FC = () => {
  const [login, { data, isLoading, isError, isSuccess }] = useCreateUserMutation();

  React.useEffect(() => {
    if (data) {
      localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, data.userId);
    }
  }, [data]);

  return (
    <Box mt={5}>
      <LoginForm
        isSignUp
        onSubmit={login}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        successRedurectUrl={routes.profile()}
      />
    </Box>
  );
};

export default React.memo(SignUpPage);
