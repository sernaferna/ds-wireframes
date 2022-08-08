import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tutorial } from '@devouringscripture/common';

interface GetAllTutorialRespObj {
  id: string;
  name: string;
}

export const tutorialApi = createApi({
  reducerPath: 'tutorials',
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.REACT_APP_API_SERVER}:7000/api/tutorials/` }),
  tagTypes: ['tutorials'],
  endpoints: (builder) => ({
    getTutorialById: builder.query<Tutorial, string>({
      query: (id) => id,
      providesTags: (result) => (result ? [{ type: 'tutorials', id: result.id }] : []),
    }),
    getAllTutorials: builder.query<GetAllTutorialRespObj[], void>({
      query: () => '',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'tutorials' as const, id: id })), { type: 'tutorials', id: 'LIST' }]
          : [{ type: 'tutorials', id: 'LIST' }],
    }),
    updateTutorial: builder.mutation<Tutorial, Tutorial>({
      query(tut) {
        return {
          url: '/' + tut.id,
          method: 'PUT',
          body: tut,
        };
      },
      invalidatesTags: (result) => (result ? [{ type: 'tutorials', id: result.id }] : []),
    }),
  }),
});

export const { useGetTutorialByIdQuery, useGetAllTutorialsQuery, useUpdateTutorialMutation } = tutorialApi;
