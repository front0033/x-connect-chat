import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL } from 'api/baseApiClient';

export interface User {
  id: string;
}

export interface UserResponse {
  userId: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseApiClient({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    // получаем инфу о user
    getUser: builder.query<User, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth',
        method: 'GET',
        data: credentials,
      }),
    }),
    login: builder.query<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth',
        method: 'POST',
        data: credentials,
      }),
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useLazyLoginQuery, useLoginQuery } = authApi;
