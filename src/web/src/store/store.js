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

import employerSlice from "./slices/employerSlice";
import jobSeekerReducer from "./slices/jobSeekerSlice";
import jobsReducer from "./slices/jobsSlice";
import singleEmployerSlice from "./slices/singleEmployerSlice";
import singleJobSlice from "./slices/singleJobSlice";
import jobApplicationReducer from "./slices/jobApplicationSlice";
import userSlice from "./slices/userSlice";
import jobSeekerImageReducer from "./slices/jobSeekerImageSlice";
import employerImageReducer from "./slices/employerImageSlice";
import skillsReducer from "./slices/skillsSlice";
import educationReducer from "./slices/educationSlice";
import experienceReducer from "./slices/experienceSlice";
import getJobApplicationsReducer from "./slices/getJobApplicationsSlice";
import jobSeekerResumeReducer from "./slices/jobSeekerResumeSlice";
import getRecommendedJobReducer from "./slices/getRecommendedJobSlice";
import interviewReducer from './slices/interviewSlice';
import jobSeekerNotificationsReducer from './slices/notificationSlice';


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userSlice"], // Only persist the user slice
};

const rootReducer = combineReducers({
  userSlice: userSlice,
  employers: employerSlice,
  jobSeekers: jobSeekerReducer,
  jobs: jobsReducer,
  singleEmployerSlice: singleEmployerSlice,
  singleJobSlice: singleJobSlice,
  jobApplication: jobApplicationReducer,
  getJobApplications: getJobApplicationsReducer,
  jobSeekerImage: jobSeekerImageReducer,
  employerImage: employerImageReducer,
  skills: skillsReducer,
  education: educationReducer,
  experience: experienceReducer,
  jobSeekerResume: jobSeekerResumeReducer,
  getRecommendedJobs: getRecommendedJobReducer,
  interviews: interviewReducer,
  jobSeekerNotifications: jobSeekerNotificationsReducer,
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
