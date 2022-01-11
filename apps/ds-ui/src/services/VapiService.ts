import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Note, BaseNote } from '@devouringscripture/common';

export interface Bounds {
  lowerBound: number;
  upperBound: number;
}

export const vapiApi = createApi({
  reducerPath: 'vapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7001/vapi' }),
  tagTypes: ['notes'],
  endpoints: (builder) => ({
    getNoteById: builder.query<Note, string>({
      query: (id) => `/n/${id}`,
      providesTags: (result) => (result ? [{ type: 'notes', id: result.id }] : []),
    }),
    getAllNotes: builder.query<Note[], void>({
      query: () => '/n',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'notes' as const, id: id })), { type: 'notes', id: 'LIST' }]
          : [{ type: 'notes', id: 'LIST' }],
    }),
    getAllNotesForPassage: builder.query<Note[], string>({
      query: (osis) => {
        return {
          url: '/n/notesForPassage',
          method: 'POST',
          body: { osis: osis },
        };
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'notes' as const, id: id })), { type: 'notes', id: 'LIST' }]
          : [{ type: 'notes', id: 'LIST' }],
    }),
    getAllNotesInRange: builder.query<Note[], Bounds>({
      query: (bounds) => {
        return {
          url: `/n/from/${bounds.lowerBound}/to/${bounds.upperBound}`,
        };
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'notes' as const, id: id })), { type: 'notes', id: 'LIST' }]
          : [{ type: 'notes', id: 'LIST' }],
    }),
    deleteNote: builder.mutation<string, string>({
      query(id) {
        return {
          url: `/n/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['notes'],
    }),
    createNote: builder.mutation<Note, BaseNote>({
      query(note) {
        return {
          url: '/n',
          method: 'POST',
          body: note,
        };
      },
      invalidatesTags: (result) => (result ? [{ type: 'notes', id: result.id }] : [{ type: 'notes', id: 'LIST' }]),
    }),
    updateNote: builder.mutation<Note, Note>({
      query(note) {
        return {
          url: `/n/${note.id}`,
          method: 'PUT',
          body: note,
        };
      },
      invalidatesTags: (result) => (result ? [{ type: 'notes', id: result.id }] : [{ type: 'notes', id: 'LIST' }]),
    }),
  }),
});

export const {
  useGetNoteByIdQuery,
  useLazyGetNoteByIdQuery,
  useGetAllNotesQuery,
  useDeleteNoteMutation,
  useGetAllNotesForPassageQuery,
  useLazyGetAllNotesForPassageQuery,
  useGetAllNotesInRangeQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
} = vapiApi;
