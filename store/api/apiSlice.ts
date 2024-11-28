import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';

export const apiSlice = createApi({
  reducerPath: 'propertysave-app',
  baseQuery: fetchBaseQuery({
    baseUrl:
      Platform.OS === 'android' ? process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_API_URL, // Replace with your API's base URL
  }),
  endpoints: (builder) => ({}),
  tagTypes: [],
});
