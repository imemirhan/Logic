import { configureStore } from "@reduxjs/toolkit";
import employerReducer from "./slices/employerSlice";
import jobSeekerReducer from "./slices/jobSeekerSlice";

const store = configureStore({
  reducer: {
    employers: employerReducer,
    jobSeekers: jobSeekerReducer,
  },
});

export default store;
