import * as SecureStore from 'expo-secure-store';

import { apiSlice } from '../api/apiSlice';
// eslint-disable-next-line import/order
import { userLoggedIn } from './authSlice';

// eslint-disable-next-line import/order
import { savesecureinfo } from '~/utils/secure-store';

export const authApi = apiSlice.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const token = result?.data?.data?.token;
          const userInfo = result?.data?.data?.user;
          //   Cookies.set('auth_token', token, { expires: 1 });
          //   Cookies.set('customer', userInfo, { expires: 1 });
          //   localStorage.setItem('auth_token', token);
          await savesecureinfo('accessToken', token);
          //   const userJson = JSON.stringify(userInfo);
          //   localStorage.setItem('userIn', userJson);
          dispatch(
            userLoggedIn({
              accessToken: token,
              authstatus: true,
              customer: userInfo,
            })
          );
        } catch (error) {
          //do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          const result = response?.data;
          const token = result?.data?.token;
          const userInfo = result?.data?.user;
          await SecureStore.setItemAsync('user', JSON.stringify(userInfo));
          await SecureStore.setItemAsync('auth', token);
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.token,
              user: result.data.user,
              authStatus: true,
            })
          );
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          // do nothing
        }
      },
    }),
    verifyToken: builder.query({
      query: (token) => ({
        url: '/me',
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyTokenQuery, useSignupMutation } = authApi;
