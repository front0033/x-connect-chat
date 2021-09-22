import React from 'react';

import { Box } from '@material-ui/core';
import LoginForm from 'components/LoginForm';
import { useCreateUserMutation } from 'redux/stores/user/userApi';
import routes from 'routes';
import X_CONNECT_LOCALSTORAGE_USER_KEY from 'components/AccessNavigator/constants';
import { useAppSelector } from 'redux/hooks';

// Страница регистрации
const SignUpPage: React.FC = () => {
  const [login, { isLoading, isError, isSuccess }] = useCreateUserMutation();
  const { user } = useAppSelector((store) => store.profile.userProfile) || {};

  React.useEffect(() => {
    if (user?.userId) {
      localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, user?.userId);
    }
  }, [user?.userId]);

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
