/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../auth/authSlice';

type AuthState = {
  user: User | null;
};

export const userReducerPath = 'auth';

const userSlice = createSlice({
  name: userReducerPath,
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { user } }: PayloadAction<{ user: User }>) => {
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;
