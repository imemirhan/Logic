import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";  // Import the new Axios instance

// Fetch jobs from API using the Axios instance
export const getJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await api.get("/jobs");  // Using the Axios instance
  return response.data;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
