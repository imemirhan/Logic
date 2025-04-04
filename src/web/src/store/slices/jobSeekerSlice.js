import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Import the Axios instance

// Async thunks for fetching data
export const getJobSeekers = createAsyncThunk("jobseekers/getJobSeekers", async (_, thunkAPI) => {
  try {
    const response = await api.get("/jobseekers"); // Fetch job seekers directly using the Axios instance
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Initial state
const initialState = {
  jobSeekers: {},
  jobSeeker: null,
  jobSeekerStatus: "idle", // idle | loading | succeeded | failed
  jobSeekerError: null,
};

// Slice
const jobSeekerSlice = createSlice({
  name: "jobSeekers",
  initialState,
  reducers: {
    clearJobSeeker: (state) => {
      state.jobSeeker = null;
      state.jobSeekerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getJobSeekers
      .addCase(getJobSeekers.pending, (state) => {
        state.jobSeekerStatus = "loading";
        state.jobSeekerError = null;
      })
      .addCase(getJobSeekers.fulfilled, (state, action) => {
        state.jobSeekerStatus = "succeeded";
        state.jobSeekers = action.payload.jobSeekers || []; // Extracting the array correctly
        state.jobSeekerError = null;
      })
      .addCase(getJobSeekers.rejected, (state, action) => {
        state.jobSeekerStatus = "failed";
        state.jobSeeker = action.payload;
      })
  },
});

// Export actions and reducer
export const { clearJobSeeker } = jobSeekerSlice.actions;
export default jobSeekerSlice.reducer;