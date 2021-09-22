import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL, ResponseDataStatus } from 'api/baseApiClient';
import { setUser } from '../userProfile/userProfileSlice';

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
    createUser: builder.mutation<ResponseDataStatus, UserRequest>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          const result = await apiClient({ url: '/api/user', method: 'POST', data: arg });
          queryApi.dispatch(setUser(result.data as User));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
  }),
});

// use with dispatch
export const resetUserApi = userApi.util.resetApiState;

export const { useCreateUserMutation } = userApi;
