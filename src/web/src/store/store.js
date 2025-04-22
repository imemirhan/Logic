import { configureStore } from "@reduxjs/toolkit";
import employerReducer from "./slices/employerSlice";
import jobSeekerReducer from "./slices/jobSeekerSlice";
import jobsReducer from "./slices/jobsSlice";

const store = configureStore({
  reducer: {
    employers: employerReducer,
    jobSeekers: jobSeekerReducer,
    jobs: jobsReducer,
  },
});

export default store;
