import { apiSlice } from '../api/apiSlice';

export const agentApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ['agents', 'agent'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAgentsbyCompany: builder.query({
        query: (companyid) => ({
          url: `/agents/${companyid}`,
          method: 'GET',
        }),
        providesTags: ['agents'],
      }),
      getAgent: builder.query({
        query: (id) => ({
          url: `/agent/${id}`,
          method: 'GET',
        }),
        providesTags: (res, err, arg) => [{ type: 'agent', id: arg }],
      }),
      createAgent: builder.mutation({
        query: (data) => ({
          url: '/agents',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['agents'],
      }),
      updateAgent: builder.mutation({
        query: ({ id, companyid, data }) => ({
          url: `/agents/${id}/${companyid}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (res, err, arg) => ['agents', { type: 'agent', id: arg._id }],
      }),
      deleteAgent: builder.mutation({
        query: ({ id, companyid }) => ({
          url: `/agents/${id}/${companyid}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['agents'],
      }),
    }),
  });

export const {
  useCreateAgentMutation,
  useDeleteAgentMutation,
  useGetAgentQuery,
  useGetAgentsbyCompanyQuery,
  useUpdateAgentMutation,
} = agentApi;
