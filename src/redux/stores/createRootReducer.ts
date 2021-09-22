import { combineReducers } from '@reduxjs/toolkit';

import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { authApi } from './auth/authApi';
import wsReducer, { wsReducerPath } from './ws/wsSlice';
import chatReducer, { chatReducerPath } from './chats/chatSlice';
import errorReducer, { errorReducerPath } from './apiErrors/errorSlice';
import { userApi } from './user/userApi';
import { profileApi } from './userProfile/userProfileApi';
import profileReducer, { profileReducerPath } from './userProfile/userProfileSlice';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [errorReducerPath]: errorReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [profileReducerPath]: profileReducer,
    [wsReducerPath]: wsReducer,
    [chatReducerPath]: chatReducer,
  });

export default createRootReducer;
