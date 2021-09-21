import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL } from 'api/baseApiClient';

export interface ProfileRequest {
  userId: string;
}

export interface Profile {
  user: string;
  firstName: string;
  lastName: string;
  username: string;
  date: string;
}

export type PostProfileRequest = Pick<Profile, 'firstName' | 'lastName' | 'username'>;

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseApiClient({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    // создаем новый профиль для юзера или обновляем его
    createOrUpdate: builder.mutation<Profile, PostProfileRequest>({
      query: (credentials) => ({
        url: '/api/profile',
        method: 'POST',
        data: credentials,
      }),
    }),
    // получаем все профили
    getAllProfiles: builder.query<Profile, void>({
      query: () => ({
        url: '/api/profile',
        method: 'GET',
      }),
    }),
    // получаем профиль юзера по userId
    getProfileByUserId: builder.query<Profile, ProfileRequest>({
      query: (data) => ({
        url: `/api/profile/me`,
        method: 'GET',
        data,
      }),
    }),
    // получаем профиль юзера по userId
    deleteProfile: builder.query<Profile, ProfileRequest>({
      query: (data) => ({
        url: '/api/profile',
        method: 'DELETE',
        data,
      }),
    }),
  }),
});

export const { useCreateOrUpdateMutation, useGetProfileByUserIdQuery, useDeleteProfileQuery } = profileApi;
