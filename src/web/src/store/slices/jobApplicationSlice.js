import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Axios instance

// Async thunk to create a job application
export const createJobApplication = createAsyncThunk(
  "jobApplications/createJobApplication",
  async (jobApplicationData, thunkAPI) => {
    try {
      const response = await api.post("/job-applications", { jobApplication: jobApplicationData });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  applicationStatus: "idle", // idle | loading | succeeded | failed
  applicationError: null,
  submittedApplication: null,
};

// Slice
const jobApplicationSlice = createSlice({
  name: "jobApplications",
  initialState,
  reducers: {
    clearJobApplicationState: (state) => {
      state.applicationStatus = "idle";
      state.applicationError = null;
      state.submittedApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // createJobApplication
      .addCase(createJobApplication.pending, (state) => {
        state.applicationStatus = "loading";
        state.applicationError = null;
      })
      .addCase(createJobApplication.fulfilled, (state, action) => {
        state.applicationStatus = "succeeded";
        state.submittedApplication = action.payload;
        state.applicationError = null;
      })
      .addCase(createJobApplication.rejected, (state, action) => {
        state.applicationStatus = "failed";
        state.applicationError = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearJobApplicationState } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
