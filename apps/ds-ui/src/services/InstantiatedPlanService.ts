import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BaseInstantiatedPlan,
  InstantiatedPlan,
  InstantiatedPlanDay,
  ResponseMessage,
} from '@devouringscripture/common';

interface ICompletePlanItem {
  planId: string;
  dayIndex: number;
  day: InstantiatedPlanDay;
}

export const instantiatedPlanApi = createApi({
  reducerPath: 'instantiatedPlans',
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.REACT_APP_API_SERVER}:7000/api/ip` }),
  tagTypes: ['instantiatedPlans', 'plans'],
  endpoints: (builder) => ({
    getAllInstantiatedPlanItems: builder.query<BaseInstantiatedPlan[], void>({
      query: () => '/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ planInstanceId }) => ({ type: 'plans' as const, id: planInstanceId })),
              { type: 'plans', id: 'LIST' },
            ]
          : [{ type: 'plans', id: 'LIST' }],
    }),
    getSubscribedPlans: builder.query<InstantiatedPlan[], void>({
      query: () => '/subscribed',
      providesTags: ['instantiatedPlans'],
    }),
    newInstantiatedPlan: builder.mutation<InstantiatedPlan, BaseInstantiatedPlan>({
      query(body) {
        return {
          url: '',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['instantiatedPlans', 'plans'],
    }),
    deleteInstantiatedPlan: builder.mutation<ResponseMessage, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['instantiatedPlans', 'plans'],
    }),
    completePlanItem: builder.mutation<InstantiatedPlanDay, ICompletePlanItem>({
      query(data) {
        return {
          url: `/completeAction/${data.planId}/${data.dayIndex}`,
          method: 'PUT',
          body: data.day,
        };
      },
      invalidatesTags: ['instantiatedPlans'],
    }),
  }),
});

export const {
  useGetAllInstantiatedPlanItemsQuery,
  useNewInstantiatedPlanMutation,
  useDeleteInstantiatedPlanMutation,
  useGetSubscribedPlansQuery,
  useCompletePlanItemMutation,
} = instantiatedPlanApi;
