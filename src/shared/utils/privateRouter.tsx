import React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';
import { X_CONNECT_LOCALSTORAGE_USER_KEY } from 'components/AuthDialog';
import routes from 'routes';
import { useGetProfileByUserIdQuery } from 'redux/stores/userProfile/userProfileSlice';

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  const storageUserKey = localStorage.getItem(X_CONNECT_LOCALSTORAGE_USER_KEY) || '';
  const { data } = useGetProfileByUserIdQuery({ userId: storageUserKey }, { skip: !storageUserKey });

  return (
    <Route
      {...rest}
      render={({ location }) =>
        data ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.auth(),
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
