import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL } from 'api/baseApiClient';
import { UserId } from '../user/userApi';
import { IMessageData } from './chatSlice';

type ChatId = string;

export interface IChat {
  chatId: ChatId;
  name: string;
  userIds: UserId[];
  messages: Array<IMessageData>;
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseApiClient({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    createOrUpdateChat: builder.mutation<ChatId, IChat>({
      query: (data) => ({
        url: `/api/chat`,
        method: 'POST',
        data,
      }),
    }),
    getAllChats: builder.query<Array<IChat>, void>({
      query: () => ({
        url: '/api/chat',
        method: 'GET',
      }),
    }),
    getChatsByUserId: builder.query<Array<IChat>, UserId>({
      query: (userId) => ({
        url: `/api/chat/user/${userId}`,
        method: 'GET',
      }),
    }),
    getChatById: builder.query<IChat, ChatId>({
      query: (chatId) => ({
        url: `/api/chat/${chatId}`,
        method: 'GET',
      }),
    }),
    deleteChat: builder.mutation<ChatId, ChatId>({
      query: (chatId) => ({
        url: `/api/chat/${chatId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// use with dispatch
export const resetChatApi = chatApi.util.resetApiState;

export const {
  useCreateOrUpdateChatMutation,
  useDeleteChatMutation,
  useGetAllChatsQuery,
  useGetChatByIdQuery,
  useGetChatsByUserIdQuery,
  useLazyGetAllChatsQuery,
  useLazyGetChatByIdQuery,
  useLazyGetChatsByUserIdQuery,
  usePrefetch,
} = chatApi;
