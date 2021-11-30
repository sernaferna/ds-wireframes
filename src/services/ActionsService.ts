import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActionsForDay } from '../datamodel/Action';

interface MarkItemReadForDayServiceInterface {
  idForDay: string;
  idForItem: string;
  dataForDay: ActionsForDay;
}
export const actionsApi = createApi({
  reducerPath: 'actions',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/actions/entries/' }),
  tagTypes: ['actions'],
  endpoints: (builder) => ({
    getRecentActions: builder.query<ActionsForDay[], void>({
      query: () => {
        return {
          url: 'recent',
        };
      },
      providesTags: ['actions'],
    }),
    getActionByDate: builder.query<ActionsForDay, string>({
      query: (date) => {
        return {
          url: `/byDate/${date}`,
        };
      },
      providesTags: ['actions'],
    }),
    markItemReadForDay: builder.mutation<ActionsForDay, MarkItemReadForDayServiceInterface>({
      query(data) {
        return {
          url: `${data.idForDay}/mark/${data.idForItem}`,
          method: 'PUT',
          body: data.dataForDay,
        };
      },
      invalidatesTags: ['actions'],
    }),
  }),
});

export const { useGetRecentActionsQuery, useGetActionByDateQuery, useMarkItemReadForDayMutation } = actionsApi;
