import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseInstantiatedPlan, InstantiatedPlan } from '@devouringscripture/common';

export const instantiatedPlanApi = createApi({
  reducerPath: 'instantiatedPlans',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/ip' }),
  tagTypes: ['instantiatedPlans'],
  endpoints: (builder) => ({
    getAllInstantiatedPlanItems: builder.query<BaseInstantiatedPlan[], void>({
      query: () => '/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ planInstanceId }) => ({ type: 'instantiatedPlans' as const, id: planInstanceId })),
              { type: 'instantiatedPlans', id: 'LIST' },
            ]
          : [{ type: 'instantiatedPlans', id: 'LIST' }],
    }),
    newInstantiatedPlan: builder.mutation<InstantiatedPlan, BaseInstantiatedPlan>({
      query(body) {
        return {
          url: '',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['instantiatedPlans'],
    }),
    deleteInstantiatedPlan: builder.mutation<string, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
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
} = instantiatedPlanApi;
