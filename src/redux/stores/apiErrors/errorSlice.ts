import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IError, IErrorsData } from './types';

export const errorReducerPath = 'apiErrors';

const apiErrorsSlice = createSlice({
  name: errorReducerPath,
  initialState: {
    items: [] as IErrorsData['items'],
  },
  reducers: {
    setError(state, { payload }: PayloadAction<IError>) {
      return {
        items: [...state.items, payload],
      };
    },
    resetErrors() {
      return { items: [] };
    },
  },
});

export const { setError, resetErrors } = apiErrorsSlice.actions;

export default apiErrorsSlice.reducer;
