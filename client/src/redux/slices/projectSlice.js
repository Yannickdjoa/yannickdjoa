import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectsList: [],
  loading: null,
  error: false,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    startSettingProjectsList: (state) => {
      state.loading = true;
      state.error = false;
    },
    failedToSetProjectsList: (state) => {
      state.loading = false;
      state.error = true;
    },
    setProjectsList: (state, action) => {
      state.projectsList = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setProjectsList,
  startSettingProjectsList,
  failedToSetProjectsList,
} = projectSlice.actions;
export default projectSlice.reducer;
