import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PrayerListItem, BasePrayerListItem } from '@devouringscripture/common/src/dm/Prayer';
import { DateTime } from 'luxon';

export const prayerApi = createApi({
  reducerPath: 'prayer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/pi/' }),
  tagTypes: ['prayerItems'],
  endpoints: (builder) => ({
    getItemById: builder.query<PrayerListItem, string>({
      query: (id) => id,
      providesTags: (result) => (result ? [{ type: 'prayerItems', id: result.id }] : []),
    }),
    getAllItems: builder.query<PrayerListItem[], void>({
      query: () => '',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'prayerItems' as const, id: id })), { type: 'prayerItems', id: 'LIST' }]
          : [{ type: 'prayerItems', id: 'LIST' }],
    }),
    markRead: builder.mutation<PrayerListItem, string>({
      query(id) {
        return {
          url: `${id}/markRead`,
          method: 'PUT',
        };
      },
      invalidatesTags: (result) => (result ? [{ type: 'prayerItems', id: result.id }] : []),
    }),
    markUnread: builder.mutation<PrayerListItem, string>({
      query(id) {
        return {
          url: `${id}/markUnread`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['prayerItems'],
    }),
    deletePrayerItem: builder.mutation<string, string>({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['prayerItems'],
    }),
    newItem: builder.mutation<PrayerListItem, BasePrayerListItem>({
      query(body) {
        return {
          url: '',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (result) => (result ? [{ type: 'prayerItems', id: result.id }] : []),
    }),
  }),
});

export const {
  useGetItemByIdQuery,
  useGetAllItemsQuery,
  useMarkReadMutation,
  useNewItemMutation,
  useMarkUnreadMutation,
  useDeletePrayerItemMutation,
} = prayerApi;

// other prayer 'helper functions'
export const sortPrayerItems = (list: PrayerListItem[], asc: boolean): PrayerListItem[] => {
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
