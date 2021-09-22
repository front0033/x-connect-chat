import { configureStore as createStore } from '@reduxjs/toolkit';

import history from 'shared/history';

import { routerMiddleware } from 'connected-react-router';
import websocketMiddleware from './stores/ws/wsMiddleware';
import createRootReducer from './stores/createRootReducer';
import { authApi } from './stores/auth/authApi';
import { userApi } from './stores/user/userApi';
import { profileApi } from './stores/userProfile/userProfileApi';

const rootReducer = createRootReducer(history);

const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      routerMiddleware(history),
      authApi.middleware,
      userApi.middleware,
      profileApi.middleware,
      websocketMiddleware(),
    ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
