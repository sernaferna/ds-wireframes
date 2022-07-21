import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BasePassage, Passage, ResponseMessage } from '@devouringscripture/common';
import { DateTime } from 'luxon';

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
    deletePassageItem: builder.mutation<ResponseMessage, string>({
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

/**
 * Helper function to sort a list of `Passage` items.
 *
 * @param list List of passages to be sorted
 * @param asc Whether the list should be sorted ascending (true) or descending (false)
 * @returns Sorted list
 */
export const sortPassageItems = (list: Passage[], asc: boolean): Passage[] => {
  return list.sort((a, b) => {
    const aDate = DateTime.fromISO(a.date);
    const bDate = DateTime.fromISO(b.date);

    if (aDate < bDate) {
      if (asc) {
        return -1;
      } else {
        return 1;
      }
    }

    if (aDate > bDate) {
      if (asc) {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  });
};
