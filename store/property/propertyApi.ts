import { apiSlice } from '../api/apiSlice';

export const propertyApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['properties', 'property'] })
  .injectEndpoints({
    overrideExisting: true,
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
      getPropertiesbyAuthor: builder.query({
        query: ({ id, role, page = 1, limit = 10, filters = {} }) => {
          const params = new URLSearchParams({ page, limit, ...filters });
          return {
            url: `/propertylist/${id}/${role}?${params.toString()}`,
            method: 'GET',
          };
        },
        providesTags: ['properties'],
      }),
      editProperty: builder.mutation({
        query: ({ id, data }) => ({
          url: `/properties/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (res, err, arg) => ['properties', { type: 'property', id: arg._id }],
      }),
    }),
  });

export const {
  useCreatePropertyMutation,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetPropertiesbyCompanyQuery,
  useGetPropertiesbyAuthorQuery,
  useLazyGetPropertiesbyAuthorQuery,
  useEditPropertyMutation,
} = propertyApi;
