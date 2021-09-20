import { combineReducers } from '@reduxjs/toolkit';

import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { itemsApi } from './items/itemsSlice';
import wsReducer, { wsReducerPath } from './ws/wsSlice';
import chatReducer, { chatReducerPath } from './chats/chatSlice';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [itemsApi.reducerPath]: itemsApi.reducer,
    [wsReducerPath]: wsReducer,
    [chatReducerPath]: chatReducer,
  });

export default createRootReducer;
