import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IItem {
  id: string;
}

const API_URL = '/api/items';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ method: 'POST', baseUrl: API_URL }),
  endpoints: (builder) => ({
    getItems: builder.query<IItem[], string>({
      query: (body) => ({
        url: `/items`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetItemsQuery } = itemsApi;
