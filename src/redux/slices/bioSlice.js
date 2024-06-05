import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bioDataList: [],
  loading: false,
  error: null,
};

const biodataSlice = createSlice({
  name: 'biodata',
  initialState,
  reducers: {
    startGettingBioDataList: (state) => {
      state.loading = true;
    },
    errorGettingBioDataList: (state) => {
      state.loading = false;
      state.error = true;
    },
    setBioDataList: (state, action) => {
      state.loading = false;
      state.error = false;
      state.bioDataList = action.payload;
    },
  },
});

export const selectAllBioDataList = (state) => state.biodata;
export const {
  startGettingBioDataList,
  errorGettingBioDataList,
  setBioDataList,
} = biodataSlice.actions;
export default biodataSlice.reducer;
