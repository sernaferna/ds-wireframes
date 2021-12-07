import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActionsForDay, ActionType } from '../datamodel/Action';

interface MarkItemReadForDayServiceInterface {
  idForDay: string;
  idForItem: string;
  dataForDay: ActionsForDay;
}

interface ItemsForMonthInterface {
  year: number;
  month: number;
}

export const actionsApi = createApi({
  reducerPath: 'actions',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/actions/' }),
  tagTypes: ['actions', 'customActionTypes'],
  endpoints: (builder) => ({
    getRecentActions: builder.query<ActionsForDay[], void>({
      query: () => {
        return {
          url: 'entries/recent',
        };
      },
      providesTags: (result) =>
        result ? result.map((item) => ({ type: 'actions', id: item.id })) : [{ type: 'actions', id: 'List' }],
    }),
    getCustomActionTypes: builder.query<ActionType[], void>({
      query: () => {
        return {
          url: 'custom/',
        };
      },
      providesTags: ['customActionTypes'],
    }),
    getActionsForMonth: builder.query<ActionsForDay[], ItemsForMonthInterface>({
      query(data) {
        return {
          url: `entries/forMonth/${data.year}/${data.month}`,
        };
      },
      providesTags: (result) =>
        result ? result.map((item) => ({ type: 'actions', id: item.id })) : [{ type: 'actions', id: 'List' }],
    }),
    getActionByDate: builder.query<ActionsForDay, string>({
      query: (date) => {
        return {
          url: `entries/byDate/${date}`,
        };
      },
      providesTags: (result) => (result ? [{ type: 'actions', id: result.id }] : []),
    }),
    markItemReadForDay: builder.mutation<ActionsForDay, MarkItemReadForDayServiceInterface>({
      query(data) {
        return {
          url: `${data.idForDay}/mark/${data.idForItem}`,
          method: 'PUT',
          body: data.dataForDay,
        };
      },
      invalidatesTags: (result) => (result ? [{ type: 'actions', id: result.id }] : []),
    }),
  }),
});

export const {
  useGetRecentActionsQuery,
  useGetActionByDateQuery,
  useMarkItemReadForDayMutation,
  useGetActionsForMonthQuery,
  useGetCustomActionTypesQuery,
} = actionsApi;
