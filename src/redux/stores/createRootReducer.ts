import { combineReducers } from '@reduxjs/toolkit';

import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { itemsApi } from './items/itemsSlice';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [itemsApi.reducerPath]: itemsApi.reducer,
  });

export default createRootReducer;
