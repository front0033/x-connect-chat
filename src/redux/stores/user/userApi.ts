import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL } from 'api/baseApiClient';

export interface User {
  userId: string;
  email: string;
  avatar: string;
  date: string;
  _id: string;
}

export interface UserRequest {
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseApiClient({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    // создаем нового юзера
    createUser: builder.mutation<User, UserRequest>({
      query: (credentials) => ({
        url: '/api/user',
        method: 'POST',
        data: credentials,
      }),
    }),
  }),
});

// use with dispatch
export const resetUserApi = userApi.util.resetApiState;

export const { useCreateUserMutation } = userApi;
