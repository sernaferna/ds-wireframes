import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BasePassage, Passage } from '@devouringscripture/common';

export const passageApi = createApi({
  reducerPath: 'passages',
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.REACT_APP_API_SERVER}:7000/api/read/current` }),
  tagTypes: ['currentPassages'],
  endpoints: (builder) => ({
    getCurrentItems: builder.query<Passage[], void>({
      query: () => '',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'currentPassages' as const, id: id })),
              { type: 'currentPassages', id: 'LIST' },
            ]
          : [{ type: 'currentPassages', id: 'LIST' }],
    }),
    getPassageById: builder.query<Passage, string>({
      query: (id) => `/${id}`,
      providesTags: (result) => (result ? [{ type: 'currentPassages', id: result.id }] : []),
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
          url: `/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['currentPassages'],
    }),
  }),
});

export const {
  useGetCurrentItemsQuery,
  useNewItemMutation,
  useDeletePassageItemMutation,
  useGetPassageByIdQuery,
  useLazyGetPassageByIdQuery,
} = passageApi;
