import { combineReducers } from '@reduxjs/toolkit';

import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { authApi } from './auth/authSlice';
import wsReducer, { wsReducerPath } from './ws/wsSlice';
import chatReducer, { chatReducerPath } from './chats/chatSlice';
import errorReducer, { errorReducerPath } from './apiErrors/errorSlice';
import { userSlice } from './user/userSlice';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [errorReducerPath]: errorReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [wsReducerPath]: wsReducer,
    [chatReducerPath]: chatReducer,
  });

export default createRootReducer;
