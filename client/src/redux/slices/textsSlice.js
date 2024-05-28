import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textcollectionList: [],
  loading: false,
  error: null,
};

const textcollectionSlice = createSlice({
  name: 'textcollection',
  initialState,
  reducers: {
    startGettingTextCollectionList: (state) => {
      state.loading = true;
    },
    errorGettingTextCollectionList: (state) => {
      state.loading = false;
      state.error = true;
    },
    setTextCollectionList: (state, action) => {
      state.loading = false;
      state.error = false;
      state.textcollectionList = action.payload;
    },
  },
});

export const selectAllTextCollectionList = (state) => state.textcollection;
export const {
  startGettingTextCollectionList,
  errorGettingTextCollectionList,
  setTextCollectionList,
} = textcollectionSlice.actions;
export default textcollectionSlice.reducer;
