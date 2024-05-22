import { configureStore } from '@reduxjs/toolkit';
import stacksReducer from './stacks/stackSlice';
import experiencesReducer from './stacks/experienceSlice';
import projectsReducer from './stacks/projectSlice';
import servicesReducer from './stacks/serviceSlice';

export const store = configureStore({
  reducer: {
    stacks: stacksReducer,
    experiences: experiencesReducer,
    projects: projectsReducer,
    services: servicesReducer,
  },
});
