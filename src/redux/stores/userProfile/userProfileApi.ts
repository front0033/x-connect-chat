import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL } from 'api/baseApiClient';

export interface ProfileRequest {
  userId: string;
}

export interface IProfile {
  user: {
    avatar: string;
    email: string;
    _id: string;
  };
  firstName: string;
  lastName: string;
  username: string;
  date: string;
  _id: string;
}

export type PostProfileRequest = Pick<IProfile, 'firstName' | 'lastName' | 'username'>;

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseApiClient({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    // создаем новый профиль для юзера или обновляем его
    createOrUpdate: builder.mutation<IProfile, PostProfileRequest>({
      query: (credentials) => ({
        url: '/api/profile/',
        method: 'POST',
        data: credentials,
      }),
    }),
    // получаем все профили
    getAllProfiles: builder.query<IProfile, void>({
      query: () => ({
        url: '/api/profile',
        method: 'GET',
      }),
    }),
    // получаем профиль юзера по userId
    getProfileByUserId: builder.query<IProfile, ProfileRequest>({
      query: (params) => ({
        url: `/api/profile/me`,
        method: 'GET',
        params,
      }),
    }),
    // удаляем профиль юзера по userId
    deleteProfile: builder.query<IProfile, ProfileRequest>({
      query: (data) => ({
        url: '/api/profile',
        method: 'DELETE',
        data,
      }),
    }),
  }),
});

// use with dispatch
export const resetProfileApi = profileApi.util.resetApiState;

export const {
  useCreateOrUpdateMutation,
  useGetProfileByUserIdQuery,
  useLazyGetProfileByUserIdQuery,
  useDeleteProfileQuery,
} = profileApi;
