import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tutorial } from '@devouringscripture/common';

export const tutorialApi = createApi({
  reducerPath: 'tutorials',
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.REACT_APP_API_SERVER}:7000/api/tutorials/` }),
  tagTypes: ['tutorials'],
  endpoints: (builder) => ({
    getTutorialById: builder.query<Tutorial, string>({
      query: (id) => id,
      providesTags: (result) => (result ? [{ type: 'tutorials', id: result.id }] : []),
    }),
  }),
});

export const { useGetTutorialByIdQuery } = tutorialApi;
