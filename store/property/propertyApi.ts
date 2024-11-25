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
        invalidatesTags: ['properties', 'property'],
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
      getPropertiesbyCompany: builder.query({
        query: ({ id, role }) => ({
          url: `/propertylist/${id}/${role}`,
          method: 'GET',
        }),
        providesTags: ['properties'],
      }),
    }),
  });

export const {
  useCreatePropertyMutation,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetPropertiesbyCompanyQuery,
} = propertyApi;
