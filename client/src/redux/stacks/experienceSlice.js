import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  experiencesList: [],
  loading: null,
  error: false,
};

const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    startSettingExperiencesList: (state) => {
      state.loading = true;
      state.error = false;
    },
    failedToSetExperiencesList: (state) => {
      state.loading = false;
      state.error = true;
    },
    setExperiencesList: (state, action) => {
      state.experiencesList = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setExperiencesList,
  startSettingExperiencesList,
  failedToSetExperiencesList,
} = experienceSlice.actions;
export default experienceSlice.reducer;
