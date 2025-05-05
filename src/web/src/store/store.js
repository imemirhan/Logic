import { configureStore } from "@reduxjs/toolkit";
import employerReducer from "./slices/employerSlice";
import jobSeekerReducer from "./slices/jobSeekerSlice";
import jobsReducer from "./slices/jobsSlice";
import singleEmployerSlice from "./slices/singleEmployerSlice";
import singleJobSlice from "./slices/singleJobSlice";
import jobApplicationReducer from "./slices/jobApplicationSlice";
import userReducer from "./slices/userSlice"; // ✅ corrected

const store = configureStore({
  reducer: {
    employers: employerReducer,
    jobSeekers: jobSeekerReducer,
    jobs: jobsReducer,
    singleJobSlice: singleJobSlice,
    singleEmployerSlice: singleEmployerSlice,
    jobApplication: jobApplicationReducer,
  },
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"], // Only persist the user slice
};

const rootReducer = combineReducers({
  user: userReducer, // ✅ renamed correctly
  employers: employerReducer,
  jobSeekers: jobSeekerReducer,
  jobs: jobsReducer,
  singleEmployerSlice: singleEmployerSlice,
  singleJobSlice: singleJobSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
