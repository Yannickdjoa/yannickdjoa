import { configureStore } from '@reduxjs/toolkit';
import stacksReducer from './slices/stackSlice';
import experiencesReducer from './slices/experienceSlice';
import projectsReducer from './slices/projectSlice';
import servicesReducer from './slices/serviceSlice';
import webintroReducer from './slices/webIntroSlice';

export const store = configureStore({
  reducer: {
    stacks: stacksReducer,
    experiences: experiencesReducer,
    projects: projectsReducer,
    services: servicesReducer,
    webintro: webintroReducer,
  },
});
