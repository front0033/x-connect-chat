/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../auth/authSlice';

type AuthState = {
  user: User | null;
  token: string | null;
};

export const userReducerPath = 'auth';

const userSlice = createSlice({
  name: userReducerPath,
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string }>) => {
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;

export default userSlice.reducer;
