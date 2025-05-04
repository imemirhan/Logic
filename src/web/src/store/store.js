import { configureStore } from "@reduxjs/toolkit";
import employerReducer from "./slices/employerSlice";
import jobSeekerReducer from "./slices/jobSeekerSlice";
import jobsReducer from "./slices/jobsSlice";
import singleEmployerSlice from "./slices/singleEmployerSlice";
import singleJobSlice from "./slices/singleJobSlice";
import jobApplicationReducer from "./slices/jobApplicationSlice";

const store = configureStore({
  reducer: {
    employers: employerReducer,
    jobSeekers: jobSeekerReducer,
    jobs: jobsReducer,
    singleJobSlice: singleJobSlice,
    singleEmployerSlice: singleEmployerSlice,
    jobApplication: jobApplicationReducer,
  },
});

export default store;
