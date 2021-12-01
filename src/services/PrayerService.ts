import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PrayerListItem, BasePrayerListItem } from '../datamodel/PrayerListItem';

export const prayerApi = createApi({
  reducerPath: 'prayer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/pi/' }),
  tagTypes: ['prayerItems'],
  endpoints: (builder) => ({
    getItemById: builder.query<PrayerListItem, string>({
      query: (id) => id,
      providesTags: ['prayerItems'],
    }),
    getAllItems: builder.query<PrayerListItem[], void>({
      query: () => '',
      providesTags: ['prayerItems'],
    }),
    markRead: builder.mutation<PrayerListItem, string>({
      query(id) {
        return {
          url: `${id}/markRead`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['prayerItems'],
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
    newItem: builder.mutation<PrayerListItem, BasePrayerListItem>({
      query(body) {
        return {
          url: '',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['prayerItems'],
    }),
  }),
});

export const {
  useGetItemByIdQuery,
  useGetAllItemsQuery,
  useMarkReadMutation,
  useNewItemMutation,
  useMarkUnreadMutation,
} = prayerApi;
