import { configureStore } from "@reduxjs/toolkit";
import employerReducer from "./slices/employerSlice";
import jobSeekerReducer from "./slices/jobSeekerSlice";
import jobsReducer from "./slices/jobsSlice";
import singleEmployerSlice from "./slices/singleEmployerSlice";
import singleJobSlice from "./slices/singleJobSlice";

const store = configureStore({
  reducer: {
    employers: employerReducer,
    jobSeekers: jobSeekerReducer,
    jobs: jobsReducer,
    singleJobSlice: singleJobSlice,
    singleEmployerSlice: singleEmployerSlice, // Assuming you want to keep this for single employer
  },
});

export default store;
