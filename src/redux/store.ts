import { configureStore as createStore } from '@reduxjs/toolkit';

import history from 'shared/history';
import { itemsApi } from 'redux/stores/items/itemsSlice';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './stores/createRootReducer';

const rootReducer = createRootReducer(history);

const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([routerMiddleware(history), itemsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
