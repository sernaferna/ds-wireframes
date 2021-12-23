import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BasePassage, Passage } from '../datamodel/Passage';

export const passageApi = createApi({
  reducerPath: 'passages',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/read/current' }),
  tagTypes: ['currentPassages'],
  endpoints: (builder) => ({
    getCurrentItems: builder.query<Passage[], void>({
      query: () => '',
      providesTags: ['currentPassages'],
    }),
    newItem: builder.mutation<Passage, BasePassage>({
      query(body) {
        return {
          url: '',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['currentPassages'],
    }),
    deletePassageItem: builder.mutation<string, string>({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['currentPassages'],
    }),
  }),
});

export const { useGetCurrentItemsQuery, useNewItemMutation, useDeletePassageItemMutation } = passageApi;
