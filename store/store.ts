import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { apiSlice } from './api/apiSlice';
import AuthSlice from './auth/authSlice';
import MediaSlice from './media/mediaSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: AuthSlice,
    media: MediaSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

// Enable automatic refetching for some queries
setupListeners(store.dispatch);

export default store;
