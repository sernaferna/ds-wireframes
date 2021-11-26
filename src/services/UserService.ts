import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserAttributes } from '../datamodel/User';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/user/' }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getById: builder.query<UserAttributes, string>({
      query: (id) => id,
      providesTags: ['user'],
    }),
    updateUser: builder.mutation<UserAttributes, UserAttributes>({
      query(user) {
        return {
          url: `${user.id}`,
          method: 'PUT',
          body: user,
        };
      },
      invalidatesTags: ['user'],
    }),
  }),
});

export const { useGetByIdQuery, useUpdateUserMutation } = userApi;

export const HARDCODED_USER_ID = '2f740108-8596-4a8a-b334-518ab34a8c50';
