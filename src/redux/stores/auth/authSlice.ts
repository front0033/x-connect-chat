import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL } from 'api/baseApiClient';
import { User } from '../user/userSlice';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GetUserRequest {
  userId: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseApiClient({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    // получаем инфу о user
    getUser: builder.query<User, GetUserRequest>({
      query: (data) => ({
        url: '/api/auth',
        method: 'GET',
        data,
      }),
    }),
    // авторизируемся по логину и паролю
    login: builder.query<User, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth',
        method: 'POST',
        data: credentials,
      }),
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useLazyLoginQuery, useLoginQuery } = authApi;
