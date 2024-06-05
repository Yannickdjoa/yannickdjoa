import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stacksList: [],
  loading: false,
  error: null,
};

const stackSlice = createSlice({
  name: 'stacks',
  initialState,
  reducers: {
    addStackStart: (state) => {
      state.loading = true;
    },
    addStackSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.stacksList.push(action.payload);
    },
    addStackFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeStackStart: (state, action) => {
      state.loading = true;
    },
    removeStackSuccess: (state, action) => {
      state.stacksList.splice(action.payload, 1);
      state.loading = false;
      state.error = null;
    },
    removeStackFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStackStart: (state, action) => {
      state.loading = true;
    },
    updateStackSuccess: (state, action) => {
      state.stacksList[action.payload.index] = action.payload.stack;
      state.loading = false;
      state.error = null;
    },
    updateStackFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    getStackListStart: (state, action) => {
      state.loading = true;
    },
    getStackSuccess: (state, action) => {
      state.stacksList[action.payload.index] = action.payload.stack;
      state.loading = false;
      state.error = null;
    },
    getStackListFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setStacksList: (state, action) => {
      state.stacksList = action.payload;
    },
  },
});

export const {
  addStackStart,
  addStackSuccess,
  addStackFailure,
  removeStackStart,
  removeStackSuccess,
  removeStackFailure,
  updateStackFailure,
  updateStackStart,
  updateStackSuccess,
  setStacksList,
  getStackListStart,
  getStackSuccess,
  getStackListFailure,
} = stackSlice.actions;

export const selectAllStacks = (state) => state.stacks;
export default stackSlice.reducer;
