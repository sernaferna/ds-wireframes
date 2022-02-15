import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { PlanAttributes } from '@devouringscripture/common';

export const planApi = createApi({
  reducerPath: 'plans',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/plans/public' }),
  tagTypes: ['plans'],
  endpoints: (builder) => ({
    getPlansById: builder.query<PlanAttributes, string>({
      query: (id) => `/${id}`,
      providesTags: (result) => (result ? [{ type: 'plans', id: result.planInstanceId }] : []),
    }),
  }),
});

export const { useGetPlansByIdQuery } = planApi;
