import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  propertyimage: '',
};

export const mediaSlice = createSlice({
  name: 'mediaSlice',
  initialState,
  reducers: {
    setPropertyImage: (state, action) => {
      state.propertyimage = action.payload;
    },
    clearPropertyimage: (state) => {
      state.propertyimage = '';
    },
  },
});

export const { setPropertyImage, clearPropertyimage } = mediaSlice.actions;

export default mediaSlice.reducer;
