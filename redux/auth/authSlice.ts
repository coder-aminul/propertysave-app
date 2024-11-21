import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registationState: {
    infoState: {},
    credentialState: {
      email: 'admin@gmail.com',
    },
  },
  accessToken: undefined,
  user: null,
  authStatus: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    registationinfo: (state, action) => {
      state.registationState.infoState = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.authStatus = action.payload.authStatus;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = null;
      state.authStatus = false;
    },
  },
});

export const { registationinfo, userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
