import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL, ResponseDataStatus } from 'api/baseApiClient';
import { User } from '../user/userApi';
import { resetProfile, setUser } from '../userProfile/userProfileSlice';

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
    getUser: builder.query<ResponseDataStatus, GetUserRequest>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          const result = await apiClient({ url: '/api/auth', method: 'GET', params: arg });
          queryApi.dispatch(setUser(result.data as User));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
    // авторизируемся по логину и паролю
    login: builder.query<ResponseDataStatus, LoginRequest>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          const result = await apiClient({ url: '/api/auth', method: 'POST', data: arg });
          queryApi.dispatch(setUser(result.data as User));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
    logout: builder.query<ResponseDataStatus, void>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          await apiClient({ url: '/api/auth/logout', method: 'GET' });
          queryApi.dispatch(resetProfile());
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
  }),
});

// use with dispatch
export const resetAuthApi = authApi.util.resetApiState;

export const { useGetUserQuery, useLazyGetUserQuery, useLazyLoginQuery, useLoginQuery, useLazyLogoutQuery } = authApi;
