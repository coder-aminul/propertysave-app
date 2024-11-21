import { apiSlice } from '../api/apiSlice';

export const usersApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ['users', 'user'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: (query) => ({
          url: `/users${query === '' ? '' : query}`,
          method: 'GET',
        }),
        providesTags: ['users'],
      }),
      getUser: builder.query({
        query: (id) => ({
          url: `/users/${id}`,
          method: 'GET',
        }),
        providesTags: (res, err, arg) => [{ type: 'user', id: arg }],
      }),
      createUser: builder.mutation({
        query: (data) => ({
          url: '/signup',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['users'],
      }),
      updateUser: builder.mutation({
        query: ({ id, data }) => ({
          url: `/users/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (res, err, arg) => ['users', { type: 'user', id: arg._id }],
      }),
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/users/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['users'],
      }),
    }),
  });

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
} = usersApi;
