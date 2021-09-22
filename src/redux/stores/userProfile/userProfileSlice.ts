/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IProfile } from './userProfileApi';

export const profileReducerPath = 'userReducer';

const profileSlice = createSlice({
  name: profileReducerPath,
  initialState: { userProfile: null as Partial<IProfile> | null },
  reducers: {
    setProfile: (state, { payload }: { payload: Partial<IProfile> }) => {
      state.userProfile = state ? { ...state, ...payload } : payload;
    },
    resetProfile: (state) => {
      state.userProfile = null;
    },
  },
});

export const { setProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
