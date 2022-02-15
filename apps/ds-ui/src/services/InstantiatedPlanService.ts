import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseInstantiatedPlan } from '@devouringscripture/common';

export const instantiatedPlanApi = createApi({
  reducerPath: 'instantiatedPlans',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/user' }),
  tagTypes: ['instantiatedPlans', 'basePlans'],
  endpoints: (builder) => ({
    getAllInstantiatedPlanItems: builder.query<BaseInstantiatedPlan[], string>({
      query(userId) {
        return {
          url: `/${userId}/ip`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ planInstanceId }) => ({ type: 'basePlans' as const, id: planInstanceId })),
              { type: 'basePlans', id: 'LIST' },
            ]
          : [{ type: 'basePlans', id: 'LIST' }],
    }),
  }),
});

export const { useGetAllInstantiatedPlanItemsQuery } = instantiatedPlanApi;
