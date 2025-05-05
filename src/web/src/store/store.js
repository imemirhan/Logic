import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import employerReducer from "./slices/employerSlice";
import jobSeekerReducer from "./slices/jobSeekerSlice";
import jobsReducer from "./slices/jobsSlice";
import singleEmployerReducer from "./slices/singleEmployerSlice";
import singleJobReducer from "./slices/singleJobSlice";
import jobApplicationReducer from "./slices/jobApplicationSlice";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the user slice
};

const rootReducer = combineReducers({
  user: userReducer,
  employers: employerReducer,
  jobSeekers: jobSeekerReducer,
  jobs: jobsReducer,
  singleEmployer: singleEmployerReducer,
  singleJob: singleJobReducer,
  jobApplication: jobApplicationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
