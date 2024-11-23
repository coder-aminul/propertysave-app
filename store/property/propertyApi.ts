import { apiSlice } from '../api/apiSlice';

export const propertyApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['properties', 'property'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createProperty: builder.mutation({
        query: (data) => ({
          url: `/properties`,
          method: 'POST',
          body: data,
        }),
      }),
      getProperties: builder.query({
        query: () => ({
          url: `/properties`,
          method: 'GET',
        }),
        providesTags: ['properties'],
      }),
      getProperty: builder.query({
        query: (id) => ({
          url: `/properties/${id}`,
          method: 'GET',
        }),
        providesTags: (res, err, arg) => [{ type: 'property', id: arg }],
      }),
    }),
  });

export const { useCreatePropertyMutation, useGetPropertiesQuery, useGetPropertyQuery } =
  propertyApi;
