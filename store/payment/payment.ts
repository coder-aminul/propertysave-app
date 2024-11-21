import { apiSlice } from '../api/apiSlice';

export const paymentApi = apiSlice.enhanceEndpoints({ addTagTypes: [] }).injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (data) => ({
        url: `/paymentinit-stripe`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateSubscriptionMutation } = paymentApi;
