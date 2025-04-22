import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api"; // Import Axios instance

// Fetch jobs from API using the Axios instance
export const getJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await api.get("/jobs");
  return response.data; // Make sure to return the actual array here
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [], // This ensures jobs is an array by default
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;