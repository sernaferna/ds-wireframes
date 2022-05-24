import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserAttributes } from '@devouringscripture/common';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.REACT_APP_API_SERVER}:7000/api/user/` }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    getUserById: builder.query<UserAttributes, string>({
      query: (id) => id,
      providesTags: (result) => (result ? [{ type: 'user', id: result.id }] : []),
    }),
    updateUser: builder.mutation<UserAttributes, UserAttributes>({
      query(user) {
        return {
          url: `${user.id}`,
          method: 'PUT',
          body: user,
        };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUserById', id, (draft) => {
            Object.assign(draft, patch);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result) => (result ? [{ type: 'user', id: result.id }] : []),
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;

export const HARDCODED_USER_ID = '2f740108-8596-4a8a-b334-518ab34a8c50';
