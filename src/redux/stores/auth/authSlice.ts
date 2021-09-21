import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient from 'api/baseApiClient';

export interface User {
  name: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseApiClient({ baseUrl: '/api/chat' }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        data: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
