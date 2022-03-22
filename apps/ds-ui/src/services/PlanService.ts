import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PlanAttributes, BasePlanAttributes } from '@devouringscripture/common';

export const planApi = createApi({
  reducerPath: 'plans',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/plans/public' }),
  tagTypes: ['plans'],
  endpoints: (builder) => ({
    getPlansById: builder.query<PlanAttributes, string>({
      query: (id) => `/${id}`,
      providesTags: (result) => (result ? [{ type: 'plans', id: result.planInstanceId }] : []),
    }),
    savePlan: builder.mutation<PlanAttributes, PlanAttributes | BasePlanAttributes>({
      query(body) {
        return {
          url: '/save',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['plans'],
    }),
    publishPlan: builder.mutation<PlanAttributes, PlanAttributes | BasePlanAttributes>({
      query(body) {
        return {
          url: '/publish',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (result) => (result ? [{ type: 'plans', id: result.planInstanceId }] : []),
    }),
    deletePlan: builder.mutation<string, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['plans'],
    }),
  }),
});

export const { useGetPlansByIdQuery, useSavePlanMutation, usePublishPlanMutation, useDeletePlanMutation } = planApi;
