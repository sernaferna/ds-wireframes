import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ActionsForDay, ActionType, BaseActionType, ActionStats } from '@devouringscripture/common';

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
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.REACT_APP_API_SERVER}:7000/api/actions/` }),
  tagTypes: ['actions', 'customActionTypes', 'stats'],
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
    getActionStats: builder.query<ActionStats, string | void>({
      query: (filter) => {
        let theUrl = 'entries/stats';
        if (filter) {
          theUrl += '?tf=' + filter;
        }
        return {
          url: theUrl,
        };
      },
      providesTags: ['stats'],
    }),
    getCustomActionTypes: builder.query<ActionType[], void>({
      query: () => {
        return {
          url: 'custom/',
        };
      },
      providesTags: [{ type: 'customActionTypes', id: 'LIST' }],
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
          url: `entries/${data.idForDay}/mark/${data.idForItem}`,
          method: 'PUT',
          body: data.dataForDay,
        };
      },
      async onQueryStarted({ idForItem, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          actionsApi.util.updateQueryData('getActionByDate', idForItem, (draft) => {
            Object.assign(draft, patch);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result) => (result ? [{ type: 'actions', id: result.id }] : []),
    }),
    otShortPassageReadForDay: builder.mutation<string, string>({
      query(date) {
        return {
          url: `entries/markPassageRead/${date}/ot/short`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['actions'],
    }),
    otLongPassageReadForDay: builder.mutation<string, string>({
      query(date) {
        return {
          url: `entries/markPassageRead/${date}/ot/long`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['actions'],
    }),
    ntShortPassageReadForDay: builder.mutation<string, string>({
      query(date) {
        return {
          url: `entries/markPassageRead/${date}/nt/short`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['actions'],
    }),
    ntLongPassageReadForDay: builder.mutation<string, string>({
      query(date) {
        return {
          url: `entries/markPassageRead/${date}/nt/long`,
          method: 'PUT',
        };
      },
      invalidatesTags: ['actions'],
    }),
    newCustomAction: builder.mutation<ActionType, BaseActionType>({
      query(data) {
        return {
          url: 'custom/',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: 'customActionTypes', id: result.id }] : [{ type: 'customActionTypes', id: 'LIST' }],
    }),
    deleteCustomAction: builder.mutation<string, string>({
      query(data) {
        return {
          url: `custom/${data}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: [{ type: 'customActionTypes', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRecentActionsQuery,
  useGetActionByDateQuery,
  useMarkItemReadForDayMutation,
  useGetActionsForMonthQuery,
  useGetCustomActionTypesQuery,
  useNewCustomActionMutation,
  useDeleteCustomActionMutation,
  useGetActionStatsQuery,
  useNtLongPassageReadForDayMutation,
  useNtShortPassageReadForDayMutation,
  useOtLongPassageReadForDayMutation,
  useOtShortPassageReadForDayMutation,
} = actionsApi;
