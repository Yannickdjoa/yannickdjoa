import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textsList: [],
  loading: false,
  error: null,
};

const textsSlice = createSlice({
  name: 'texts',
  initialState,
  reducers: {
    startGettingTextsList: (state) => {
      state.loading = true;
    },
    errorGettingTextsList: (state) => {
      state.loading = false;
      state.error = true;
    },
    setTextsList: (state, action) => {
      state.loading = false;
      state.error = false;
      state.textsList = action.payload;
    },
  },
});

export const selectAlltextsList = (state) => state.texts;
export const { startGettingTextsList, errorGettingTextsList, setTextsList } =
  textsSlice.actions;
export default textsSlice.reducer;
